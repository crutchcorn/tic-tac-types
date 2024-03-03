import { test, describe, assertType } from "vitest";
import { GenericBoard } from "../src/board";
import { Prompt } from "../src";

describe("Prompt", () => {
  test("Shows correct winner on win", () => {
    const computerWinBoard = [
      ["1", "2", "3"],
      ["O", "O", "O"],
      ["7", "O", "X"],
    ] satisfies GenericBoard;

    type ComputerWinBoard = typeof computerWinBoard;

    assertType<Prompt<ComputerWinBoard, "1">>("Computer wins!");
  });
});
