import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Icon } from 'antd';
import PropTypes from 'prop-types';

import './style.css';

export default function Post({ postType }) {
  return (
    <Router>
        <button className='posts--button-white'>
          <Icon className='posts--icon posts--form-icon' type='form' />
          {postType}
        </button>
    </Router>
  )
}

Post.propTypes = {
  postType: PropTypes.string.isRequired,
}
