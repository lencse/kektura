.PHONY: test dev watch test lint test_ts test test_compiled
.PHONY: lint_fix watch_test verify compile clean watch_ts watch_data

BIN=node_modules/.bin

public: build/compile src views build/data
	$(BIN)/webpack

clean:
	rm -rf public build

node_modules: package.json yarn.lock
	yarn && touch node_modules

build/compile: src config node_modules
	make compile && touch build/compile

build/data:
	mkdir build/data && node bin/write-data.js

watch: node_modules
	make clean && make build/compile && make build/data && ( \
		$(BIN)/nodemon bin/write-data.js & \
		$(BIN)/tsc -p . --outDir ./build/compile --watch --pretty & \
		$(BIN)/webpack-dev-server \
	)

watch_data:
	make watch_ts & $(BIN)/nodemon bin/write-data.js

test_ts: node_modules src
	$(BIN)/jest --verbose ; mv test-report.xml logs/jest

test: test_ts test_compiled

verify: lint test

watch_ts:
	$(BIN)/tsc -p . --outDir ./build/compile --watch --pretty

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
