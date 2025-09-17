import { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import { Button, Form } from "react-bootstrap";
import { formsNames, getFormInitialValues } from "./helpers/helper";
import { chatApi, clientRoutes } from "../routes";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice.js";
import { useTranslation } from "react-i18next";

function LoginFormComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const usernameInputRef = useRef(null);

  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [errorValue, setErrorValue] = useState(null);

  const loginStatus = useSelector((state) => state.auth.loginStatus);
  const loginError = useSelector((state) => state.auth.error);

  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: getFormInitialValues(formsNames.LOGIN_FORM),
    onSubmit: (values) => {
      setDisabled(true);
      const data = { values, api: chatApi.login };
      dispatch(loginUser(data));
      setDisabled(false);
    },
  });

  useEffect(() => {
    if (loginStatus) navigate(clientRoutes.home);
    if (loginError) {
      setError(true);
      usernameInputRef.current.select();
      if (loginError.code === "ERR_BAD_REQUEST") {
        setErrorValue(t("errors.incorrectPasswordOrUsername"));
      } else if (loginError.code === "ERR_NETWORK") {
        setErrorValue(t("errors.network"));
      } else setErrorValue(t("errors.unknown"));
    }
  }, [loginStatus, loginError, navigate, t]);

  useEffect(() => {
    usernameInputRef.current.focus();
  }, []);

  return (
    <Form
      className="col-12 col-md-6 mt-3 mt-md-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t("loginPage.login")}</h1>
      <Form.Floating className="mb-3">
        <Form.Control
          placeholder={t("loginPage.yourUsername")}
          name="username"
          autoComplete="username"
          required
          id="username"
          ref={usernameInputRef}
          onChange={formik.handleChange}
          value={formik.values.username}
          isInvalid={error}
        />
        <Form.Label htmlFor="username">
          {t("loginPage.yourUsername")}
        </Form.Label>
      </Form.Floating>

      <Form.Floating className="mb-4">
        <Form.Control
          placeholder={t("password")}
          name="password"
          type="password"
          autoComplete="current-password"
          required
          id="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          isInvalid={error}
        />
        <Form.Label htmlFor="password">{t("password")}</Form.Label>
        {error && (
          <Form.Control.Feedback type="invalid" tooltip>
            {errorValue}
          </Form.Control.Feedback>
        )}
      </Form.Floating>

      <Button
        type="submit"
        variant="outline-primary"
        className="w-100"
        disabled={disabled}
      >
        {t("loginPage.login")}
      </Button>
    </Form>
  );
}

export default LoginFormComponent;
