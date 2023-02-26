import React from 'react';
import cdd from './Profile.module.css';
import MyPostContainer from '../Posts/ContainerPosts ';
import ProfileInfo from '../ProfileInfo/ProfileInfo';



const Profile = (props) => {
  
    return  <div className={cdd.content}>
                <ProfileInfo  savePhoto={props.savePhoto}
                              isOwner={props.isOwner}
                              profile={props.profile}
                              status={props.status}
                              updateStatus={props.updateStatus}
                               saveProfile={props.saveProfile}/>
                <MyPostContainer />
            </div>
    
};

export default Profile;