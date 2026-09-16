#!/usr/bin/env python3
"""
Fetch Google Analytics 4 (GA4) geolocation and visitor stats using OAuth 2.0.
"""

import os
import sys
import argparse
import warnings
from pathlib import Path

# Silence deprecation & TLS warnings
warnings.filterwarnings("ignore")

# Force unbuffered stdout
if sys.version_info >= (3, 7):
    try:
        sys.stdout.reconfigure(line_buffering=True)
    except Exception:
        pass

# Paths
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
CREDENTIALS_FILE = SCRIPT_DIR / "credentials.json"
TOKEN_FILE = SCRIPT_DIR / "token.json"

SCOPES = [
    "https://www.googleapis.com/auth/analytics.readonly",
]

def get_credentials():
    from google.oauth2.credentials import Credentials
    from google_auth_oauthlib.flow import InstalledAppFlow
    from google.auth.transport.requests import Request

    creds = None
    if TOKEN_FILE.exists():
        try:
            creds = Credentials.from_authorized_user_file(str(TOKEN_FILE), SCOPES)
        except Exception:
            creds = None

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            if not CREDENTIALS_FILE.exists():
                print(f"Error: {CREDENTIALS_FILE} not found.", file=sys.stderr)
                sys.exit(1)
            flow = InstalledAppFlow.from_client_secrets_file(str(CREDENTIALS_FILE), SCOPES)
            print("\n" + "=" * 70, flush=True)
            print("🔐 Google Analytics Authorization Required", flush=True)
            print("Your browser should open automatically. If not, click the link printed below.", flush=True)
            print("=" * 70 + "\n", flush=True)
            
            creds = flow.run_local_server(
                port=0,
                open_browser=True,
                authorization_prompt_message="\n👉 Please visit this URL to authorize:\n{url}\n\nWaiting for authorization...\n"
            )

        # Save token for subsequent runs
        with open(TOKEN_FILE, "w") as token:
            token.write(creds.to_json())
        print("✅ Authorization token saved successfully!\n", flush=True)

    return creds

def auto_detect_property_id(creds, target_measurement_id="G-S7LQ0S01Y3"):
    """
    Search GA4 account summaries and data streams to find the numeric property ID
    associated with our website's measurement ID.
    """
    try:
        from google.analytics.admin import AnalyticsAdminServiceClient

        admin_client = AnalyticsAdminServiceClient(credentials=creds)
        account_summaries = admin_client.list_account_summaries()

        all_properties = []
        for account in account_summaries:
            for prop in account.property_summaries:
                prop_id = prop.property.split("/")[-1]
                all_properties.append((prop_id, prop.display_name))
                try:
                    streams = admin_client.list_data_streams(parent=prop.property)
                    for stream in streams:
                        web_stream = stream.web_stream_data
                        if web_stream and web_stream.measurement_id == target_measurement_id:
                            return prop_id, prop.display_name
                except Exception:
                    pass

        if len(all_properties) == 1:
            return all_properties[0]
        elif len(all_properties) > 1:
            return all_properties[0]
    except Exception as e:
        print(f"Note: Could not auto-detect Property ID ({e}).", file=sys.stderr)
    return None, None

