import { Box, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setAuthModalOpen } from "../../store/slice/authModalSlice";
import Logo from "./Logo";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";

const AuthModal = () => {
  const { authModal } = useAppSelector((state) => state.authModal);
  const dispatch = useAppDispatch();
  const [action, setAction] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    if (authModal) setAction("signin");
  }, [authModal]);

  const handleClose = () => dispatch(setAuthModalOpen(false));

  const switchAuthState = (state: "signin" | "signup") => setAction(state);

  return (
    <Modal open={authModal} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "600px",
          padding: 4,
          outline: "none",
        }}
      >
        <Box sx={{ padding: 4, boxShadow: 24, backgroundColor: "background.paper" }}>
          <Box sx={{ textAlign: "center", merginBottom: "2rem" }}>
            <Logo />
          </Box>
          {action === "signin" && <SigninForm switchAuthState={() => switchAuthState("signup")} />}
          {action === "signup" && <SignupForm switchAuthState={() => switchAuthState("signin")} />}
        </Box>
      </Box>
    </Modal>
  );
};

export default AuthModal;
