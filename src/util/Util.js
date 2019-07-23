import axios from 'axios';
import _ from 'lodash';
import dateformat from 'dateformat';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const SERVICE_URL = process.env.REACT_APP_SERVICE_URL || '';

function errToString(input) {
  if (input === null) return null;
  else if (typeof input === 'string') return input;
  // try to look for methods on Error
  else if (input.message) {
    // capture 'type' field if present
    var prefix = "";
    if (input.type) {
      prefix = '(type: ' + input.type + ') ';
    }
    return prefix + input.message;
  } else if (input.error) {
    return input.error;
  } else if (input.description) {
    return input.description;
  } else if (input.title) {
    return input.title;
  }
  else if (input.toLocaleString) return input.toLocaleString();
  else if (input.toString) return input.toString();
  // ??
  return 'Unknown error';
}

function formatDate(date, fmt) {
  // FIXME: we seem to be representing dates in PDT in the service,
  // should be GMT, because stamps and ambiguity
  fmt = fmt || 'yyyy-mm-dd hh:MM "PDT"';
  if (!(date instanceof Date)) date = new Date(date);
  return dateformat(date, fmt);
}

function restCall(options) {
  const opName = options.opName || 'fetching remote data';
  if (!options.onSuccess) throw new Error('onSuccess callback undefined for op ' + opName);
  if (!options.onError) throw new Error('onError callback undefined for op ' + opName);
  if (!options.uri) throw new Error('URI undefined for op ' + opName);

  const FETCH_OPTS = {
    method: options.method || 'GET',
    url: SERVICE_URL + options.uri,
    headers: {
      'Accept': 'application/json'
    }
  };
  if (options.body) {
    FETCH_OPTS.data = options.body;
    FETCH_OPTS.headers['Content-Type'] = 'application/json';
  }
  axios(FETCH_OPTS)
    .then((response) => {
      //console.log('axios response', response);
      if (response.status >= 200 && response.status < 299 && !_.get(response, 'data.error')) {
        options.onSuccess(response.data);
      } else {
        //toast.error(options.uri + ' returned ' + response.status + ", error: " + errToString(response.data));
        options.onError(response.payload);
      }
    })
    .catch((error) => {
      console.error("restCall failed:", error);
      //toast.error(opName + " failed: CATCH " + errToString(error));
      options.onError(error);
    })
    .finally(() => {
      if (options.onFinally) {
        options.onFinally();
      }
    });
}

function mapSize(o) {
  return o ? Object.getOwnPropertyNames(o).length : 0;
}

export { restCall, errToString, formatDate, mapSize, history };
