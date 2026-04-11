/** Used for built-in method references. */
const arrayProto = Array.prototype,
  funcProto = Function.prototype,
  objectProto = Object.prototype;

/** Used as the size to enable large array optimizations. */
const LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
const HASH_UNDEFINED = "__lodash_hash_undefined__";

function isLength(value) {
  return (
    typeof value == "number" &&
    value > -1 &&
    value % 1 == 0 &&
    value <= Number.MAX_SAFE_INTEGER
  );
}

export {
  arrayProto,
  funcProto,
  objectProto,
  LARGE_ARRAY_SIZE,
  HASH_UNDEFINED,
  isLength,
};
