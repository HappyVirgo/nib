import styled, { StyledComponent } from '@emotion/styled';

import BlockPlugin from '../../plugins/block';
import { EditorStyleType } from '../../types/editor-style';
import { MutableRefObject, RefObject } from 'react';

const prosemirrorStyles = `
  & .ProseMirror {
    &:focus {
      outline: none;
    }
  }

  // Styles copied from https://github.com/ProseMirror/prosemirror-view/blob/master/style/prosemirror.css
  .ProseMirror {
    position: relative;
  }

  .ProseMirror {
    word-wrap: break-word;
    white-space: pre-wrap;
    -webkit-font-variant-ligatures: none;
    font-variant-ligatures: none;
  }

  .ProseMirror pre {
    white-space: pre-wrap;
  }

  .ProseMirror-hideselection *::selection {
    background: transparent;
  }

  .ProseMirror-hideselection *::-moz-selection {
    background: transparent;
  }

  .ProseMirror-hideselection {
    caret-color: transparent;
  }
`;

// todo: fix use of any below
export const StyledWrapper: StyledComponent<any, any, any> = styled(
  styled.div(
    { position: 'relative', textAlign: 'left' },
    ({ theme }: { theme: EditorStyleType }) => {
      const { constants, wrapper } = theme;
      return {
        border: constants.border.primary,
        borderRadius: constants.borderRadius.small,

        backgroundColor: constants.color.background.primary,
        color: constants.color.text.primary,

        fontSize: constants.fontSize.medium,

        ...wrapper({ theme: constants }),
      };
    }
  )
)`
  ${({ theme }) => BlockPlugin.styles(theme)}
`;

export const StyledEditor: StyledComponent<any, any, any> = styled(
  styled.div(
    {
      border: 'none',
      overflow: 'auto',
      padding: 4,
      position: 'relative',
      textAlign: 'left',
    },
    ({ theme: { constants, editor } }: { theme: EditorStyleType }) => ({
      backgroundColor: constants.color.background.primary,
      color: constants.color.text.primary,

      fontSize: constants.fontSize.medium,

      ...editor({ theme: constants }),
    })
  )
)`
  ${({
    theme,
    pluginStyles,
  }: {
    theme: EditorStyleType;
    pluginStyles: (theme?: EditorStyleType) => string;
  }) => pluginStyles(theme)}
  ${prosemirrorStyles}
`;

/** TODO:
 * find a better way in emotion to mix string and object styles,
 * this may need getting in touch with team
 */
