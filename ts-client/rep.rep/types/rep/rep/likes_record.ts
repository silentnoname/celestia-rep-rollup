/* eslint-disable */
import Long from "long";
import _m0 from "protobufjs/minimal";

export const protobufPackage = "rep.rep";

export interface LikesRecord {
  liker: string;
  liked: number;
}

function createBaseLikesRecord(): LikesRecord {
  return { liker: "", liked: 0 };
}

export const LikesRecord = {
  encode(message: LikesRecord, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.liker !== "") {
      writer.uint32(10).string(message.liker);
    }
    if (message.liked !== 0) {
      writer.uint32(16).uint64(message.liked);
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): LikesRecord {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLikesRecord();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.liker = reader.string();
          break;
        case 2:
          message.liked = longToNumber(reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): LikesRecord {
    return {
      liker: isSet(object.liker) ? String(object.liker) : "",
      liked: isSet(object.liked) ? Number(object.liked) : 0,
    };
  },

  toJSON(message: LikesRecord): unknown {
    const obj: any = {};
    message.liker !== undefined && (obj.liker = message.liker);
    message.liked !== undefined && (obj.liked = Math.round(message.liked));
    return obj;
  },

  fromPartial<I extends Exact<DeepPartial<LikesRecord>, I>>(object: I): LikesRecord {
    const message = createBaseLikesRecord();
    message.liker = object.liker ?? "";
    message.liked = object.liked ?? 0;
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
