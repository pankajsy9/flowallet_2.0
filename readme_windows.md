FloWallet
---------

FloWallet can only be used to send FLO with comments, see the transaction history and wallet balance.


Installation:

1. In the command prompt reach the directory where you want the FloWallet files to be downloaded and then run the below command.

   git clone https://github.com/pankajsy9/flowallet.git
   
   A new directory flowallet will be created.

2. Enter the directory.  

   cd flowallet

3. Run below commands.

   sudo npm install

   handlebars views/partials/ -f public/assets/js/hbpartials.js

   browserify public/assets/js/wallet.js -o public/assets/js/walletbundle.js

3. Run server

   node ./bin/www


Open http://localhost:3000/ in your browser to access the wallet.

Make sure flod is running.



For login use the following key =>

0461cfb5d85f918d3814de12bda54d452ab1756395125da6cd24fe71c6b7ef8336d2e8e7a4b0f7204969195718bb14f98d9806cfa6a8eecd6a8daf178703c429de

