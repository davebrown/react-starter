import React from 'react';
import _ from 'lodash';
import { PrimaryButton } from 'office-ui-fabric-react';

import Base from './Base';
import { errToString } from '../util/Util.js';

class Error extends Base {

    render() {
        const { error, message, info, onClear, onRetry } = this.props;

        if (!error) {
            return "";
        }
        //console.log("Error.info", info);
        var clear = "";
        var retry = "";
        if (onClear) {
            clear = (<PrimaryButton onClick={onClear}>Clear</PrimaryButton>);
        }
        if (onRetry) {
            retry = (<PrimaryButton onClick={onRetry}>Retry</PrimaryButton>);
        }
        return (
            <div className="error layout-column">
                Error: {errToString(error)}<br/>
                Message: {message}<br/>
                Stack:<br/>
                <pre style={{ color: '#808080'}}>
                    {_.get(info, 'componentStack') || 'Not available'}
                </pre>
                <div className="layout-row layout-justify-start">
                  {clear}
                  {retry}
                </div>
            </div>
        );
    }
}

class ErrorBoundary extends Base {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            info: null
        }
    }

    componentDidCatch(error, info) {
        //console.log("ErrorBoundary.didCatch", error);
        this.setState({
            error: error,
            info: info
        });
    }

    _onClear() {
        this.setState({
            error: null,
            info: null
        });
        if (this.props.onClear) this.props.onClear();
    }

    render() {
        const { error } = this.state;
        if (error) {
            return (<Error {...this.state} onClear={this._onClear} onRetry={this.props.onRetry}/>);
        }
        return this.props.children;
    }
}

export { Error, ErrorBoundary };