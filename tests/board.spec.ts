import { test, describe, assertType } from "vitest";
import { BoardToString, GenericBoard } from "../src/board";

describe("BoardToString", () => {
  test("Stringifies a basic board", () => {
    const egBoard = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ] satisfies GenericBoard;

    assertType<BoardToString<typeof egBoard>>("\n123\n456\n789\n");
  });
});
