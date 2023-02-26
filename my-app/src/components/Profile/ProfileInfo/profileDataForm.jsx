import React from "react";
import {createField, Input, Textarea} from "../../Common/preloader/FormControls/FormControls";
import cdd from './ProfileInfo.module.css';
import {reduxForm} from "redux-form";
import s from "../../Common/preloader/FormControls/FormControls.module.css";



const ProfileDataForm =(props) => {
    return <form onSubmit={props.handleSubmit}>
         <div><button>save</button> </div>
        { props.error && <div className={s.formSummaryError}>
            {props.error} </div>}
        <div>
            <b>Full name</b>: {createField("Full name", "fullName",[], Input)}
        </div>
        <div>
            <b>looking For A Job</b>:{createField("", "lookingForAJob",[], Input, {type: "checkbox"})}
        </div>
            <div>
                <b>looking For A Job Description</b>:
                {createField("My-skills", "lookingForAJobDescription",[], Textarea)}
            </div>
        <div>
            <b>About me</b>:
            {createField("About Me", "aboutMe",[], Textarea)}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(props.profile.contacts).map(key => {
            return <div key={key} className={cdd.contact}>
                <b>{key}: {createField(key, "contacts" + key,[], Input)}</b>
            </div>
        })}
        </div>

    </form>
}

    const ProfileDataFormRedux = reduxForm({ form: "edit-profile", enableReinitialize: true, destroyOnUnmount: false })(ProfileDataForm);

export default ProfileDataFormRedux;