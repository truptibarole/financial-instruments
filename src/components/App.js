import '../App.css';
import { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FinancialInstrumentsTable from './FinancialInstrumentsTable';
// import {store} from '../store';
import { fetchConfig } from '../actions'

class App extends Component {

  componentDidMount() {
    this.props.fetchConfig();
  }

  render() {
    return (
      <div className="App">
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
