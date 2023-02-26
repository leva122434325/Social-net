import React from 'react';
import cdd from './Post.module.css';
import postImage from '../../../assets/img/postImage.jpg'



const Post = (props) => {
  return <div className={cdd.item}>
            <div>
            <img src={postImage} alt="postImage" />
            </div>
            <div className={cdd.position}>
            {props.message}
            </div>
            <div  className={cdd.likes}> 👍 {props.likes}</div>
          </div>



};

export default Post;