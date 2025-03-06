provider "aws" {
  region = "us-east-1"
}

variable "existing_key_pair" {
  default = "jenkins-key"  # Replace with your actual key pair name
}

resource "aws_instance" "react_app" {
  ami             = "ami-011899242bb902164"
  instance_type   = "t2.micro"
  key_name      = var.existing_key_pair
  security_groups = [aws_security_group.react_sg.name]

  tags = {
    Name = "ReactApp-Server"
  }
}

resource "aws_security_group" "react_sg" {
  name        = "react-sg"
  description = "Allow SSH & HTTP access"

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

    ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

    ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

   egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "public_ip" {
  value = aws_instance.react_app.public_ip
}
