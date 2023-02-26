import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import  thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from "./app-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import siteBarReducer from "./sitebar-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    siteBar: siteBarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer
})

type RootReduceType= typeof rootReducer
export type AppStateType = ReturnType<RootReduceType>

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store