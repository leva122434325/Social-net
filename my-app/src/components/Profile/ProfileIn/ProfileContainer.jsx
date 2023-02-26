import React from 'react';
import { connect } from 'react-redux';
import Profile from './Profile';
import {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile} from '../../../redux/profile-reducer.ts';
import { useParams} from "react-router-dom";
import { withAuthRedirect } from '../../../hoc/WithAuthRedirect';
import { compose } from 'redux';


function withRouter(Component) {
  function ComponentWithRouterProp(props) {
     
      let params = useParams();
      return (
          <Component
              {...props}
              router={{ params }}
          />
      );
  }

  return ComponentWithRouterProp;
}

class ProfileContainer extends React.Component {
    refreshProfile () {
    let userid = this.props.router.params.userid;
    if(!userid) {userid=this.props.userid};
    if(!userid) {this.props.history.push("/login")};

    this.props.getUserProfile(userid);
    this.props.getStatus(userid);
}

  componentDidMount() {
    this.refreshProfile();
}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.router.params.userid !== prevProps.router.params.userid )
    this.refreshProfile();
}



    render() {
    
    return  (
        <Profile  {...this.props}
        saveProfile={this.props.saveProfile}
        savePhoto={this.props.savePhoto}
        isOwner={!this.props.router.params.userid}
        profile={this.props.profile} 
        status={this.props.status}
        updateStatus={this.props.updateStatus}/>
    )
  }
};

 let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  userid: state.auth.userid,
  isAuth: state.auth.isAuth,
 })

 export default compose( connect(mapStateToProps, {getUserProfile, getStatus,updateStatus,savePhoto,saveProfile}),
 withRouter,
 withAuthRedirect)(ProfileContainer);