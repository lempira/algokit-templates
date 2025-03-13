.PHONY: help
help: ## Display this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@awk -F '##' '/^[a-zA-Z_-]+:.*?##/ { printf "  %-15s %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

clean-examples: ## Remove all generated example directories and their contents
	find examples/ -mindepth 1 -type d -exec rm -rf {} +

create-examples: ## Create example projects. Optional: use 'id=<example-id>' to create specific example, 'bootstrap=true' to bootstrap projects
	python ./scripts/create_examples.py $(if $(id),$(id),) --bootstrap=$(if $(bootstrap),$(bootstrap),False)