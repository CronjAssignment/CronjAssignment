/* eslint-disable array-callback-return */
import React from "react";
import "./layout.scss";
import { Redirect } from "react-router-dom";
import { Layout, Icon, Menu, Avatar, Button, Dropdown, Modal } from "antd";
import { Translation } from "react-i18next";
import i18n from "../../i18n";
import SingleUser from "../SingleUser/singleUser";
import SubSideBar from "../SubsideBar/subSideBar";
import { DropTarget } from "react-drag-drop-container";
const { Header, Sider, Content } = Layout;

interface Istate {
  collapsed: boolean;
  redirect?: boolean;
  language?: string;
  data?: any;
  showAll: boolean;
  showGroup: boolean;
  dropMessage: boolean;
  groupName: string;
  visible: boolean;
  visible1: boolean;
}

class layout extends React.Component<{}, Istate> {
  state = {
    collapsed: false,
    redirect: false,
    language: "Eng",
    groupName: "",
    data: [
      {
        groupName: "group1",
        users: []
      },
      {
        groupName: "group2",
        users: []
      }
    ],
    showAll: true,
    showGroup: false,
    dropMessage: true,
    visible: false,
    visible1: false
  };

  public componentDidMount(): void {
    if (localStorage.getItem("user") === null) {
      this.setState({
        redirect: true
      });
    }
  }

  onCollapse = (collapsed: boolean) => {
    this.setState({ collapsed });
  };

  handleOk = () => {
    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleOk1 = () => {
    this.setState({
      visible1: false
    });
  };

  handleCancel1 = () => {
    this.setState({
      visible1: false
    });
  };

  menuClicked = (key: any) => {
    if (key.key === "1") {
      this.setState({
        showAll: true,
        showGroup: false
      });
    } else if (key.key === "2") {
      this.setState({
        showAll: false,
        showGroup: true,
        groupName: "group1"
      });
    } else if (key.key === "3") {
      this.setState({
        showAll: false,
        showGroup: true,
        groupName: "group2"
      });
    }
  };

  //drops the dragged the data
  dropped = (ev: any, groupName: string) => {
    this.state.data.map((item: any) => {
      if (item.groupName === groupName) {
        ev.dragData.arr.map((val: any) => {
          if (item.users.find((x: any) => x.key === val.key) === undefined) {
            item.users.push(val);
            this.setState({
              visible: true
            });
          } else {
            this.setState({
              visible1: true
            });
          }
        });
      }
    });
  };

  //for log out
  public handlelogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("pass");
    localStorage.removeItem("isLoggedIn");
    localStorage.setItem("isLoggedIn", "false");
    this.setState({
      redirect: true
    });
  };

  public render(): React.ReactNode {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }

    const menu = (
      <Menu>
        <Menu.Item
          onClick={() => {
            this.setState({
              language: "Eng"
            });
            i18n.changeLanguage("en");
          }}
        >
          Eng
        </Menu.Item>
        <Menu.Item
          className="nav_menu"
          onClick={() => {
            this.setState({
              language: "De"
            });
            i18n.changeLanguage("de");
          }}
        >
          De
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout>
        <Sider
          className="layout_sider"
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
          breakpoint="lg"
        >
          <Modal
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={[
              <Button key="ok" type="primary" onClick={this.handleOk}>
                Ok
              </Button>
            ]}
          >
            <h3 style={{ color: "#4F8A10" }}>
              <Translation>{t => t("added")}</Translation>
            </h3>
          </Modal>

          <Modal
            visible={this.state.visible1}
            onCancel={this.handleCancel1}
            footer={[
              <Button key="ok" type="primary" onClick={this.handleOk1}>
                Ok
              </Button>
            ]}
          >
            <h3 style={{ color: "#cc0000" }}>
              <Translation>{t => t("error")}</Translation>
            </h3>
          </Modal>

          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item
              key="1"
              onClick={key => {
                this.menuClicked(key);
              }}
            >
              <Icon type="user" />
              <span>
                <Translation>{t => t("show_users")}</Translation>
              </span>
            </Menu.Item>
            <Menu.Item
              key="2"
              onClick={key => {
                this.menuClicked(key);
              }}
            >
              <DropTarget
                targetKey="foo"
                onHit={ev => {
                  this.dropped(ev, "group1");
                }}
              >
                <Icon type="info" />
                <span>
                  <Translation>{t => t("group1")}</Translation>
                </span>
              </DropTarget>
            </Menu.Item>
            <Menu.Item
              key="3"
              onClick={key => {
                this.menuClicked(key);
              }}
            >
              <DropTarget
                targetKey="foo"
                onHit={ev => {
                  this.dropped(ev, "group2");
                }}
              >
                <Icon type="info" />
                <span>
                  <Translation>{t => t("group2")}</Translation>
                </span>
              </DropTarget>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header className="app_header">
            <div className="layout_div">
              <Dropdown overlay={menu}>
                <a href="#">
                  {this.state.language}
                  <Icon type="down" />
                </a>
              </Dropdown>
              &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              <Avatar className="header_avatar" src="/avatar.png">
                Photo
              </Avatar>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                className="header_button"
                type="primary"
                onClick={this.handlelogout}
              >
                <Translation>{t => t("logout")}</Translation>
              </Button>
            </div>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#EBEDEF",
              minHeight: 280
            }}
          >
            {this.state.showAll === true ? (
              <SubSideBar />
            ) : (
              <div>
                {this.state.groupName === "group1" ? (
                  <SingleUser members={this.state.data[0].users} />
                ) : (
                  <SingleUser members={this.state.data[1].users} />
                )}
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default layout;
