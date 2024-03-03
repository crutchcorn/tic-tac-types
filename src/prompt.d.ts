/**
 * The prompt that allows the user to play the game
 */
import { FindValidBoardMove } from "./ai";
import {
  AllowedGenericPromptVals,
  GenericBoard,
  GetBoardAllowedVals,
} from "./board";
import { ReplaceBoardValWith } from "./board-val-replacement";
import { CheckWin } from "./win-conditions";

export type Prompt<
  BoardT extends GenericBoard,
  ValT extends AllowedGenericPromptVals,
> =
  ValT extends GetBoardAllowedVals<BoardT>
    ? ReplaceBoardValWith<BoardT, ValT, "X"> extends infer UserPlayedBoard
      ? UserPlayedBoard extends GenericBoard
        ? FindValidBoardMove<UserPlayedBoard> extends infer MoveComputerPlays
          ? MoveComputerPlays extends GetBoardAllowedVals<UserPlayedBoard>
            ? ReplaceBoardValWith<
                UserPlayedBoard,
                MoveComputerPlays,
                "O"
              > extends infer ComputerPlayedBoard
              ? ComputerPlayedBoard extends GenericBoard
                ? true extends CheckWin<ComputerPlayedBoard, "X">
                  ? "Player wins!"
                  : true extends CheckWin<ComputerPlayedBoard, "O">
                    ? "Computer wins!"
                    : ComputerPlayedBoard
                : never
              : never
            : // Game is over: Calculate winner
              true extends CheckWin<UserPlayedBoard, "X">
              ? "Player wins!"
              : true extends CheckWin<UserPlayedBoard, "O">
                ? "Computer wins!"
                : "Tie!"
          : never
        : never
      : never
    : "You must input a valid number";
