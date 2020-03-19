import React, { Component } from 'react';
    import { Controlled as CodeMirror } from 'react-codemirror2';
    import './App.css';
    import 'codemirror/lib/codemirror.css';
    import 'codemirror/theme/material.css';

    import 'codemirror/mode/htmlmixed/htmlmixed';
    import 'codemirror/mode/css/css';
    import 'codemirror/mode/javascript/javascript';


    import 'codemirror/addon/lint/html-lint';


    class App extends Component {
      constructor() {
        super();
        this.state = {
          html: '',
          disabled: true,
        };
      }

      componentDidUpdate() {
        this.runCode();
      }

      componentDidMount() {
        alert('Digite: \n        Olá \nDentro de um elemento <h1>')
      }

      runCode = () => {
        const { html, disabled } = this.state;
        const iframe = this.refs.iframe;
        const document = iframe.contentDocument;
        const documentContents = `
            ${html}
        `;

        document.open();
        document.write(documentContents);
        document.close();

      };

      runTester = () => {
        const { html, disabled } = this.state;
        const soluction = '<h1>Olá</h1>'
        if(html===soluction && disabled){
          this.setState({disabled: false})
          alert('Parabéns Você pode avançar');
        }else{
          alert('Ainda não foi desta vez.');
        }

      }

      render() {
        const { html, disabled } = this.state;

        const codeMirrorOptions = {
          theme: 'material',
          lineNumbers: true,
          scrollbarStyle: null,
          lineWrapping: true,
          gutters: ['CodeMirror-lint-markers'],
          lint: true
        };

        return (
          <div className="App">
            <section className="playground">
              <div className="code-editor html-code">
                <div className="editor-header">HTML</div>
                <CodeMirror
                  value={html}
                  options={{
                    mode: 'htmlmixed',
                    ...codeMirrorOptions,
                  }}
                  onBeforeChange={(editor, data, html) => {
                    this.setState({ html });
                  }}
                />
              </div>
              <button ref="testar" className="testar" hidden={disabled} >Proximo</button>
              <button  className="run" onClick={this.runTester} >Testar Codigo</button>
              <p className="instrucion">Digite:  <br/> <br/> Olá <br/> <br/>Dentro de um elemento h1</p>
            </section>
            <section className="result">
              <iframe title="result" className="iframe" ref="iframe" />
            </section>
          </div>
        );
      }
    }

    export default App;