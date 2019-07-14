import React, { useState } from "react";
import Editor from "nib-core";

import uploadCallback from "../../common/uploadCallback";
import defaultValue from "./sampleData";

const theme = {
  wrapper: {
    height: "100%",
    width: "100%"
  },
  editor: {
    height: "calc(100% - 46px)",
    width: "100%"
  }
};

const FullPageEditor = ({ setContent }) => {
  return (
    <Editor
      config={{
        plugins: {
          image: {
            uploadCallback
          }
        }
      }}
      defaultValue={defaultValue}
      onChange={setContent}
      theme={theme}
    />
  );
};

/**
 * @visibleName 7. Full Page
 */
const FullPage = () => {
  const [fullPageEditorVisible, showFullPageEditor] = useState(false);
  const [content, setContent] = useState();

  const showEditor = () => {
    document.body.style.overflow = "hidden";
    showFullPageEditor(true);
  };

  const hideEditor = () => {
    document.body.style.overflow = "scroll";
    showFullPageEditor(false);
  };

  return (
    <div>
      {fullPageEditorVisible && (
        <div className="editor_wrapper">
          {/* <img src={Cross} className="close-icon" onClick={hideEditor} /> */}
          <button className="docs_btn close-editor" onClick={hideEditor}>
            Hide Editor
          </button>
          <FullPageEditor setContent={setContent} />
        </div>
      )}
      <button className="docs_btn" onClick={showEditor}>
        Show Editor
      </button>

      <pre>{JSON.stringify(content || defaultValue, null, 4)}</pre>
    </div>
  );
};

export default FullPage;