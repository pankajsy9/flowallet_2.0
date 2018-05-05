FloWallet
--------

FloWallet is a simple wallet which can be used to send FLO with comments, see the transaction history and wallet balance.
For login public key is to be used.


How to install:

    # required to compile certain files
    npm install -g handlebars typescript
    git clone https://github.com/someguy123/FloVault.git

    # install dependancies in the repo dir
    cd FloWallet
    npm install

    # compile required files
    bash build.sh

    # run server
    node ./bin/www



Compile all handlebars partials for client rendering (cd /public):

    handlebars partials/ -f assets/js/hbpartials.js
