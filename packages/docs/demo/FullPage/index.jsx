import React, {useState} from "react";
import Editor from "nib-core";

import uploadCallback from "../../common/uploadCallback";

const theme = {
  wrapper: {
    height: "500px",
    left: "199px",
    position: "absolute",
    top: "153px",
    width: "calc(100% - 200px)"
  }
};

/**
 * @visibleName 7. Full Page
 */
const FullPage = () => {
  const [content, setContent] = useState({});
  return (
    <div>
      <div style={{height: 500}} />
      <Editor
        config={{
          plugins: {
            image: {
              uploadCallback
            }
          }
        }}
        onChange={setContent}
        theme={theme}
      />
      <pre>{JSON.stringify(content, null, 4)}</pre>
    </div>
  );
};

export default FullPage;
