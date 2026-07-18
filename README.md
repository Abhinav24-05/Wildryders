# Wildryde

Wildryde is a simple Node.js cab service API with a DevOps-focused delivery flow:

- Node.js application with health and ride endpoints
- Docker containerization
- Terraform infrastructure for ECR and EKS
- Kubernetes deployment manifest
- GitHub Actions CI/CD with Trivy scanning and SBOM generation

## Run locally

```bash
npm install
npm start
```

Then open:

- http://localhost:3000/
- http://localhost:3000/health
- http://localhost:3000/drivers
- http://localhost:3000/rides

## Build container

```bash
docker build -t wildryde:local .
docker run -p 3000:3000 wildryde:local
```

## Provision infrastructure

```bash
cd terraform
terraform init
terraform apply -var='aws_region=us-east-1'
```

## Deploy to Kubernetes

```bash
kubectl apply -f kubernetes/deployment.yaml
```

## GitHub Actions secrets

Set these secrets in GitHub repository settings:

- AWS_ROLE_TO_ASSUME
- AWS_ACCOUNT_ID
