import React from "react";
import { Field, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "../../../Utils/validators";
import { Textarea } from "../../Common/preloader/FormControls/FormControls";
import s from './Dialogs.module.css';
import DialogItem from "../DialogsItem/DialogsItem";
import Message from "../Message/Message";



const Dialogs = (props) => {

    let state = props.dialogsPage;

    let dialogsElements = state.dialogsData.map( (dialog) => <DialogItem name={dialog.name} id={dialog.id} />);
    let messagesElements = state.messageData.map( (mess) => < Message message={mess.message}  />);
    


      let addNewMessage = (values) => {
        props.addMessage(values.SendMessage);
      };


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={s.messages}>
                <div>{messagesElements}</div>
                <AddMessageFormRedux onSubmit={addNewMessage}/>
            </div>
           
        </div>

    )
};
const maxLength10 = maxLengthCreator(10);

 export const AddMessageForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit} > 
            <div><Field placeholder="Введите сообщение"
                        component={Textarea}
                        validate={[required, maxLength10]}
                        name="SendMessage"/></div>
                <div><button >send</button></div>
        </form>
    )
}

const AddMessageFormRedux = reduxForm ({
    form: 'addMessageForm'
}) (AddMessageForm)

export default Dialogs;