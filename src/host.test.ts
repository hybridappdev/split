import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { remotes } from "./host";

describe("split", () => {
  it("loads desk and blotter by url", () => {
    expect(remotes.map((remote) => remote.url)).toEqual([
      "http://localhost:5001/src/remote.tsx",
      "http://localhost:5002/src/remote.tsx",
    ]);
  });

  it("does not depend on either app", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8")) as {
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };
    const names = [
      ...Object.keys(pkg.dependencies ?? {}),
      ...Object.keys(pkg.devDependencies ?? {}),
    ];
    expect(names.some((name) => name.includes("desk") || name.includes("blotter"))).toBe(false);
    expect(readFileSync("src/App.tsx", "utf8")).not.toMatch(/from ["'][^"']*(desk|blotter)/);
  });
});
