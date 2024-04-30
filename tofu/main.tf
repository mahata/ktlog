terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.46.0"
    }
  }

  backend "s3" {
    bucket = "ktlog-tf-state"
    key    = "tofu.tfstate"
    region = "ap-northeast-1"
  }
}

provider "aws" {
  region = var.aws_region
}

locals {
  project = "ktlog"

  common_tags = {
    Environment = var.environment
    Name        = "${local.project}-${var.environment}"
    Project     = local.project
  }
}

module "networking" {
  source           = "./modules/networking"
  base_cidr_block  = var.base_cidr_block
  environment      = var.environment
  project          = local.project
  common_tags      = local.common_tags
  public_subnet_id = module.subnet.public_subnet_id
}

module "subnet" {
  source                = "./modules/subnet"
  public1_cidr_block    = "10.1.0.0/19"
  private1_cidr_block   = "10.1.32.0/19"
  availability_zone     = "ap-northeast-1a"
  common_tags           = local.common_tags
  public_route_table_id = module.networking.public_route_table_id
  vpc_id                = module.networking.vpc_id
}

module "eb" {
  source            = "./modules/eb"
  environment       = var.environment
  project           = local.project
  common_tags       = local.common_tags
  vpc_id            = module.networking.vpc_id
  public_subnet_id  = module.subnet.public_subnet_id
  private_subnet_id = module.subnet.private_subnet_id
  acm_cert_arn      = module.domain.acm_cert_arn
}

module "domain" {
  source        = "./modules/domain"
  app_subdomain = var.app_subdomain
  common_tags   = local.common_tags
}
