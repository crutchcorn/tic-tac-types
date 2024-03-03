import { test, describe, assertType } from "vitest";
import { ReplaceBoardValWith } from "../src/board-val-replacement";
import { BoardToString, GenericBoard } from "../src/board";

describe("ReplaceBoardValWith", () => {
  test("Replaces the first row val", () => {
    const egBoard = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ] satisfies GenericBoard;

    assertType<BoardToString<ReplaceBoardValWith<typeof egBoard, "2", "X">>>(
      "\n1X3\n456\n789\n",
    );
  });

  test("Replaces a val in the last row", () => {
    const egBoard = [
      ["1", "2", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ] satisfies GenericBoard;

    assertType<BoardToString<ReplaceBoardValWith<typeof egBoard, "7", "X">>>(
      "\n123\n456\nX89\n",
    );
  });
});
