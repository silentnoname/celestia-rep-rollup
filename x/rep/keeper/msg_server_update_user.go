package keeper

import (
	"context"
	"fmt"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"rep/x/rep/types"
)

func (k msgServer) UpdateUser(goCtx context.Context, msg *types.MsgUpdateUser) (*types.MsgUpdateUserResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	var user = types.User{
		Wallet:      msg.Creator,
		Uid:         msg.Uid,
		Name:        msg.Name,
		Description: msg.Description,
	}
	val, found := k.GetUser(ctx, msg.Uid)
	if !found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrKeyNotFound, fmt.Sprintf("key %d doesn't exist", msg.Uid))
	}
	if msg.Creator != val.Wallet {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "incorrect owner")
	}
	k.SetUser(ctx, user)
	return &types.MsgUpdateUserResponse{}, nil
}
