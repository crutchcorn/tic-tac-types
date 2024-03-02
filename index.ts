type UserInput = `${number}`
type XOrO = "X" | "O";

type GenericBoard = [
	[XOrO | "1", XOrO | "2", XOrO | "3"],
	[XOrO | "4", XOrO | "5", XOrO | "6"],
	[XOrO | "7", XOrO | "8", XOrO | "9"]
]

type JoinArrToStr<ArrT extends string[], AccT extends string = ""> = 
	ArrT extends [infer ItemT, ...infer RestT] ?
		ItemT extends string ? 
			RestT extends string[] ?
		JoinArrToStr<RestT, `${AccT}${ItemT}`> :
		 AccT : AccT :
	AccT; 

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
 * ["1", "2", "3"],
 * ["4", "5", "6"],
 * ["X", "8", "9"]
 */
type TurnOneBoard = Prompt<Board, "7">