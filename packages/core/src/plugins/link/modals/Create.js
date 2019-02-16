import React, { PureComponent } from "react";
import styled from "@emotion/styled";
import { BasicButton, Input, Modal } from "nib-ui";

class CreateModal extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      linkText: this.getSelectedText(),
      href: "",
      isMouseDown: false
    };
    this.modalWrapper = React.createRef();
  }

  updateValue = evt => {
    this.setState({
      [`${evt.target.name}`]: evt.target.value
    });
  };

  addLink = () => {
    const { linkText, href } = this.state;
    if (!linkText || !linkText.length) return;
    const { view } = this.props;
    const { state, dispatch } = view;
    const {
      tr,
      selection: { $from, $to }
    } = state;
    dispatch(
      tr
        .insertText(linkText, $from.pos, $to.pos)
        .addMark(
          $from.pos,
          $from.pos + linkText.length,
          state.schema.marks.link.create({ href })
        )
        .setMeta("SHOW_LINK_TOOLBAR", false)
    );
    view.focus();
    this.closeModal();
  };

  getSelectedText = () => {
    const { view } = this.props;
    if (!view) return "";
    const { state } = view;
    const {
      selection: { $from, $to }
    } = state;
    return state.doc.textBetween($from.pos, $to.pos);
  };

  handleKeyDown = evt => {
    if (evt.key === "Enter") {
      this.addLink();
    }
  };

  closeModal = () => {
    const { view } = this.props;
    const { state, dispatch } = view;
    dispatch(state.tr.setMeta("SHOW_LINK_TOOLBAR", false));
  };

  render() {
    const { linkText, href } = this.state;
    const { editorWrapper, marker } = this.props;
    return (
      <Modal
        marker={marker}
        closeModal={this.closeModal}
        editorWrapper={editorWrapper}
      >
        <LinkPopup ref={this.modalWrapper}>
          <div>
            <Input
              autoFocus
              label="Text"
              name="linkText"
              onChange={this.updateValue}
              onKeyPress={this.handleKeyDown}
              value={linkText}
            />
            <Input
              label="Href"
              name="href"
              onChange={this.updateValue}
              onKeyPress={this.handleKeyDown}
              value={href}
            />
          </div>
          <StyledBasicButton onClick={this.addLink}>Apply</StyledBasicButton>
        </LinkPopup>
      </Modal>
    );
  }
}

export default {
  elmClassName: "nib-link-marker",
  component: CreateModal
};

const LinkPopup = styled.div`
  align-items: flex-end;
  background: white;
  border-radius: 4px;
  display: flex;
  padding: 5px 10px;
  font-size: 14px;
`;

const StyledBasicButton = styled(BasicButton)`
  margin: 4px 0;
`;
