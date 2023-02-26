import React, {Suspense} from 'react';
import './App.css';
import Navbar from './components/Nav/Nav';
import {  Route, Routes} from "react-router-dom";
import UsersContainer from './components/Users/UsersContainer.tsx';
import HeaderContainer from './components/Header/HeaderContainer';
import Login from './components/login/login';
import { connect } from 'react-redux';
import {initializeApp} from './redux/app-reducer.ts';
import Preloader from './components/Common/preloader/Preloader';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsIn/ContainerDialogs'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileIn/ProfileContainer'));



class App extends React.Component {
 componentDidMount() {
  this.props.initializeApp();
}


  render(){
    if(!this.props.initialized) {
    return <Preloader />
    }

  return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-content">
            <Suspense fallback={<div><Preloader /></div>}>
          <Routes>
            <Route path='/profile/:userid' element={<ProfileContainer/>}/>
            <Route path='/profile/' element={<ProfileContainer/>}/>
            <Route path='/dialogs' element={<DialogsContainer/>}/>
            <Route path='/dialogs/:userid' element={<DialogsContainer/>}/>
            <Route path='/users' element={<UsersContainer pageTitle={"lev"}/>}/>
            <Route path='/login' element={<Login/>}/>
          </Routes>
            </Suspense>
        </div>
      </div>
    );
  }
}

const mapstateToProps = (state) => ({
  initialized: state.app.initialized,
})




export default connect(mapstateToProps, {initializeApp})(App);

