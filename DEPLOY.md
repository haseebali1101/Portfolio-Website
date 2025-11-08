# Google Cloud Deployment Guide

This guide will help you deploy your portfolio website to Google Cloud Platform (Google Cloud Run).

## Prerequisites

1. Google Cloud Account
2. Google Cloud SDK (gcloud CLI) installed
3. Docker installed locally (for testing)

## Deployment Options

### Option 1: Deploy using Google Cloud Run (Recommended)

#### Step 1: Set up Google Cloud Project

```bash
# Login to Google Cloud
gcloud auth login

# Set your project ID
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

#### Step 2: Build and Deploy

```bash
# Build the Docker image
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/portfolio-website

# Deploy to Cloud Run
gcloud run deploy portfolio-website \
  --image gcr.io/YOUR_PROJECT_ID/portfolio-website \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --port 8080
```

#### Step 3: Get Your URL

After deployment, you'll receive a URL like:
```
https://portfolio-website-xxxxx-uc.a.run.app
```

### Option 2: Deploy using Cloud Build (Automated)

#### Step 1: Set up Cloud Build

```bash
# Enable Cloud Build API
gcloud services enable cloudbuild.googleapis.com

# Grant Cloud Build permissions
gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
  --member serviceAccount:YOUR_PROJECT_NUMBER@cloudbuild.gserviceaccount.com \
  --role roles/run.admin
```

#### Step 2: Connect GitHub Repository (Optional)

1. Go to Cloud Build Triggers in Google Cloud Console
2. Connect your GitHub repository
3. Create a trigger that uses `cloudbuild.yaml`
4. Push to your repository to trigger automatic deployment

#### Step 3: Manual Build Trigger

```bash
# Submit build using cloudbuild.yaml
gcloud builds submit --config cloudbuild.yaml
```

### Option 3: Local Testing

#### Test Docker Image Locally

```bash
# Build the image
docker build -t portfolio-website .

# Run the container
docker run -p 8080:8080 portfolio-website

# Visit http://localhost:8080
```

## Environment Variables (if needed)

If you need to set environment variables:

```bash
gcloud run deploy portfolio-website \
  --image gcr.io/YOUR_PROJECT_ID/portfolio-website \
  --update-env-vars KEY=VALUE
```

## Custom Domain (Optional)

1. Go to Cloud Run service in Google Cloud Console
2. Click "Manage Custom Domains"
3. Add your domain and follow the verification steps

## Monitoring and Logs

```bash
# View logs
gcloud run services logs read portfolio-website --region us-central1

# View service details
gcloud run services describe portfolio-website --region us-central1
```

## Cost Estimation

Google Cloud Run charges based on:
- CPU and memory usage
- Number of requests
- Network egress

Free tier includes:
- 2 million requests per month
- 400,000 GB-seconds of memory
- 200,000 vCPU-seconds

## Troubleshooting

### Build fails
- Check that all dependencies are in package.json
- Verify Dockerfile syntax
- Check Cloud Build logs

### Deployment fails
- Verify Cloud Run API is enabled
- Check IAM permissions
- Review Cloud Run service logs

### 404 errors on routes
- Verify nginx.conf is correctly configured
- Check that try_files directive includes /index.html

## Useful Commands

```bash
# Update deployment
gcloud run deploy portfolio-website --image gcr.io/YOUR_PROJECT_ID/portfolio-website

# Delete service
gcloud run services delete portfolio-website --region us-central1

# List services
gcloud run services list
```

