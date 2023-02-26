import React from 'react';
import s from './FormControls.module.css';
import {Field} from "redux-form";
import { FieldValidatorType } from '../../../../Utils/validators';


const FormControl = ({input, meta,child, ...props}) => {
    const hasError = meta.touched && meta.error;
    return (<div className={s.formControl + " " + (hasError ? s.error: " ")}>
            <div>
                {props.children}
            </div>
           { hasError && <span>{meta.error}</span>}
        </div>
    )
}

 export const Textarea = (props) => {
    const {input, meta,child, ...restprops} = props;
    return <FormControl {...props}><textarea {...input} {...restprops}/></FormControl>       
}

export const Input = (props) => {
    const {input, meta,child, ...restprops} = props;
     return <FormControl {...props}><input {...input} {...restprops}/></FormControl>
}

export const createField = (placeholder:string,
                            name:string,
                            validators:Array<FieldValidatorType>,
                            component:string|React.Component|React.FC,
                            props={},text="") => (
    <div>
        <Field placeholder={placeholder}
                name={name}
                validate={validators}
                component={component}
                {...props}
            /> {text}
    </div>
    )