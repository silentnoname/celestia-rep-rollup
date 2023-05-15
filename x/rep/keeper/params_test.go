package keeper_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	testkeeper "rep/testutil/keeper"
	"rep/x/rep/types"
)

func TestGetParams(t *testing.T) {
	k, ctx := testkeeper.RepKeeper(t)
	params := types.DefaultParams()

	k.SetParams(ctx, params)

	require.EqualValues(t, params, k.GetParams(ctx))
}
