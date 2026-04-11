const __hasProp = {}.hasOwnProperty;

function isBareObject(o) {
  if (o != null && o.constructor === Object) {
    return true;
  }
  return false;
}

export { isBareObject, __hasProp };
