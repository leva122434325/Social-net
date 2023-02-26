import {addPostActionCreator} from '../../../redux/profile-reducer.ts';
import MyPost from './Posts';
import { connect } from 'react-redux';



      let mapStateToProps = (state) => {
        return{
          postData: state.profilePage.postData,
          newPostText: state.profilePage.newPostText,
        }
      }
      let mapDispathToProps = (dispatch) => {
        return{
          addPost: (addPost) => {
            dispatch(addPostActionCreator(addPost))
          },
        }
      }


      const MyPostContainer = connect(mapStateToProps,mapDispathToProps)(MyPost);

      export default MyPostContainer;