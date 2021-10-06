/**
 * @file 保存操作记录的hook
 * 参考 https://github.com/homerchen19/use-undo
 * 功能：撤销、重做
 */

import { useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  const [past, setPast] = useState<T[]>([]);
  const [present, setPresent] = useState(initialPresent);
  const [future, setFuture] = useState<T[]>([]);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const reset = () => {
    setPast([]);
    setPresent(initialPresent);
    setFuture([]);
  };

  const undo = () => {
    if (!canUndo) {
      return;
    }

    const len = past.length;
    const previous = past[len - 1];
    const newPast = past.slice(0, len - 1);

    setPast(newPast);
    setPresent(previous);
    setFuture([present, ...future]);
  };

  const redo = () => {
    if (!canRedo) {
      return;
    }

    const next = future[0];
    const newFuture = future.slice(1);

    setPast([...past, present]);
    setPresent(next);
    setFuture(newFuture);
  };

  const set = (newPresent: T) => {
    if (newPresent === present) {
      return;
    }

    setPast([...past, present]);
    setPresent(newPresent);
    setFuture([]); // ! 没有未来了
  };

  return [
    {
      past,
      present,
      future,
    },
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
