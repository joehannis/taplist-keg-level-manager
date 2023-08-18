# Taplist Keg Level Manager

### Manage your Taplist keg levels through a simple interface

## Features

Supports metric, US imperial and British Imperial units. Buttons can be used for standard pours, or a custom amount can be entered.

## Instructions

### A paid subscription to [taplist.io](http://taplist.io) is required

Log into your taplist.io account and select 'Account' in the navigation bar and then 'Integrations'. Create and API key and copy it. The key you need will start with 'secret-'

Run the Taplist Keg Level Manager and enter your venue name and the API Key.

![](./taplist-keg-level-manager-first.png)

Your tap information will be populated. Enter the amount you've served from the keg in ml and the tap will be updated. Press 'Reset' to reset to the default full volume for the keg selected.

![](./taplist-keg-level-manager-main.png)

## Build Instructions

#### Required

You will need to install node.js and npm for this to run. This can be done via [homebrew](https://brew.sh/) (macOS) with `brew install node`. For linux, use `sudo apt-get install nodejs npm` Please see this [link](https://nodejs.org/en/download/package-manager) for other systems.

This is designed to be run locally on your machine.

- Clone the repo onto your local machine
- Open a terminal window, and `cd` into the repo
- Run `chmod +x ./start.sh`
- Run `./start.sh`
- You can stop the manager with `./stop` when in the repo directory

#### If you use this and enjoy it, please consider [buying me a beer](https://www.buymeacoffee.com/joehannisjp) 🍺!
