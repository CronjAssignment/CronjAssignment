import * as React from "react";
import { Redirect } from "react-router-dom";
import config from "../../config/config";
import { validateEmail } from "../../utils/validation";
import {
  Formik,
  FormikActions,
  FormikProps,
  Form,
  Field,
  FieldProps
} from "formik";
import "./login.scss";

interface IState {
  email: string;
  password: string;
  rememberMe: string;
  isloggedIn: boolean;
  login: boolean;
  redirect: boolean;
}

class Login extends React.Component<{}, IState> {
  state = {
    isloggedIn: false,
    email: "",
    password: "",
    rememberMe: "",
    login: false,
    redirect: false
  };

  public componentDidMount(): void {
    let isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      this.setState({
        redirect: true
      });
    }
  }

  public render(): React.ReactNode {
    if (this.state.isloggedIn) {
      return <Redirect to="/layout" />;
    }
    if (this.state.redirect) {
      return <Redirect to="/layout" />;
    }
    return (
      <div className="main">
        <div className="logincontainer">
          <Formik
            initialValues={{
              email: "",
              password: "",
              rememberMe: "",
              isloggedIn: false,
              login: false,
              redirect: false
            }}
            onSubmit={(values: IState, actions: FormikActions<IState>) => {
              if (
                config.user.email === values.email &&
                config.user.password === values.password
              ) {
                localStorage.setItem("user", values.email);
                localStorage.setItem("pass", values.password);
                localStorage.setItem("isLoggedIn", values.rememberMe);
                this.setState({
                  isloggedIn: true
                });
                actions.setSubmitting(false);
              } else {
                this.setState({
                  login: true
                });
              }
            }}
            render={(formikBag: FormikProps<IState>) => (
              <Form className="login-form">
                <h3 className="h3">Login</h3>
                <Field
                  name="email"
                  validate={validateEmail}
                  render={({ field, form }: FieldProps<IState>) => (
                    <div>
                      <input
                        type="text"
                        className="field"
                        {...field}
                        placeholder="Email"
                      />
                      <div className="validate">
                        {form.touched.email &&
                          form.errors.email &&
                          form.errors.email}
                      </div>
                    </div>
                  )}
                />
                <Field
                  name="password"
                  render={({ field, form }: FieldProps<IState>) => (
                    <div>
                      <input
                        type="password"
                        className="field"
                        {...field}
                        placeholder="Password"
                      />
                      {form.touched.password &&
                        form.errors.password &&
                        form.errors.password}
                    </div>
                  )}
                />
                {this.state.login === true ? (
                  <h4 className="validation">Invalid Credentials</h4>
                ) : null}
                <Field name="rememberMe" type="checkbox" className={"check"} />
                <h4 className="h4">Remember me</h4>
                <button type="submit" className="submit">
                  Submit
                </button>
              </Form>
            )}
          />
        </div>
      </div>
    );
  }
}

export default Login;
