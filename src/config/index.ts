import prod from "./config.prod";
import dev from "./config.dev";

export const configSetting = process.env.REACT_APP_ENV === "PROD" ? prod : dev;
