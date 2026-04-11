const p = Object.getPrototypeOf;
const sp = Object.setPrototypeOf;

const isPlainObject = (obj: unknown) =>
  obj &&
  typeof obj === "object" &&
  (p(obj) === null || p(obj) === Object.prototype);

export { isPlainObject, p, sp };
