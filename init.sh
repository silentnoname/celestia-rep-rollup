#!/bin/sh

NODE=${1:-http://localhost:26659}
VALIDATOR_NAME=validator1
CHAIN_ID=rep-1
KEY_NAME=rep-key
KEY_2_NAME=rep-key-2
KEY_3_NAME=rep-key-3
CHAINFLAG="--chain-id ${CHAIN_ID}"
TOKEN_AMOUNT="10000000000000000000000000stake"
STAKING_AMOUNT="1000000000stake"

NAMESPACE_ID=$(openssl rand -hex 8)
DA_BLOCK_HEIGHT=$(curl https://rpc-blockspacerace.pops.one/block | jq -r '.result.block.header.height')
echo $NAMESPACE_ID
echo $DA_BLOCK_HEIGHT
ignite chain build
repd tendermint unsafe-reset-all
repd init $VALIDATOR_NAME --chain-id $CHAIN_ID
repd keys add $KEY_NAME --keyring-backend test
repd keys add $KEY_2_NAME --keyring-backend test
repd keys add $KEY_3_NAME --keyring-backend test
repd add-genesis-account $KEY_NAME $TOKEN_AMOUNT --keyring-backend test
repd add-genesis-account $KEY_2_NAME $TOKEN_AMOUNT --keyring-backend test
repd gentx $KEY_NAME $STAKING_AMOUNT --chain-id $CHAIN_ID --keyring-backend test
repd collect-gentxs
repd start --rollkit.aggregator true --rollkit.da_layer celestia --rollkit.da_config='{"base_url":"'$NODE'","timeout":60000000000,"gas_limit":6000000,"fee":6000}' --rollkit.namespace_id $NAMESPACE_ID --rollkit.da_start_height $DA_BLOCK_HEIGHT