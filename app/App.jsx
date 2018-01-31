import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Account from './Account.jsx';
import Calculator from './Calculator.jsx';
import History from './History.jsx';
import { connect } from 'react-redux';


class App extends Component {
	constructor(props){
        super(props);
    }

    updateBalanceBuy(cryptoName, data) {
        let obj = this.props.balance;
        obj["USD"] -= data.USD; 
        obj[cryptoName] += data.CRYPTO;
        let history = {typeid: 0, type: "Покупка", cryptoName: cryptoName, costs: data.USD, income: data.CRYPTO};
        this.props.updateHistoryList(history);
        this.props.updateBalance(obj);
    }
    updateBalanceSold(cryptoName, data) {
        let obj = this.props.balance;
        obj["USD"] += data.USD; 
        obj[cryptoName] -= data.CRYPTO;
        let history = {typeid: 1, type: "Продажа", cryptoName: cryptoName, costs: data.CRYPTO, income: data.USD};
        this.props.updateHistoryList(history);
        this.props.updateBalance(obj);
    }
    render() {
        return (
            <div className="container">
                <div className="left-block">
                    <Account balance={this.props.balance}
                    />
                    <Calculator 
                        balance={this.props.balance}
                        updateBalanceBuy={this.updateBalanceBuy.bind(this)}
                        updateBalanceSold={this.updateBalanceSold.bind(this)}
                    />
                </div>
                <div className="right-block">
                    <History historyList={this.props.historyList}/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        historyList: state.historyReducer,
        balance: state.balanceReducer,
        exchangeRates: state.exchangeRatesReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateExchangeRates: (obj) => dispatch({type: "UPDATE_EXCHANGERATES", payload: obj}),
        updateHistoryList: (obj) => dispatch({type: "UPDATE_HISTORY_LIST", payload: obj}),
        updateBalance: (obj) => dispatch({type: "UPDATE_BALANCE", payload: obj})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
