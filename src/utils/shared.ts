const arrayProto = Array.prototype,
  funcProto = Function.prototype,
  objectProto = Object.prototype;

const LARGE_ARRAY_SIZE = 200;

const HASH_UNDEFINED = "__lodash_hash_undefined__";

function isLength(value) {
  return (
    typeof value == "number" &&
    value > -1 &&
    value % 1 == 0 &&
    value <= Number.MAX_SAFE_INTEGER
  );
}

function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

const funcToString = funcProto.toString;

const hasOwnProperty = objectProto.hasOwnProperty;

const objectToString = objectProto.toString;

function isFunction(value) {
  return typeof value === "function";
}

export {
  arrayProto,
  funcProto,
  objectProto,
  LARGE_ARRAY_SIZE,
  HASH_UNDEFINED,
  isLength,
  eq,
  funcToString,
  hasOwnProperty,
  objectToString,
  isFunction,
};
