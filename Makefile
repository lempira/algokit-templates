.PHONY: help
help: ## Display this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@awk -F '##' '/^[a-zA-Z_-]+:.*?##/ { printf "  %-15s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

clean-examples: ## Remove example directories. Optional: use 'id=<example-id>' to remove specific example
	$(if $(id),\
		rm -rf examples/$(id) && echo "Removed example: $(id)",\
		find examples/ -mindepth 1 -type d -exec rm -rf {} + && echo "Removed all examples")

create-examples: ## Create example projects. Optional: use 'id=<example-id>' to create specific example, 'bootstrap=true' to bootstrap projects
	python ./scripts/create_examples.py create $(if $(id),--example_id=$(id),) $(if $(bootstrap),--bootstrap=$(bootstrap),)

bootstrap-examples: ## Bootstrap existing example projects. Optional: use 'id=<example-id>' to bootstrap specific example
	python ./scripts/create_examples.py bootstrap $(if $(id),--example_id=$(id),)

