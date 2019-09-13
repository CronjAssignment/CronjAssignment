import * as React from "react";
import "./userDetail.scss";
import { Icon } from "antd";
import { Translation } from "react-i18next";
import { connect } from "react-redux";
import { deleteUser } from "../../redux/actions/userAction";
import EditModal from "../EditUserModal/editUserModal";

interface IProps {
  name?: string;
  address?: string;
  key?: any;
  link?: string;
  user: any;
  index: number;
  deleteUser: any;
  userEditDetail: any;
  editindex: number;
  EditUser: any;
}

class UserDetail extends React.Component<IProps, {}> {
  public render(): React.ReactNode {
    return (
      <div>
        <div>
          <EditModal
            userEditDetail={this.props.user}
            editindex={this.props.index}
          />
          <Icon
            type="delete"
            className="iconContainer"
            onClick={() => this.props.deleteUser(this.props.index)}
          />
          <div>
            <img style={{ height: "100px" }} src="/avatar.png" alt="Avatar" />
            <h2>
              &nbsp;{this.props.user.name}&nbsp;{this.props.user.surname}
            </h2>
          </div>
          <p className="email">{this.props.user.email}</p>
        </div>
        <hr />
        <div className="profile-detail">
          <div className="user-detail">
            <div className="detail"></div>
            <div className="detail">
              <div className="title">
                <Translation>{t => t("name")}</Translation>
              </div>
              <div className="title-value">{this.props.user.name}</div>
            </div>
            <div className="detail">
              <div className="title">
                <Translation>{t => t("surname")}</Translation>
              </div>
              <div className="title-value">{this.props.user.surname}</div>
            </div>
            <div className="detail">
              <div className="title">
                <Translation>{t => t("email")}</Translation>
              </div>
              <div className="title-value">{this.props.user.email}</div>
            </div>
          </div>
        </div>
        <hr />
        <div>
          <span className="spanItem">
            <Icon type="contacts" />
            <Translation>{t => t("company")}</Translation>
          </span>
          <p> </p>
          <div className="client">
            <div className="client-title">
              <Translation>{t => t("client")}</Translation>:
            </div>
            <div className="client-title-value">{this.props.user.client}</div>
          </div>
          <div className="department">
            <div className="department-title">
              <Translation>{t => t("department")}</Translation>:
            </div>
            <div className="department-title-value">
              {this.props.user.department}
            </div>
          </div>
          <div className="phoneNumber">
            <div className="phoneNumber-title">
              <Translation>{t => t("phone_number")}</Translation>:
            </div>
            <div className="phoneNumber-title-value">
              {this.props.user.phoneNumber}
            </div>
          </div>
        </div>
        <hr />
        <div>
          <span className="spanItem">
            <Icon type="info" />
            <Translation>{t => t("language&religion")}</Translation>
          </span>
          <p> </p>
          <div className="system">
            <div className="system-title">
              <Translation>{t => t("language")}</Translation>:
            </div>
            <div className="system-title-value">{this.props.user.Language}</div>
          </div>
          <div className="system">
            <div className="system-title">
              <Translation>{t => t("timezone")}</Translation>:
            </div>
            <div className="system-title-value">{this.props.user.TimeZone}</div>
          </div>
          <div className="system">
            <div className="system-title">
              <Translation>{t => t("unitSystem")}</Translation>:
            </div>
            <div className="system-title-value">
              {this.props.user.UnitSystem}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteUser: index => dispatch(deleteUser(index))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(UserDetail);
