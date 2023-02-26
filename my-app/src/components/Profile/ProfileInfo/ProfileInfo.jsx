import React, { useState } from 'react';
import Preloader from '../../Common/preloader/Preloader';
import cdd from './ProfileInfo.module.css';
import ProfileStatusWithHooks from './profileStatusWithHooks';
import userPhoto from '../../../assets/img/user.png';
import ProfileDataForm from "./profileDataForm";



const ProfileInfo = (props) => {

    const [editMode, setEditMode] = useState(false)
    // const [edit, setEdit] = useState(true)


    if (!props.profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0])
        }
    }
    const onSubmit = async (formData) => {
        await props.saveProfile(formData)
        setEditMode(false);
    }





    return <div className={cdd.content}>
        <div className={cdd.descriptionBlock}>
            <img src={props.profile.photos.large || userPhoto} alt="photoProfile" className={cdd.mainPhoto} />

            <div>
                
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
            </div>



            {editMode ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit} />
                      : <ProfileData goToEditMode={() => { setEditMode(true) }} profile={props.profile} isOwner={props.isOwner} />
            }
            <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
        </div>
    </div>

};

const ProfileData = (props) => {
    
    return <div>
        {props.isOwner && <div>
            <button onClick={props.goToEditMode}>edit profile</button>
            </div>}
        <div>
            <b>looking For A Job</b>: {props.profile.lookingForAJob ? "yes" : "no"}
        </div>
        <div>
            <b>Full name</b>: {props.profile.fullName}
        </div>
        {props.profile.lookingForAJob &&
            <div>
                <b>My skills</b>: {props.profile.lookingForAJobDescription}
            </div>
        }
        <div>
            <b>About me</b>: {props.profile.aboutMe ? "что-то" : "no"}
        </div>
        <div>
            <b>Contacts</b>:  {Object.keys(props.profile.contacts).map(key => {
                return <Contact key={key} contactTitle={key} ContactValue={props.profile.contacts[key]} />
            })}
        </div>
    </div>

}




const Contact = ({ contactTitle, ContactValue }) => {
    return <div className={cdd.contact}><b>{contactTitle}</b>: {ContactValue}</div>

}

export default ProfileInfo;