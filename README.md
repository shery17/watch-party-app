# watch-party-app
A minimal-setup web application for synchronised group video watching using local video playback and WebSockets.

## Instructions to install/run
Ngrok is used to share a public, secure url of localhost to the other users.
Ngrok can be skipped if you don't need to share links to other users.

prerequisites:
- Install node and NPM
- Download ngrok.exe from https://ngrok.com/downloads/windows

1. clone repo
2. open repo in VS Code, type 'npm install' in terminal
3. run 'node server.js'
5. open ngrok.exe to open a terminal
6. run 'ngrok http 3000'
7. open the forwarded address
