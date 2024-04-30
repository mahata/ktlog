resource "aws_subnet" "public_1" {
  vpc_id                  = var.vpc_id
  cidr_block              = var.public1_cidr_block
  availability_zone       = var.availability_zone
  map_public_ip_on_launch = true

  tags = var.common_tags
}

resource "aws_route_table_association" "public_1" {
  subnet_id      = aws_subnet.public_1.id
  route_table_id = var.public_route_table_id
}

resource "aws_subnet" "private_1" {
  vpc_id            = var.vpc_id
  cidr_block        = var.private1_cidr_block
  availability_zone = var.availability_zone

  tags = var.common_tags
}
