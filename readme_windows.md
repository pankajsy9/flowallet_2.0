FloWallet
---------

FloWallet can only be used to send FLO with comments, see the transaction history and wallet balance.


**Installation:**

1. In the command prompt reach the directory where you want the FloWallet files to be downloaded and then run the below command.

   `git clone https://github.com/pankajsy9/flowallet.git`
   
   A new directory flowallet will be created.

2. Enter the directory.  

   `cd flowallet`

3. Run below commands.

   `sudo npm install`

   `handlebars views/partials/ -f public/assets/js/hbpartials.js`

   `browserify public/assets/js/wallet.js -o public/assets/js/walletbundle.js`

3. Run server

   `node ./bin/www`


Open http://localhost:3000/ in your browser to access the wallet.

Make sure flod is running. If flocore wallet is installed then flod will be running in the background.
