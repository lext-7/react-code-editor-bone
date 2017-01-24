import React, { Component, PropTypes } from 'react';
import Clickable from './components/clickable';
import Tab from './components/tab';
import './index.less';

const clsPrefix = 'code-editor';

const clsNames = {
    bone: `${clsPrefix}-bone`,
    body: `${clsPrefix}-body`,
    content: `${clsPrefix}-content`,
    header: `${clsPrefix}-header`,
    tabs: `${clsPrefix}-tabs`,
    tab: `${clsPrefix}-tab`,
    actions: `${clsPrefix}-actions`,
    action: `${clsPrefix}-action`,
    statusBar: `${clsPrefix}-status-bar`,
    statusBarRight: `${clsPrefix}-status-right`,
    statusItem: `${clsPrefix}-status-item`,
};

class CodeEditorBone extends Component {

    static clsPrefix = clsPrefix;

    static clsNames = clsNames;

    static defaultProps = {
        theme: 'one-dark',
        tabs: [],
        actions: [],
        fullscreen: false,
        rightStatusItems: [],
        editorHeight: 300,
    };

    static propTypes = {
        className: PropTypes.string,
        theme: PropTypes.string,
        mode: PropTypes.string,
        tabs: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            label: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element,
            ]),
        })),
        actions: PropTypes.arrayOf(PropTypes.shape({
            key: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.number,
            ]),
            icon: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.element,
            ]),
        })),
        tabKey: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        fullscreen: PropTypes.bool,
        onTabChange: PropTypes.func,
        onActionClick: PropTypes.func,
        Editor: PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.element,
            PropTypes.func,
        ]),
    };

    constructor(props) {
        super(props);

        this.handleTabClick = ::this.onTabClick;
        this.handleActionClick = ::this.onActionClick;
        this.handleStatusItemClick = ::this.onStatusItemClick;
    }

    onTabClick() {
        const { onTabChange } = this.props;

        if (typeof onTabChange === 'function') {
            onTabChange(...arguments);
        }
    }

    onActionClick() {
        const { onActionClick } = this.props;

        if (typeof onActionClick === 'function') {
            onActionClick(...arguments);
        }
    }

    onStatusItemClick() {
        const { onStatusItemClick } = this.props;

        if (typeof onStatusItemClick === 'function') {
            onStatusItemClick(...arguments);
        }
    }

    renderTabs() {
        const {
            tabs,
            tabKey,
        } = this.props;

        return (
            <div className={clsNames.tabs}>
                {tabs.map(tab => (
                    <Tab
                        key={tab.key}
                        tabKey={tab.key}
                        label={tab.label}
                        className={`${clsNames.tab}${tabKey === tab.key ? ` ${clsNames.tab}-active` : ''}`}
                        onClick={this.handleTabClick}
                    />
                ))}
            </div>
        );
    }

    renderActions() {
        const { actions } = this.props;

        return (
            <div className={clsNames.actions}>
                {actions.map(action => (
                    <Clickable
                        className={clsNames.action}
                        key={action.key}
                        data={action.key}
                        onClick={this.handleActionClick}
                    >
                        {action.icon}
                    </Clickable>
                ))}
            </div>
        );
    }

    renderStatusBar() {
        const { rightStatusItems } = this.props;
        return (
            <div className={clsNames.statusBar}>
                <div className={clsNames.statusBarRight}>
                    {rightStatusItems.map(item => (
                        <Clickable
                            className={clsNames.statusItem}
                            key={item.key}
                            data={item.key}
                            onClick={this.handleStatusItemClick}
                        >
                            {item.body}
                        </Clickable>
                    ))}
                </div>
            </div>
        );
    }

    render() {
        const {
            className,
            theme,
            fullscreen,
            Editor,
        } = this.props;

        let {
            editorProps,
        } = this.props;

        if (typeof editorProps === 'function') {
            editorProps = editorProps(this.props);
        }

        const mainCls = [clsNames.bone, className, theme && `${clsPrefix}-${theme}`, fullscreen ? `${clsPrefix}-fullscreen` : null]
            .filter(cls => !!cls).join(' ');

        return (
            <div className={mainCls}>
                <div className={clsNames.body}>
                    <div className={clsNames.header}>
                        {this.renderTabs()}
                        {this.renderActions()}
                    </div>
                    <div className={clsNames.content}>
                        <Editor {...editorProps} />
                    </div>
                </div>
                {this.renderStatusBar()}
            </div>
        );
    }
}

export default CodeEditorBone;
