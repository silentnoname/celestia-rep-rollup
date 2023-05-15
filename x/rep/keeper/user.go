package keeper

import (
	"encoding/binary"
	"github.com/cosmos/cosmos-sdk/store/prefix"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"rep/x/rep/types"
)

func (k Keeper) AppendUser(ctx sdk.Context, user types.User) uint64 {
	count := k.GetUserCount(ctx)
	user.Uid = count
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	appendedValue := k.cdc.MustMarshal(&user)
	store.Set(GetUIDBytes(user.Uid), appendedValue)
	k.SetUserCount(ctx, count+1)
	return count
}
func (k Keeper) GetUserCount(ctx sdk.Context) uint64 {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.UserCountKey)
	bz := store.Get(byteKey)
	if bz == nil {
		return 0
	}
	return binary.BigEndian.Uint64(bz)
}

func GetUIDBytes(id uint64) []byte {
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, id)
	return bz
}

func (k Keeper) SetUserCount(ctx sdk.Context, count uint64) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), []byte{})
	byteKey := types.KeyPrefix(types.UserCountKey)
	bz := make([]byte, 8)
	binary.BigEndian.PutUint64(bz, count)
	store.Set(byteKey, bz)
}

func (k Keeper) GetUser(ctx sdk.Context, uid uint64) (val types.User, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	b := store.Get(GetUIDBytes(uid))
	if b == nil {
		return val, false
	}
	k.cdc.MustUnmarshal(b, &val)
	return val, true
}

func (k Keeper) GetUserByWallet(ctx sdk.Context, wallet string) (user types.User, found bool) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	iterator := sdk.KVStorePrefixIterator(store, []byte{})

	defer iterator.Close()
	for ; iterator.Valid(); iterator.Next() {
		var tempUser types.User
		k.cdc.MustUnmarshal(iterator.Value(), &tempUser)
		if tempUser.Wallet == wallet {
			return tempUser, true
		}
	}
	return user, false
}

func (k Keeper) SetUser(ctx sdk.Context, user types.User) {
	store := prefix.NewStore(ctx.KVStore(k.storeKey), types.KeyPrefix(types.UserKey))
	b := k.cdc.MustMarshal(&user)
	store.Set(GetUIDBytes(user.Uid), b)
}
