import React, { Component, PropTypes } from 'react';

class Clickable extends Component {

    static propTypes = {
        onClick: PropTypes.func,
        data: PropTypes.any,
    };

    constructor(props) {
        super(props);

        this.handleClick = ::this.onClick;
    }

    onClick(e) {
        const { onClick, data } = this.props;

        if (typeof onClick === 'function') {
            onClick(data, e);
        }
    }

    render() {
        const {
            data,
            children,
            onClick,
            ...rest
        } = this.props;

        return (
            <div {...rest} onClick={this.handleClick}>
                {children}
            </div>
        );
    }
}

export default Clickable;
