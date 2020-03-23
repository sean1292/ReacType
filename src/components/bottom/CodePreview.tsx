import React, { Component } from 'react';
import { format } from 'prettier';
import componentRender from '../../utils/componentRender.util';
import { ComponentInt, ComponentsInt } from '../../interfaces/Interfaces';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';

type CodePreviewProps = {
  focusComponent: ComponentInt;
  components: ComponentsInt;
  updateCode(arg: { componentId: number; code: string }): void;
  changeFocusComponent(arg: { title: string }): void;
};
interface StateInt {
  code: string;
}

class CodePreview extends Component<CodePreviewProps, StateInt> {
  constructor(props: CodePreviewProps) {
    super(props);
    this.state = {
      code: ''
    };
  }

  //checking if the code has been asigned yet or not
  //if no then generate code and asign to a focus component
  componentDidMount() {
    if (
      this.props.focusComponent.code == '' ||
      this.props.focusComponent.changed
    ) {
      this.generateNewCode();
    }
  }
  // componentDidUpdate(prevProp: CodePreviewProps) {
  //   if(prevProp.focusComponent.code )
  // }
  componentDidUpdate(prevProp: CodePreviewProps) {
    if (this.props.focusComponent.changed !== prevProp.focusComponent.changed) {
      this.generateNewCode();
    }
  }
  generateNewCode() {
    const text = format(
      componentRender(this.props.focusComponent, this.props.components),
      {
        singleQuote: true,
        trailingComma: 'es5',
        bracketSpacing: true,
        jsxBracketSameLine: true,
        parser: 'babel'
      }
    );
    // console.log('code  prev>>>>>>>>>>>>>>>>>>>', text);
    this.props.updateCode({
      componentId: this.props.focusComponent.id,
      code: text
    });
    this.props.changeFocusComponent({ title: this.props.focusComponent.title });
  }

  render(): JSX.Element {
    return (
      <div
        style={{
          height: '80%',
          paddingLeft: '0px',
          paddingTop: '10px',
          overflow: 'auto',
          maxWidth: '60%',
          border: '2px solid #33eb91',
          borderRadius: '5px'
        }}
      >
        <AceEditor
          mode="javascript"
          theme="monokai"
          width="100%%"
          height="100%"
          onChange={code =>
            this.props.updateCode({
              componentId: this.props.focusComponent.id,
              code
            })
          }
          value={this.props.focusComponent.code}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          fontSize={16}
        />
        {/* <Button
          color="primary"
          aria-label="Add"
          type="submit"
          // disabled={!this.state.propKey || !this.state.propType}
          variant="contained"
          size="large"
          className={classes.addProp}
        ></Button> */}
      </div>
    );
  }
}

export default CodePreview;