<div align="center">
<h1>✖️ Tic-Tac-Type ⭕</h1>
<p>An implementation of Tic-Tac-Toe written using only TypeScript types</p>
</div>

---

<div align="center">

[![Test Status](https://img.shields.io/github/actions/workflow/status/crutchcorn/tic-tac-types/test.yml?branch=main&label=tests)](https://github.com/crutchcorn/tic-tac-types/actions/workflows/test.yml?query=branch%3Amain)
[![license](https://badgen.now.sh/badge/license/MIT)](./LICENSE.md)

</div>

---

There is zero JavaScript to play this game of Tic-Tac-Toe, only TypeScript type definitions. You'll notice everything in `src` is written as `.d.ts` files to prove this to you.

There are also tests to validate the functionality of the games' components.

## How to Play

The game is set up and ready to play in [`./game-demo.ts`](./game-demo.ts). The board that's set up is structed like so:

```ts
type Board = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
];
```

To play a move, you use the `Prompt` type:

```ts
type TurnOne = Prompt<Board, "7">;
```

This will play `X` where the `"7"` previously was, and the "AI" will automatically play `"O"`:

```ts
type Board = [
  ["O", "2", "3"],
  ["4", "5", "6"],
  ["X", "8", "9"],
];
```

When a few moves are played:

```ts
type Board = [
  ["O", "O", "3"],
  ["4", "5", "6"],
  ["X", "X", "9"],
];

Prompt<Board, "9">
```

It will output: `"Player wins!"` or `"Computer wins!"` depending on who last played.

## Notes

- The AI will only ever play the first available move on the board, making it trivial to cheat
    - The only file that needs to be changed here is `ai.ts`, everything else should support this
- In the future, the final played board would be nice to see the win/loss against
- Win conditions are currently represented as strings in `win-conditions.ts`.
    - It might be nice to define the size of a board, and would require this logic to change