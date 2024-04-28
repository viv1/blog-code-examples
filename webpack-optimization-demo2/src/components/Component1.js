import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const Component1 = () => {
  return <div>Component 1</div>;
}

Component1.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  count: PropTypes.number,
};

export default Component1;
