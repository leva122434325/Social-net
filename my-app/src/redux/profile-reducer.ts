import { profileAPI, usersAPI } from "../api/api";
import {stopSubmit} from "redux-form";
import { photosType, postDataType, profileType } from "../types/types";
import { Dispatch } from "redux";
import { AppStateType } from "./redux-store";
import { ThunkAction } from "redux-thunk";


const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST ='DELETE_POST';
const SAVE_PHOTO = 'SAVE_PHOTO';



let initialState = {
  postData: [
    { id: 1, message: "Возьмите", likes: 15 },
    { id: 2, message: "на работу", likes: 20 }
] as Array<postDataType>,
  profile: null as profileType | null,
  status: "",
  
};

export type initialStateType = typeof initialState

const profileReducer = (state = initialState, action:any):initialStateType => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: 8,
        message: action.addPost,
        likes: 0,
      };
      return {
        ...state,
        postData: [...state.postData, newPost],
      };

    }
    case SET_USER_PROFILE: {
      return { ...state, profile: action.profile, };
    };
    case SET_STATUS: {
      return { ...state, status: action.status, };
    };
    case DELETE_POST: {
      return { ...state, postData: state.postData.filter(p => p.id !== action.postid)};
    };
    case SAVE_PHOTO: {
      return { ...state, profile: {...state.profile, photos: action.photos} as profileType
    }};
    default:
      return state;
  }
}

type ActionTypes = addPostActionCreatorType|setUserProfileType
                  |setStatusType|deletePostType|savePhotoSuccess
type addPostActionCreatorType ={
  type: typeof ADD_POST
   addPost: string
}
type setUserProfileType={
  type: typeof SET_USER_PROFILE
   profile:profileType
}
type setStatusType={
  type: typeof SET_STATUS
  status: string
}
type deletePostType={
  type: typeof DELETE_POST
  postid: number
} 
type savePhotoSuccess={
  type: typeof SAVE_PHOTO
  photos: photosType
}

export const addPostActionCreator = (addPost:string):addPostActionCreatorType => ({ type: ADD_POST, addPost });
export const setUserProfile = (profile:profileType):setUserProfileType => ({ type: SET_USER_PROFILE, profile });
export const setStatus = (status:string):setStatusType => ({ type: SET_STATUS, status });
export const deletePost = (postid: number):deletePostType => ({ type: DELETE_POST, postid });
export const savePhotoSuccess = (photos:photosType):savePhotoSuccess => ({ type: SAVE_PHOTO, photos });

type GetStateType = () => AppStateType
type CurrentDispatchType = Dispatch<ActionTypes>
type ThunkType = ThunkAction<Promise<void>,AppStateType,unknown,ActionTypes>

export const getUserProfile = (userid:number):ThunkType => async (dispatch) => {
   let response = await usersAPI.getprofile(userid)
    dispatch(setUserProfile(response.data));
}

export const getStatus = (userid:number):ThunkType => async(dispatch) => {
  let response = await profileAPI.getStatus(userid)
    dispatch(setStatus(response.data));
}

export const updateStatus = (status:string):ThunkType => async(dispatch) => {
  let response = await profileAPI.updateStatus(status)
      if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
      }
}
export const savePhoto = (file:string):ThunkType => async(dispatch) => {
  let response = await profileAPI.savePhoto(file)
  if (response.data.resultCode === 0) {
    dispatch(savePhotoSuccess(response.data.data.photos));
  }
}
export const saveProfile = (profile:profileType):ThunkType => async(dispatch,getState) => {
 const userId = getState().auth.id;
  const response = await profileAPI.saveProfile(profile)

  if (response.data.resultCode === 0) {
    dispatch(getUserProfile(userId));
  } else {
    dispatch(stopSubmit("edit-profile", {_error: response.data.messages[0]}));
  return Promise.reject(response.data.messages[0]);
  }
}

export default profileReducer;