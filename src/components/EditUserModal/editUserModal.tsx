import React from "react";
import { Modal, Icon } from "antd";
import EditUserDetail from "../EditUser/editUser";

interface IState {
  visible: boolean;
}

interface IProps {
  userEditDetail: any;
  editindex: number;
  EditUser?: any;
}

class EditModal extends React.Component<IProps, IState> {
  state = {
    visible: false
  };

  private showModal = () => {
    this.setState({
      visible: true
    });
  };

  public handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  public render(): React.ReactNode {
    return (
      <div>
        <Icon type="edit" className="iconContainer" onClick={this.showModal} />
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={null}
        >
          <EditUserDetail
            userEditDetail={this.props.userEditDetail}
            editindex={this.props.editindex}
            handleCancel={this.handleCancel}
          />
        </Modal>
      </div>
    );
  }
}
export default EditModal;
