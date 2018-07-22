Flowallet is a web browser based software used for sending FLO (crypto coins) into the crypto account (address) of another user. This is called a transaction.
You can also add comments to a transaction.

User has to open the software using a URL in a web browser. Login is performed after that. Currently the credentials are hardcoded.

History of transactions can be seen. There is no limit to the history.

Available balance of FLO can also be seen in the browser.

Flowallet connects to the local flocore wallet and communicates with it to perform transaction and data fetch.

Flowallet is accessed through URL. To make this possible NodeJS is used.
The server is in NodeJS. This allows us to use bitcoin JS libraries on the server side. On top of this, NodeJS is well known enough that others can easily contribute.


Installation Prerequisites for Windows
---------------------------------------

Following softwares are required for the installation process :

		Flocore wallet, Github, NPM, NodeJS


Flocore wallet exe can be downloaded from the following link:
	https://www.flo.cash/
	
After installing flocore from the exe start the flo daemon so that the wallet service starts running in the background.

Github can be installed from following link :
	https://git-scm.com/download/win
	
NodeJS and NPM :  http://blog.teamtreehouse.com/install-node-js-npm-windows


Installation for Windows
-------------------------

Flowallet can be installed by running window.bat from command prompt. File is present in Installers folder.



Installation Prerequisites for Ubuntu
---------------------------------------

Following softwares are required for the installation process :

		Flocore wallet, Github, NPM, NodeJS


Flocore wallet exe can be downloaded from the following link:
	https://www.flo.cash/
	
After installing flocore from the exe start the flo daemon so that the wallet service starts running in the background.

Github can be installed from following link :
	https://git-scm.com/download/linux
	
NodeJS and NPM :  https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-16-04


Installation for Ubuntu
-------------------------

Flowallet can be installed by running linux.sh from the terminal. File is present in Installers folder.



How to use ?
--------------

After successfully performing the installation open the link http://localhost:3000 in browser.

A login page is loaded. User has to put a valid public key and press submit button.

For convenience a default public key is hardcoded in the login page. So just press submit and the wallet will be loaded.
