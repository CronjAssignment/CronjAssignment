import * as React from "react";
import { EditUser } from "../../redux/actions/userAction";
import { connect } from "react-redux";
import languages from "../../utils/language.json";
import TimeZone from "../../utils/timezone.json";
import units from "../../utils/unit.json";
import { Translation } from "react-i18next";
import "./editUser.scss";
import { validateEmail, validatePhone } from "../../utils/validation";
import {
  Formik,
  FormikActions,
  FormikProps,
  Form,
  Field,
  FieldProps
} from "formik";

interface IState {
  email: string;
  name: string;
  surname: string;
  client: string;
  department: string;
  Language: string;
  TimeZone: string;
  UnitSystem: string;
  phoneNumber: string;
}

interface IProps {
  userEditDetail: any;
  editindex: number;
  EditUser?: any;
  handleCancel: any;
}

class EditUserDetail extends React.Component<IProps, IState> {
  state = {
    email: "",
    name: "",
    surname: "",
    client: "",
    department: "",
    Language: "",
    TimeZone: "",
    UnitSystem: "",
    phoneNumber: ""
  };

  handleCloseModal = () => {
    this.props.handleCancel();
  };

  onkeyDown = (keyEvent: any) => {
    if ((keyEvent.charCode || keyEvent.keyCode) === 13) {
      keyEvent.preventDefault();
    }
  };

  public render(): React.ReactNode {
    return (
      <div className="mainUserEdit">
        <div className="Usercontainer1">
          <Formik
            enableReinitialize={true}
            initialValues={{
              email: this.props.userEditDetail.email,
              surname: this.props.userEditDetail.surname,
              name: this.props.userEditDetail.name,
              client: this.props.userEditDetail.client,
              department: this.props.userEditDetail.department,
              Language: this.props.userEditDetail.Language,
              TimeZone: this.props.userEditDetail.TimeZone,
              UnitSystem: this.props.userEditDetail.UnitSystem,
              phoneNumber: this.props.userEditDetail.phoneNumber
            }}
            onSubmit={(values: IState, actions: FormikActions<IState>) => {
              actions.setSubmitting(false);
              values["key"] = this.props.userEditDetail.key;
              this.props.EditUser(values, this.props.editindex);
              this.handleCloseModal();
            }}
            render={(formikBag: FormikProps<IState>) => (
              <Form className="user-form1" onKeyDown={this.onkeyDown}>
                <h3 className="headingEdit">
                  <Translation>{t => t("edituser")}</Translation>
                </h3>
                <h3 className="editItem">
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
                      <div className="error-msg">
                        {form.touched.email &&
                          form.errors.email &&
                          form.errors.email}
                      </div>
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
                        placeholder="phoneNumber"
                      />
                      <div className="error-msg">
                        {form.touched.phoneNumber &&
                          form.errors.phoneNumber &&
                          form.errors.phoneNumber}
                      </div>
                    </div>
                  )}
                />

                <h3 className="editItem">
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

                <h3 className="editItem">
                  <Translation>{t => t("language&religion")}</Translation>
                </h3>
                <Field
                  name="Language"
                  component="select"
                  className="select"
                  placeholder="Language"
                >
                  <option value="">{this.props.userEditDetail.Language}</option>
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
                  <option value="">{this.props.userEditDetail.TimeZone}</option>
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
                  <option value="">
                    {this.props.userEditDetail.UnitSystem}
                  </option>
                  {units.map((unit, index) => (
                    <option key={index} value={unit.unit}>
                      {unit.unit}
                    </option>
                  ))}
                </Field>
                <br></br>
                <br></br>

                <button type="submit" className="submit-btn">
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
    EditUser: (values: any, index: any) => dispatch(EditUser(values, index))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(EditUserDetail);
