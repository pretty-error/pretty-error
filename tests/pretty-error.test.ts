import { describe, it, expect, beforeEach, afterEach } from "bun:test";

import defaultStyle from "../src/lib/defaultStyle";
import PrettyError from "../src/lib/PrettyError";

// Helper to check if the error stack starts with ANSI color codes
const isFormatted = (exc: Error): boolean => {
  return exc.stack?.indexOf("  \u001b[0m\u001b[97m\u001b[41m") === 0;
};

// Helper to catch errors from strings or functions
const getCaughtError = (what: string | (() => any)): Error => {
  if (typeof what === "string") {
    return getCaughtError(() => {
      throw new Error(what);
    });
  } else if (typeof what === "function") {
    try {
      what();
    } catch (e) {
      return e as Error;
    }
  }
  throw new Error("bad argument for error");
};

describe("PrettyError", () => {
  describe("constructor()", () => {
    it("should work", () => {
      new PrettyError();
    });
  });

  describe("getObject", () => {
    it("should return an object", () => {
      const p = new PrettyError();
      const err = getCaughtError("hello");
      expect(typeof p.getObject(err)).toBe("object");
    });
  });

  describe("style", () => {
    it("should, by default, return the contents in `default-style`", () => {
      const p = new PrettyError();
      expect(p.style).toEqual(defaultStyle());
    });

    it("should return different contents after appending some styles", () => {
      const p = new PrettyError();
      p.appendStyle({ "some selector": { display: "block" } });
      expect(p.style).not.toEqual(defaultStyle());
    });
  });

  describe("render()", () => {
    it("should work", () => {
      const p = new PrettyError();
      p.skipNodeFiles();
      p.appendStyle({ "pretty-error": { marginLeft: 4 } });

      const e1 = getCaughtError(() => expect("a").toBe("b"));
      console.log(p.render(e1, false));

      const e2 = getCaughtError(() => (Array as any).split(Object));
      console.log(p.render(e2, false));

      const e3 = "Plain error message";
      console.log(p.render(e3, false));

      const e4 = {
        message: "Custom error message",
        kind: "Custom Error",
      };
      console.log(p.render(e4 as any, false));

      const e5 = {
        message: "Error with custom stack",
        stack: ["line one", "line two"],
        wrapper: "UnhandledRejection",
      };
      console.log(p.render(e5 as any, false));

      const e6 = getCaughtError(() =>
        (PrettyError as any).someNonExistingFuncion(),
      );
      console.log(p.render(e6, false));
    });

    it.skip("should render without colors if pe._useColors is false", () => {
      const p = new PrettyError();
      p.withoutColors();
      p.skipNodeFiles();
      p.appendStyle({ "pretty-error": { marginLeft: 4 } });

      const e = getCaughtError(() => expect("a").toBe("b"));
      console.log(p.render(e, false));
    });
  });

  describe("start()", () => {
    let originalPrepareStackTrace: any;

    beforeEach(() => {
      originalPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = undefined;
    });

    afterEach(() => {
      Error.prepareStackTrace = originalPrepareStackTrace;
    });

    it("throws unformatted error when not started", () => {
      let caught: Error | null = null;
      try {
        throw new Error("foo bar");
      } catch (exc) {
        caught = exc as Error;
      }

      expect(isFormatted(caught)).toBe(false);
    });

    it("throws formatted the error", () => {
      PrettyError.start();

      let caught: Error | null = null;
      try {
        throw new Error("foo bar");
      } catch (exc) {
        caught = exc as Error;
      }

      try {
        expect(isFormatted(caught)).toBe(true);
        expect(caught.stack?.split(/\n/g).length).toBeGreaterThan(2);
      } finally {
        PrettyError.stop();
      }
    });
  });
});
