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
        const sortByPrice = financialDetails.sort((item1, item2) => {
            return item2.price - item1.price;
        });

        updateFinancialInstruments(sortByPrice);
    };

    sortTicker(financialDetails) {
        const { updateFinancialInstruments } = this.props;
        const sortByTicker = financialDetails.sort((item1, item2) => {
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
        return (
            <div className="container" role="main">
                <h1>Financial Instruments</h1>
                {!this.props.config.financialInstruments &&
                    <div>
                        <h2>Failed to load...</h2>
                    </div>
                }
                {this.props.config && this.props.config.financialInstruments &&
                    <div>
                        <div className="actions">
                            <button className="button" onClick={() => this.sortAsset(this.props.config.financialInstruments)}>Sort Assets</button>
                            <button className="button" onClick={() => this.sortPrice(this.props.config.financialInstruments)}>Sort By Price</button>
                            <button className="button" onClick={() => this.sortTicker(this.props.config.financialInstruments)}>Sort Ticker</button>
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
                                <TableRows financialInstruments={this.props.config.financialInstruments} />
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