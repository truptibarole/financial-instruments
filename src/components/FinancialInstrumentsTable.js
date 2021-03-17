import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateFinancialInstruments } from '../actions'
import TableRows from './TableRows';

class FinancialInstrumentsTable extends Component {

    sortPrice = () => {
        const { updateFinancialInstruments, config } = this.props;
        const sortByPrice = config.financialInstruments.sort((item1, item2) => {
            return item2.price - item1.price;
        });

        updateFinancialInstruments(sortByPrice);
    };

    sortTicker = () => {
        const { updateFinancialInstruments, config } = this.props;
        const sortByTicker = config.financialInstruments.sort((item1, item2) => {
            if (item1.ticker < item2.ticker) {
                return -1;
            }
            if (item1.ticker > item2.ticker) {
                return 1;
            }
            return 0;
        });
        updateFinancialInstruments(sortByTicker);
    };

    sortAsset = () => {
        const { updateFinancialInstruments, config } = this.props;
        const macroData = config.financialInstruments.filter(
            details => details.assetClass === "Macro"
        );
        const creditData = config.financialInstruments.filter(
            details => details.assetClass === "Credit"
        );
        const equityData = config.financialInstruments.filter(
            details => details.assetClass === "Equities"
        );
        const sortByAsset = [...macroData, ...equityData, ...creditData];
        updateFinancialInstruments(sortByAsset);
    };

    render() {
        const { config } = this.props;
        return (
            <div className="container" role="main">
                <h1>Financial Instruments</h1>
                {!config.financialInstruments &&
                    <div>
                        <h2>Failed to load...</h2>
                    </div>
                }
                {config && config.financialInstruments &&
                    <div>
                        <div className="actions">
                            <button className="button" onClick={this.sortAsset}>Sort Assets</button>
                            <button className="button" onClick={this.sortPrice}>Sort By Price</button>
                            <button className="button" onClick={this.sortTicker}>Sort Ticker</button>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Asset Class</th>
                                    <th>Price</th>
                                    <th>Ticker</th>
                                </tr>
                            </thead>
                            <tbody>
                                <TableRows financialInstruments={config.financialInstruments} />
                            </tbody>
                        </table>
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