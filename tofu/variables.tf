variable "environment" {
  type = string
}

variable "aws_region" {
  default = "ap-northeast-1"
}

variable "base_cidr_block" {
  description = "A /16 CIDR range definition, such as 10.1.0.0/16, that the VPC will use"
  default = "10.1.0.0/16"
}
