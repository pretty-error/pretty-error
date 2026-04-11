const p = Object.getPrototypeOf;

const isPlainObject = (obj: unknown) =>
  obj &&
  typeof obj === "object" &&
  (p(obj) === null || p(obj) === Object.prototype);

export { isPlainObject, p };
