import { Dispatch } from "redux";
import { stopSubmit } from "redux-form";
import { ThunkAction } from "redux-thunk";
import {authAPI, ResultCodeEnum, securityAPI} from "../api/api";
import { AppStateType } from "./redux-store";

const SET_USER_DATA= 'SET_USER_DATA';
const GET_CAPTCHA = 'GET_CAPTCHA';

  let initialState = {
      id: null as number | null,
      email: null as string | null,
      login: null as string | null,
      isAuth: false as boolean,
      captchaUrl: null as string | null, 
 }; 

 export type initialStateType = typeof initialState

     const authReducer = (state = initialState, action: any):initialStateType => {
    
        switch(action.type) {
            case SET_USER_DATA:
            case GET_CAPTCHA:
            return {
                ...state,
               ...action.payload,
                }
            default:
                 return state;
        }
     }

    type ActionType= setAuthUserDataActionType|getCaptchaType
    type setAuthUserDataActionPayloadType = {
        userid:number|null
        email:string|null
        login:string|null
        isAuth:boolean
    }
    type setAuthUserDataActionType = {
        type:typeof SET_USER_DATA
        payload:setAuthUserDataActionPayloadType
    }
    type getCaptchaType = {
        type: typeof GET_CAPTCHA
        payload: {captchaUrl: string}
    }
    export const setAuthUserData = (userid: number|null,email: string|null,login: string|null,isAuth:boolean): setAuthUserDataActionType => 
    ( {type: SET_USER_DATA, payload: {userid,email,login,isAuth}})
    export const getCaptcha = (captchaUrl: string):getCaptchaType =>( {type: GET_CAPTCHA,payload: {captchaUrl}})
     
    type DispatchType = Dispatch<ActionType>
    type GetStateType = () => AppStateType
    type ThunkType = ThunkAction<Promise<void>,AppStateType,unknown,ActionType>
    
        export const getAuthUserData = () => async (dispatch: DispatchType) => {
            let response = await authAPI.me();
                if(response.data.resultCode === ResultCodeEnum.Success) {
                 let {id,email,login} = response.data.data;
                dispatch(setAuthUserData(id,email,login,true));
                }
        }

        export const login = (email:string, password:string, rememberMe:boolean,captcha:string):ThunkType => async(dispatch) => {
            
            let response = await authAPI.login(email, password, rememberMe,captcha);
                if(response.data.resultCode === ResultCodeEnum.Success) {
                dispatch(getAuthUserData());
                }
                else {
                    if(response.data.resultCode === ResultCodeEnum.CaptchaIsRequired){
                        dispatch(getCaptchaUrl())
                    }
                    let message = response.data.messages.length > 0 ? response.data.messages[0] : "Some error";
                    dispatch(stopSubmit("login", {_error: message})); 
                }
        }
        export const getCaptchaUrl = () => async (dispatch:DispatchType) => {
            let response = await securityAPI.getCaptchaUrl();
             const captchaUrl = response.data.url;
                dispatch(getCaptcha(captchaUrl));
        }

        export const logOut = () => async(dispatch:DispatchType) => {
            let response = await authAPI.logOut();
                if(response.data.resultCode === ResultCodeEnum.Success) {
                dispatch(setAuthUserData(null,null,null,false));
                }
        }
    

export default authReducer;