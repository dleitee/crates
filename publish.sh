#!/bin/bash

clear

echo "Running babel...\n"

mkdir dist

./node_modules/.bin/babel src -d dist

echo "\nMoving files to dist..."

cp package.json dist/package.json
cp readme.md dist/readme.md
cp yarn.lock dist/yarn.lock

cd dist

echo "\nPublishing..."

npm publish

echo "\nRemoving files..."
cd ..

rm -rf dist

echo "\nDone!"
