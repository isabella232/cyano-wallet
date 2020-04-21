/*
 * Copyright (C) 2018 Matus Zamborsky
 * This file is part of Cyano Wallet.
 *
 * Cyano Wallet is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Cyano Wallet is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cyano Wallet.  If not, see <http://www.gnu.org/licenses/>.
 */
import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { isIdentityLedgerKey } from 'src/api/identityApi';
import { isLedgerKey } from '../../../api/accountApi';
import { getWallet } from '../../../api/authApi';
import { isTrezorKey } from '../../../api/trezorApi';
import { dummy, lifecycle, reduxConnect } from '../../compose';
import { GlobalState } from '../../redux';

const mapStateToProps = (state: GlobalState) => ({
  loading: state.loader.loading,
  requests: state.transactionRequests.requests,
  wallet: state.wallet.wallet
});

const enhancer = (Component: React.ComponentType<{}>) => (props: RouteComponentProps<any>) => (
  reduxConnect(mapStateToProps, dummy, (reduxProps) => (
    lifecycle({
      componentDidMount: async () => {
        const wallet = getWallet(reduxProps.wallet!);
        const identityConfirmKey = 'identityConfirm'
        const identityConfirm = (props.location.state || {})[identityConfirmKey];

        if (identityConfirm) {
          if (isIdentityLedgerKey(wallet)) {
            props.history.replace('/ledger/confirm', props.location.state);
          } else {
            props.history.replace('/confirm-normal', props.location.state);
          }
        } else {
          if (isLedgerKey(wallet)) {
            props.history.replace('/ledger/confirm', props.location.state);
          } else if (isTrezorKey(wallet)) {
            props.history.replace('/trezor/confirm', props.location.state);
          } else {
            props.history.replace('/confirm-normal', props.location.state);
          }
        }    
      }
    }, () => (
      <Component />
    ))
  ))
);

export const Confirm = enhancer(() => null);
