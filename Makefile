.PHONY: test
start:
	npm start
test:
	npm run test
upgrade_node:
	brew update
  brew upgrade node
  npm install -g npm
