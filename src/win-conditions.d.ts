/**
 * All calculations about win conditions
 */
import { BoardToString, GenericBoard, UserInput, XOrO } from "./board";
import { Replace } from "./utils";

type BoardWins =
  | `
***
|||
|||
`
  | `
|||
***
|||
`
  | `
|||
|||
***
`
  | `
*||
*||
*||
`
  | `
|*|
|*|
|*|
`
  | `
||*
||*
||*
`
  | `
*||
|*|
||*
`
  | `
||*
|*|
*||
`;

/**
 * `false` means no win
 * `true` means win
 */
type InnerCheckWin<
  BoardT extends GenericBoard,
  PlayerValT extends XOrO,
  ComputerValT extends XOrO,
> =
  Replace<
    BoardToString<BoardT>,
    ComputerValT | UserInput,
    `${string}`
  > extends Replace<Replace<BoardWins, "*", PlayerValT>, "|", `${string}`>
    ? true
    : false;

export type CheckWin<
  BoardT extends GenericBoard,
  PlayerValT extends XOrO,
> = PlayerValT extends "O"
  ? "X" extends infer ComputerValT
    ? ComputerValT extends XOrO
      ? InnerCheckWin<BoardT, PlayerValT, ComputerValT>
      : never
    : never
  : PlayerValT extends "X"
    ? "O" extends infer ComputerValT
      ? ComputerValT extends XOrO
        ? InnerCheckWin<BoardT, PlayerValT, ComputerValT>
        : never
      : never
    : never;
