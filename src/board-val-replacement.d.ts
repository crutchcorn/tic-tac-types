/**
 * Given a board, allow an immutable replacement of a single value
 */
import {
  GenericBoard,
  GetBoardAllowedVals,
  GetRowAllowedVals,
  XOrO,
} from "./board";
import { ReplaceIdxWith } from "./utils";

type ReplaceBoardRowWith<
  RowT extends GenericBoard[number],
  ValT extends GetRowAllowedVals<RowT>,
  XorOT extends XOrO,
  // Do not allow numbers larger than 3, as a column can only have an index of 2
  IdxTArr extends never[] = [],
> = IdxTArr["length"] extends 3
  ? RowT
  : ValT extends RowT[IdxTArr["length"]]
    ? ReplaceIdxWith<RowT, IdxTArr["length"], XorOT>
    : ReplaceBoardRowWith<RowT, ValT, XorOT, [...IdxTArr, never]>;

export type ReplaceBoardValWith<
  BoardT extends GenericBoard,
  ValT extends GetBoardAllowedVals<BoardT>,
  XorOT extends XOrO,
  // Do not allow numbers larger than 3, as a row can only have an index of 2
  IdxTArr extends never[] = [],
> = IdxTArr["length"] extends 3
  ? BoardT
  : BoardT[IdxTArr["length"]] extends GenericBoard[number]
    ? ReplaceIdxWith<
        BoardT,
        IdxTArr["length"],
        ReplaceBoardRowWith<BoardT[IdxTArr["length"]], ValT, XorOT>
      > extends infer NewBoard
      ? NewBoard extends GenericBoard
        ? ReplaceBoardValWith<NewBoard, ValT, XorOT, [...IdxTArr, never]>
        : never
      : never
    : never;
