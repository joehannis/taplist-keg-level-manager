<h1 align="center">
  <strong>Taplist Keg Level Manager</strong>
</h1>

<p align="center">
  <a href="https://hub.docker.com/r/joehannis/taplist-keg-level-manager">
    <img src="https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
  </a>
</p>

<p align="center">
  Manage your Taplist keg levels through a simple interface
</p>

#### Features

Supports metric, US imperial and British Imperial units. Buttons can be used for standard pours, or a custom amount can be entered.

#### Instructions

##### A paid subscription to [taplist.io](https://taplist.io) is required

Log into your taplist.io account and select 'Account' in the navigation bar and then 'Integrations'. Create and API key and copy it. The key you need will start with 'secret-'

Run the Taplist Keg Level Manager and enter your venue name and the API Key.

![](./taplist-keg-level-manager-first.png)

Your tap information will be populated. Enter the amount you've served from the keg in ml and the tap will be updated. Press 'Reset' to reset to the default full volume for the keg selected.

![](./taplist-keg-level-manager-main.png)

#### Build Instructions

##### Required

You will need to have [docker](https://www.docker.com) installed on your system

Create a file in a directory of your choice called ```docker-compose.yml```

Paste this into that file:

```
services:
  mongo:
    networks:
      - my-network
    image: mongo
    container_name: mongo
    ports:
      - 27017:27017

  mongo-express:
    networks:
      - my-network
    image: mongo-express
    container_name: mongo-express
    ports:
      - 8081:8081
    depends_on:
      - mongo
    restart: always
    environment:
      - ME_CONFIG_MONGODB_SERVER=mongo

  api:
    networks:
      - my-network
    image: joehannis/taplist-keg-level-manager:api-latest
    container_name: api-container
    ports:
      - "3000:3000"
    depends_on:
      - mongo

  frontend:
    networks:
      - my-network
    image: joehannis/taplist-keg-level-manager:frontend-latest
    container_name: frontend-container
    ports:
      - "4173:4173"
    environment:
      REACT_APP_API_URL: http://api-container:3000
    depends_on:
      - api

networks:
  my-network:
    driver: bridge
```
In your terminal, navigate to the file containing your ```docker-compose.yml``` and run ```docker-compose up -d```

The interface can be accessed at ```http://localhost:4173``` on your local machine or ```<your_ip_address>:4173``` from another device on the network.

#### If you use this and enjoy it, please consider [buying me a beer](https://www.buymeacoffee.com/joehannisjp) 🍺!
