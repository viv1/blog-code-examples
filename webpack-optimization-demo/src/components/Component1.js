import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Component1 = () => {
  let x = _.join(['C', 'o', 'm', 'p', 'o', 'n', 'e', 'n', 't', ' 1'], '');
  return <div>{x}</div>;
}

Component1.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  count: PropTypes.number,
};

export default Component1;
