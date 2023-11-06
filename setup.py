import os
import sys
if os.name=="nt":
    print("Linux Only")
    sys.exit(1)

import requests
import random
import time
import subprocess

CONFIG_DB_URI = "mongodb://localhost:27017" # Standart MongoDB host
CONFIG_DB_NAME = "packages_db" # Collection Name
CONFIG_DB_COLLECTION_NAME="packages"
CONFIG_PORT = 3000 # Port für den Webserver
CONFIG_API_KEY = "m347" # API-Key für die REST API abfragen

if not os.path.exists(".env"):

    with open(".env","w") as f:
        f.write(f"""DB_URI={CONFIG_DB_URI}
DB_NAME={CONFIG_DB_NAME}
DB_COLLECTION_NAME={CONFIG_DB_COLLECTION_NAME}
PORT={CONFIG_PORT}
API_KEY={CONFIG_API_KEY}""")
        f.close()


commands = [
    "sudo docker-compose down",
    "sudo docker-compose build",
    "sudo docker-compose up -d"
]


for command in commands:
    os.system(command)

print("Commands executed successfully.")

print("\nWaiting for Container to load\n")

offline = True
while offline:
    try:
        containers = subprocess.check_output(["docker", "ps"]).decode("utf-8").splitlines()
        for cont in containers:
            try:
                if "web-service" in cont:
                    container = cont.split(" ")[-1]
            except ValueError as e:
                continue

        logs = subprocess.check_output(["docker", "logs", container]).decode("utf-8").split("\n")
        for i in logs:
            if i=="Connected to DB":
                offline=False
                print("Webserver Online und ready")
        time.sleep(5)
    except subprocess.CalledProcessError as e:
        print(f"Error: {e}")
       
def generate_random_string(length):
  chars = "abcdefghijklmnopqrstuvwxyz"
  string = ""
  for i in range(length):
    string += random.choice(chars)
  return string

def genPayload():
    payload = {
        "plz": str(random.randint(9000,9999)),
        "ort": generate_random_string(random.randint(7, 18)),
        "adresse": f"{generate_random_string(random.randint(4, 12))}strasse {random.randint(1,50)}",
        "gewicht": str(random.random()*10)[0:3]
    }
    return payload

headers = {
    "Content-Type": "application/json"
}

with open(".env","r") as f:
    values = f.readlines()
    for keys in values:
        if "API_KEY" in keys:
            apiKey=keys.split("=")[-1]
    for ports in values:
        if "PORT" in ports:
            port=ports.split("=")[-1]
    f.close()

if len(requests.get(f"http://localhost:{port}/data/{apiKey}").json())==0:
    print("\nSending random Data...")
    for i in range(50):
        response = requests.post(f"http://localhost:{port}/data/", json=genPayload(),headers=headers)
        if response.status_code == 201:
            print(f"Request {i} sent successfully. ID: {response.json()['_id']}, PLZ: {response.json()['plz']}")
        else:
            print("Request failed with status code:", response.status_code)

print("Setup Finished Website running on localhost:"+port)