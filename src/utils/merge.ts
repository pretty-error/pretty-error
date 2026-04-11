import * as nodeUtil from "node:util";

import { isPlainObject, p } from "#utils";

import {
  eq,
  HASH_UNDEFINED,
  hasOwnProperty,
  isFunction,
  isLength,
  LARGE_ARRAY_SIZE,
  objectProto,
} from "./shared";

/** Used to detect hot functions by number of calls within a span of milliseconds. */
const HOT_COUNT = 800,
  HOT_SPAN = 16;

/** `Object#toString` result references. */
const argsTag = "[object Arguments]",
  arrayTag = "[object Array]",
  boolTag = "[object Boolean]",
  dateTag = "[object Date]",
  errorTag = "[object Error]",
  funcTag = "[object Function]",
  mapTag = "[object Map]",
  numberTag = "[object Number]",
  nullTag = "[object Null]",
  objectTag = "[object Object]",
  regexpTag = "[object RegExp]",
  setTag = "[object Set]",
  stringTag = "[object String]",
  undefinedTag = "[object Undefined]",
  weakMapTag = "[object WeakMap]";

const arrayBufferTag = "[object ArrayBuffer]",
  dataViewTag = "[object DataView]",
  float32Tag = "[object Float32Array]",
  float64Tag = "[object Float64Array]",
  int8Tag = "[object Int8Array]",
  int16Tag = "[object Int16Array]",
  int32Tag = "[object Int32Array]",
  uint8Tag = "[object Uint8Array]",
  uint8ClampedTag = "[object Uint8ClampedArray]",
  uint16Tag = "[object Uint16Array]",
  uint32Tag = "[object Uint32Array]";

/** Used to detect unsigned integer values. */
const reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
const typedArrayTags = {};
typedArrayTags[float32Tag] =
  typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] =
  typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] =
  typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] =
  typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] =
    true;
typedArrayTags[argsTag] =
  typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] =
  typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] =
  typedArrayTags[dateTag] =
  typedArrayTags[errorTag] =
  typedArrayTags[funcTag] =
  typedArrayTags[mapTag] =
  typedArrayTags[numberTag] =
  typedArrayTags[objectTag] =
  typedArrayTags[regexpTag] =
  typedArrayTags[setTag] =
  typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] =
    false;

const nodeIsTypedArray = nodeUtil.types.isTypedArray;

function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

