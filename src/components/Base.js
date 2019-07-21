import React from 'react';
import _ from 'lodash';

import autoBind from 'auto-bind';

export default class Base extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  pathParam(props) {
    props = props || this.props;
    const prefixLen = _.get(props, 'match.path.length', 0);
    return _.get(this.props, 'location.pathname', '/').substring(prefixLen + 1);
  }

  hash(props) {
    props = props || this.props;
    var hash = _.get(props, 'location.hash');
    if (hash && hash.length > 1) {
      return hash.substring(1);
    }
    return null;
  }
}
