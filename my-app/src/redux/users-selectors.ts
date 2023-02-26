import { AppStateType } from './redux-store';
import {createSelector} from 'reselect';

export const receiveUsers = (state: AppStateType)=> {
    return state.usersPage.users;
}

export const receiveUsersSelector = (state: AppStateType)=> {
    return receiveUsers(state).filter(u => true);
}

export const getUsersSuper = createSelector(receiveUsers, (users) => {
    return users.filter(u => true);
})

export const getPageSize = (state: AppStateType)=> {
    return state.usersPage.pageSize;
}
export const getTotalUsersCount = (state: AppStateType)=> {
    return state.usersPage.totalUsersCount;
}
export const getCurrenPage = (state: AppStateType)=> {
    return state.usersPage.currenPage;
}
export const getIsFetching = (state: AppStateType)=> {
    return state.usersPage.isFetching;
}
export const getFollowingInProgress = (state: AppStateType)=> {
    return state.usersPage.followingInProgress;
}
export const getportionSize = (state: AppStateType)=> {
    return state.usersPage.portionSize;
}