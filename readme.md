# Rep
**Rep** is a blockchain built using Cosmos SDK and Tendermint and created with [Ignite CLI](https://ignite.com/cli). Functioning as a rollup chain, it operates seamlessly on Celestia.

## Overview
Rep allows users to create their own identities, update them and '+rep' or 'like' other users, thereby enhancing their reputation. The reputation of a user is determined by the number of 'likes' they receive. A comprehensive list of all identities within the chain can also be viewed.

## Features

* Users have the capability to create their own identity on the Rep chain.
* The identity can be customized with a name and description. Moreover, the creator retains the power to update the identity information at any point.
* Once an identity has been established, users can enhance other user's reputation or '+rep' by 'like' other users.
* The reputation of a user can be gauged by the count of 'likes' they have garnered.
* A comprehensive list of all identities within the chain is also accessible for viewing.

## Pre-requisites
* You have installed [Go](https://golang.org/doc/install) version 1.19 or higher
* You have installed Ignite CLI `v0.25.1`. 

You can install it by running the following commands:
```bash
git clone https://github.com/ignite/cli.git
cd cli && git checkout v0.25.1
make install
```
* You have installed jq.

You can install it by running the following commands:
```bash
apt update
apt install jq -y
```



## Start on local devnet

### Run local devnet using docker
    
```bash
docker run --platform linux/amd64 -p 26650:26657 -p 26659:26659 ghcr.io/rollkit/local-celestia-devnet:v0.9.1
```
This will start a local devnet, the rpc port is 26650, gateway api port is 26659. Wait few seconds till it get 3 blocks+
### Start rep chain
```bash
bash init-local.sh
```
## Start on blockspacerace testnet
If you are running testnet on local machine
```
bash init.sh
```

If you are running testnet on remote machine
```
bash init.sh <your light node gateway url>
```
e.g. `http://x.x.x.x:26659`
**Note**: Ensure that the account of your light node has enough balance to pay PFB transactions.

### Examples

#### Create an identity
```bash
repd tx rep create-user  rep-key hello  --from rep-key --keyring-backend test --chain-id rep-1 -y

```
This creates an identity with uid as 0. To query this identity, run:

```bash
repd query rep show-user 0

user:
  description: hello
  name: rep-key
  point: "0"
  uid: "0"
  wallet: rep1t0zgm4weu59uxmp22f0qedfft5l0djgt73lak9
```
**Note**: One address can only create one identity, Attempting to create another identity using the same address will fail.


#### Update an identity
```bash
 repd tx rep  update-user  rep-key "updated my user" 0  --from rep-key --keyring-backend test --chain-id rep-1 -y
```
To query the updated identity, run:
```bash
repd query rep show-user 0

user:
  description: updated my user
  name: rep-key
  point: "0"
  uid: "0"
  wallet: rep1t0zgm4weu59uxmp22f0qedfft5l0djgt73lak9
```
**Note**: Only the owner of the identity can update it. Attempting to update an identity using a different address will fail.

Try to update the identity using a different address:
```bash
repd tx rep  update-user  rep-key "updated my user" 0  --from rep-key-2 --keyring-backend test --chain-id rep-1 -y

code: 0
codespace: ""
data: ""
events: []
gas_used: "0"
gas_wanted: "0"
height: "0"
info: ""
logs: []
raw_log: '[]'
timestamp: ""
tx: null
txhash: 85C1F4957E79EA5386F16156E1D858555F6EAC51DEDA063CF862114032C0F022

repd query tx 85C1F4957E79EA5386F16156E1D858555F6EAC51DEDA063CF862114032C0F022

code: 4
codespace: sdk
data: ""
events:
- attributes:
  - index: true
    key: ZmVl
    value: null
  - index: true
    key: ZmVlX3BheWVy
    value: cmVwMWZrcThqeWtlOWF4eGMydTA0NWsycDM1cmVyY2dudWo4MmVscm55
  type: tx
- attributes:
  - index: true
    key: YWNjX3NlcQ==
    value: cmVwMWZrcThqeWtlOWF4eGMydTA0NWsycDM1cmVyY2dudWo4MmVscm55LzA=
  type: tx
- attributes:
  - index: true
    key: c2lnbmF0dXJl
    value: bklqazZyK0hyYXpiZDhJK254c0liSmFMWnJmZDFJaDBxY3BQYUkzRUhmRTNBQlhUWTZyOU9BQTBVM0cyT0sxdFpFNHc5TVB2RnF3alpuL1dIVWIrMUE9PQ==
  type: tx
gas_used: "54628"
gas_wanted: "200000"
height: "16"
info: ""
logs: []
raw_log: 'failed to execute message; message index: 0: incorrect owner: unauthorized'
timestamp: "2023-05-15T21:13:04Z"
```
#### Like other user
To like another user, first create a new identity:

```bash 
repd tx rep create-user  user2 hi  --from rep-key-2 --keyring-backend test --chain-id rep-1 -y
```
rep-key-2 has created an identity, uid is 1.

We can use rep-key's identity to like rep-key-2's identity
```bash

repd tx rep like  1 --from rep-key --keyring-backend test --chain-id rep-1 -y

```
To query the identity of rep-key-2
```bash
repd query rep show-user 1

user:
  description: hi
  name: user2
  point: "1"
  uid: "1"
  wallet: rep1fkq8jyke9axxc2u045k2p35rercgnuj82elrny
```

We can see the point of user2 is 1, it means user2 has got 1 like.

**Note**: One address can only like one identity once, if you try to like the same identity again, it will fail.

Try to use rep-key to like rep-key-2's identity again
```bash

repd tx rep like  1 --from rep-key --keyring-backend test --chain-id rep-1 -y

code: 0
codespace: ""
data: ""
events: []
gas_used: "0"
gas_wanted: "0"
height: "0"
info: ""
logs: []
raw_log: '[]'
timestamp: ""
tx: null
txhash: AE8A9DCB6CD3CB6ED3D586376E9F060C89CBACCC81D5BBEB367AE024ECCC016A


repd query tx AE8A9DCB6CD3CB6ED3D586376E9F060C89CBACCC81D5BBEB367AE024ECCC016A

code: 18
codespace: sdk
data: ""
events:
- attributes:
  - index: true
    key: ZmVl
    value: null
  - index: true
    key: ZmVlX3BheWVy
    value: cmVwMXQwemdtNHdldTU5dXhtcDIyZjBxZWRmZnQ1bDBkamd0NzNsYWs5
  type: tx
- attributes:
  - index: true
    key: YWNjX3NlcQ==
    value: cmVwMXQwemdtNHdldTU5dXhtcDIyZjBxZWRmZnQ1bDBkamd0NzNsYWs5LzQ=
  type: tx
- attributes:
  - index: true
    key: c2lnbmF0dXJl
    value: S296M2pBZHdHSXVWWVJaTFI5OXltZHFLeWpnNUhOM2F5bjFVS3RXNllhUVZzOHhvMWF2SEtzTmZjdzd1S1dxZldBWWVpbEd4VkUzT2c3S1lQZ3lxL1E9PQ==
  type: tx
gas_used: "45504"
gas_wanted: "200000"
height: "46"
info: ""
logs: []
raw_log: 'failed to execute message; message index: 0: cannot like multiple times:
  invalid request'
timestamp: "2023-05-15T21:28:04Z"
```

**Note**: You cannot like your own identity.

Try to use rep-key-2 to like its own identity
```bash
repd tx rep like  1 --from rep-key-2 --keyring-backend test --chain-id rep-1 -y

code: 0
codespace: ""
data: ""
events: []
gas_used: "0"
gas_wanted: "0"
height: "0"
info: ""
logs: []
raw_log: '[]'
timestamp: ""
tx: null
txhash: C0F74FDA5335671F346C7E55E43B1F2F5CB347AB51DD90DF7355DB624D65A3CC

repd query tx C0F74FDA5335671F346C7E55E43B1F2F5CB347AB51DD90DF7355DB624D65A3CC

code: 4
codespace: sdk
data: ""
events:
- attributes:
  - index: true
    key: ZmVl
    value: null
  - index: true
    key: ZmVlX3BheWVy
    value: cmVwMWZrcThqeWtlOWF4eGMydTA0NWsycDM1cmVyY2dudWo4MmVscm55
  type: tx
- attributes:
  - index: true
    key: YWNjX3NlcQ==
    value: cmVwMWZrcThqeWtlOWF4eGMydTA0NWsycDM1cmVyY2dudWo4MmVscm55LzI=
  type: tx
- attributes:
  - index: true
    key: c2lnbmF0dXJl
    value: SmduclVBTFdyNVk0TmxGbGkxdWMralpHdlBzc2R3UHhxU2VOSFlLdG1Sd3ZteVJyam1ETzU3cTBsNUN0TnVqTitDODl2V0VwYnRrbTF4YXdXRVc2VFE9PQ==
  type: tx
gas_used: "44297"
gas_wanted: "200000"
height: "51"
info: ""
logs: []
raw_log: 'failed to execute message; message index: 0: cannot like yourself: unauthorized'
timestamp: "2023-05-15T21:30:34Z"
```

####  Show all identities
```bash
repd query rep list-user

pagination:
  next_key: null
  total: "2"
user:
- description: updated my user
  name: rep-key
  point: "0"
  uid: "0"
  wallet: rep1t0zgm4weu59uxmp22f0qedfft5l0djgt73lak9
- description: hi
  name: user2
  point: "1"
  uid: "1"
  wallet: rep1fkq8jyke9axxc2u045k2p35rercgnuj82elrny
```
We can see there are two identities in the system. The first one is rep-key, the second one is user2(created by rep-key-2). user2 has got 1 like.
