import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Account} from './Account.jsx';
import Calculator from './Calculator.jsx';
import History from './History.jsx';
import { connect } from 'react-redux';


class App extends Component {
	constructor(props){
        super(props);
    }

    updateBalanceBuy = (cryptoName, data) => {
        let obj = this.props.balance;
        obj["USD"] -= data.USD; 
        obj[cryptoName] += data.CRYPTO;
        let history = {typeid: 0, type: "Покупка", cryptoName: cryptoName, costs: data.USD, income: data.CRYPTO};
        this.props.updateHistoryList(history);
        this.props.updateBalance(obj);
    }
    updateBalanceSold = (cryptoName, data) => {
        let obj = this.props.balance;
        obj["USD"] += data.USD; 
        obj[cryptoName] -= data.CRYPTO;
        let history = {typeid: 1, type: "Продажа", cryptoName: cryptoName, costs: data.CRYPTO, income: data.USD};
        this.props.updateHistoryList(history);
        this.props.updateBalance(obj);
    }
    render() {
        const {balance, historyList} = this.props;
        return (
            <div className="container">
                <div className="left-block">
                    <Account balance={balance}
                    />
                    <Calculator 
                        balance={balance}
                        updateBalanceBuy={this.updateBalanceBuy}
                        updateBalanceSold={this.updateBalanceSold}
                    />
                </div>
                <div className="right-block">
                    <History historyList={historyList}/>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        historyList: state.historyReducer,
        balance: state.balanceReducer
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateHistoryList: (obj) => dispatch({type: "UPDATE_HISTORY_LIST", payload: obj}),
        updateBalance: (obj) => dispatch({type: "UPDATE_BALANCE", payload: obj})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
