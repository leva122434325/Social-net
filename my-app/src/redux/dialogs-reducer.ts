const ADD_MESSAGE = 'ADD-MESSAGE';

type dialogType ={
    id:number
    name:string
}
type messageType ={
    id:number
    message:string
}

let initialState = {
    dialogsData: [
        {id:1, name: "Omar" },
        {id:2, name: "Oleg" },
        {id:3, name: "Maksim" },
        {id:4, name: "Sofia" },
        {id:5, name: "Valera" },
        ] as Array<dialogType>,
    messageData: [
        {id:1, message: "hi" },
        {id:2, message: "how are youi" },
        {id:3, message: "where are you from?" },
        ]as Array<messageType>,

  };

  export type initialStateType = typeof initialState

  const dialogsReducer = (state = initialState, action: any):initialStateType => {

    switch(action.type) {
        case ADD_MESSAGE: {
            let newMessage = {
                id:8,
                message:action.SendMessage,
            }
            return {
                ...state,
                messageData: [...state.messageData, newMessage],
            }
        }
        default:
            return state;
    }
}
    export type sendMessageCreatorActionType={
        type: typeof ADD_MESSAGE,
        SendMessage: string
    }

    export const sendMessageCreator = (SendMessage: string):sendMessageCreatorActionType => {
    return {type: ADD_MESSAGE, SendMessage}
  }



export default dialogsReducer;
