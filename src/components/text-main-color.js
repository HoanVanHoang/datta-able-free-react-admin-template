import React from "react";
import { MAIN_COLOR } from "../config/constant";
import PropTypes from 'prop-types';

const CustomMainText = ({size = '18px', color = MAIN_COLOR, content = ''}) => {
    return (
        <span style={{fontSize: size, color: color}}>
            {content}
        </span>
    );
}

CustomMainText.propTypes = {
    size: PropTypes.string,
    color: PropTypes.string,
    content: PropTypes.string,

}
export default CustomMainText;