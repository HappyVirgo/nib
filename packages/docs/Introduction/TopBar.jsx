/**
 * TODO:review
 * improve code in all components
 */

import React, { PureComponent } from "react";
import Editor from "nib-core";

import uploadCallback from "../common/uploadCallback";

const theme = {
  editor: () => ({
    height: "200px"
  })
};

class TopBar extends PureComponent {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          margin: "32px 0"
        }}
      >
        <div>
          <Editor
            config={{
              plugins: {
                image: {
                  uploadCallback
                }
              },
              toolbar: {
                options: "top"
              }
            }}
            styleConfig={theme}
          />
        </div>
      </div>
    );
  }
}

export default TopBar;

/**
 * todo:
 * 1. props link to open in new window.
 */
