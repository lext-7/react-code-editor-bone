import React, { Component, PropTypes } from 'react';
import MonacoEditor from 'react-monaco-editor';
import AntdCodeEditorImpl from '../antd-impl';
import './themes/one-dark.less';

class MonacoAntdCodeEditorImpl extends Component {

    static defaultProps = {
        height: 300,
    };

    static propTypes = {
        ...AntdCodeEditorImpl.propTypes,
        height: PropTypes.number,
    };

    render() {
        const {
            mode,
            value,
            height,
            fullscreen,
            editorProps = {},
        } = this.props;

        if (typeof editorProps.language === 'undefined' || editorProps.language === null) {
            editorProps.language = mode;
        }

        if (typeof editorProps.value === 'undefined' || editorProps.value === null) {
            editorProps.value = value;
        }

        editorProps.height = fullscreen ? '100%' : height;

        editorProps.options = editorProps.options || {};
        editorProps.theme = 'vs-dark';
        editorProps.options.automaticLayout = true;

        return (
            <AntdCodeEditorImpl
                Editor={MonacoEditor}
                {...this.props}
                editorProps={editorProps}
            />
        );
    }
}

export default MonacoAntdCodeEditorImpl;
