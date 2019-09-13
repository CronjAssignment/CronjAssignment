import * as React from "react";
import { Table } from "antd";
import { Translation } from "react-i18next";

interface IProps {
  members: any;
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name"
  },

  {
    title: "Email",
    dataIndex: "email",
    key: "email"
  },
  {
    title: <Translation>{t => t("department")}</Translation>,
    dataIndex: "department",
    key: "department"
  },
  {
    title: <Translation>{t => t("phone_number")}</Translation>,
    dataIndex: "phoneNumber",
    key: "phoneNumber"
  }
];

class SingleUser extends React.Component<IProps, {}> {
  state = {};
  s;
  public render(): React.ReactNode {
    return (
      <div>
        <div>
          <Table
            className="userTable"
            dataSource={this.props.members}
            scroll={{ x: 200 }}
            columns={columns}
            pagination={{ hideOnSinglePage: true }}
          />
        </div>
      </div>
    );
  }
}

export default SingleUser;
