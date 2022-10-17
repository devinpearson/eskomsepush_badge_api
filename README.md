# Eskomsepush status badge

This is a fun project to create a physical repesentation of the loadshedding schedule. its still a work in progress and open to suggestions or improvements.

![pcb front with image](/images/front_with_logo.png)

![GitHub](https://img.shields.io/github/license/devinpearson/eskomsepush_badge_api)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=round-square)](https://github.com/devinpearson/eskomsepush_badge_api/pulls)

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/devinpearson/programmable-banking-sim/tree/main)
### Installation
Before installing, [download and install Node.js](https://nodejs.org/en/download/).

```bash
git clone https://github.com/devinpearson/eskomsepush_badge_api.git
cd eskomsepush_badge_api
```
```bash
npm install
```

### Usage
To start the server, run the following
```bash
npm start
```

This will start the simulator on http://localhost:3000

### badge setup
The badge requires a firebeetle esp32 module. The firmware can be found in board/sketch. you will need to set your wifi details.

### badge pcb files
The badge files are present if anyone wants to make changes or send them off to a pcb fab. JLCPCB is a great option.

![pcb front 3d](/images/front1.png)

![pcb back 3d](/images/back.png)