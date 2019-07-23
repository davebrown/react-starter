import { EventEmitter } from 'events';
import _ from 'lodash';
import autoBind from 'auto-bind';

import { restCall, errToString } from '../util/Util.js';
import Actions from '../actions/Actions';
import { toast } from 'react-toastify';

//const CHANGE_EVENT = 'change';

class DataStore extends EventEmitter {

  constructor() {
    super();
    autoBind(this);
    this.data = null;
  }

  getData() { return this.data; }

  loadData() {
    // for demo/testing purposes, introduce artificial delay
    setTimeout(this._reallyLoadData, 2000);
  }

  _reallyLoadData() {
    restCall({
      uri: '/data.json',
      opName: "load app data",
      onSuccess: (data) => {
        this.data = data;
        toast.success("data loaded");
        Actions.dataLoaded(data);
      },
      onError: (err) => {
        toast.error("load app data failed: " + errToString(err));
        Actions.loadError(err);
      }
    });
  }

}


const _dataStore = new DataStore();
var initialLoad = false;
if (!initialLoad) {
  initialLoad = true;
  _dataStore.loadData();
}
export default _dataStore;
