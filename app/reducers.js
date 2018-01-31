import { combineReducers } from 'redux'

const BALANCE = {
    USD: 1000, BTC: 0, ETH: 0,XRP: 0, BCH: 0, ADA: 0, NEO: 0, LTC: 0, XLM: 0, EOS: 0, XEM: 0
}
const historyList = [];

const balanceReducer = (state = BALANCE, action) => {
    switch(action.type) {
        case "UPDATE_BALANCE":
            return Object.assign(state, action.payload);
    }
    return state
}
const historyReducer = (state = historyList, action) => {
    switch(action.type) {
        case "UPDATE_HISTORY_LIST":
            return state.concat(action.payload)  
    }
    return state
}


export default combineReducers({
    balanceReducer,
    historyReducer
});