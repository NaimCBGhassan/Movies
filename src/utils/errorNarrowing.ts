type ErrorMsg = { msg?: string };
type ErrorMessage = { message?: string };

export function isErrorWithMessage(error: unknown): error is ErrorMessage {
  const flag1 = typeof error === "object";
  const flag2 = error != null;
  const flag3 = "message" in (error as Error);

  return flag1 && flag2 && flag3;
}

export function isErrorWithMsg(error: unknown): error is ErrorMsg {
  const flag1 = typeof error === "object";
  const flag2 = error != null;
  const flag3 = "msg" in (error as Error);

  return flag1 && flag2 && flag3;
}
