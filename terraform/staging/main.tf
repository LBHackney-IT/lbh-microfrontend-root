provider "aws" {
  region  = "eu-west-2"
  version = "~> 2.0"
}
terraform {
  backend "s3" {
    bucket  = "terraform-state-housing-staging"
    encrypt = true
    region  = "eu-west-2"
    key     = "services/t-and-l-root-frontend/state"
  }
}
resource "aws_s3_bucket" "frontend-bucket-staging" {
  bucket = "lbh-housing-tl-root-frontend-staging.hackney.gov.uk"
  acl    = "private"
  versioning {
    enabled = true
  }
  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}
module "cloudfront-staging" {
  source = "github.com/LBHackney-IT/aws-hackney-common-terraform.git//modules/cloudfront/s3_distribution"
  s3_domain_name = aws_s3_bucket.frontend-bucket-staging.bucket_regional_domain_name
  origin_id = "mtfh-t-and-l-root-frontend"
  s3_bucket_arn = aws_s3_bucket.frontend-bucket-staging.arn
  s3_bucket_id = aws_s3_bucket.frontend-bucket-staging.id
  orginin_access_identity_desc = "T&L root frontend cloudfront identity"
  cname_aliases = ["manage-my-home-staging.hackney.gov.uk"]
  environment_name = "staging"
  cost_code = "B0811"
  project_name = "MTFH Tenants and Leaseholders"
  use_cloudfront_cert = false
  hackney_cert_arn = "arn:aws:acm:us-east-1:087586271961:certificate/baffa134-abb5-4b71-b84f-013e9dd2d044"
  compress = true
}
