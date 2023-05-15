package keeper

import (
	"context"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"rep/x/rep/types"
)

func (k msgServer) CreateUser(goCtx context.Context, msg *types.MsgCreateUser) (*types.MsgCreateUserResponse, error) {
	ctx := sdk.UnwrapSDKContext(goCtx)
	_, found := k.GetUserByWallet(ctx, msg.Creator)
	if found {
		return nil, sdkerrors.Wrap(sdkerrors.ErrUnauthorized, "user already exist in this wallet ,cannot create another user")
	}
	var user = types.User{
		Name:        msg.Name,
		Description: msg.Description,
		Point:       0,
		Wallet:      msg.Creator,
	}
	uid := k.AppendUser(
		ctx,
		user,
	)
	return &types.MsgCreateUserResponse{
		Uid: uid,
	}, nil
}
