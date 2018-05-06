#!/bin/bash

echo "Compiling handlebars partials"
handlebars views/partials/ -f public/assets/js/hbpartials.js

echo "Browserifying wallet.js"
browserify public/assets/js/wallet.js -o public/assets/js/walletbundle.js
