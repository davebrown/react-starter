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
import { formatDate } from '../util/Util';

export default class Fruits extends Base {

    constructor(props) {
        super(props);
        _.forEach(this.COLUMNS, (c) => c.isResizable = true );
        const fruits = _.get(DataStore.getData(), 'fruits');
        this.state = {
            loading: !fruits,
            error: null,
            fruits: fruits
        }
    }

    COLUMNS = [
        { key: 'name', name: 'Name', fieldName: 'name' },
        { key: 'rating', name: 'Rating', fieldName: 'rating' },
        { key: 'timestamp', name: 'Timestamp', fieldName: 'timestamp',
          onRender: (item, index, column) => {
              return (<span>{formatDate(item.timestamp)}</span>)
          },
          minWidth: 250
        },
    ]
    render() {
        const { loading, error, fruits } = this.state;

        if (loading) return (<Spinner label="loading the fruits..."/>);
        else if (error) {
            return (<Error
                error={error.err}
                message={error.message}
                onRetry={this.retryLoadData}
                />);
        }
        return (
            <div className="layout-scrollable" style={{ height: '90vh' }}>
                <h2>Fruits</h2>
                <DetailsList 
                    selectionMode = {SelectionMode.none}
                    items={fruits}
                    //onRenderItemColumn={this._renderItemColumn}
                    columns={this.COLUMNS}
                />
            </div>            
        )
    }

    onAction(action) {
        switch (action.actionType) {
            case DATA_LOADED:
                this.setState({
                    loading: false,
                    error: null,
                    fruits: action.data.fruits
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