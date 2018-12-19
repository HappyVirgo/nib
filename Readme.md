# EDITR

---

Despite various options available for rich text editing in html, it continues to be extremely challenging area. I found [prosemirror](http://prosemirror.net) to be the best available solution for the problem. It is great work by author [Marijn Haverbeke](http://marijnhaverbeke.nl/).

Making an editor ground up from a framework is still much work, the project aims at building react components for rich text editing using prosemirror. These components can be quickly integrated into react or even ron-react applications.

---

## Setup

Setup of the editor is straight forward. Editor is a package on npm, and toolbars and each plugin is a package of its own and is required to be installed from npm.

### Installing packages:

Either `npm` or `yarn` commands can be used.

```
npm i @editr/core --save
```

### Writing editor component:

```
import React from "react";
import Editor from "@editr/core";

const MyEditor = () => (
  <Editor
    plugins="block inline"
    toolbar="basic"
  />
);
```

### Props

Props supported by the editor.

| S.No. | Name         | Description                                                                                   |
| ----- | ------------ | --------------------------------------------------------------------------------------------- |
| 1     | defaultValue | Value to initialize editor content                                                            |
| 2     | onChange     | Callback which is called when the content of the editor changes                               |
| 3     | plugins      | List of plugins to be added, currently supported plugins are: **inline**, **block**, **list** |
| 4     | toolbar      | Type of toolbar to be added to the editor, currently supported toolbar type is **basic**      |

---

## Need help

If you have any queries or require any help you can [email](mailto::jyotipuri@gmail.com) me.

---

## License

MIT
