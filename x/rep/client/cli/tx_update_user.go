package cli

import (
	"strconv"

	"github.com/cosmos/cosmos-sdk/client"
	"github.com/cosmos/cosmos-sdk/client/flags"
	"github.com/cosmos/cosmos-sdk/client/tx"
	"github.com/spf13/cast"
	"github.com/spf13/cobra"
	"rep/x/rep/types"
)

var _ = strconv.Itoa(0)

func CmdUpdateUser() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "update-user [name] [description] [uid]",
		Short: "Broadcast message update-user",
		Args:  cobra.ExactArgs(3),
		RunE: func(cmd *cobra.Command, args []string) (err error) {
			argName := args[0]
			argdescription := args[1]
			argUid, err := cast.ToUint64E(args[2])
			if err != nil {
				return err
			}

			clientCtx, err := client.GetClientTxContext(cmd)
			if err != nil {
				return err
			}

			msg := types.NewMsgUpdateUser(
				clientCtx.GetFromAddress().String(),
				argName,
				argdescription,
				argUid,
			)
			if err := msg.ValidateBasic(); err != nil {
				return err
			}
			return tx.GenerateOrBroadcastTxCLI(clientCtx, cmd.Flags(), msg)
		},
	}

	flags.AddTxFlagsToCmd(cmd)

	return cmd
}
