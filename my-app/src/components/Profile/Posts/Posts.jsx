import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { maxLengthCreator, required } from './../../../Utils/validators';
import { Textarea } from '../../Common/preloader/FormControls/FormControls';
import cdd from './Post.module.css';
import Post from './Post1';

const MyPost = React.memo(props => {
    
  let postElements = props.postData.map((post) => 
  <Post message={post.message}
    likes={post.likes} />);

  let addNewPost = (values) => {
    props.addPost(values.addPost);
  };

  return (
    <div className={cdd.postsblock}><h3>My posts</h3><div>
      <AddPostFormRedux onSubmit={addNewPost}/>
      </div >
      <div className={cdd.posts}>{postElements}</div>
    </div>)
  
});

const maxLength10 = maxLengthCreator(10)

const AddPostForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field  component={Textarea} 
                name="опубликовать" 
                placeholder="Введите сообщение"
                validate={[required, maxLength10]}/>
      </div>
      <div ><button  >опубликовать</button></div>
    </form>
  )
}

const AddPostFormRedux = reduxForm ({
  form: 'addMessageForm'
}) (AddPostForm)

export default MyPost;