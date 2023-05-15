package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgUpdateUser = "update_user"

var _ sdk.Msg = &MsgUpdateUser{}

func NewMsgUpdateUser(creator string, name string, description string, uid uint64) *MsgUpdateUser {
	return &MsgUpdateUser{
		Creator:     creator,
		Name:        name,
		Description: description,
		Uid:         uid,
	}
}

func (msg *MsgUpdateUser) Route() string {
	return RouterKey
}

func (msg *MsgUpdateUser) Type() string {
	return TypeMsgUpdateUser
}

func (msg *MsgUpdateUser) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgUpdateUser) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgUpdateUser) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
