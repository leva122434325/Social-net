export type postDataType={
    id:number
    message: string
    likes: number
  }
export type profileType={
    userid: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    contacts:contactsType
    photos:photosType
  }
export type contactsType={
    github:string
    vk:string
    facebook:string
    instagram:string
    twitter:string
    website:string
    youtube:string
    mainLink:string
  }
export type photosType={
    small: string|null
    large: string|null
  }
export type UserType={
    id: number
    name:string
    status:string
    photos:photosType
 }