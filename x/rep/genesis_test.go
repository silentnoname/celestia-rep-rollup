package rep_test

import (
	"testing"

	"github.com/stretchr/testify/require"
	keepertest "rep/testutil/keeper"
	"rep/testutil/nullify"
	"rep/x/rep"
	"rep/x/rep/types"
)

func TestGenesis(t *testing.T) {
	genesisState := types.GenesisState{
		Params: types.DefaultParams(),

		// this line is used by starport scaffolding # genesis/test/state
	}

	k, ctx := keepertest.RepKeeper(t)
	rep.InitGenesis(ctx, *k, genesisState)
	got := rep.ExportGenesis(ctx, *k)
	require.NotNil(t, got)

	nullify.Fill(&genesisState)
	nullify.Fill(got)

	// this line is used by starport scaffolding # genesis/test/assert
}
