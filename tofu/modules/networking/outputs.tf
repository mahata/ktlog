output "vpc_id" {
  value       = aws_vpc.main.id
  description = "The ID of the VPC"
}

output "internet_gateway_id" {
  value       = aws_internet_gateway.main.id
  description = "The ID of the Internet Gateway"
}

output "public_route_table_id" {
  value       = aws_route_table.igw.id
  description = "The ID of the Public Route Table"
}
