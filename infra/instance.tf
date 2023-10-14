resource "aws_instance" "server" {
  ami = "ami-07d07d65c47e5aa90"
  instance_type = "t2.micro"
  associate_public_ip_address = true
  subnet_id = aws_subnet.prod.id
  security_groups = [aws_security_group.allow_http_and_ssh.id]
  key_name = "mati-test"
}
