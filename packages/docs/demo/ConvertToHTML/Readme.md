Convert content to HTML string.

```js
<ConvertToHTMLDemo />
```

Code:

```js static
class ConvertToHTMLDemo extends Component {
  state = {
    content: {}
  };

  onChange = content => {
    this.setState({ content });
  };

  render() {
    const { content } = this.state;
    return (
      <div>
        <Editor
          config={{
            plugins: { options: "block inline list" },
            toolbar: {
              options: "top",
              top: { options: "block inline list" }
            }
          }}
          onChange={this.onChange}
        />
        {convertToHTML(content)}
      </div>
    );
  }
}

export default ConvertToHTMLDemo;
```