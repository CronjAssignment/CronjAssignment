import * as React from "react";
import { connect } from "react-redux";
import { createUser } from "../../redux/actions/userAction";
import languages from "../../utils/language.json";
import TimeZone from "../../utils/timezone.json";
import units from "../../utils/unit.json";
import { validateEmail, validatePhone } from "../../utils/validation";
import "./addUser.scss";
import { Translation } from "react-i18next";
import uuid from "uuidv4";
import {
  Formik,
  FormikActions,
  FormikProps,
  Form,
  Field,
  FieldProps
} from "formik";

interface IState {
  name: string;
  surname: string;
  client: string;
  email: string;
  department: string;
  TimeZone: string;
  phoneNumber: string;
}

interface IProps {
  createUser: any;
  HandleSubmit: any;
}

class NewUser extends React.Component<IProps, IState> {
  state = {
    name: "",
    surname: "",
    client: "",
    email: "",
    department: "",
    TimeZone: "",
    phoneNumber: ""
  };

  public render(): React.ReactNode {
    return (
      <div className="mainUser">
        <div className="Usercontainer">
          <Formik
            enableReinitialize={true}
            initialValues={{
              name: "",
              surname: "",
              client: "",
              email: "",
              department: "",
              TimeZone: "",
              phoneNumber: ""
            }}
            onSubmit={(values: IState, actions: FormikActions<IState>) => {
              actions.setSubmitting(false);
              values["key"] = uuid();
              this.props.HandleSubmit();
              this.props.createUser(values);
            }}
            render={(formikBag: FormikProps<IState>) => (
              <Form className="user-form">
                <h3 className="heading">
                  <Translation>{t => t("createnewuser")}</Translation>
                </h3>
                <h3 className="formItem">
                  <Translation>{t => t("contactinfo")}</Translation>
                </h3>
                <Field
                  name="name"
                  render={({ field, form }: FieldProps<IState>) => (
                    <div>
                      <input
                        type="text"
                        className="field"
                        {...field}
                        placeholder="First Name"
                      />
                    </div>
                  )}
                />
                <Field
                  name="surname"
                  render={({ field, form }: FieldProps<IState>) => (
                    <div>
                      <input
                        type="text"
                        className="field"
                        {...field}
                        placeholder="Last Name"
                      />
                    </div>
                  )}
                />
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
                      {form.touched.email &&
                        form.errors.email &&
                        form.errors.email}
                    </div>
                  )}
                />
                <Field
                  name="phoneNumber"
                  validate={validatePhone}
                  render={({ field, form }: FieldProps<IState>) => (
                    <div>
                      <input
                        type="text"
                        className="field"
                        {...field}
                        placeholder="Phone Number"
                      />
                      {form.touched.phoneNumber &&
                        form.errors.phoneNumber &&
                        form.errors.phoneNumber}
                    </div>
                  )}
                />
                <hr className="hr" />
                <h3 className="formItem">
                  <Translation>{t => t("company")}</Translation>
                </h3>
                <Field
                  name="client"
                  render={({ field, form }: FieldProps<IState>) => (
                    <div>
                      <input
                        type="text"
                        className="field"
                        {...field}
                        placeholder="Client"
                      />
                    </div>
                  )}
                />
                <Field
                  name="department"
                  render={({ field, form }: FieldProps<IState>) => (
                    <div>
                      <input
                        type="text"
                        className="field"
                        {...field}
                        placeholder="Department"
                      />
                    </div>
                  )}
                />
                <hr className="hr" />
                <h3 className="formItem">
                  <Translation>{t => t("language&religion")}</Translation>
                </h3>
                <Field
                  name="Language"
                  component="select"
                  className="select"
                  placeholder="Language"
                >
                  <option value="">Select Language</option>
                  {languages.map((language, index) => (
                    <option key={index} value={language.name}>
                      {language.name}
                    </option>
                  ))}
                </Field>
                <Field
                  name="TimeZone"
                  component="select"
                  className="select"
                  placeholder="Language"
                >
                  <option value="">Select Timezone</option>
                  {TimeZone.map((timeZone, index) => (
                    <option key={index} value={timeZone.abbr}>
                      {timeZone.abbr}
                    </option>
                  ))}
                </Field>
                <Field
                  name="UnitSystem"
                  component="select"
                  className="select"
                  placeholder="Unit System"
                >
                  <option value="">Select Unit</option>
                  {units.map((unit, index) => (
                    <option key={index} value={unit.unit}>
                      {unit.unit}
                    </option>
                  ))}
                </Field>
                <br></br>
                <br></br>
                <button type="submit" className="submit">
                  <Translation>{t => t("submit")}</Translation>
                </button>
              </Form>
            )}
          />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    createUser: (values: any) => dispatch(createUser(values))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(NewUser);
