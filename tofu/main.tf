terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 5.46.0"
    }
  }

  backend "s3" {
    bucket = "ktlog-tf-state"
    key = "tofu.tfstate"
    region = var.aws_region
  }
}

provider "aws" {
  region = var.aws_region
}

locals {
  project = "ktlog"

  common_tags = {
    Environment = var.environment
    Project = local.project
  }
}

resource "aws_vpc" "main" {
  cidr_block = var.base_cidr_block
  instance_tenancy = "default"

  tags = local.common_tags
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = local.common_tags
}

resource "aws_route_table" "igw" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = local.common_tags
}

resource "aws_subnet" "public_1" {
  vpc_id = aws_vpc.main.id
  cidr_block = "10.1.0.0/23"
  availability_zone = "ap-northeast-1a"
  map_public_ip_on_launch = true

  tags = local.common_tags
}

resource "aws_route_table_association" "public_1" {
  subnet_id = aws_subnet.public_1.id
  route_table_id = aws_route_table.igw.id
}

resource "aws_subnet" "private_1" {
  vpc_id = aws_vpc.main.id
  cidr_block = "10.1.8.0/22"
  availability_zone = "ap-northeast-1a"

  tags = local.common_tags
}

resource "aws_eip" "main_ngw_public_1" {
  domain = "vpc"
}

resource "aws_nat_gateway" "public_1" {
  subnet_id = aws_subnet.public_1.id
  allocation_id = aws_eip.main_ngw_public_1.id

  tags = local.common_tags
}
