.PHONY: test dev watch test lint test_ts test test_compiled
.PHONY: lint_fix watch_test verify compile clean

BIN=node_modules/.bin

public: build/compile src build/views build/svg
	$(BIN)/webpack

clean:
	rm -rf public build

node_modules: package.json yarn.lock
	yarn && touch node_modules

build/compile: src config node_modules
	make compile && touch build/compile

build/svg:
	mkdir build/svg && cp _svg/test.svg build/svg

watch: node_modules
	make clean && make build/compile && ./compile-views --dev && \
	make build/svg && ( \
		$(BIN)/tsc -p . --outDir ./build/compile --watch --pretty & \
		$(BIN)/webpack --watch & \
		./compile-views --watch & \
		$(BIN)/webpack-dev-server \
	)

test_ts: node_modules src
	$(BIN)/jest --verbose ; mv test-report.xml logs/jest

test: test_ts test_compiled

verify: lint test

test_compiled: build/compile node_modules
	$(BIN)/jest --config jest.config.build.js

lint: node_modules
	$(BIN)/tslint -c tslint.json -p .

lint_fix: node_modules
	$(BIN)/tslint -c tslint.json --fix -p .

dev: lint_fix verify

watch_test: node_modules
	$(BIN)/jest --config jest.config.js --watch

compile:
	$(BIN)/tsc -p . --outDir ./build/compile

build/views: node_modules views
	./compile-views && touch build/views
