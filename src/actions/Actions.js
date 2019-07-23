import Dispatcher from './AppDispatcher.js';
import { DATA_LOADED, STATUS_REPORT, LOAD_ERROR } from './Constants.js';

class Actions {

  foo() {
    console.log('Actions.foo()');
  }

  dataLoaded(data) {
    Dispatcher.dispatch({
      actionType: DATA_LOADED,
      data: data
    });
  }
  
  // type: error | success | info | warning
  statusReport(statusType, message) {
    statusType = statusType || 'error';
    Dispatcher.dispatch({
      actionType: STATUS_REPORT,
      statusType: statusType,
      message: message
    });
  }
  
  loadError(errObj, message) {
    Dispatcher.dispatch({
      actionType: LOAD_ERROR,
      error: errObj,
      message: message
    });
  }
}

export default new Actions();
