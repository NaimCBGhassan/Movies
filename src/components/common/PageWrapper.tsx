import { ReactElement, useEffect } from "react";
import { useAppDispatch } from "../../store/store";
import { setAppState } from "../../store/slice/appStateSlice";

type Props = { state: string; children: ReactElement };

const PageWrapper = ({ state, children }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setAppState(state));
  }, [state, dispatch]);

  return children;
};

export default PageWrapper;
