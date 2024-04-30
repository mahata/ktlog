output "public_subnet_id" {
  value       = aws_subnet.public_1.id
  description = "The ID of the Public Subnet"
}

output "private_subnet_id" {
  value       = aws_subnet.private_1.id
  description = "The ID of the Private Subnet"
}
