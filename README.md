# Cinema Tickets Service

A simple microservice designed to handle the booking of cinema tickets.

# Contents

1. [Spinup Instructions](##Spinup-Instructions)
2. [Testing](##Testing)
3. [Architecture](##Architecture)

## Spinup Instructions

To run cinema tickets service you must be using a machine with node installed. Once installed, dependencies will need to be added using the command `npm i` ran in a terminal from the project root

After dependencies have been installed, in a terminal from the project root run `npm start` to start the app or alternatively run `npm run dev` to start the app via nodemon which will watch for code changes and automatically restart the app

## Testing

There are two testing scripts, `npm run unit-tests` will run only the unit tests. `npm run system-tests` will run only the system tests.
To run both, `npm t` will run both sets of tests sequentially.
