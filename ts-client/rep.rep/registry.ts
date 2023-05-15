import { GeneratedType } from "@cosmjs/proto-signing";
import { MsgUpdateUser } from "./types/rep/rep/tx";
import { MsgCreateUser } from "./types/rep/rep/tx";
import { MsgLike } from "./types/rep/rep/tx";

const msgTypes: Array<[string, GeneratedType]>  = [
    ["/rep.rep.MsgUpdateUser", MsgUpdateUser],
    ["/rep.rep.MsgCreateUser", MsgCreateUser],
    ["/rep.rep.MsgLike", MsgLike],
    
];

export { msgTypes }