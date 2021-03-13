import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateFinancialInstruments } from '../actions'

import TableRows from './TableRows';

class FinancialInstrumentsTable extends Component {
    constructor(props) {
        super(props);
        this.sortPrice = this.sortPrice.bind(this);
        this.sortTicker = this.sortTicker.bind(this);
        this.sortAsset = this.sortAsset.bind(this);
    }

    sortPrice(financialDetails) {
        const { updateFinancialInstruments } = this.props;
        const sortByPrice = financialDetails.sort((a, b) => {
            return b.price - a.price;
        });
        updateFinancialInstruments(sortByPrice);
    };

    sortTicker(financialDetails) {
        const { updateFinancialInstruments } = this.props;
        const sortByTicker = financialDetails.sort((a, b) => {
            const ticker1 = a.ticker.toUpperCase();
            const ticker2 = b.ticker.toUpperCase();
            if (ticker1 < ticker2) {
                return -1;
            }
            if (ticker1 > ticker2) {
                return 1;
            }
            return 0;
        });
        updateFinancialInstruments(sortByTicker);
    };

    sortAsset(finDetails) {
        const { updateFinancialInstruments } = this.props;
        const macroData = finDetails.filter(
            (details) => details.assetClass === "Macro"
        );
        const creditData = finDetails.filter(
            (details) => details.assetClass === "Credit"
        );
        const equityData = finDetails.filter(
            (details) => details.assetClass === "Equities"
        );
        const sortByAsset = macroData.concat(equityData, creditData);
        updateFinancialInstruments(sortByAsset);
    };

    render() {
        console.log(this.props.config);
        return (
            <div className="container">
                <h1>Financial Instruments</h1>
                {!this.props.config.financialInstruments &&
                    <div>
                        <h2>Failed to load...</h2>
                    </div>
                }
                {this.props.config && this.props.config.financialInstruments &&
                    <div>
                        <table className="celled table">
                            <thead>
                                <tr>
                                    <th>Asset Class</th>
                                    <th>Price</th>
                                    <th>Ticker</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableRows financialInstruments={this.props.config.financialInstruments} />
                            </tbody>
                        </table>

                        <button className="button" onClick={() => this.sortPrice(this.props.config.financialInstruments)}>Sort Price</button>
                        <button className="button" onClick={() => this.sortTicker(this.props.config.financialInstruments)}>Sort Ticker</button>
                        <button className="button" onClick={() => this.sortAsset(this.props.config.financialInstruments)}>Sort Asset</button>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    config: state.config
});

const mapDispatch = dispatch => bindActionCreators(
    {
        updateFinancialInstruments
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatch)(FinancialInstrumentsTable);