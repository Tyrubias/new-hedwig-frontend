BUILD_DIR := ./build
DEPS := ./node_modules
PUBLIC := $(shell find ./public -type f -print)
SOURCE := $(shell find ./src -type f -print)

.PHONY: deps fix

build: $(DEPS) $(PUBLIC) $(SOURCE)
	rm -rf build
	npm run build

deps: $(DEPS)

$(DEPS):
	npm ci

clean:
	-rm -rf $(BUILD_DIR)

cleanall: clean
	-rm -rf $(DEPS)

fix:
	-npm run lint
	-npm run lint:css
	-npm run format

test:
	-npm test -- --watchAll=false --passWithNoTests
