FloWallet
---------

FloWallet can only be used to send FLO with comments, see the transaction history and wallet balance.


Installation:

Windows OS users have to run the commands present inside the shell script.

Below are the steps for Linux =>

1. In the terminal reach the directory where you want the FloWallet files to be downloaded and then run the below command.

   git clone https://github.com/pankajsy9/flowallet.git
   
   A new directory flowallet will be created.

2. Run below commands => 

   cd flowallet

   sudo npm install

   bash build.sh             (Shell script having compilation and browserification command)

4. Run server

   node ./bin/www


Open http://localhost:3000/ in your browser to access the wallet.

Make sure flod is running.



For login use the following key =>

0461cfb5d85f918d3814de12bda54d452ab1756395125da6cd24fe71c6b7ef8336d2e8e7a4b0f7204969195718bb14f98d9806cfa6a8eecd6a8daf178703c429de

