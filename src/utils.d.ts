export type Replace<
  StrT extends string,
  FromT extends string,
  ToT extends string,
  Acc extends string = "",
> = StrT extends `${infer CharOneT}${infer RestOfStrT}`
  ? CharOneT extends FromT
    ? Replace<RestOfStrT, FromT, ToT, `${Acc}${ToT}`>
    : Replace<RestOfStrT, FromT, ToT, `${Acc}${CharOneT}`>
  : Acc;

export type ArrToStr<
  ArrT extends string[],
  AccT extends string = "",
> = ArrT extends [infer ItemT, ...infer RestT]
  ? ItemT extends string
    ? RestT extends string[]
      ? ArrToStr<RestT, `${AccT}${ItemT}`>
      : AccT
    : AccT
  : AccT;

type ReplaceIdxWith<
  ArrT extends unknown[],
  Idx extends number,
  Val,
  Acc extends ArrT[number][] = [],
> = ArrT extends [infer ItemT, ...infer RestT]
  ? Acc["length"] extends Idx
    ? [...Acc, Val, ...RestT]
    : ReplaceIdxWith<RestT, Idx, Val, [...Acc, ItemT]>
  : Acc;
