resource "aws_vpc" "prod" {
  cidr_block = "10.0.0.0/16"
  enable_dns_hostnames = true
}

resource "aws_internet_gateway" "prod" {
  vpc_id = aws_vpc.prod.id
}

resource "aws_route" "prod_internet" {
  route_table_id = aws_vpc.prod.main_route_table_id
  destination_cidr_block = "0.0.0.0/0"
  gateway_id = aws_internet_gateway.prod.id
}

resource "aws_subnet" "prod" {
  vpc_id = aws_vpc.prod.id
  availability_zone = "us-west-2a"
  cidr_block = "10.0.0.0/18"
  map_public_ip_on_launch = true
  depends_on = [aws_internet_gateway.prod]
}

resource "aws_security_group" "allow_http_and_ssh" {
  name = "allow_http"
  description = "Allow http access to the app"
  vpc_id = aws_vpc.prod.id

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
