import { test, describe, assertType } from 'vitest'
import { ArrToStr, Replace, ReplaceIdxWith } from '../src/utils';

describe("Replace", () => {
    test('Replacing a single character works', () => {
        assertType<Replace<"ASDF", "F", "C">>("ASDC");
    })
})

describe("ArrToStr", () => {
    test('Joins an array of strings', () => {
        assertType<ArrToStr<["1", "2", "3"]>>("123");
    })
})

describe("ReplaceIdxWith", () => {
    test('Replaces first index', () => {
        assertType<ReplaceIdxWith<[1, 2, 3], 0, 9>>([9, 2, 3]);
    })
    
    test("Replaces last index", () => {
        assertType<ReplaceIdxWith<[1, 2, 3], 2, 9>>([1, 2, 9]);
    })
})
