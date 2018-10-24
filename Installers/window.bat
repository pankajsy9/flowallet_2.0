@echo off

git clone https://github.com/pankajsy9/flowallet.git

cd flowallet

sudo npm install

browserify public/assets/js/wallet.js -o public/assets/js/walletbundle.js

node ./bin/www
