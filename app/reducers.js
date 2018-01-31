import { combineReducers } from 'redux'

const BALANCE = {
    USD: 100000, BTC: 0, ETH: 0,XRP: 0, BCH: 0, ADA: 0, NEO: 0, LTC: 0, XLM: 0, EOS: 0, XEM: 0
}
const historyList = [];
const ExchangeRates = {};

const exchangeRatesReducer = (state = ExchangeRates, action) => {
    switch(action.type) {
        case "UPDATE_EXCHANGERATES":
            return Object.assign(state, action.payload);
    }
    return state
}

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
            console.log(state)
            return state.concat(action.payload)  
    }
    return state
}


export default combineReducers({
    exchangeRatesReducer,
    balanceReducer,
    historyReducer
});