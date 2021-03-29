resource "aws_s3_bucket" "frontend-bucket-production" {
  bucket = "lbh-housing-root-config-production.hackney.gov.uk"
  acl    = "public-read"
  versioning {
    enabled = true
  }
    website {
    index_document = "index.html"
    error_document = "error.html"
  }
}