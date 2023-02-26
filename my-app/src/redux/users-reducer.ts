import { AppStateType } from './redux-store';
import { usersAPI } from "../api/api";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../Utils/object-helpers";
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { VoidExpression } from 'typescript';


const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET-USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING';



let initialState = {
    users: [] as Array<UserType>,
    pageSize: 9,
    totalUsersCount: 0,
    currenPage: 1,
    isFetching: true,
    followingInProgress: [] as Array<number>,// array id users
    portionSize: 10,
};

type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionTypes): initialStateType => {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userid, "id", { followed: true }),

            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userid, "id", { followed: false }),

            }
        case SET_USERS: {
            return { ...state, users: action.users }
        }
        case SET_CURRENT_PAGE: {
            return { ...state, currenPage: action.currenPage }
        }
        case SET_USERS_COUNT: {
            return { ...state, totalUsersCount: action.count }
        }
        case TOGGLE_IS_FETCHING: {
            return { ...state, isFetching: action.isFetching }
        }
        case TOGGLE_IS_FOLLOWING: {
            return {
                ...state, followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userid]
                    : [...state.followingInProgress.filter(id => id !== action.userid)]
            }
        }
        default:
            return state;
    }
}
type ActionTypes = followSuccessType | unfollowSuccessType | setUsersType
    | setCurrentPageType | setTotalUsersCountType | toggleIsFetchingType |
    toggleIsFollowingType
type followSuccessType = {
    type: typeof FOLLOW
    userid: number
}
type unfollowSuccessType = {
    type: typeof UNFOLLOW
    userid: number
}
type setUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currenPage: number
}
type setTotalUsersCountType = {
    type: typeof SET_USERS_COUNT
    count: number
}
type toggleIsFetchingType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
type toggleIsFollowingType = {
    type: typeof TOGGLE_IS_FOLLOWING
    isFetching: boolean
    userid: number
}
export const followSuccess = (userid: number): followSuccessType => ({ type: FOLLOW, userid })
export const unfollowSuccess = (userid: number): unfollowSuccessType => ({ type: UNFOLLOW, userid })
export const setUsers = (users: Array<UserType>): setUsersType => ({ type: SET_USERS, users })
export const setCurrentPage = (currenPage: number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, currenPage })
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountType => ({ type: SET_USERS_COUNT, count: totalUsersCount })
export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingType => ({ type: TOGGLE_IS_FETCHING, isFetching })
export const toggleIsFollowing = (isFetching: boolean, userid: number): toggleIsFollowingType => ({ type: TOGGLE_IS_FOLLOWING, isFetching, userid })

type GetStateType = () => AppStateType
type CurrentDispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>,AppStateType,unknown,ActionTypes>

export const getUsers = (page: number, pageSize: number):ThunkType => {
    return async (dispatch: CurrentDispatchType, getState: GetStateType) => {
        dispatch(toggleIsFetching(true));
        dispatch(setCurrentPage(page));

        let data = await usersAPI.getUsers(page, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollowFlow = async (dispatch:CurrentDispatchType, userid: number, apiMethod: any, actionCreator: (userid:number) => followSuccessType|unfollowSuccessType) => {
    dispatch(toggleIsFollowing(true, userid));
    let response = await apiMethod(userid)
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userid));
    }
    dispatch(toggleIsFollowing(false, userid));
}

export const follow = (userid: number):ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.follow.bind(usersAPI);
        let actionCreator = followSuccess;
        followUnfollowFlow(dispatch, userid, apiMethod, followSuccess);

    }
}

export const unfollow = (userid: number):ThunkType => {
    return async (dispatch) => {
        let apiMethod = usersAPI.unfollow.bind(usersAPI);
        let actionCreator = unfollowSuccess;
        followUnfollowFlow(dispatch, userid, apiMethod, unfollowSuccess);
    }
}

export default usersReducer;