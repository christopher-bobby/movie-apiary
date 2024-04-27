import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useRef,
  useLayoutEffect,
} from "react";

// const isBrowser = typeof window !== "undefined";
// const noop = () => {};



const useLocalStorage = <T>(
  key: string,
  initialValue?: T,
): [T | undefined, Dispatch<SetStateAction<T | undefined>>, () => void] => {


  const deserializer = JSON.parse;
  const initializer = useRef((key: string) => {
    try {
      const serializer = JSON.stringify;

      const localStorageValue = localStorage.getItem(key);
      if (localStorageValue !== null) {
        return deserializer(localStorageValue);
      } else {
        initialValue && localStorage.setItem(key, serializer(initialValue));
        return initialValue;
      }
    } catch {
      return initialValue;
    }
  });

  const [state, setState] = useState<T | undefined>(() =>
    initializer.current(key)
  );

  const set: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (valOrFunc) => {
      try {
        const newState =
          typeof valOrFunc === "function"
            ? (valOrFunc as Function)(state)
            : valOrFunc;
        if (typeof newState === "undefined") return;
        
        const value = JSON.stringify(newState);

        localStorage.setItem(key, value);
        setState(deserializer(value));
      } catch {
        console.log("error setting localstorage")
      }
    },
    [key, setState]
  );

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setState(undefined);
    } catch {
      console.log("error setting localstorage")
    }
  }, [key, setState]);


  useLayoutEffect(() => setState(initializer.current(key)), [key]);

  return [state, set, remove];
};

export default useLocalStorage;
