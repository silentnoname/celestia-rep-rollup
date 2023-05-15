/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "rep.rep";

export interface User {
  name: string;
  uid: number;
  description: string;
  point: number;
  wallet: string;
}

function createBaseUser(): User {
  return { name: "", uid: 0, description: "", point: 0, wallet: "" };
}

export const User = {
  encode(message: User, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.uid !== 0) {
      writer.uint32(16).uint64(message.uid);
    }
    if (message.description !== "") {
      writer.uint32(26).string(message.description);
    }
    if (message.point !== 0) {
      writer.uint32(32).uint64(message.point);
    }
    if (message.wallet !== "") {
      writer.uint32(42).string(message.wallet);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): User {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        case 2:
          message.uid = longToNumber(reader.uint64() as Long);
          break;
        case 3:
          message.description = reader.string();
          break;
        case 4:
          message.point = longToNumber(reader.uint64() as Long);
          break;
        case 5:
          message.wallet = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): User {
    return {
      name: isSet(object.name) ? String(object.name) : "",
      uid: isSet(object.uid) ? Number(object.uid) : 0,
      description: isSet(object.description) ? String(object.description) : "",
      point: isSet(object.point) ? Number(object.point) : 0,
      wallet: isSet(object.wallet) ? String(object.wallet) : "",
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    message.uid !== undefined && (obj.uid = Math.round(message.uid));
    message.description !== undefined && (obj.description = message.description);
    message.point !== undefined && (obj.point = Math.round(message.point));
    message.wallet !== undefined && (obj.wallet = message.wallet);
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<User>, I>>(object: I): User {
    const message = createBaseUser();
    message.name = object.name ?? "";
    message.uid = object.uid ?? 0;
    message.description = object.description ?? "";
    message.point = object.point ?? 0;
    message.wallet = object.wallet ?? "";
    return message;
  },
};

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
