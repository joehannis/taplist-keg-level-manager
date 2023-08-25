<p align="center">
  <strong>Taplist Keg Level Manager</strong>
</p>

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

In your terminal, run ```docker pull joehannis/taplist-keg-level-manager:latest```

#### If you use this and enjoy it, please consider [buying me a beer](https://www.buymeacoffee.com/joehannisjp) 🍺!
