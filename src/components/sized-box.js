import React from 'react';
import PropTypes from 'prop-types';

const SizeBox = ({height = '0px'}) => {
    return (
        <div style={{ height: height }}>
    
        </div>
      );
}
SizeBox.propTypes = {
  height: PropTypes.string
}
  export default SizeBox;