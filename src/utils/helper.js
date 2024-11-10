export const sessionExpInSecs = () => +process.env.SESSION_EXP_SECS;
export const sessionExpInMSecs = () => +process.env.SESSION_EXP_SECS * 100;

export const secret = () => process.env.JWT_SECRET;

export const port = (PORT = 5000) => process.env.PORT || PORT;
