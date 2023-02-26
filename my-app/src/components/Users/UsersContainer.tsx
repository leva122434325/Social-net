import React from 'react';
import { connect } from 'react-redux';
import { follow,unfollow, getUsers } from '../../redux/users-reducer';
import Preloader from '../Common/preloader/Preloader';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/WithAuthRedirect';
import { getCurrenPage, getFollowingInProgress, getIsFetching, getPageSize, getportionSize, getTotalUsersCount, receiveUsers } from '../../redux/users-selectors';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/redux-store';
import Users from './Users';

type MapStatePropsType={
    currenPage: number
    pageSize:number
    isFetching: boolean
    totalUsersCount: number
    users: Array<UserType>
    portionSize: number
    followingInProgress: Array<number>
}
type MapDispatchPropsType={
    getUsers: (currenPage:number,pageSize:number) => void
    unfollow:(userid:number) => void
    follow:(userid:number) => void
    
}
type OwnPropsType={
    pageTitle: string
}
type PropsType=OwnPropsType & MapDispatchPropsType& MapStatePropsType


class UsersContainer  extends React.Component<PropsType>{
    componentDidMount() {
        let {currenPage,pageSize} = this.props;
            this.props.getUsers(currenPage,pageSize);    
        }

        onPageChanged  = (pageNumber:number) => { 
            let {pageSize} = this.props;
            this.props.getUsers(pageNumber,pageSize);  
        }

    render()  {
        return <>
            <h2>{this.props.pageTitle}</h2>
            {this.props.isFetching ? <Preloader /> : null}
        <Users totalUsersCount={this.props.totalUsersCount}
                    pageSize={this.props.pageSize}
                    currenPage={this.props.currenPage}
                    onPageChanged={this.onPageChanged}
                    users={this.props.users}
                    unfollow={this.props.unfollow}
                    follow={this.props.follow}
                    followingInProgress={this.props.followingInProgress}
                    portionSize={this.props.portionSize}/>
        </>
    };
};


let mapStateToProps = (state:AppStateType):MapStatePropsType => {
    return{
        users: receiveUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currenPage: getCurrenPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
        portionSize: getportionSize(state),
        
    }
};



export default compose<React.Component<PropsType>>( connect<MapStatePropsType,MapDispatchPropsType,OwnPropsType,AppStateType>(mapStateToProps,
    {follow,unfollow,getUsers}),
    withAuthRedirect)(UsersContainer);
