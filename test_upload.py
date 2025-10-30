#!/usr/bin/env python3
"""
Simple Python script to test Supabase storage upload
"""

import requests
import json
import os
from datetime import datetime

# Your Supabase configuration
SUPABASE_URL = "https://uklzphbvqfhnwqmlvckn.supabase.co"
SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1rdW9qanFocGZzbnhodGl6bXJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxNTA4OTQsImV4cCI6MjA3NTcyNjg5NH0.NRrztDE4Zc7d2GPXJVGs3GWpBhmZRnzJr800lhd8NSU"

def test_storage_upload():
    """Test uploading a file to Supabase storage"""
    
    # Create a simple test file
    test_content = f"Test file created at {datetime.now()}"
    test_filename = f"test_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt"
    
    print(f"Testing upload to Supabase storage...")
    print(f"File: {test_filename}")
    print(f"Content: {test_content}")
    
    # Prepare the upload request
    upload_url = f"{SUPABASE_URL}/storage/v1/object/product-images/{test_filename}"
    
    headers = {
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "text/plain"
    }
    
    try:
        # Upload the file
        response = requests.post(
            upload_url,
            headers=headers,
            data=test_content
        )
        
        print(f"\nUpload Response:")
        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {dict(response.headers)}")
        
        if response.status_code == 200:
            print("✅ Upload successful!")
            
            # Get the public URL
            public_url = f"{SUPABASE_URL}/storage/v1/object/public/product-images/{test_filename}"
            print(f"Public URL: {public_url}")
            
            # Test downloading the file
            download_response = requests.get(public_url)
            if download_response.status_code == 200:
                print("✅ Download test successful!")
                print(f"Downloaded content: {download_response.text}")
            else:
                print(f"❌ Download test failed: {download_response.status_code}")
                
        else:
            print(f"❌ Upload failed!")
            print(f"Response: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

def test_storage_list():
    """Test listing files in the bucket"""
    
    print(f"\nTesting bucket listing...")
    
    list_url = f"{SUPABASE_URL}/storage/v1/object/list/product-images"
    
    headers = {
        "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
        "Content-Type": "application/json"
    }
    
    try:
        response = requests.post(
            list_url,
            headers=headers,
            json={"limit": 10}
        )
        
        print(f"List Response:")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            files = response.json()
            print(f"✅ Found {len(files)} files:")
            for file in files:
                print(f"  - {file.get('name', 'Unknown')}")
        else:
            print(f"❌ List failed: {response.text}")
            
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    print("🚀 Supabase Storage Test")
    print("=" * 50)
    
    test_storage_upload()
    test_storage_list()
    
    print("\n" + "=" * 50)
    print("Test completed!")

