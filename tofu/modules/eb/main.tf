resource "aws_elastic_beanstalk_application" "ktlog" {
  name        = "${var.project}-${var.environment}"
  description = "${var.project}-${var.environment}"
  tags        = var.common_tags
}

resource "aws_elastic_beanstalk_environment" "ktlog" {
  name                = "${var.project}-${var.environment}"
  application         = aws_elastic_beanstalk_application.ktlog.name
  solution_stack_name = "64bit Amazon Linux 2023 v4.2.3 running Corretto 21"
  tier                = "WebServer"

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "InstanceType"
    value     = "t2.micro" # TODO
  }

  setting {
    namespace = "aws:autoscaling:launchconfiguration"
    name      = "IamInstanceProfile"
    value     = "eb-instance-profile"  # Created manually on AWS Console
  }

  setting {
    namespace = "aws:elasticbeanstalk:application:environment"
    name      = "SPRING_PROFILES_ACTIVE"
    value     = var.environment
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "VPCId"
    value     = var.vpc_id
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "Subnets"
    value     = join(",", [var.private_subnet_id])
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment"
    name      = "LoadBalancerType"
    value     = "application"
  }

  setting {
    namespace = "aws:ec2:vpc"
    name      = "ELBSubnets"
    value     = join(",", [var.public_subnet_id])
  }

  setting {
    namespace = "aws:elbv2:listener:default"
    name      = "ListenerEnabled"
    value     = false
  }

  setting {
    namespace = "aws:elbv2:listener:443"
    name      = "ListenerEnabled"
    value     = true
  }

  setting {
    namespace = "aws:elbv2:listener:443"
    name      = "Protocol"
    value     = "HTTPS"
  }

  setting {
    namespace = "aws:elbv2:listener:443"
    name      = "SSLCertificateArns"
    value     = var.acm_cert_arn
  }

  setting {
    namespace = "aws:elbv2:listener:443"
    name      = "SSLPolicy"
    value     = "ELBSecurityPolicy-2016-08"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment:process:default"
    name      = "HealthCheckPath"
    value     = "/"
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment:process:default"
    name      = "Port"
    value     = 80
  }

  setting {
    namespace = "aws:elasticbeanstalk:environment:process:default"
    name      = "Protocol"
    value     = "HTTP"
  }
}