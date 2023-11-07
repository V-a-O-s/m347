#!/bin/bash

# Update and install required packages
sudo apt-get update
sudo apt-get install -y curl dirmngr apt-transport-https lsb-release ca-certificates docker.io docker-compose git

# Set up Node.js repository
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg
NODE_MAJOR=16
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt-get update
sudo apt-get install nodejs -y

# Clone a Git repository and perform other actions
git clone https://github.com/V-a-O-s/m347.git
mv m347 m347_LB
cd m347_LB
npm init -y
npm install express mongoose path dotenv

# Run the setup script
sudo python3 setup.py
