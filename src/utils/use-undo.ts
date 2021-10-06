/**
 * @file 保存操作记录的hook
 * 参考 https://github.com/homerchen19/use-undo
 * 功能：撤销、重做
 */

import { useCallback, useReducer } from "react";

const UNDO = "UNDO";
const REDO = "REDO";
const SET = "SET";
const RESET = "RESET";

type State<T> = {
  past: T[];
  present: T;
  future: T[];
};

type Action<T> = {
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
  newPresent?: T;
};

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const { past, present, future } = state;
  const { type, newPresent } = action;

  switch (type) {
    case UNDO:
      if (past.length === 0) return state;

      const len = past.length;
      const previous = past[len - 1];
      const newPast = past.slice(0, len - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    case REDO:
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    case SET:
      if (newPresent === present) return state;

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    case RESET:
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    default:
      return state;
  }
};

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: [],
  } as State<T>);

  const canUndo = state.past.length > 0;
  const canRedo = state.future.length > 0;
  const undo = useCallback(() => dispatch({ type: UNDO }), []);
  const redo = useCallback(() => dispatch({ type: REDO }), []);
  const set = useCallback(
    (newPresent: T) => dispatch({ type: SET, newPresent }),
    []
  );
  const reset = useCallback(
    (newPresent: T) => dispatch({ type: RESET, newPresent }),
    []
  );

  return [
    state,
    {
      set,
      reset,
      undo,
      redo,
      canUndo,
      canRedo,
    },
  ];
};
