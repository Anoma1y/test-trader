import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';

class History extends Component {
	constructor(props){
        super(props);
    }
   
    render() {
        return (
            <div className="history">
                <h3>История операций</h3>
                <div className="history-list">
                    <table>
                        <thead>
                            <tr>
                                <th>Тип</th>
                                <th>Пара</th>
                                <th>Потрачено</th>
                                <th>Получено</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.historyList.map((item, i) => {
                                    let classType = item["typeid"] == 0 ? "td-crypto-buy" : "td-crypto-sold";
                                    let costType = item["typeid"] == 0 ? "USD" : item["cryptoName"];
                                    let incomeType = item["typeid"] == 0 ? item["cryptoName"] : "USD";
                                    return (
                                        <tr key={i}>
                                            <td className={classType}>{item["type"]}</td>
                                            <td>{item["cryptoName"]}/USD</td>
                                            <td>{item["costs"]} {costType}</td>
                                            <td>{item["income"]} {incomeType}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default History;
