import { Plugin, PluginKey } from 'prosemirror-state';
import ImageView from './nodeView';

const imagePluginKey = new PluginKey('image');

const imagePlugin = new Plugin({
  key: imagePluginKey,

  state: {
    init: () => {
      return { showImageModal: false };
    },
    apply(tr, prev, _, newState) {
      const { selection, schema } = newState;
      if (tr.getMeta('show-image-modal') === true) {
        return {
          ...prev,
          showImageModal: true,
        };
      }

      if (tr.getMeta('show-image-modal') === false) {
        return {
          ...prev,
          showImageModal: false,
        };
      }

      if (
        selection.$to.nodeBefore &&
        selection.$to.nodeBefore.type === schema.nodes.image
      ) {
        return {
          ...prev,
          isImageSelected: true,
        };
      }

      return {
        ...prev,
        isImageSelected: false,
      };
    },
  },
  props: {
    nodeViews: {
      image(node, view, getPos) {
        return new ImageView(node, view, getPos);
      },
    },
  },
});

export default imagePlugin;
export { imagePluginKey };
