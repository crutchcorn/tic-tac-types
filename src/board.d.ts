/**
 * All generic types that pertain to user input and board construction
 */
import { ArrToStr } from "./utils";

export type UserInput = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`;
export type XOrO = "X" | "O";

export type GenericBoard = [
  [XOrO | "1", XOrO | "2", XOrO | "3"],
  [XOrO | "4", XOrO | "5", XOrO | "6"],
  [XOrO | "7", XOrO | "8", XOrO | "9"],
];

export type BoardToString<
  ArrArrT extends string[][],
  AccT extends string = "",
> = ArrArrT extends [infer ArrT, ...infer RestT]
  ? ArrT extends string[]
    ? RestT extends string[][]
      ? BoardToString<RestT, ArrToStr<ArrT, `${AccT}\n`>>
      : `${AccT}\n`
    : `${AccT}\n`
  : `${AccT}\n`;

export type GetBoardAllowedVals<T extends GenericBoard> = T[number][number];
export type GetRowAllowedVals<T extends GenericBoard[number]> = T[number];
export type AllowedGenericPromptVals = GetBoardAllowedVals<GenericBoard>;
