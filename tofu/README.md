# Infra automation with OpenTofu

`tofu/` directory stores OpenTofu files to automate provisioning the AWS infrastructure.

## How to run OpenTofu

On the project root (meaning, one level higher than this README file), type the following command:

```
# (for dev)
$ make tofu_dev

# (for prod)
$ make tofu_prod
```

If you haven't run `tofu init` yet, you might need to do it beforehand.

## Future plan

To be highly available, it would be better to deploy resources in 3 availability zones for both public and private subnets. Here's the plan for the CIDR ranges for each subnet.

* Public Subnets: 10.1.0.0/19, 10.1.64.0/19, 10.1.128.0/19
* Private Subnets: 10.1.32.0/19, 10.1.96.0/19, 10.1.160.0/19

As of this writing, only the first public and private subnet are in the automation script, just to reduce cost of operation.