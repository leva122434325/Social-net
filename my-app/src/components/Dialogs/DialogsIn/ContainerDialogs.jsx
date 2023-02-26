import { connect } from "react-redux";
import { compose } from "redux";
import { withAuthRedirect } from "../../../hoc/WithAuthRedirect";
import {sendMessageCreator} from '../../../redux/dialogs-reducer.ts';
import Dialogs from "./Dialogs";

let mapStateToProps = (state) => {
return{
  dialogsPage: state.dialogsPage,
}
}

let mapDispathToProps = (dispatch) => {
  return{
    addMessage: (SendMessage) => {
      dispatch(sendMessageCreator(SendMessage))
    }
}
}

export default compose(
  connect(mapStateToProps,mapDispathToProps),
  withAuthRedirect)(Dialogs);