# Lisk Pixels - server

### Prerequisites

First install the dependencies as detailed in the [Lisk SDK documentation](https://lisk.io/documentation/lisk-sdk/setup.html).

- Node.js
- PostgreSQL
- Python
- pm2 (recommended)

### Installation

```
git clone https://github.com/Korben3/Lisk-Pixels
cd server
npm install
```

### Run

Run the node and view logs: `node index.js | npx bunyan -o short`

Run the node as a background service:

Register name `pm2 start --name lpx_server index.js`

After changing parts of the code you need to stop and restart the node:

```
pm2 stop lpx_server
pm2 start lpx_server
```

### Tools

The tools directory contains example scripts create a board or set a pixel.
