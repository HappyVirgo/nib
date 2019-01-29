import keymaps from "./keymaps";
import toolbarComponent from "./ToolbarComponent";
import plugins from "./plugins";
import schema from "./schema";
import CreateModal from "./modals/Create";
import EditModal from "./modals/Edit";

const modals = [
  {
    elmClassName: "nib-link-marker",
    component: CreateModal
  },
  {
    elmClassName: "nib-edit-link-marker",
    component: EditModal
  }
];

export default {
  name: "link",
  keymaps,
  toolbarComponent,
  plugins,
  schema,
  modals
};
