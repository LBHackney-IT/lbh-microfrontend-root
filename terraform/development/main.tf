provider "aws" {
  region  = "eu-west-2"
  version = "~> 2.0"
}
terraform {
  backend "s3" {
    bucket  = "terraform-state-housing-development"
    encrypt = true
    region  = "eu-west-2"
    key     = "services/t-and-l-root-frontend/state"
  }
}
resource "aws_s3_bucket" "frontend-bucket-development" {
  bucket = "lbh-housing-tl-root-frontend-development.hackney.gov.uk"
  acl    = "private"
  versioning {
    enabled = true
  }
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}
module "cloudfront-development" {
  source = "github.com/LBHackney-IT/aws-hackney-common-terraform.git//modules/cloudfront/s3_distribution"
  s3_domain_name = aws_s3_bucket.frontend-bucket-development.bucket_regional_domain_name
  origin_id = "mtfh-t-and-l-root-frontend"
  s3_bucket_arn = aws_s3_bucket.frontend-bucket-development.arn
  s3_bucket_id = aws_s3_bucket.frontend-bucket-development.id
  orginin_access_identity_desc = "T&L root frontend cloudfront identity"
  cname_aliases = ["manage-my-home-development.hackney.gov.uk"]
  environment_name = "development"
  cost_code= "B0811"
  project_name= "MTFH Tenants and Leaseholders"
  use_cloudfront_cert = false
  hackney_cert_arn = "arn:aws:acm:us-east-1:364864573329:certificate/d903d9e2-c3da-482b-8768-916ec09e461f"
}
