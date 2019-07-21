import { EventEmitter } from 'events';
import _ from 'lodash';
import autoBind from 'auto-bind';

import { DATA_LOADED } from '../actions/Constants.js';
import Dispatcher from '../actions/AppDispatcher.js';
import { restCall, errToString } from '../util/Util.js';
import Actions from '../actions/Actions.js';
import { toast } from 'react-toastify';

const CHANGE_EVENT = 'change';

class DataStore extends EventEmitter {

  constructor() {
    super();
    autoBind(this);
    Dispatcher.register(this.onAction);
  }

  onAction(action) {
    switch (action.actionType) {
      case DATA_LOADED:
        this.emitChange();
        break;
      default:
        break;
    }
  }  
}

const _dataStore = new DataStore();

export default _dataStore;
