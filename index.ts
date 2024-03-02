type UserInput = `${number}`
type XOrO = "X" | "O";

type GenericBoard = [
	[XOrO | "1", XOrO | "2", XOrO | "3"],
	[XOrO | "4", XOrO | "5", XOrO | "6"],
	[XOrO | "7", XOrO | "8", XOrO | "9"]
]

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
	AccT : AccT :
	AccT;

// YOU WANT TESTS?! COME AND GET 
const a = "123" satisfies ArrToStr<["1", "2", "3"]>
const egBoard = [
["1", "2", "3"],
["4", "5", "6"],
["7", "8", "9"]
] satisfies GenericBoard;
const b = "\n123\n456\n789" satisfies BoardToString<typeof egBoard>
// TESTS ARE DONE, GO HOME NOW

type ValueOfKey<T extends object> = T[keyof T]

type AllowedPromptVals = GenericBoard[number][number];

type Prompt<BoardT extends GenericBoard, Val extends AllowedPromptVals> = BoardT;

const board = [
	["1", "2", "3"],
	["4", "5", "6"],
	["7", "8", "9"],
] satisfies GenericBoard;

type Board = typeof board;

/**
 * @example
 * ["1", "2", "3"],
 * ["4", "5", "6"],
 * ["X", "8", "9"]
 */
type TurnOneBoard = Prompt<Board, "7">