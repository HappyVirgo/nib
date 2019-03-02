export default `
  .ProseMirror.tableWrapper {
    overflow-x: auto;
  }
  .ProseMirror table {
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    overflow: hidden;
  }
  .ProseMirror td, .ProseMirror th {
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
  }
  .ProseMirror.column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: 0;
    width: 4px;
    z-index: 20;
    background-color: #adf;
    pointer-events: none;
  }
  .ProseMirror.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
  /* Give selected cells a blue overlay */
  .ProseMirror.selectedCell: after {
    z-index: 2;
    position: absolute;
    content: "";
    left: 0; right: 0; top: 0; bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
  }
  /* Style beloe to be made configurable */
  .ProseMirror table td, .ProseMirror table th {
    border: 1px solid rgba(158, 158, 158, 0.75)
  }
`;
