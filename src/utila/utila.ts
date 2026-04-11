const __hasProp = {}.hasOwnProperty;

function isBareObject(o) {
  if (o != null && o.constructor === Object) {
    return true;
  }
  return false;
}

const object = { isBareObject };

export { object, __hasProp };
