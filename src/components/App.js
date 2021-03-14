import '../App.scss';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FinancialInstrumentsTable from './FinancialInstrumentsTable';
import { fetchConfig } from '../actions'

class App extends Component {

  componentDidMount() {
    this.props.fetchConfig();
  }

  render() {
    return (
      <div className="app">
        <FinancialInstrumentsTable />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  config: state.config
});

const mapDispatch = dispatch => bindActionCreators(
  {
    fetchConfig
  },
  dispatch
);

export default connect(mapStateToProps, mapDispatch)(App);
