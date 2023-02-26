import profileReducer, { addPostActionCreator } from "../profile-reducer";



it('new post should be incremented', () => {
  let action = addPostActionCreator("leva");
  let state = {
    postData: [
      { id: 1, message: "привки", likes: 15 },
      { id: 2, message: "пока", likes: 20 }
  ]};
  let  newState = profileReducer(state,action);
  
  // 
  
  expect(newState.postData[4].message).toBe("leva");

});

 