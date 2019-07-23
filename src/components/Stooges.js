import React from 'react';
import _ from 'lodash';

import { Spinner } from 'office-ui-fabric-react/lib/index';
import { DetailsList } from 'office-ui-fabric-react/lib/DetailsList';
import { SelectionMode } from 'office-ui-fabric-react/lib/utilities/selection/index';

import Base from './Base';
import DataStore from '../stores/DataStore';
import { DATA_LOADED, LOAD_ERROR } from '../actions/Constants';
import Dispatcher from '../actions/AppDispatcher';
import { Error } from './Error';

export default class Stooges extends Base {

    constructor(props) {
        super(props);
        _.forEach(this.COLUMNS, (c) => c.isResizable = true );
        const stooges = _.get(DataStore.getData(), 'stooges');
        this.state = {
            loading: !(stooges && stooges.length > 0),
            error: null,
            stooges: stooges
        }
    }

    COLUMNS = [
        { key: 'name', name: 'Name', fieldName: 'name' },
        { key: 'funny', name: 'Humor Index', fieldName: 'funny' }
    ]
    render() {
        const { loading, error, stooges } = this.state;

        if (loading) return (<Spinner label="loading the stooges..."/>);
        else if (error) {
            return (<Error
                error={error.err}
                message={error.message}
                onRetry={this.retryLoadData}
                />);
        }
        return (
            <div className="layout-scrollable" style={{ height: '90vh' }}>
                <h2>Stooges</h2>
                <DetailsList 
                    selectionMode = {SelectionMode.none}
                    items={stooges}
                    //onRenderItemColumn={this._renderItemColumn}
                    columns={this.COLUMNS}
                />
            </div>            
        )
    }

    onAction(action) {
        console.log('Stooges.action', action);
        switch (action.actionType) {
            case DATA_LOADED:
                this.setState({
                    loading: false,
                    error: null,
                    stooges: action.data.stooges
                });
                break;
            case LOAD_ERROR:
                this.setState({
                    loading: false,
                    error: { err: action.error, message: action.message },
                });
                break;
            default:
                break;
        }
    }

    retryLoadData() {
        this.setState({
            loading: true,
            error: null
        });
        DataStore.loadData();
    }
    componentWillMount() {
        this.dispatcherToken = Dispatcher.register(this.onAction);
    }

    componentWillUnmount() {
        if (this.dispatcherToken) {
            Dispatcher.unregister(this.dispatcherToken);
            this.dispatcherToken = null;
        }
    }
}