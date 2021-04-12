import { useEffect, useState } from "react";
export const isFalsy = (value) => (value === 0 ? false : !value);

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    // 0
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};

// 包装那些只需要执行一次的 callback
export const useMount = (callback) => {
  useEffect(() => {
    callback();
    // TODO 依赖项礼加上 callback 会造成无限循环，这个和 useCallback 以及 useMemo 有关
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

// 变量节流
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
