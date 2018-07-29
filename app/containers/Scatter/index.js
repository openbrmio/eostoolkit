/**
 *
 * Scatter
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectEosClient, makeSelectScatter, makeSelectEosAccount, makeSelectEosAuthority } from './selectors';
import { scatterLoaded, fetchNetworks } from './actions';
import reducer from './reducer';
import saga from './saga';

export class Scatter extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  render() {
    if (this.props.scatter) {
      if (this.props.eosAccount) {
        return (
          <span>
            {this.props.eosAccount}
            <small>{this.props.eosAuthority ? `@${this.props.eosAuthority}` : ''}</small>
          </span>
        );
      }
      return 'Attach an Account';
    }
    return 'Please install Scatter';
  }
}

const mapStateToProps = createStructuredSelector({
  scatter: makeSelectScatter(),
  eosClient: makeSelectEosClient(),
  eosAccount: makeSelectEosAccount(),
  eosAuthority: makeSelectEosAuthority(),
});

function mapDispatchToProps(dispatch) {
  return {
    onScatterLoaded: scatter => dispatch(scatterLoaded(scatter)),
    loadNetworks: () => dispatch(fetchNetworks()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
const withReducer = injectReducer({ key: 'scatter', reducer });
const withSaga = injectSaga({ key: 'scatter', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(Scatter);
