import * as React from 'react';

import { ToolbarButton, Icon } from 'nib-ui';

import formatKeymap from '../../utils/format-keymap';
import { usePMStateContext } from '../../context/pm-state/index';

import { KeymapInfo } from './keymaps';
import { linkPluginKey } from './plugin';
import { isLinkMarkActive } from './utils';

export default () => {
  const { pmstate } = usePMStateContext();
  if (!pmstate) return null;

  const { pmview } = pmstate;
  if (!pmview) return null;

  const showLinkToolbar = () => {
    if (!pmview.hasFocus) pmview.focus();
    const { state, dispatch } = pmview;

    const pluginState = linkPluginKey.getState(state);

    if (pluginState.showAddLinkToolbar === true)
      dispatch(state.tr.setMeta('show-add-link-toolbar', false));
    else dispatch(state.tr.setMeta('show-add-link-toolbar', true));
  };

  const linkMarkActive = isLinkMarkActive(pmview.state);

  return (
    <span className="nib-link-marker">
      <ToolbarButton
        name="link"
        onClick={showLinkToolbar}
        onMouseDown={(evt: Event) => evt.stopPropagation()}
        disabled={linkMarkActive}
        title={formatKeymap(KeymapInfo.link)}
      >
        <Icon name="link" selected={linkMarkActive} />
      </ToolbarButton>
    </span>
  );
};
