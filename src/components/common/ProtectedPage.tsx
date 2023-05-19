import { ReactElement, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setAuthModalOpen } from "../../store/slice/authModalSlice";

type Props = { children: ReactElement };

const ProtectedPage = ({ children }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(setAuthModalOpen(!user));
  }, [user, dispatch]);

  return user ? children : null;
};

export default ProtectedPage;
