import Dispatcher from './AppDispatcher.js';
import { * } from './Constants.js';

class Actions {
  
  dataLoaded(data) {
    Dispatcher.dispatch({
      actionType: DATA_LOADED,
      secrets: data
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
