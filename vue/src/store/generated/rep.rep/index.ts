import { Client, registry, MissingWalletError } from 'rep-client-ts'

import { LikesRecord } from "rep-client-ts/rep.rep/types"
import { Params } from "rep-client-ts/rep.rep/types"
import { User } from "rep-client-ts/rep.rep/types"


export { LikesRecord, Params, User };

function initClient(vuexGetters) {
	return new Client(vuexGetters['common/env/getEnv'], vuexGetters['common/wallet/signer'])
}

function mergeResults(value, next_values) {
	for (let prop of Object.keys(next_values)) {
		if (Array.isArray(next_values[prop])) {
			value[prop]=[...value[prop], ...next_values[prop]]
		}else{
			value[prop]=next_values[prop]
		}
	}
	return value
}

type Field = {
	name: string;
	type: unknown;
}
function getStructure(template) {
	let structure: {fields: Field[]} = { fields: [] }
	for (const [key, value] of Object.entries(template)) {
		let field = { name: key, type: typeof value }
		structure.fields.push(field)
	}
	return structure
}
const getDefaultState = () => {
	return {
				Params: {},
				ShowUser: {},
				ListUser: {},
				
				_Structure: {
						LikesRecord: getStructure(LikesRecord.fromPartial({})),
						Params: getStructure(Params.fromPartial({})),
						User: getStructure(User.fromPartial({})),
						
		},
		_Registry: registry,
		_Subscriptions: new Set(),
	}
}

// initial state
const state = getDefaultState()

export default {
	namespaced: true,
	state,
	mutations: {
		RESET_STATE(state) {
			Object.assign(state, getDefaultState())
		},
		QUERY(state, { query, key, value }) {
			state[query][JSON.stringify(key)] = value
		},
		SUBSCRIBE(state, subscription) {
			state._Subscriptions.add(JSON.stringify(subscription))
		},
		UNSUBSCRIBE(state, subscription) {
			state._Subscriptions.delete(JSON.stringify(subscription))
		}
	},
	getters: {
				getParams: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.Params[JSON.stringify(params)] ?? {}
		},
				getShowUser: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ShowUser[JSON.stringify(params)] ?? {}
		},
				getListUser: (state) => (params = { params: {}}) => {
					if (!(<any> params).query) {
						(<any> params).query=null
					}
			return state.ListUser[JSON.stringify(params)] ?? {}
		},
				
		getTypeStructure: (state) => (type) => {
			return state._Structure[type].fields
		},
		getRegistry: (state) => {
			return state._Registry
		}
	},
	actions: {
		init({ dispatch, rootGetters }) {
			console.log('Vuex module: rep.rep initialized!')
			if (rootGetters['common/env/client']) {
				rootGetters['common/env/client'].on('newblock', () => {
					dispatch('StoreUpdate')
				})
			}
		},
		resetState({ commit }) {
			commit('RESET_STATE')
		},
		unsubscribe({ commit }, subscription) {
			commit('UNSUBSCRIBE', subscription)
		},
		async StoreUpdate({ state, dispatch }) {
			state._Subscriptions.forEach(async (subscription) => {
				try {
					const sub=JSON.parse(subscription)
					await dispatch(sub.action, sub.payload)
				}catch(e) {
					throw new Error('Subscriptions: ' + e.message)
				}
			})
		},
		
		
		
		 		
		
		
		async QueryParams({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.RepRep.query.queryParams()).data
				
					
				commit('QUERY', { query: 'Params', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryParams', payload: { options: { all }, params: {...key},query }})
				return getters['getParams']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryParams API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryShowUser({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.RepRep.query.queryShowUser( key.uid)).data
				
					
				commit('QUERY', { query: 'ShowUser', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryShowUser', payload: { options: { all }, params: {...key},query }})
				return getters['getShowUser']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryShowUser API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		
		
		 		
		
		
		async QueryListUser({ commit, rootGetters, getters }, { options: { subscribe, all} = { subscribe:false, all:false}, params, query=null }) {
			try {
				const key = params ?? {};
				const client = initClient(rootGetters);
				let value= (await client.RepRep.query.queryListUser(query ?? undefined)).data
				
					
				while (all && (<any> value).pagination && (<any> value).pagination.next_key!=null) {
					let next_values=(await client.RepRep.query.queryListUser({...query ?? {}, 'pagination.key':(<any> value).pagination.next_key} as any)).data
					value = mergeResults(value, next_values);
				}
				commit('QUERY', { query: 'ListUser', key: { params: {...key}, query}, value })
				if (subscribe) commit('SUBSCRIBE', { action: 'QueryListUser', payload: { options: { all }, params: {...key},query }})
				return getters['getListUser']( { params: {...key}, query}) ?? {}
			} catch (e) {
				throw new Error('QueryClient:QueryListUser API Node Unavailable. Could not perform query: ' + e.message)
				
			}
		},
		
		
		async sendMsgUpdateUser({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.RepRep.tx.sendMsgUpdateUser({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateUser:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgUpdateUser:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgLike({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.RepRep.tx.sendMsgLike({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgLike:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgLike:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		async sendMsgCreateUser({ rootGetters }, { value, fee = [], memo = '' }) {
			try {
				const client=await initClient(rootGetters)
				const result = await client.RepRep.tx.sendMsgCreateUser({ value, fee: {amount: fee, gas: "200000"}, memo })
				return result
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateUser:Init Could not initialize signing client. Wallet is required.')
				}else{
					throw new Error('TxClient:MsgCreateUser:Send Could not broadcast Tx: '+ e.message)
				}
			}
		},
		
		async MsgUpdateUser({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.RepRep.tx.msgUpdateUser({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgUpdateUser:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgUpdateUser:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgLike({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.RepRep.tx.msgLike({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgLike:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgLike:Create Could not create message: ' + e.message)
				}
			}
		},
		async MsgCreateUser({ rootGetters }, { value }) {
			try {
				const client=initClient(rootGetters)
				const msg = await client.RepRep.tx.msgCreateUser({value})
				return msg
			} catch (e) {
				if (e == MissingWalletError) {
					throw new Error('TxClient:MsgCreateUser:Init Could not initialize signing client. Wallet is required.')
				} else{
					throw new Error('TxClient:MsgCreateUser:Create Could not create message: ' + e.message)
				}
			}
		},
		
	}
}
