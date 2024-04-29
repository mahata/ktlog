tofu_prod:
	cd tofu && tofu workspace select prod && tofu apply -var-file="tfvars/prod.tfvars"
tofu_dev:
	cd tofu && tofu workspace select dev && tofu apply -var-file="tfvars/dev.tfvars"
