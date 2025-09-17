import axios from "axios";

const formsNames = {
  LOGIN_FORM: "login",
  SIGNUP_FORM: "signup",
  MESSAGE_FORM: "message",
  ADDNEWCHANNEL_FORM: "addChannel",
  RENAME_CHANNEL_FORM: "renameChannel",
};

function getFormInitialValues(name) {
  const values = {
    username: "",
    password: "",
  };
  switch (name) {
    case formsNames.SIGNUP_FORM:
      return { ...values, confirmPassword: "" };
    case formsNames.MESSAGE_FORM:
      return { message: "" };
    case formsNames.LOGIN_FORM:
      return values;
    case formsNames.ADDNEWCHANNEL_FORM:
      return { name: "" };
    case formsNames.RENAME_CHANNEL_FORM:
      return { name: "" };
  }
}

function headers(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function getData(api, token) {
  const response = await axios.get(api, headers(token));
  return response.data;
}

export { formsNames, getFormInitialValues, headers, getData };
