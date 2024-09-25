# Phony targets (targets that don't represent files)
.PHONY: run deploy

# Default target
all: run

# Run the development server
run:
	npm run start

# Build and deploy the project
deploy:
	npm run build && npm run deploy