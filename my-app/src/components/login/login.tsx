import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required } from '../../Utils/validators';
import {createField, Input} from '../Common/preloader/FormControls/FormControls';
import { connect } from 'react-redux';
import {Navigate} from 'react-router-dom';
import s from '../Common/preloader/FormControls/FormControls.module.css';
import { AppStateType } from '../../redux/redux-store';
import { login } from '../../redux/auth-reducer';

type LoginFormProps= {
    captchaUrl: string|null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType,LoginFormProps> &LoginFormProps > = ({handleSubmit,captchaUrl,error}) => {
    
    return (
            <form className={s.form} onSubmit={handleSubmit}>
                <div>
                <Field placeholder={"Email"} name={"Email"}  component={Input} validate={[required]}/>
                </div>
                <div>
                <Field placeholder={"Password"} name={"Password"}  type={"password"} component={Input} validate={[required]}/>
                </div>
                <div>
                <Field component={Input} type={"checkbox"} name={"RememberMe"} /> remember me
                </div>
                {captchaUrl && <img src={captchaUrl} alt="captcha"/>}
                {captchaUrl && createField("Symbols from image", "captcha",[required], Input, {}) }
                { error && <div className={s.formSummaryError}>
                    {error}
                </div>}
                <div> 
                    <button> Submit</button>
                </div> 
            </form>
    )
}
const LoginReduxForm = reduxForm<LoginFormProps,LoginFormValuesType> ({
    form: 'login'
}) (LoginForm)


type MapStatePropsType={
    captchaUrl: string|null
    isAuth:boolean
}
type MapDispatchPropsType={
    login: (Email:string,Password:string,RememberMe:boolean,captcha:string) => void
}

type LoginFormValuesType={
    Email:string,
    Password:string,
    RememberMe:boolean,
    captcha:string
}
const Login:React.FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
    const onSubmit = (formData:any) => {
        props.login (formData.Email,formData.Password, formData.RememberMe, formData.captcha);
    }

    if (props.isAuth) {
        return <Navigate to={"/profile"}/>
    }

    return (
        <div className={s.form}>
            <h1>Logan renauth</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}
const mapStateToProps = (state:AppStateType):MapStatePropsType => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth:state.auth.isAuth,
});

export default  connect(mapStateToProps, {login} ) (Login);
