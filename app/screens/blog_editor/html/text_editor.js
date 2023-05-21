export const injectedJS = `
  const meta = document.createElement('meta');
  meta.setAttribute('content', 'width=width, initial-scale=1.2, maximum-scale=1.5, user-scalable=no');
  meta.setAttribute('name', 'viewport');
  document.getElementsByTagName('head')[0].appendChild(meta);
`;

export const editorHtmlSource = `
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
      width: 100%;
      height: 100vh;
      border: none!important;
      background-color: transparent!important;
    }
    .ql-toolbar.ql-snow {
      outline: none;
      border: none!important;
      border-bottom: 1px solid rgba(38, 38, 38, 0.25)!important;
      background-color: transparent!important;
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

    let editor = new Quill('#editor', {
      modules: { toolbar: toolbarOptions },
      theme: 'snow'
    });
  </script>
</html>
`