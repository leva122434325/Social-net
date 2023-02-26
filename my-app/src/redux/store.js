import dialogsReducer from './dialogs-reducer';
import profileReducer from './profile-reducer';
import siteBarReducer from './sitebar-reducer';


let store = {
    _state: {

        profilePage: {
            postData: [
                {id:1, message: "привет", likes:15 },
                {id:2, message: "пока", likes:20 },],
            newPostText: "leva-3oByt"
           
        },
        dialogsPage: {
            dialogsData: [
                {id:1, name: "Omar" },
                {id:2, name: "Oleg" },
                {id:3, name: "Maksim" },
                {id:4, name: "Sofia" },
                {id:5, name: "Valera" },
                ],
            messageData: [
                {id:1, message: "hi" },
                {id:2, message: "how are youi" },
                {id:3, message: "where are you from?" },],
        
          newPostMessage: ""
        },
        siteBar: {},
    },
    _callSubscriber ()  {
        console.log('fuck');
    },

    getState() {
        return this._state
    },
    subscribe (observer)  {
        this._callSubscriber = observer;
    },
 
     dispatch (action) {
        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.siteBar = siteBarReducer(this._state.siteBar, action);

        this._callSubscriber(this._state);
    }, 
    
    
    
}


export default store;
window.store = store;
