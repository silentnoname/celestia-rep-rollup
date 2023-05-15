package keeper

import (
	"context"
	"fmt"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"rep/x/rep/types"
)

func (k msgServer) Like(goCtx context.Context, msg *types.MsgLike) (*types.MsgLikeResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)

	val, found := k.GetUser(ctx, msg.Uid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Uid))
	}
	if msg.Creator == val.Wallet {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "cannot like yourself")
	}
	_, userExist := k.GetUserByWallet(ctx, msg.Creator)
	if !userExist {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "Address haven't create user yet, cannot like")
	}
	// Check if like record exists
	if k.HasLikeRecord(ctx, msg.Creator, msg.Uid) {
		return nil, sdkerrors.Wrap(sdkerrors.ErrInvalidRequest, "cannot like multiple times")
	}

	// Set the like record
	k.SetLikeRecord(ctx, msg.Creator, msg.Uid)

	valAddedPoint := types.User{
		Name:        val.Name,
		Uid:         val.Uid,
		Description: val.Description,
		Point:       val.Point + 1,
		Wallet:      val.Wallet,
	}

	k.SetUser(ctx, valAddedPoint)

	return &types.MsgLikeResponse{}, nil
}

func (k Keeper) HasLikeRecord(ctx sdk.Context, liker string, liked uint64) bool {
	store := ctx.KVStore(k.storeKey)
	key := fmt.Sprintf("like-record-%s-%s", liker, liked)
	return store.Has([]byte(key))
}

func (k Keeper) SetLikeRecord(ctx sdk.Context, liker string, liked uint64) {
	store := ctx.KVStore(k.storeKey)
	key := fmt.Sprintf("like-record-%s-%s", liker, liked)
	store.Set([]byte(key), []byte("1"))
}