function baseTimes(n, iteratee) {
  let index = -1,
    result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

function baseUnary(func) {
  return function (value) {
    return func(value);
  };
}

const symToStringTag = Symbol.toStringTag;

const defineProperty = Object.defineProperty;

const baseCreate = (function () {
  return function (proto) {
    if (!isObject(proto)) {
      return {};
    }
    return Object.create(proto);
  };
})();

function Hash(entries) {
  let index = -1,
    length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

function hashClear() {
  this.__data__ = Object.create(null);
  this.size = 0;
}

function hashDelete(key) {
  const result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

function hashGet(key) {
  const data = this.__data__;
  const result = data[key];
  return result === HASH_UNDEFINED ? undefined : result;
}

function hashHas(key) {
  const data = this.__data__;
  return data[key] !== undefined;
}

function hashSet(key, value) {
  const data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = value === undefined ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

function ListCache(entries) {
  let index = -1,
    length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

function listCacheDelete(key) {
  const data = this.__data__,
    index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  const lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    data.splice(index, 1);
  }
  --this.size;
  return true;
}

function listCacheGet(key) {
  const data = this.__data__,
    index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

function listCacheSet(key, value) {
  const data = this.__data__,
    index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

function MapCache(entries) {
  let index = -1,
    length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    hash: new Hash(),
    map: new (Map || ListCache)(),
    string: new Hash(),
  };
}

function mapCacheDelete(key) {
  const result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}

function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

function mapCacheSet(key, value) {
  const data = getMapData(this, key),
    size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

function Stack(entries?) {
  const data = (this.__data__ = new ListCache(entries));
  this.size = data.size;
}

function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}

function stackDelete(key) {
  const data = this.__data__,
    result = data["delete"](key);

  this.size = data.size;
  return result;
}

function stackGet(key) {
  return this.__data__.get(key);
}

function stackHas(key) {
  return this.__data__.has(key);
}

function stackSet(key, value) {
  let data = this.__data__;
  if (data instanceof ListCache) {
    const pairs = data.__data__;
    if (pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

function arrayLikeKeys(value, inherited) {
  const isArr = isArray(value),
    isArg = !isArr && isArguments(value),
    isBuff = !isArr && !isArg && Buffer.isBuffer(value),
    isType = !isArr && !isArg && !isBuff && isTypedArray(value),
    skipIndexes = isArr || isArg || isBuff || isType,
    result = skipIndexes ? baseTimes(value.length, String) : [],
    length = result.length;

  for (const key in value) {
    if (
      (inherited || hasOwnProperty.call(value, key)) &&
      !(
        skipIndexes &&
        // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" ||
          // Node.js 0.10 has enumerable non-index properties on buffers.
          (isBuff && (key == "offset" || key == "parent")) ||
          // PhantomJS 2 has enumerable non-index properties on typed arrays.
          (isType &&
            (key == "buffer" || key == "byteLength" || key == "byteOffset")) ||
          // Skip index properties.
          isIndex(key, length))
      )
    ) {
      result.push(key);
    }
  }
  return result;
}

function assignMergeValue(object, key, value) {
  if (
    (value !== undefined && !eq(object[key], value)) ||
    (value === undefined && !(key in object))
  ) {
    baseAssignValue(object, key, value);
  }
}

function assignValue(object, key, value) {
  const objValue = object[key];
  if (
    !(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
    (value === undefined && !(key in object))
  ) {
    baseAssignValue(object, key, value);
  }
}

function assocIndexOf(array, key) {
  let length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty) {
    defineProperty(object, key, {
      configurable: true,
      enumerable: true,
      value: value,
      writable: true,
    });
  } else {
    object[key] = value;
  }
}

const baseFor = createBaseFor();

function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return getRawTag(value);
}

function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

function baseIsTypedArray(value) {
  return (
    isObjectLike(value) &&
    isLength(value.length) &&
    !!typedArrayTags[baseGetTag(value)]
  );
}

function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  const isProto = isPrototype(object),
    result = [];

  for (let key in object) {
    if (
      !(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))
    ) {
      result.push(key);
    }
  }
  return result;
}

function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(
    source,
    function (srcValue, key) {
      stack ||= new Stack();
      if (isObject(srcValue)) {
        baseMergeDeep(
          object,
          source,
          key,
          srcIndex,
          baseMerge,
          customizer,
          stack,
        );
      } else {
        let newValue = customizer
          ? customizer(
              safeGet(object, key),
              srcValue,
              key + "",
              object,
              source,
              stack,
            )
          : undefined;

        if (newValue === undefined) {
          newValue = srcValue;
        }
        assignMergeValue(object, key, newValue);
      }
    },
    keysIn,
  );
}

function baseMergeDeep(
  object,
  source,
  key,
  srcIndex,
  mergeFunc,
  customizer,
  stack,
) {
  const objValue = safeGet(object, key),
    srcValue = safeGet(source, key),
    stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  let newValue = customizer
    ? customizer(objValue, srcValue, key + "", object, source, stack)
    : undefined;

  let isCommon = newValue === undefined;

  if (isCommon) {
    const isArr = isArray(srcValue),
      isBuff = !isArr && Buffer.isBuffer(srcValue),
      isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      } else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      } else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      } else if (!isObject(objValue) || isFunction(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack["delete"](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + "");
}

function baseSetToString(func, string) {
  return defineProperty(func, "toString", {
    configurable: true,
    enumerable: false,
    value: constant(string),
    writable: true,
  });
}

function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  const length = buffer.length,
    result = Buffer.allocUnsafe(length);

  buffer.copy(result);
  return result;
}

function cloneArrayBuffer(arrayBuffer) {
  const result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

function cloneTypedArray(typedArray, isDeep) {
  const buffer = isDeep
    ? cloneArrayBuffer(typedArray.buffer)
    : typedArray.buffer;
  return new typedArray.constructor(
    buffer,
    typedArray.byteOffset,
    typedArray.length,
  );
}

function copyArray(source, array?) {
  let index = -1,
    length = source.length;

  array ||= Array(length);
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

function copyObject(source, props, object, customizer) {
  const isNew = !object;
  object ||= {};

  let index = -1,
    length = props.length;

  while (++index < length) {
    const key = props[index];

    let newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

function createAssigner(assigner) {
  return baseRest(function (object, sources) {
    let index = -1,
      length = sources.length,
      customizer = length > 1 ? sources[length - 1] : undefined,
      guard = length > 2 ? sources[2] : undefined;

    customizer =
      assigner.length > 3 && typeof customizer == "function"
        ? (length--, customizer)
        : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      const source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

function createBaseFor() {
  return function (object, iteratee, keysFunc) {
    let index = -1,
      iterable = Object(object),
      props = keysFunc(object),
      length = props.length;

    while (length--) {
      const key = props[++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

function getMapData(map, key) {
  const data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == "string" ? "string" : "hash"]
    : data.map;
}

function getRawTag(value) {
  const isOwn = hasOwnProperty.call(value, symToStringTag),
    tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  const result = objectToString(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object)
    ? baseCreate(p(object))
    : {};
}

function isIndex(value, length) {
  const type = typeof value;
  length = length == null ? Number.MAX_SAFE_INTEGER : length;

  return (
    !!length &&
    (type == "number" || (type != "symbol" && reIsUint.test(value))) &&
    value > -1 &&
    value % 1 == 0 &&
    value < length
  );
}

function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  const type = typeof index;
  if (
    type == "number"
      ? isArrayLike(object) && isIndex(index, object.length)
      : type == "string" && index in object
  ) {
    return eq(object[index], value);
  }
  return false;
}

function isKeyable(value) {
  const type = typeof value;
  return type == "string" ||
    type == "number" ||
    type == "symbol" ||
    type == "boolean"
    ? value !== "__proto__"
    : value === null;
}

function isPrototype(value) {
  const Ctor = value && value.constructor,
    proto = (typeof Ctor == "function" && Ctor.prototype) || objectProto;

  return value === proto;
}

function nativeKeysIn(object) {
  const result = [];
  if (object != null) {
    for (let key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

function objectToString(value) {
  return objectProto.toString.call(value);
}

function overRest(func, start, transform) {
  start = Math.max(start === undefined ? func.length - 1 : start, 0);
  return function () {
    let args = arguments,
      index = -1,
      length = Math.max(args.length - start, 0),
      array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    const otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

function safeGet(object, key) {
  if (key === "constructor" && typeof object[key] === "function") {
    return;
  }

  if (key == "__proto__") {
    return;
  }

  return object[key];
}

const setToString = shortOut(baseSetToString);

function shortOut(func) {
  let count = 0,
    lastCalled = 0;

  return function () {
    const stamp = Date.now(),
      remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

const isArguments = baseIsArguments(
  (function () {
    return arguments;
  })(),
)
  ? baseIsArguments
  : function (value) {
      return (
        isObjectLike(value) &&
        hasOwnProperty.call(value, "callee") &&
        !objectProto.propertyIsEnumerable.call(value, "callee")
      );
    };

const isArray = Array.isArray;

function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

function isObject(value) {
  const type = typeof value;
  return value != null && (type == "object" || type == "function");
}

function isObjectLike(value) {
  return value != null && typeof value == "object";
}

const isTypedArray = nodeIsTypedArray
  ? baseUnary(nodeIsTypedArray)
  : baseIsTypedArray;

function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

const merge = createAssigner(function (object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

function constant(value) {
  return function () {
    return value;
  };
}

function identity(value) {
  return value;
}

export default merge;
