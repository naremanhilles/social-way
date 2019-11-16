import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import Button from 'components/utils/Button'
import PostButton from 'components/utils/PostButton';
import './style.css';

export default function Posts() {
  return (
    <section className='posts-page-main'>
      <Link to='/posts/new'>
        <Button
          className='posts--button'
        >
          <Icon className='posts--icon posts--plus-icon' type='plus' />
          New Post
          </Button>
      </Link>
      <div className='posts--post-types'>
        <Link to='/posts/live'>
          <PostButton postType='Live Post' />
        </Link>
        <Link to='/posts/draft'>
          <PostButton postType='Draft Post' />
        </Link>
      </div>
    </section>
  )
}
