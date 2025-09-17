import * as yup from "yup";

const ChannelValidationSchema = (channelsNames, t) => {
  return yup.object().shape({
    name: yup
      .string()
      .required(t("errors.required"))
      .min(3, t("errors.lengthRules"))
      .max(20, t("errors.lengthRules"))
      .trim()
      .notOneOf(channelsNames, t('errors.unique')),
  });
};

const SignupValidationSchema = (t) => {
  return yup.object().shape({
    username: yup
      .string()
      .required(t("errors.required"))
      .min(3, t("errors.lengthRules"))
      .max(20, t("errors.lengthRules"))
      .trim(),
    password: yup
      .string()
      .min(6, t("errors.passwordMinLength"))
      .required(t("errors.required")),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], t("errors.passwordsMatch"))
      .required(t("errors.required")),
  });
};

export {SignupValidationSchema, ChannelValidationSchema};
