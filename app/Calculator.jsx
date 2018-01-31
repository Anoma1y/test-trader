import React from 'react';
import { Component } from 'react';
import axios from 'axios';

class Calculator extends Component {
	constructor(props){
        super(props);
        this.pattern = /^\d*\.?\d*$/; // /^-?\d*(\.\d+)?$/    /[^0-9]+$/
        this.state = {
            currency: [],
            currentCurrency: [],
            usd: 1,
            price: 0,
            currentUSD: 0,
            balance: this.props.balance,
            currentCRYPTO: 0,
            transferData: {
                USD: 0,
                CRYPTO: 0
            },
            
        }
        this.currentCurrencyHandler = this.currentCurrencyHandler.bind(this);
        this.transferToUSD = this.transferToUSD.bind(this);
        this.transferToCryptoСurrency = this.transferToCryptoСurrency.bind(this);
        this.buyCrypto = this.buyCrypto.bind(this);
        this.soldCrypto = this.soldCrypto.bind(this);
    }
    
    //JSON запрос к курсу валют с добавлением их в состояния
    componentDidMount() {
        //Получение курса валют
        axios.get(`https://api.coinmarketcap.com/v1/ticker/?limit=10`)
        .then(response => {
            //Получение всех названий криптовалют
            this.setState({
                currency: response.data,
                currentCurrency: response.data[0],
                price: (this.state.usd / response.data[0].price_usd).toFixed(6)
            });
        })
    }

    //Функция назначения текущей валюты
    currentCurrencyHandler(e) {
        let id = parseInt(e.target.value);
        this.setState({
            currentCurrency: this.state.currency[id],
            price: (this.state.usd / this.state.currency[id].price_usd).toFixed(6),
            transferData: {
                USD: 0,
                CRYPTO: 0
            },
            currentUSD: 0,
            currentCRYPTO: 0
        })
    }

    //Перевод USD в криптовалюту
    transferToCryptoСurrency(e) {
        let val = e.target.value;
        let total = 0;
        if(val.match(this.pattern)){
            total = ((this.state.usd * val) / this.state.currentCurrency.price_usd).toFixed(6)
            this.setState({
                transferData: {
                    USD: parseFloat(val),
                    CRYPTO: parseFloat(total)
                },
                currentUSD: (val),
                currentCRYPTO: (total)
            })
        }
    }

    //Перевод криптовалюты в USD
    transferToUSD(e) {
        let val = e.target.value;
        let total = 0;
        if(val.match(this.pattern)){
            total = ((this.state.currentCurrency.price_usd * val) / this.state.usd).toFixed(2)
            this.setState({
                transferData: {
                    USD: parseFloat(total),
                    CRYPTO: parseFloat(val)
                },
                currentCRYPTO: (val),
                currentUSD: (total)
            })
        }
    }
    //Проверка наличия денег
    checkMoney() {
        if(this.state.transferData.USD > this.state.balance.USD) {
            alert("Недостаточно денег");
        } else {
            return true;
        }
    }
    //Проверка наличия крипты
    checkAvailabilityCrypto(cryptoName, count) {
        if (this.state.balance[cryptoName] > 0 && this.state.balance[cryptoName] >= count) {
            return true
        } else {
            alert("Недостаточно денег");
        }
    }
    //Покупка крипты
    buyCrypto(e) {
        const cryptoName = e.target.dataset.type;
        const transferData = this.state.transferData;
        const CRYPTO = transferData.CRYPTO;
        const USD = transferData.USD;
        if (this.checkMoney()) {
            if(confirm(`Вы уверены что хотите купить ${CRYPTO} ${cryptoName} за ${USD}$?`)) {
                this.props.updateBalanceBuy(cryptoName, transferData);
            }            
        }
    }
    //Продажа крипты
    soldCrypto(e) {
        const cryptoName = e.target.dataset.type;
        const transferData = this.state.transferData;
        const CRYPTO = transferData.CRYPTO;
        const USD = transferData.USD;
        if (this.checkAvailabilityCrypto(cryptoName, CRYPTO)) {
            if(confirm(`Вы уверены что хотите продать ${CRYPTO} ${cryptoName} за ${USD}$?`)) {
                this.props.updateBalanceSold(cryptoName, transferData);
            }
        }       
    }
    render() {
        return (
            <div className="calculator">
                <h3>Купить / Продать</h3>
                <div className="current-currency">
                    <select onChange={this.currentCurrencyHandler}>
                        {
                            this.state.currency.map((item, i) => {
                                return <option key={i} value={i}>{item.name}</option>
                            })
                        }
                    </select>                
                </div>
                <div className="converter">
                    <div>
                        <span>1 USD = ~{this.state.price} {this.state.currentCurrency.symbol}</span>
                        <input type="text" onChange={this.transferToCryptoСurrency} value={this.state.currentUSD}/>
                    </div>
                    <div>
                        <span>1 {this.state.currentCurrency.symbol} = ~{this.state.currentCurrency.price_usd} USD</span>
                        <input type="text" onChange={this.transferToUSD} value={this.state.currentCRYPTO}/>
                    </div>
                </div>
                <div className="converter-btn">
                   <input type="submit" className="soldCrypto" onClick={this.soldCrypto} data-type={this.state.currentCurrency.symbol} value={"Продать " + this.state.currentCurrency.symbol}/>
                   <input type="submit" className="buyCrypto" onClick={this.buyCrypto} data-type={this.state.currentCurrency.symbol} value={"Купить " + this.state.currentCurrency.symbol}/>
                </div>

            </div>
        )
    }
}
export default Calculator;
