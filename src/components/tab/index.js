import React, { Component, PropTypes } from 'react';
import Clickable from '../clickable';

class Tab extends Component {

    static propTypes = {
        tabKey: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
        ]),
        className: PropTypes.string,
        label: PropTypes.string,
        onClick: PropTypes.func,
    };

    render() {
        const {
            className,
            tabKey,
            label,
            onClick,
        } = this.props;

        return (
            <Clickable
                data={{
                    tabKey,
                    label,
                }}
                className={className}
                onClick={onClick}
            >
                {label}
            </Clickable>
        );
    }
}

export default Tab;
