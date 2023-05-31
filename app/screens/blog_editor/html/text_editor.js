import {
  EditorHtmlOptionsProps
} from 'types/index.d.ts'

export const injectedJS = `
  const meta = document.createElement('meta');
  meta.setAttribute('content', 'width=width, initial-scale=1.2, maximum-scale=1.5, user-scalable=no');
  meta.setAttribute('name', 'viewport');
  document.getElementsByTagName('head')[0].appendChild(meta);
`;

/**
 * Hàm này tạo ra một chuỗi html để enject vào webview.
 * @param {EditorHtmlOptionsProps} props 
 * @returns 
 */
export const editorHtmlSource = (props = {}) => `
<!DOCTYPE html>
<head>
  <link href="https://cdn.quilljs.com/1.0.0/quill.snow.css" rel="stylesheet">
</head>
<html>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html, body {
      background-color: transparent;
    }
    .editor {
      margin-bottom: 62px;
      border: none!important;
    }
    #editor-container {
      height: fit-content;
    }
    .ql-editor {
      width: 100%;
      min-height: 100vh;
      background-color: ${props.editorBackgroundColor ? props.editorBackgroundColor : "transparent"}!important;
    }
    .ql-toolbar {
      position: sticky;
      top: 0;
    }
    .ql-toolbar.ql-snow {
      outline: none;
      border: none!important;
      border-bottom: 1px solid rgba(38, 38, 38, 0.25)!important;
      background-color: ${props.editorToolsBarBackgroundColor ? props.editorToolsBarBackgroundColor : "transparent"}!important;
    }
  </style>
  <body>
    <div class="editor" id="editor"></div>
  </body>
  <script src="https://cdn.quilljs.com/1.0.0/quill.js"></script>
  <script>
    let toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['image', 'link'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'header': [3, 4, 5, 6, false] }],
      ['clean']
    ];

    let MAX_IMAGE_SIZE = 2 * 1024 * 1024;

    let editor = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions
      }
    });
  </script>
</html>
`