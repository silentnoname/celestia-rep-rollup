package rep

import (
	"math/rand"

	"github.com/cosmos/cosmos-sdk/baseapp"
	simappparams "github.com/cosmos/cosmos-sdk/simapp/params"
	sdk "github.com/cosmos/cosmos-sdk/types"
	"github.com/cosmos/cosmos-sdk/types/module"
	simtypes "github.com/cosmos/cosmos-sdk/types/simulation"
	"github.com/cosmos/cosmos-sdk/x/simulation"
	"rep/testutil/sample"
	repsimulation "rep/x/rep/simulation"
	"rep/x/rep/types"
)

// avoid unused import issue
var (
	_ = sample.AccAddress
	_ = repsimulation.FindAccount
	_ = simappparams.StakePerAccount
	_ = simulation.MsgEntryKind
	_ = baseapp.Paramspace
)

const (
	opWeightMsgCreateUser = "op_weight_msg_create_user"
	// TODO: Determine the simulation weight value
	defaultWeightMsgCreateUser int = 100

	opWeightMsgUpdateUser = "op_weight_msg_update_user"
	// TODO: Determine the simulation weight value
	defaultWeightMsgUpdateUser int = 100

	opWeightMsgLike = "op_weight_msg_like"
	// TODO: Determine the simulation weight value
	defaultWeightMsgLike int = 100

	// this line is used by starport scaffolding # simapp/module/const
)

// GenerateGenesisState creates a randomized GenState of the module
func (AppModule) GenerateGenesisState(simState *module.SimulationState) {
	accs := make([]string, len(simState.Accounts))
	for i, acc := range simState.Accounts {
		accs[i] = acc.Address.String()
	}
	repGenesis := types.GenesisState{
		Params: types.DefaultParams(),
		// this line is used by starport scaffolding # simapp/module/genesisState
	}
	simState.GenState[types.ModuleName] = simState.Cdc.MustMarshalJSON(&repGenesis)
}

// ProposalContents doesn't return any content functions for governance proposals
func (AppModule) ProposalContents(_ module.SimulationState) []simtypes.WeightedProposalContent {
	return nil
}

// RandomizedParams creates randomized  param changes for the simulator
func (am AppModule) RandomizedParams(_ *rand.Rand) []simtypes.ParamChange {

	return []simtypes.ParamChange{}
}

// RegisterStoreDecoder registers a decoder
func (am AppModule) RegisterStoreDecoder(_ sdk.StoreDecoderRegistry) {}

// WeightedOperations returns the all the gov module operations with their respective weights.
func (am AppModule) WeightedOperations(simState module.SimulationState) []simtypes.WeightedOperation {
	operations := make([]simtypes.WeightedOperation, 0)

	var weightMsgCreateUser int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgCreateUser, &weightMsgCreateUser, nil,
		func(_ *rand.Rand) {
			weightMsgCreateUser = defaultWeightMsgCreateUser
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgCreateUser,
		repsimulation.SimulateMsgCreateUser(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgUpdateUser int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgUpdateUser, &weightMsgUpdateUser, nil,
		func(_ *rand.Rand) {
			weightMsgUpdateUser = defaultWeightMsgUpdateUser
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgUpdateUser,
		repsimulation.SimulateMsgUpdateUser(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	var weightMsgLike int
	simState.AppParams.GetOrGenerate(simState.Cdc, opWeightMsgLike, &weightMsgLike, nil,
		func(_ *rand.Rand) {
			weightMsgLike = defaultWeightMsgLike
		},
	)
	operations = append(operations, simulation.NewWeightedOperation(
		weightMsgLike,
		repsimulation.SimulateMsgLike(am.accountKeeper, am.bankKeeper, am.keeper),
	))

	// this line is used by starport scaffolding # simapp/module/operation

	return operations
}
