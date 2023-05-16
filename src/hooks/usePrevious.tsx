import { useEffect, useRef } from "react";

const usePrevious = (value: string) => {
  const ref = useRef<undefined | string>();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
