#!/bin/sh
#
#Setup the development environment for development for Linuxdex

echo "Installing NPM Packages..."
npm install
echo "done."

echo "Setting up githooks for local repository..."
git config --local core.hooksPath .githooks/
echo "done."

echo "Your development environment should be ready!"
echo "Run 'npm start' to run the development application"
