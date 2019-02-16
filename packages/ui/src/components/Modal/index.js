import PropTypes from "prop-types";
import React, { Component } from "react";
import styled from "@emotion/styled";

const ARROW_HEIGHT = 6;

const isSamePos = (oldPos, newPos) => {
  if (!oldPos) return false;
  if (
    oldPos.height !== newPos.height ||
    oldPos.left !== newPos.left ||
    oldPos.offsetTop !== newPos.offsetTop ||
    oldPos.width !== newPos.width
  )
    return false;
  return true;
};

// todo: refactor to put constants, code cleanup
// Note: current left alignment does not take care of padding of section,
// this can be improved in future.
const getPosition = (marker, modalElm, editorWrapper) => {
  const markerDim = marker.getBoundingClientRect();
  const wrapperRefDim = editorWrapper.getBoundingClientRect();
  const { width: modalWidth = 0, height: modalHeight = 0 } = modalElm
    ? modalElm.getBoundingClientRect()
    : {};

  let arrowDir = "TOP";
  let left = -(wrapperRefDim.left - markerDim.left);
  left += (markerDim.width - modalWidth) / 2;

  let arrowLeft;
  if (left < 0) {
    arrowLeft = Math.abs(left) > modalWidth / 2 - 10 ? left + 10 : left;
    left = -1;
  } else if (left + modalWidth > wrapperRefDim.width) {
    arrowLeft = left + modalWidth - wrapperRefDim.width;
    left = wrapperRefDim.width - modalWidth - 1;
  }
  if (left < 2) left = 2;

  let top =
    markerDim.y - wrapperRefDim.y + (markerDim.height || 20) + 4 + ARROW_HEIGHT;
  if (top + modalHeight > wrapperRefDim.height) {
    const newTop =
      markerDim.y - wrapperRefDim.y - ARROW_HEIGHT - modalHeight - 4;
    if (newTop > 0) {
      arrowDir = "BOTTOM";
      top = newTop;
    }
  }

  return {
    modalPosition: { top, left },
    arrowPosition: { left: arrowLeft, dir: arrowDir }
  };
};

export default class Modal extends Component {
  wrapperRef = React.createRef();
  state = { modalPosition: {}, arrowPosition: { dir: "TOP" } };

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.object,
    closeModal: PropTypes.func,
    editorWrapper: PropTypes.object,
    marker: PropTypes.object
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyPress);
    const { marker, editorWrapper } = this.props;
    if (marker) {
      this.setState({
        ...getPosition(marker, this.wrapperRef.current, editorWrapper.current)
      });
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener("keydown", this.handleKeyPress);
  };

  componentDidUpdate() {
    const { marker, editorWrapper } = this.props;
    if (!marker) return;
    const oldPos = this.markerPos;
    const markerDim = marker.getBoundingClientRect();
    this.markerPos = {
      height: markerDim.height,
      left: markerDim.left,
      offsetTop: marker.offsetTop,
      width: markerDim.width
    };
    if (isSamePos(oldPos, this.markerPos) && this.state.modalPosition) return;
    this.setState({
      ...getPosition(marker, this.wrapperRef.current, editorWrapper.current)
    });
  }

  handleKeyPress = evt => {
    if (evt.key === "Escape") this.props.closeModal();
  };

  onMouseDown = () => {
    this.active = true;
  };

  onKeyDown = e => {
    if (e.key === "Tab") this.active = true;
  };

  onFocus = () => {
    if (this.active) this.active = false;
  };

  onBlur = () => {
    if (this.active) this.active = false;
    else this.props.closeModal();
  };

  render() {
    const { className, children, marker } = this.props;
    if (!marker) return null;
    const { modalPosition, arrowPosition } = this.state;

    return (
      <Wrapper
        className={className}
        marker={marker}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
        onKeyDown={this.onKeyDown}
        onMouseDown={this.onMouseDown}
        ref={this.wrapperRef}
        style={modalPosition}
        tabIndex={-1}
      >
        {arrowPosition.dir === "TOP" ? (
          <ArrowTop left={arrowPosition.left} />
        ) : (
          <ArrowBottom left={arrowPosition.left} />
        )}
        {children}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: absolute;

  background-color: ${({ theme }) => theme.modal.backgroundColor};
  color: ${({ theme }) => theme.modal.color};

  border-bottom: ${({ theme }) => theme.modal.borderBottom};
  border-left: ${({ theme }) => theme.modal.borderLeft};
  border-right: ${({ theme }) => theme.modal.borderRight};
  border-top: ${({ theme }) => theme.modal.borderTop};
  border-bottom-left-radius: ${({ theme }) =>
    theme.modal.borderBottomLeftRadius};
  border-bottom-right-radius: ${({ theme }) =>
    theme.modal.borderBottomLeftRadius};
  border-top-left-radius: ${({ theme }) => theme.modal.borderTopLeftRadius};
  border-top-right-radius: ${({ theme }) => theme.modal.borderTopLeftRadius};

  box-shadow: ${({ theme }) => theme.modal.boxShadow};

  font-weight: ${({ theme }) => theme.modal.fontWeight};

  :focus {
    outline: none;
  }
`;

const ArrowTop = styled.div`
  background: ${({ theme }) => theme.modal.backgroundColor};
  border-left: 1px solid ${({ theme }) => theme.modal.arrowBorderColor};
  border-top: 1px solid ${({ theme }) => theme.modal.arrowBorderColor};
  height: 10px;
  left: ${({ left = 0 }) => `calc(50% + ${left - 6}px)`};
  position: absolute;
  top: -7px;
  transform: rotate(45deg);
  width: 10px;
`;

const ArrowBottom = styled.div`
  background: ${({ theme }) => theme.modal.backgroundColor};
  border-right: 1px solid ${({ theme }) => theme.modal.arrowBorderColor};
  border-bottom: 1px solid ${({ theme }) => theme.modal.arrowBorderColor};
  height: 10px;
  left: ${({ left = 0 }) => `calc(50% + ${left - 6}px)`};
  position: absolute;
  bottom: -7px;
  transform: rotate(45deg);
  width: 10px;
`;

// todo: instead of children use render prop here.
// todo: modals to close on mouse down at other places on the page
// todo: check complexity that heading styles can create
