# Lisk Inviter - Core

The Lisk Inviter client repository and documentation can be found [here](https://github.com/sidechain-solutions/lisk-inviter/tree/master/client).

### Prerequisites

First install the dependencies as detailed in the [Lisk SDK documentation](https://lisk.io/documentation/lisk-sdk/setup).

- Node.js
- PostgreSQL
- Python
- pm2 (recommended)

### Installation

```
git clone https://github.com/sidechain-solutions/lisk-inviter
cd lisk-inviter
npm install
```

### Run

Run the node and view logs: `node index.js | npx bunyan -o short`

Run the node as a background service:

Register name `pm2 start --name lisk-inviter index.js`

To start and stop the process:

```
pm2 start lisk-inviter
pm2 stop lisk-inviter
```

If you want the node to automatically start on (re)boot, execute the command that is generated by running:

```
pm2 save
pm2 startup
```
