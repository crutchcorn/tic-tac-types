/**
 * The computer "AI" to find a valid move against the player
 */
import { GenericBoard, UserInput } from "./board";

// null === no valid moves
type FindValidRowMove<
  RowT extends GenericBoard[number],
  // Do not allow numbers larger than 3, as a row can only have an index of 2
  IdxTArr extends never[] = [],
> = IdxTArr["length"] extends 3
  ? null
  : RowT[IdxTArr["length"]] extends UserInput
    ? IdxTArr["length"]
    : FindValidRowMove<RowT, [...IdxTArr, never]>;

export type FindValidBoardMove<
  BoardT extends GenericBoard,
  // Do not allow numbers larger than 3, as a row can only have an index of 2
  IdxTArr extends never[] = [],
> = IdxTArr["length"] extends 3
  ? null
  : FindValidRowMove<BoardT[IdxTArr["length"]]> extends infer ValidMove
    ? ValidMove extends null
      ? FindValidBoardMove<BoardT, [...IdxTArr, never]>
      : ValidMove extends number
        ? BoardT[IdxTArr["length"]][ValidMove]
        : never
    : never;
