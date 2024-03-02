type UserInput = `${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9}`
type XOrO = "X" | "O";

type GenericBoard = [
	[XOrO | "1", XOrO | "2", XOrO | "3"],
	[XOrO | "4", XOrO | "5", XOrO | "6"],
	[XOrO | "7", XOrO | "8", XOrO | "9"]
]

type Replace<StrT extends string, FromT extends string, ToT extends string, Acc extends string = ""> =
	StrT extends `${infer CharOneT}${infer RestOfStrT}` ? CharOneT extends FromT ?
	Replace<RestOfStrT, FromT, ToT, `${Acc}${ToT}`> :
	Replace<RestOfStrT, FromT, ToT, `${Acc}${CharOneT}`> :
	Acc;

type ArrToStr<ArrT extends string[], AccT extends string = ""> =
	ArrT extends [infer ItemT, ...infer RestT] ?
	ItemT extends string ?
	RestT extends string[] ?
	ArrToStr<RestT, `${AccT}${ItemT}`> :
	AccT : AccT :
	AccT;

type BoardToString<ArrArrT extends string[][], AccT extends string = ""> =
	ArrArrT extends [infer ArrT, ...infer RestT] ?
	ArrT extends string[] ?
	RestT extends string[][] ?
	BoardToString<RestT, ArrToStr<ArrT, `${AccT}\n`>> :
	`${AccT}\n` : `${AccT}\n` :
	`${AccT}\n`;

type ReplaceIdxWith<ArrT extends any[], Idx extends number, Val, Acc extends ArrT[number][] = []> =
	ArrT extends [infer ItemT, ...infer RestT] ?
	Acc['length'] extends Idx ? [...Acc, Val, ...RestT]
	: ReplaceIdxWith<RestT, Idx, Val, [...Acc, ItemT]>
	: Acc;

type ValueOfKey<T extends object> = T[keyof T]

type GetBoardAllowedVals<T extends GenericBoard> = T[number][number];
type GetRowAllowedVals<T extends GenericBoard[number]> = T[number];
type AllowedGenericPromptVals = GetBoardAllowedVals<GenericBoard>

type ReplaceBoardRowWith<
	RowT extends GenericBoard[number],
	ValT extends GetRowAllowedVals<RowT>,
	XorOT extends XOrO,
	// Do not allow numbers larger than 3, as a column can only have an index of 2
	IdxTArr extends never[] = [],
> = IdxTArr['length'] extends 3 ? RowT :
	ValT extends RowT[IdxTArr['length']] ? ReplaceIdxWith<RowT, IdxTArr['length'], XorOT> :
	ReplaceBoardRowWith<RowT, ValT, XorOT, [...IdxTArr, never]>;

type ReplaceBoardValWith<
	BoardT extends GenericBoard,
	ValT extends GetBoardAllowedVals<BoardT>,
	XorOT extends XOrO,
	// Do not allow numbers larger than 3, as a row can only have an index of 2
	IdxTArr extends never[] = [],
> =
	IdxTArr['length'] extends 3 ?
	BoardT :
	BoardT[IdxTArr['length']] extends GenericBoard[number] ?
	ReplaceIdxWith<BoardT, IdxTArr['length'], ReplaceBoardRowWith<BoardT[IdxTArr['length']], ValT, XorOT>> extends infer NewBoard ?
	NewBoard extends GenericBoard ?
	ReplaceBoardValWith<NewBoard, ValT, XorOT, [...IdxTArr, never]>
	: never : never : never;

// null === no valid moves
type FindValidRowMove<
	RowT extends GenericBoard[number],
	// Do not allow numbers larger than 3, as a row can only have an index of 2
	IdxTArr extends never[] = [],
> = IdxTArr['length'] extends 3 ?
	null :
	RowT[IdxTArr['length']] extends UserInput ? IdxTArr['length'] : FindValidRowMove<RowT, [...IdxTArr, never]>;

type FindValidBoardMove<
	BoardT extends GenericBoard,
	// Do not allow numbers larger than 3, as a row can only have an index of 2
	IdxTArr extends never[] = [],
> = IdxTArr['length'] extends 3 ?
	null :
	FindValidRowMove<BoardT[IdxTArr['length']]> extends infer ValidMove ?
	ValidMove extends null ? FindValidBoardMove<BoardT, [...IdxTArr, never]> :
	ValidMove extends number ?
	BoardT[IdxTArr['length']][ValidMove]
	: never
	: never;

;

