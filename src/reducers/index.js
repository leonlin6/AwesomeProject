import { combineReducers } from "redux";


const loginTokenReducer = (currentToken = null, action) => {
    if(action.type === 'SET_LOGIN_TOKEN'){
        console.log('set loging work');
        return action.payload;
    }
    console.log('get loging work');
    return currentToken;
};

const logoutTokenReducer = (currentToken = null, action) => {
  if(action.type === 'SET_LOGIN_TOKEN'){
      console.log('set loging work');
      return action.payload;
  }
  console.log('get loging work');
  return currentToken;
};

export default combineReducers({
    loginToken : loginTokenReducer
});