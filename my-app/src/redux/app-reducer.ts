import { Dispatch } from "redux";
import { getAuthUserData } from "./auth-reducer";


const SET_INITIALIZED= 'SET_INITIALIZED';


  export type initialStateType = {
    initialized: boolean
  }
  

  let initialState: initialStateType = {
      initialized: false,
 }; 

     const appReducer = (state = initialState, action: any):initialStateType => {
        switch(action.type) {
            case SET_INITIALIZED:
            return {
                ...state,
                initialized: true,
                }
            default:
                 return state;
        }
     }

     type setInitializedType ={
        type: typeof SET_INITIALIZED
     }

    export const setInitialized = ():setInitializedType => ( {type: SET_INITIALIZED})
    
    type ActionType = setInitializedType
    type DispatchType = Dispatch<ActionType>

    export const initializeApp = () => async(dispatch: DispatchType) => {
            await dispatch(getAuthUserData());
                dispatch(setInitialized());  
     };

        

export default appReducer;