default: build

clean:
	rm -rf output/*
	rm -rf public/*

serve:
	$(MAKE) clean
	punch s

build:
	$(MAKE) clean
	punch g
	grunt build

deploy:
	$(MAKE) build
	firebase deploy

