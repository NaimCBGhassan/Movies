import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch } from "../../store/store";
import * as Yup from "yup";
import * as userApi from "../../store/api/user";
import { setAuthModalOpen } from "../../store/slice/authModalSlice";
import { setUser } from "../../store/slice/userSlice";
import { isErrorWithMessage, isErrorWithMsg } from "../../utils/errorNarrowing";
import { UserRegister } from "../../types/user";
import { toast } from "react-toastify";

type Props = { switchAuthState: () => void };

const SignupForm = ({ switchAuthState }: Props) => {
  const dispatch = useAppDispatch();

  const [signup, { isLoading, error }] = userApi.useRegisterMutation();

  const signupForm = useFormik<UserRegister>({
    initialValues: {
      password: "",
      username: "",
      displayName: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(8, "username minimun 8 characters").required("username is required"),
      password: Yup.string().min(8, "password minimun 8 characters").required("password is required"),
      displayName: Yup.string().min(8, "displayName minimun 8 characters").required("displayName is required"),
      confirmPassword: Yup.string()
        .min(8, "confirmPassword minimun 8 characters")
        .required("confirmPassword is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await signup(values);
        if (!("data" in data)) {
          const { error } = data;
          throw error;
        }
        dispatch(setUser(data.data));
        dispatch(setAuthModalOpen(false));
        toast.success("Sign In success");
      } catch (err) {
        if (err && isErrorWithMessage(err)) toast.error(err.message);
        if (err && isErrorWithMsg(err)) toast.error(err.msg);
      }
      signupForm.resetForm();
    },
  });

  return (
    <Box component="form" onSubmit={signupForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={signupForm.values.username}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.username && signupForm.errors.username !== undefined}
          helperText={signupForm.touched.username && signupForm.errors.username}
        />
        <TextField
          type="text"
          placeholder="display name"
          name="displayName"
          fullWidth
          value={signupForm.values.displayName}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.displayName && signupForm.errors.displayName !== undefined}
          helperText={signupForm.touched.displayName && signupForm.errors.displayName}
        />{" "}
        <TextField
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          value={signupForm.values.password}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.password && signupForm.errors.password !== undefined}
          helperText={signupForm.touched.password && signupForm.errors.password}
        />
        <TextField
          type="confirmPassword"
          placeholder="confirm password"
          name="confirmPassword"
          fullWidth
          value={signupForm.values.confirmPassword}
          onChange={signupForm.handleChange}
          color="success"
          error={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword !== undefined}
          helperText={signupForm.touched.confirmPassword && signupForm.errors.confirmPassword}
        />
      </Stack>
      <LoadingButton type="submit" variant="contained" fullWidth size="large" sx={{ marginTop: 4 }} loading={isLoading}>
        sign up
      </LoadingButton>
      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign in
      </Button>

      {error && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {isErrorWithMsg(error) && error.msg}
            {isErrorWithMessage(error) && error.message}
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default SignupForm;
