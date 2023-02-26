import { profileType, photosType } from './../types/types';
import  axios from "axios";

const instance = axios.create({
    withCredentials: true,
    baseURL:'https://social-network.samuraijs.com/api/1.0/',
    headers:{
        "API-KEY" : "bd730966-4c33-4bdb-be82-4a2c7137039a"
    },
});

type UserApiType={
    items: Array<string>
    user: {id:number,name:string,status:string,photos:photosType,followed:boolean}
    totalCount:number
    error:string
}

export const usersAPI = {
        getUsers(currenPage=1,pageSize=10) {
        return instance.get( `users?page=${currenPage}&count=${pageSize}`)
            .then(response => response.data);
        },
        follow(userid:number) {
            return instance.post(`follow/${userid}`)
        },
        unfollow(userid:number) {
            return instance.delete(`follow/${userid}`)
        },
        getprofile(userid:number) {
            return profileAPI.getprofile(userid);
        },
}

type UpdateStatusType={
    data:{}
    resultCode:ResultCodeEnum
    messages:Array<string>
}
type SavePhotoType={
    data: photosType
    resultCode:ResultCodeEnum
    messages:Array<string>
}

export const profileAPI = {
    getprofile(userid:number) {
        return instance.get<profileType>(`profile/${userid}`)
    },
    getStatus(userid:number) {
        return instance.get(`profile/status/${userid}`) //any?
    },
    updateStatus(status:string) {
        return instance.put<UpdateStatusType>(`profile/status`, {status: status})
    },
    savePhoto(photoFile:string) {
        const formData = new FormData();
        formData.append("image",photoFile);
        return instance.put<SavePhotoType>(`profile/photo`, formData);
    },
    saveProfile(profile:profileType) {
        return instance.put(`profile`, profile);
    },

}

 export enum ResultCodeEnum{
    Success = 0,
    Error = 1,
    CaptchaIsRequired = 10
}
type MeResponceType={
    data:{id:number, email:string,login:string}
    resultCode:ResultCodeEnum
    messages:Array<string>
}
type loginResponceType={
    data:{userid:number}
    resultCode:ResultCodeEnum
    messages:Array<string>
}
type logOutResponceType={
    data:{}
    resultCode:ResultCodeEnum
    messages:Array<string>
}

export const authAPI = {
      me() {
      return instance.get<MeResponceType>(`auth/me`)
      },
      login(email:string, password:string, rememberMe=false, captcha:null|string=null) {
      return instance.post<loginResponceType>(`auth/login`, {email, password, rememberMe,captcha})
      },
      logOut() {
      return instance.delete<logOutResponceType>(`auth/login`)
      },
}

type GetCaptchaUrlType={
    url:string
}
export const securityAPI = {
    getCaptchaUrl() {
        return instance.get<GetCaptchaUrlType>(`security/get-captcha-url`,)
    },
}



   
  