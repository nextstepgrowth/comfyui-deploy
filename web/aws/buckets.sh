#!/usr/bin/env bash
# LocalStack bucket creation script (deprecated - using NCP Object Storage)
# awslocal s3 mb s3://comfyui-deploy
# awslocal s3api put-bucket-cors --bucket comfyui-deploy  --cors-configuration file:///app/web/aws/cors-config.json

# For NCP Object Storage:
# 1. Create bucket through NCP Console at https://console.ncloud.com/
# 2. Set CORS configuration through Console or use AWS CLI with NCP credentials:
# aws s3api put-bucket-cors --endpoint-url https://kr.object.ncloudstorage.com --bucket your-bucket-name --cors-configuration file://cors-config.json