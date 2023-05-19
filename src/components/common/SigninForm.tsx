import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useAppDispatch } from "../../store/store";
import * as Yup from "yup";
import * as userApi from "../../store/api/user";
import { setAuthModalOpen } from "../../store/slice/authModalSlice";
import { setUser } from "../../store/slice/userSlice";
import { isErrorWithMessage, isErrorWithMsg } from "../../utils/errorNarrowing";

type Props = { switchAuthState: () => void };

const SigninForm = ({ switchAuthState }: Props) => {
  const dispatch = useAppDispatch();

  const [signin, { isLoading, error }] = userApi.useLoginMutation();

  const signinForm = useFormik<{
    username: string;
    password: string;
  }>({
    initialValues: {
      password: "",
      username: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(8, "username minimun 8 characters").required("username is required"),
      password: Yup.string().min(8, "password minimun 8 characters").required("password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const data = await signin(values);
        if (!("data" in data)) {
          const { error } = data;
          throw error;
        }
        dispatch(setUser(data.data));
        dispatch(setAuthModalOpen(false));
      } catch (error) {
        console.log(error);
      }
      signinForm.resetForm();
    },
  });

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          placeholder="username"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="success"
          error={signinForm.touched.username && signinForm.errors.username !== undefined}
          helperText={signinForm.touched.username && signinForm.errors.username}
        />
        <TextField
          type="password"
          placeholder="password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={signinForm.touched.password && signinForm.errors.password !== undefined}
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
      </Stack>
      <LoadingButton type="submit" variant="contained" fullWidth size="large" sx={{ marginTop: 4 }} loading={isLoading}>
        sign in
      </LoadingButton>
      <Button fullWidth sx={{ marginTop: 1 }} onClick={() => switchAuthState()}>
        sign up
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

export default SigninForm;
