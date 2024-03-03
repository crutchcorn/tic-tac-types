/* eslint-disable @typescript-eslint/no-unused-vars */
import { GenericBoard, Prompt } from "./src";

const board = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
] satisfies GenericBoard;

type Board = typeof board;

/**
 * User is X, game-engine is O
 *
 * Game engine inserts at first `X|O` value
 * @example
 * ["1", "2", "3"],
 * ["4", "5", "6"],
 * ["X", "8", "9"]
 *
 * @example
 * ["O", "2", "3"],
 * ["4", "5", "6"],
 * ["X", "8", "9"]
 */
type TurnOneBoard = Prompt<Board, "1">;
type TurnTwoBoard = Prompt<TurnOneBoard, "4">;
type TurnThreeBoard = Prompt<TurnTwoBoard, "7">; // Player wins!