def fetch_analytics(property_id, creds, days=30):
    from google.analytics.data_v1beta import BetaAnalyticsDataClient
    from google.analytics.data_v1beta.types import (
        DateRange,
        Dimension,
        Metric,
        RunReportRequest,
        OrderBy,
    )

    client = BetaAnalyticsDataClient(credentials=creds)

    print(f"\n=======================================================================")
    print(f" 📊 GA4 Analytics Report (Property: {property_id}) — Last {days} Days")
    print(f"=======================================================================\n")

    # 1. Geographic Breakdown
    geo_request = RunReportRequest(
        property=f"properties/{property_id}",
        dimensions=[
            Dimension(name="country"),
            Dimension(name="region"),
            Dimension(name="city"),
        ],
        metrics=[
            Metric(name="activeUsers"),
            Metric(name="screenPageViews"),
            Metric(name="userEngagementDuration"),
        ],
        order_bys=[
            OrderBy(metric=OrderBy.MetricOrderBy(metric_name="activeUsers"), desc=True)
        ],
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
    )

    geo_response = client.run_report(geo_request)

    print("📍 GEOLOCATION BREAKDOWN (Country / Region / City):")
    print(f"{'Country':<18} {'Region / State':<22} {'City':<20} {'Users':<8} {'Views':<8} {'Avg Time':<10}")
    print("-" * 88)

    if not geo_response.rows:
        print("No visitor data found for this period.")
    else:
        for row in geo_response.rows:
            country = row.dimension_values[0].value
            region = row.dimension_values[1].value
            city = row.dimension_values[2].value
            users = int(row.metric_values[0].value)
            views = int(row.metric_values[1].value)
            total_duration = float(row.metric_values[2].value)
            avg_time = f"{total_duration / users:.0f}s" if users > 0 else "0s"

            print(f"{country:<18} {region:<22} {city:<20} {users:<8} {views:<8} {avg_time:<10}")

    # 2. Device / Platform Breakdown
    device_request = RunReportRequest(
        property=f"properties/{property_id}",
        dimensions=[
            Dimension(name="deviceCategory"),
            Dimension(name="operatingSystem"),
            Dimension(name="browser"),
        ],
        metrics=[
            Metric(name="activeUsers"),
            Metric(name="screenPageViews"),
        ],
        order_bys=[
            OrderBy(metric=OrderBy.MetricOrderBy(metric_name="activeUsers"), desc=True)
        ],
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
    )

    device_response = client.run_report(device_request)

    print("\n💻 DEVICE & BROWSER BREAKDOWN:")
    print(f"{'Device':<15} {'OS':<18} {'Browser':<18} {'Users':<8} {'Views':<8}")
    print("-" * 72)
    for row in device_response.rows:
        device = row.dimension_values[0].value
        os_name = row.dimension_values[1].value
        browser = row.dimension_values[2].value
        users = row.metric_values[0].value
        views = row.metric_values[1].value
        print(f"{device:<15} {os_name:<18} {browser:<18} {users:<8} {views:<8}")

    # 3. Traffic Source Breakdown
    source_request = RunReportRequest(
        property=f"properties/{property_id}",
        dimensions=[
            Dimension(name="sessionSource"),
            Dimension(name="sessionMedium"),
        ],
        metrics=[
            Metric(name="activeUsers"),
            Metric(name="sessions"),
        ],
        order_bys=[
            OrderBy(metric=OrderBy.MetricOrderBy(metric_name="sessions"), desc=True)
        ],
        date_ranges=[DateRange(start_date=f"{days}daysAgo", end_date="today")],
    )

    source_response = client.run_report(source_request)

    print("\n🔗 TRAFFIC ACQUISITION / REFERRAL:")
    print(f"{'Source':<25} {'Medium':<20} {'Users':<8} {'Sessions':<8}")
    print("-" * 65)
    for row in source_response.rows:
        source = row.dimension_values[0].value
        medium = row.dimension_values[1].value
        users = row.metric_values[0].value
        sessions = row.metric_values[1].value
        print(f"{source:<25} {medium:<20} {users:<8} {sessions:<8}")
    print("\n" + "=" * 65 + "\n")

def main():
    parser = argparse.ArgumentParser(description="Fetch GA4 analytics.")
    parser.add_argument("--property-id", help="Numeric GA4 property ID (optional, will auto-detect if omitted)")
    parser.add_argument("--days", type=int, default=30, help="Number of past days to query (default: 30)")
    args = parser.parse_args()

    creds = get_credentials()

    property_id = args.property_id
    if not property_id:
        print("Discovering your GA4 Property ID...", flush=True)
        prop_id, prop_name = auto_detect_property_id(creds)
        if prop_id:
            print(f"Detected Property: {prop_name} (ID: {prop_id})", flush=True)
            property_id = prop_id
        else:
            property_id = input("\nEnter your numeric GA4 Property ID: ").strip()

    fetch_analytics(property_id, creds, days=args.days)

if __name__ == "__main__":
    main()
