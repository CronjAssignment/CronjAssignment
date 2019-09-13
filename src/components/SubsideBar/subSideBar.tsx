/* eslint-disable array-callback-return */
import { Row, Col, Icon, Avatar } from "antd";
import * as React from "react";
import UserDetail from "../UserDetails/userDetail";
import NewUser from "../Adduser/addUser";
import { connect } from "react-redux";
import { Translation } from "react-i18next";
import { DragDropContainer } from "react-drag-drop-container";
import "./subsidebar.scss";

interface IState {
  userDetail: any;
  newUser: boolean;
  showUser: boolean;
  index: number;
  option?: any;
}
interface IProps {
  dataSource: any;
}

export class SubSideBar extends React.Component<IProps, IState> {
  state = {
    userDetail: "",
    newUser: false,
    showUser: false,
    index: 0,
    option: [-1]
  };

  public componentDidMount(): void {
    this.props.dataSource.map((item: any, index: number) => {
      if (index === 0) {
        this.setState({
          userDetail: item,
          newUser: false,
          showUser: true,
          index: index
        });
      }
    });
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IProps) {
    if (nextProps.dataSource.length > 0) {
      nextProps.dataSource.map((item: any, index: number) => {
        if (index === 0) {
          this.setState({
            userDetail: item,
            index: index
          });
        }
      });
    } else {
      this.setState({
        userDetail: "",
        index: 0
      });
    }
  }

  //view detail of selected user
  private handleUser = (value: number) => {
    this.props.dataSource.map((item: any, index: number) => {
      if (value === index) {
        this.setState({
          userDetail: item,
          index: index,
          newUser: false,
          showUser: true
        });
      }
    });
  };

  private handleClick = () => {
    this.setState({
      newUser: !this.state.newUser,
      showUser: false
    });
  };

  private HandleSubmit = () => {
    this.setState({
      newUser: !this.state.newUser,
      showUser: true
    });
  };

  private handleDrop = () => {
    this.setState({
      option: [-1]
    });
  };

  onChange = (e: any) => {
    const option = this.state.option;
    let index: any;
    if (e.target.checked) {
      option.push(+e.target.value);
    } else {
      index = option.indexOf(+e.target.value);
      if (index !== -1) {
        option.splice(index, 1);
      }
    }
    this.setState({ option: option });
  };

  public render(): React.ReactNode {
    let arr = [] as any;
    return (
      <div>
        <Row>
          <Col lg={12} md={12} xs={24} sm={24} className="list">
            <button className="button" onClick={this.handleClick}>
              <Translation>{t => t("addnewuser")}</Translation>
              &nbsp;&nbsp;
              <Icon type="plus" />
            </button>
            <div>
              {this.state.option.length > 1 ? (
                <div>
                  {this.props.dataSource.map((item, index) => {
                    if (this.state.option.includes(index)) {
                      arr.push(item);
                    }
                  })}
                </div>
              ) : null}
              <div className="test">
                {this.state.option.length > 1 ? (
                  <div
                    style={{
                      maxHeight: "700px",
                      overflow: "auto"
                    }}
                  >
                    <DragDropContainer
                      dragData={{ arr }}
                      targetKey="foo"
                      dragClone="true"
                      onDrop={this.handleDrop}
                    >
                      <table className="userList">
                        <tbody>
                          {this.props.dataSource.map((item, index) => {
                            if (this.state.option.includes(index)) {
                              return (
                                <tr
                                  key={index}
                                  style={{
                                    border: "1px solid black",
                                    backgroundColor: "skyblue"
                                  }}
                                >
                                  <td>
                                    <Avatar src="avatar.png" />
                                  </td>
                                  <td>{item.name}</td>
                                  <td>{item.email}</td>
                                </tr>
                              );
                            }
                          })}
                        </tbody>
                      </table>
                    </DragDropContainer>
                  </div>
                ) : null}
                <div
                  style={{
                    maxHeight: "700px",
                    overflow: "auto"
                  }}
                >
                  <table className="userList">
                    <tbody>
                      <tr>
                        <th> </th>
                        <th>
                          <Translation>{t => t("avatar")}</Translation>
                        </th>
                        <th> Name </th>
                        <th> Email </th>
                        <th>
                          <Translation>{t => t("more")}</Translation>
                        </th>
                      </tr>
                      {this.props.dataSource.map((item1, index1) => {
                        return (
                          <tr
                            key={index1}
                            onClick={() => this.handleUser(index1)}
                            style={{ border: "1px solid black" }}
                          >
                            <td>
                              <input
                                type="checkbox"
                                value={index1}
                                onChange={this.onChange}
                              />
                            </td>
                            <td>
                              <Avatar src="/avatar.png" />
                            </td>
                            <td>{item1.name}</td>
                            <td>{item1.email}</td>
                            <td>
                              <Icon type="arrow-right" />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={12} md={12} xs={24} sm={24}>
            {this.state.showUser === true ? (
              this.state.userDetail ? (
                <div className="userContents">
                  <UserDetail
                    user={this.state.userDetail}
                    index={this.state.index}
                  />
                </div>
              ) : null
            ) : this.state.newUser === true ? (
              <NewUser HandleSubmit={this.HandleSubmit} />
            ) : null}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return { dataSource: state.stateData.dataSource };
};

export default connect(mapStateToProps)(SubSideBar);
