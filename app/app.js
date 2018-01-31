import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Account from './Account.jsx';
import Calculator from './Calculator.jsx';
import History from './History.jsx';

class App extends Component {
	constructor(props){
        super(props);

        this.state = {
            balance: {
                USD: 50000, BTC: 0, ETH: 0,XRP: 0, BCH: 0, ADA: 0, NEO: 0, LTC: 0, XLM: 0, EOS: 0, XEM: 0
            },
            historyList: []
        }
    }

    updateBalanceBuy(cryptoName, data) {
        let obj = this.state.balance;
        obj["USD"] -= data.USD; 
        obj[cryptoName] += data.CRYPTO;
        let history = this.state.historyList;
        history = [...history, {typeid: 0, type: "Покупка", cryptoName: cryptoName, costs: data.USD, income: data.CRYPTO}]
        this.setState({
            balance: obj,
            historyList: history
        });

    }
    updateBalanceSold(cryptoName, data) {
        let obj = this.state.balance;
        obj["USD"] += data.USD; 
        obj[cryptoName] -= data.CRYPTO;
        let history = this.state.historyList;
        history = [...history, {typeid: 1, type: "Продажа", cryptoName: cryptoName, costs: data.CRYPTO, income: data.USD}]
        this.setState({
            balance: obj,
            historyList: history
        });
    }
    render() {
        return (
            <div className="container">
                <div className="left-block">
                    <Account balance={this.state.balance}
                    />
                    <Calculator 
                        balance={this.state.balance}
                        updateBalanceBuy={this.updateBalanceBuy.bind(this)}
                        updateBalanceSold={this.updateBalanceSold.bind(this)}
                    />
                </div>
                <div className="right-block">
                    <History historyList={this.state.historyList}/>
                </div>
            </div>
        )
    }
}


ReactDOM.render(<App />, document.getElementById('root'))