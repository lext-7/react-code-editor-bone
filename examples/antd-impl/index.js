import React, { Component } from 'react';
import { Icon, Select } from 'antd';
import CodeEditorBone from '../../src';
import { modeList } from '../../src/ext-map';
import './index.less';

const Option = Select.Option;

class AntdCodeEditorImpl extends Component {

    static propTypes = {
        ...CodeEditorBone.propTypes,
    };

    getActions() {
        const {
            fullscreen,
        } = this.props;

        const iconType = fullscreen ? 'shrink' : 'arrows-alt';

        return [
            {
                key: 'fullscreen',
                icon: <Icon type={iconType} />,
            },
        ];
    }

    getRightStatusItems() {
        const {
            mode,
            onModeChange,
        } = this.props;

        return [
            {
                key: 'type',
                body: (
                    <div className="code-editor-antd-type-select">
                        <Select
                            onChange={onModeChange}
                            value={mode}
                        >
                            {modeList.map((mode, index) => (
                                <Option key={index} value={mode.mode}>{mode.mode}</Option>
                            ))}
                        </Select>
                    </div>
                ),
            },
        ];
    }

    render() {
        const {
            ...editorProps
        } = this.props;

        const actions = this.getActions();
        const rightStatusItems = this.getRightStatusItems();

        return (
            <CodeEditorBone
                actions={actions}
                rightStatusItems={rightStatusItems}
                {...editorProps}
            />
        );
    }
}

export default AntdCodeEditorImpl;
