import { EditorState } from "prosemirror-state";

import buildKeymap from "./keymap";
import buildSchema from "./schema";
import { getProsemirrorPlugins } from "./plugins";

const defaultContent = {
  doc: {
    type: "doc",
    content: [{ type: "paragraph" }]
  },
  selection: {
    type: "text",
    anchor: 1,
    head: 1
  }
};

export const buildEditorState = (plugins, content) => {
  const editorContent = content || defaultContent;
  return EditorState.fromJSON(
    {
      schema: buildSchema(plugins),
      plugins: [buildKeymap(plugins), ...getProsemirrorPlugins(plugins)]
    },
    editorContent
  );
};

export const updateEditorState = (view, state, tr) => {
  const editorState = state.apply(tr);
  view.updateState(editorState);
  return view;
};
