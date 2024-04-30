data "aws_route53_zone" "zone" {
  name = var.root_domain_name
}

resource "aws_acm_certificate" "cert" {
  domain_name               = "${var.app_subdomain}.${var.root_domain_name}"
  validation_method         = "DNS"
  subject_alternative_names = [var.root_domain_name]

  tags = var.common_tags
}