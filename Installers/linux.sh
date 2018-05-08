#!/bin/bash

git clone https://github.com/pankajsy9/flowallet.git

cd flowallet

sudo npm install

echo "Browserifying wallet.js"
browserify public/assets/js/wallet.js -o public/assets/js/walletbundle.js

node ./bin/www &

echo "Open the link http://localhost:3000 in browser"
