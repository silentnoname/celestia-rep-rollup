package types

import (
	sdk "github.com/cosmos/cosmos-sdk/types"
	sdkerrors "github.com/cosmos/cosmos-sdk/types/errors"
)

const TypeMsgLike = "like"

var _ sdk.Msg = &MsgLike{}

func NewMsgLike(creator string, uid uint64) *MsgLike {
	return &MsgLike{
		Creator: creator,
		Uid:     uid,
	}
}

func (msg *MsgLike) Route() string {
	return RouterKey
}

func (msg *MsgLike) Type() string {
	return TypeMsgLike
}

func (msg *MsgLike) GetSigners() []sdk.AccAddress {
	creator, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		panic(err)
	}
	return []sdk.AccAddress{creator}
}

func (msg *MsgLike) GetSignBytes() []byte {
	bz := ModuleCdc.MustMarshalJSON(msg)
	return sdk.MustSortJSON(bz)
}

func (msg *MsgLike) ValidateBasic() error {
	_, err := sdk.AccAddressFromBech32(msg.Creator)
	if err != nil {
		return sdkerrors.Wrapf(sdkerrors.ErrInvalidAddress, "invalid creator address (%s)", err)
	}
	return nil
}
