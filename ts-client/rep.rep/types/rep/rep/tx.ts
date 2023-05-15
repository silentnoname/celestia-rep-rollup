/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "rep.rep";

export interface MsgCreateUser {
  creator: string;
  name: string;
  description: string;
}

export interface MsgCreateUserResponse {
  uid: number;
}

export interface MsgUpdateUser {
  creator: string;
  name: string;
  description: string;
  uid: number;
}

export interface MsgUpdateUserResponse {
}

export interface MsgLike {
  creator: string;
  uid: number;
}

export interface MsgLikeResponse {
  point: number;
}

function createBaseMsgCreateUser(): MsgCreateUser {
  return { creator: "", name: "", description: "" };
}

export const MsgCreateUser = {
  encode(message: MsgCreateUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateUser {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateUser {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
    };
  },

  toJSON(message: MsgCreateUser): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateUser>, I>>(object: I): MsgCreateUser {
    const message = createBaseMsgCreateUser();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    return message;
  },
};

function createBaseMsgCreateUserResponse(): MsgCreateUserResponse {
  return { uid: 0 };
}

export const MsgCreateUserResponse = {
  encode(message: MsgCreateUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.uid !== 0) {
      writer.uint32(8).uint64(message.uid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgCreateUserResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgCreateUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.uid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgCreateUserResponse {
    return { uid: isSet(object.uid) ? Number(object.uid) : 0 };
  },

  toJSON(message: MsgCreateUserResponse): unknown {
    const obj: any = {};
    message.uid !== undefined && (obj.uid = Math.round(message.uid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgCreateUserResponse>, I>>(object: I): MsgCreateUserResponse {
    const message = createBaseMsgCreateUserResponse();
    message.uid = object.uid ?? 0;
    return message;
  },
};

function createBaseMsgUpdateUser(): MsgUpdateUser {
  return { creator: "", name: "", description: "", uid: 0 };
}

export const MsgUpdateUser = {
  encode(message: MsgUpdateUser, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.name !== "") {
      writer.uint32(18).string(message.name);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.uid !== 0) {
      writer.uint32(32).uint64(message.uid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateUser {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.name = reader.string();
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.uid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgUpdateUser {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      name: isSet(object.name) ? String(object.name) : "",
      description: isSet(object.description) ? String(object.description) : "",
      uid: isSet(object.uid) ? Number(object.uid) : 0,
    };
  },

  toJSON(message: MsgUpdateUser): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.name !== undefined && (obj.name = message.name);
    message.description !== undefined && (obj.description = message.description);
    message.uid !== undefined && (obj.uid = Math.round(message.uid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateUser>, I>>(object: I): MsgUpdateUser {
    const message = createBaseMsgUpdateUser();
    message.creator = object.creator ?? "";
    message.name = object.name ?? "";
    message.description = object.description ?? "";
    message.uid = object.uid ?? 0;
    return message;
  },
};

function createBaseMsgUpdateUserResponse(): MsgUpdateUserResponse {
  return {};
}

export const MsgUpdateUserResponse = {
  encode(_: MsgUpdateUserResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgUpdateUserResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgUpdateUserResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): MsgUpdateUserResponse {
    return {};
  },

  toJSON(_: MsgUpdateUserResponse): unknown {
    const obj: any = {};
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgUpdateUserResponse>, I>>(_: I): MsgUpdateUserResponse {
    const message = createBaseMsgUpdateUserResponse();
    return message;
  },
};

function createBaseMsgLike(): MsgLike {
  return { creator: "", uid: 0 };
}

export const MsgLike = {
  encode(message: MsgLike, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.uid !== 0) {
      writer.uint32(16).uint64(message.uid);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLike {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLike();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.uid = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgLike {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      uid: isSet(object.uid) ? Number(object.uid) : 0,
    };
  },

  toJSON(message: MsgLike): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.uid !== undefined && (obj.uid = Math.round(message.uid));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgLike>, I>>(object: I): MsgLike {
    const message = createBaseMsgLike();
    message.creator = object.creator ?? "";
    message.uid = object.uid ?? 0;
    return message;
  },
};

function createBaseMsgLikeResponse(): MsgLikeResponse {
  return { point: 0 };
}

export const MsgLikeResponse = {
  encode(message: MsgLikeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.point !== 0) {
      writer.uint32(8).uint64(message.point);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): MsgLikeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgLikeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.point = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgLikeResponse {
    return { point: isSet(object.point) ? Number(object.point) : 0 };
  },

  toJSON(message: MsgLikeResponse): unknown {
    const obj: any = {};
    message.point !== undefined && (obj.point = Math.round(message.point));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<MsgLikeResponse>, I>>(object: I): MsgLikeResponse {
    const message = createBaseMsgLikeResponse();
    message.point = object.point ?? 0;
    return message;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  CreateUser(request: MsgCreateUser): Promise<MsgCreateUserResponse>;
  UpdateUser(request: MsgUpdateUser): Promise<MsgUpdateUserResponse>;
  /** this line is used by starport scaffolding # proto/tx/rpc */
  Like(request: MsgLike): Promise<MsgLikeResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.CreateUser = this.CreateUser.bind(this);
    this.UpdateUser = this.UpdateUser.bind(this);
    this.Like = this.Like.bind(this);
  }
  CreateUser(request: MsgCreateUser): Promise<MsgCreateUserResponse> {
    const data = MsgCreateUser.encode(request).finish();
    const promise = this.rpc.request("rep.rep.Msg", "CreateUser", data);
    return promise.then((data) => MsgCreateUserResponse.decode(new _m0.Reader(data)));
  }

  UpdateUser(request: MsgUpdateUser): Promise<MsgUpdateUserResponse> {
    const data = MsgUpdateUser.encode(request).finish();
    const promise = this.rpc.request("rep.rep.Msg", "UpdateUser", data);
    return promise.then((data) => MsgUpdateUserResponse.decode(new _m0.Reader(data)));
  }

  Like(request: MsgLike): Promise<MsgLikeResponse> {
    const data = MsgLike.encode(request).finish();
    const promise = this.rpc.request("rep.rep.Msg", "Like", data);
    return promise.then((data) => MsgLikeResponse.decode(new _m0.Reader(data)));
  }
}

interface Rpc {
  request(service: string, method: string, data: Uint8Array): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
declare var global: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof window !== "undefined") {
    return window;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw "Unable to locate global object";
})();

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends Array<infer U> ? Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function longToNumber(long: Long): number {
  if (long.gt(Number.MAX_SAFE_INTEGER)) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  return long.toNumber();
}

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}
