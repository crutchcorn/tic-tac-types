import { test, describe, assertType } from "vitest";
import { GenericBoard } from "../src/board";
import { CheckWin } from "../src/win-conditions";

describe("CheckWin", () => {
  test("Checks win condition properly", () => {
    const computerWinBoard = [
      ["1", "2", "3"],
      ["O", "O", "O"],
      ["7", "O", "X"],
    ] satisfies GenericBoard;

    type ComputerWinBoard = typeof computerWinBoard;

    assertType<CheckWin<ComputerWinBoard, "X">>(false);
    assertType<CheckWin<ComputerWinBoard, "O">>(true);
  });
});
