import { test, describe, assertType } from "vitest";
import { GenericBoard } from "../src/board";
import { FindValidBoardMove } from "../src/ai";

describe("FindValidBoardMove", () => {
  test("Finds value after user's play", () => {
    const egPlayedBoard = [
      ["X", "O", "3"],
      ["4", "5", "6"],
      ["7", "8", "9"],
    ] satisfies GenericBoard;

    assertType<FindValidBoardMove<typeof egPlayedBoard>>("3");
  });

  test('Find a "complex" move', () => {
    const egMorePlayedBoard = [
      ["X", "O", "X"],
      ["O", "X", "6"],
      ["7", "8", "9"],
    ] satisfies GenericBoard;

    assertType<FindValidBoardMove<typeof egMorePlayedBoard>>("6");
  });
});
