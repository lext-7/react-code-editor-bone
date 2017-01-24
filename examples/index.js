import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CodeEditorImpl from './monaco-antd-impl';
import './index.html';
import '../src/themes/one-dark.less';

class Editor extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabKey: 'template',
            fullscreen: false,
            mode: 'javascript',
        };

        this.handleTabChange = ::this.onTabChange;
        this.handleActionClick = ::this.onActionClick;
        this.handleModeChange = ::this.onModeChange;
    }

    onTabChange({ tabKey, label }) {
        this.setState({
            tabKey,
        });
    }

    onActionClick(key) {
        if (key === 'fullscreen') {
            this.setState({
                fullscreen: !this.state.fullscreen,
            });
        }
    }

    onModeChange(mode) {
        this.setState({
            mode,
        });
    }

    render() {
        const tabs = [
            { key: 'index', label: 'index.js' },
            { key: 'template', label: '模板' },
        ];

        const {
            tabKey,
            fullscreen,
            mode,
        } = this.state;

        return (
            <div>
                <CodeEditorImpl
                    tabs={tabs}
                    mode={mode}
                    tabKey={tabKey}
                    fullscreen={fullscreen}
                    onTabChange={this.handleTabChange}
                    onActionClick={this.handleActionClick}
                    onModeChange={this.handleModeChange}
                />
            </div>
        );
    }
}

ReactDOM.render(
    <Editor />,
    document.getElementById('app'),
);

