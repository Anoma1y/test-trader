import React from 'react';
import { Component } from 'react';


class Account extends Component {
	constructor(props){
        super(props);
        this.state = {
            balance: this.props.balance
        }
    }
   
    render() {
        return (
            <div className="balance">
                <h3>Мои балансы</h3>
                <div className="balance-info">
                {
                    Object.keys(this.state.balance).map((item, i) =>{
                        return (
                            <div key={i} className="price-item">
                                <p>{item}:</p><span>{this.state.balance[item]}</span>
                            </div>);
                    })
                }
                </div>
            </div>
        )
    }
}
export default Account;