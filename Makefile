FULLPATH=`npm bin`:${PATH}

.PHONY: test coverage

start:
	PATH=${FULLPATH} \
	nodemon src/app.js

test:
	PATH=${FULLPATH} \
	jest src/ --verbose --detectOpenHandles

coverage:
	PATH=${FULLPATH} \
	jest src/ --coverage
