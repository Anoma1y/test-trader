import React from 'react';
import { Component } from 'react';

export const Account = ({balance}) => {

    const getBalance = Object.keys(balance).map((item, i) => {
        return (
            <div key={i} className="price-item">
                <p>{item}:</p><span>{balance[item]}</span>
            </div>);
    })
    return (
        <div className="balance">
            <h3>Мои балансы</h3>
            <div className="balance-info">
                {getBalance}
            </div>            
        </div>
    )
}
