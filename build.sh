#!/bin/bash

echo "Browserifying wallet.js"
browserify public/assets/js/wallet.js -o public/assets/js/walletbundle.js
