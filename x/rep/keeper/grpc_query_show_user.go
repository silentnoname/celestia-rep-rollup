package keeper

import (
	"context"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"

	sdk "github.com/cosmos/cosmos-sdk/types"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"rep/x/rep/types"
)

func (k Keeper) ShowUser(goCtx context.Context, req *types.QueryShowUserRequest) (*types.QueryShowUserResponse, error) {
	if req == nil {
		return nil, status.Error(codes.InvalidArgument, "invalid request")
	}

	ctx := sdk.UnwrapSDKContext(goCtx)
	user, found := k.GetUser(ctx, req.Uid)
	if !found {
		return nil, sdkerrors.ErrKeyNotFound
	}

	return &types.QueryShowUserResponse{User: user}, nil
}
