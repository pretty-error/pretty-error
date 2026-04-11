import { p } from "#utils";

import {
  eq,
  HASH_UNDEFINED,
  hasOwnProperty,
  isFunction,
  isLength,
  LARGE_ARRAY_SIZE,
  objectProto,
  objectToString,
} from "./shared";

/** `Object#toString` result references. */
const argsTag = "[object Arguments]",
  arrayTag = "[object Array]",
  boolTag = "[object Boolean]",
  dateTag = "[object Date]",
  errorTag = "[object Error]",
  funcTag = "[object Function]",
  genTag = "[object GeneratorFunction]",
  mapTag = "[object Map]",
  numberTag = "[object Number]",
  objectTag = "[object Object]",
  regexpTag = "[object RegExp]",
  setTag = "[object Set]",
  stringTag = "[object String]",
  symbolTag = "[object Symbol]",
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

/** Used to identify `toStringTag` values supported by `_.clone`. */
const cloneableTags = {};
cloneableTags[argsTag] =
  cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] =
  cloneableTags[dataViewTag] =
  cloneableTags[boolTag] =
  cloneableTags[dateTag] =
  cloneableTags[float32Tag] =
  cloneableTags[float64Tag] =
  cloneableTags[int8Tag] =
  cloneableTags[int16Tag] =
  cloneableTags[int32Tag] =
  cloneableTags[mapTag] =
  cloneableTags[numberTag] =
  cloneableTags[objectTag] =
  cloneableTags[regexpTag] =
  cloneableTags[setTag] =
  cloneableTags[stringTag] =
  cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] =
  cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] =
  cloneableTags[uint32Tag] =
    true;
cloneableTags[errorTag] =
  cloneableTags[funcTag] =
  cloneableTags[weakMapTag] =
    false;

function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

function arrayEach(array, iteratee) {
  let index = -1,
    length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

function arrayPush(array, values) {
  let index = -1,
    length = values.length,
    offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

function baseTimes(n, iteratee) {
  let index = -1,
    result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  let result = false;
  if (value != null && typeof value.toString != "function") {
    try {
      result = !!(value + "");
    } catch (e) {}
  }
  return result;
}

function mapToArray(map) {
  let index = -1,
    result = Array(map.size);

  map.forEach(function (value, key) {
    result[++index] = [key, value];
  });
  return result;
}

function setToArray(set) {
  let index = -1,
    result = Array(set.size);

  set.forEach(function (value) {
    result[++index] = value;
  });
  return result;
}

function Hash(entries) {
  let index = -1,
    length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

function hashClear() {
  this.__data__ = Object.create(null);
}

function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
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
  data[key] = value === undefined ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

function ListCache(entries?: unknown[]) {
  let index = -1,
    length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

function listCacheClear() {
  this.__data__ = [];
}

function listCacheDelete(key) {
  const data: unknown[] = this.__data__,
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
    length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    const entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

function mapCacheClear() {
  this.__data__ = {
    hash: new Hash(),
    map: new (Map || ListCache)(),
    string: new Hash(),
  };
}

function mapCacheDelete(key) {
  return getMapData(this, key)["delete"](key);
}

function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

function Stack(entries?) {
  this.__data__ = new ListCache(entries);
}

function stackClear() {
  this.__data__ = new ListCache();
}

function stackDelete(key) {
  return this.__data__["delete"](key);
}

function stackGet(key) {
  return this.__data__.get(key);
}

function stackHas(key) {
  return this.__data__.has(key);
}

function stackSet(key, value) {
  let cache = this.__data__;
  if (cache instanceof ListCache) {
    const pairs = cache.__data__;
    if (!Map || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  const result =
    isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];

  const length = result.length,
    skipIndexes = !!length;

  for (const key in value) {
    if (
      (inherited || hasOwnProperty.call(value, key)) &&
      !(skipIndexes && (key == "length" || isIndex(key, length)))
    ) {
      result.push(key);
    }
  }
  return result;
}

function assignValue(object, key, value) {
  const objValue = object[key];
  if (
    !(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
    (value === undefined && !(key in object))
  ) {
    object[key] = value;
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

function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

function baseClone(value, isDeep, isFull, customizer?, key?, object?, stack?) {
  let result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  const isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    const tag = baseGetTag(value),
      isFunc = tag == funcTag || tag == genTag;

    if (Buffer.isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack ||= new Stack();
  const stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function (subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(
      result,
      key,
      baseClone(subValue, isDeep, isFull, customizer, key, value, stack),
    );
  });
  return result;
}

function baseCreate(proto) {
  return isObject(proto) ? Object.create(proto) : {};
}

function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  const result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

function baseGetTag(value) {
  return objectToString.call(value);
}

function baseKeys(object) {
  if (!isPrototype(object)) {
    return Object.keys(object);
  }
  const result = [];
  for (const key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}

function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  const result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

function cloneArrayBuffer(arrayBuffer) {
  const result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

function cloneDataView(dataView, isDeep) {
  const buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(
    buffer,
    dataView.byteOffset,
    dataView.byteLength,
  );
}

function cloneMap(map, isDeep, cloneFunc) {
  const array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return array.reduce(addMapEntry, new map.constructor());
}

function cloneSet(set, isDeep, cloneFunc) {
  const array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return array.reduce(addSetEntry, new set.constructor());
}

function cloneSymbol(symbol) {
  return Object(Symbol.prototype.valueOf.call(symbol));
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

function copyArray(source, array) {
  let index = -1,
    length = source.length;

  array ||= Array(length);
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

function copyObject(source, props, object) {
  object ||= {};

  let index = -1,
    length = props.length;

  while (++index < length) {
    const key = props[index];

    assignValue(object, key, source[key]);
  }
  return object;
}

function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

function getMapData(map, key) {
  const data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == "string" ? "string" : "hash"]
    : data.map;
}

const getSymbols = Object.getOwnPropertySymbols;

function initCloneArray(array) {
  const length = array.length,
    result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (
    length &&
    typeof array[0] == "string" &&
    hasOwnProperty.call(array, "index")
  ) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object)
    ? baseCreate(p(object))
    : {};
}

function initCloneByTag(object, tag, cloneFunc, isDeep) {
  const Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag:
    case float64Tag:
    case int8Tag:
    case int16Tag:
    case int32Tag:
    case uint8Tag:
    case uint8ClampedTag:
    case uint16Tag:
    case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return new RegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

function isIndex(value, length) {
  length = length == null ? Number.MAX_SAFE_INTEGER : length;
  return (
    !!length &&
    (typeof value == "number" || reIsUint.test(value)) &&
    value > -1 &&
    value % 1 == 0 &&
    value < length
  );
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

function cloneDeep(value) {
  return baseClone(value, true, true);
}

function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return (
    isArrayLikeObject(value) &&
    hasOwnProperty.call(value, "callee") &&
    (!objectProto.propertyIsEnumerable.call(value, "callee") ||
      objectToString.call(value) == argsTag)
  );
}

const isArray = Array.isArray;

function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

function isArrayLikeObject(value) {
  return !!value && typeof value == "object" && isArrayLike(value);
}

function isObject(value) {
  const type = typeof value;
  return !!value && (type == "object" || type == "function");
}

function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

export default cloneDeep;