type BoardWins = `
***
|||
|||
` | `
|||
***
|||
` | `
|||
|||
***
` | `
*||
*||
*||
` | `
|*|
|*|
|*|
` | `
||*
||*
||*
` | `
*||
|*|
||*
` | `
||*
|*|
*||
`

/**
 * `false` means no win
 * `true` means win
 */
type InnerCheckWin<BoardT extends GenericBoard, PlayerValT extends XOrO, ComputerValT extends XOrO> =
	Replace<BoardToString<BoardT>, ComputerValT | UserInput, `${string}`> extends Replace<Replace<BoardWins, "*", PlayerValT>, "|", `${string}`> ? true : false;

type CheckWin<BoardT extends GenericBoard, PlayerValT extends XOrO> =
	PlayerValT extends "O" ?
		"X" extends infer ComputerValT ?
			ComputerValT extends XOrO ?
				InnerCheckWin<BoardT, PlayerValT, ComputerValT> :
			never :
		never :
	PlayerValT extends "X" ? 
		"O" extends infer ComputerValT ?
			ComputerValT extends XOrO ?
				InnerCheckWin<BoardT, PlayerValT, ComputerValT> :
			never :
		never
		: never;

type Prompt<BoardT extends GenericBoard, ValT extends AllowedGenericPromptVals> =
	ValT extends GetBoardAllowedVals<BoardT> ?
	ReplaceBoardValWith<BoardT, ValT, "X"> extends infer UserPlayedBoard ?
	UserPlayedBoard extends GenericBoard ?
	FindValidBoardMove<UserPlayedBoard> extends infer MoveComputerPlays ?
	MoveComputerPlays extends GetBoardAllowedVals<UserPlayedBoard> ?
	ReplaceBoardValWith<UserPlayedBoard, MoveComputerPlays, "O">
	// Game is over: Calculate winner
	: true extends CheckWin<UserPlayedBoard, "X"> ? "Player wins!" :
	true extends CheckWin<UserPlayedBoard, "O"> ? "Computer wins!" :
	"Tie!"
	: never : never
	: never
	: "You must input a valid number";

/**
 * ---------------------------------------------------- GAME PLAY ------------------------------------ 
 */
const board = [
	["O", "O", "O"],
	["O", "O", "O"],
	["7", "O", "X"],
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
 * 
  * @example
 * ["O", "X", "3"],
 * ["4", "5", "6"],
 * ["X", "8", "9"]
 * 
 * @example
 * ["O", "X", "O"],
 * ["4", "5", "6"],
 * ["X", "8", "9"]
*/
type TurnOneBoard = Prompt<Board, "7">
type TurnTwoBoard = Prompt<TurnOneBoard, "2">

/**
 * ---------------------------------------------------- TESTS ------------------------------------ 
 */
// YOU WANT TESTS?! COME AND GET 
// If any of these are red, tests are brokey
const a = "123" satisfies ArrToStr<["1", "2", "3"]>
const egBoard = [
	["1", "2", "3"],
	["4", "5", "6"],
	["7", "8", "9"]
] satisfies GenericBoard;
const b = "\n123\n456\n789\n" satisfies BoardToString<typeof egBoard>
const c = [9, 2, 3] satisfies ReplaceIdxWith<[1, 2, 3], 0, 9>
const d = [1, 2, 9] satisfies ReplaceIdxWith<[1, 2, 3], 2, 9>
const e = "\n1X3\n456\n789\n" satisfies BoardToString<ReplaceBoardValWith<typeof egBoard, "2", "X">>
const f = "\n123\n456\nX89\n" satisfies BoardToString<ReplaceBoardValWith<typeof egBoard, "7", "X">>
const egPlayedBoard = [
	["X", "O", "3"],
	["4", "5", "6"],
	["7", "8", "9"]
] satisfies GenericBoard;

const g = "3" satisfies FindValidBoardMove<typeof egPlayedBoard>

const egMorePlayedBoard = [
	["X", "O", "X"],
	["O", "X", "6"],
	["7", "8", "9"]
] satisfies GenericBoard;

const h = "6" satisfies FindValidBoardMove<typeof egMorePlayedBoard>

const i = "asdc" as Replace<"ASDF", "F", "C">

const computerWinBoard = [
	["1", "2", "3"],
	["O", "O", "O"],
	["7", "O", "X"],
] satisfies GenericBoard;

type ComputerWinBoard = typeof computerWinBoard;

const j = false satisfies CheckWin<ComputerWinBoard, "X">
const k = true satisfies CheckWin<ComputerWinBoard, "O">

// TESTS ARE DONE, GO HOME NOW
