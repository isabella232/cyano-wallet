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
// import { get } from 'lodash';
import DirectWebSDK from '@toruslabs/torus-direct-web-sdk'
import * as React from 'react';
import { RouterProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { accountImportPrivateKey } from 'src/api/accountApi';
import { getBackgroundManager } from 'src/popup/backgroundManager';
// import { importTrezorKey } from '../../../api/trezorApi';
import { reduxConnect, withProps } from '../../compose';
import { Actions, GlobalState } from '../../redux';
import { DirectAuthLoginView, Props } from './loginView';
const torus = new DirectWebSDK({
  DISCORD_CLIENT_ID: '630308572013527060',
  FACEBOOK_CLIENT_ID: '2554219104599979',
  GOOGLE_CLIENT_ID: '876733105116-i0hj3s53qiio5k95prpfmj0hp0gmgtor.apps.googleusercontent.com',
  REDDIT_CLIENT_ID: 'dcQJYPaG481XyQ',
  TWITCH_CLIENT_ID: 'tfppratfiloo53g1x133ofa4rc29px',
  baseUrl: 'https://localhost:3000/serviceworker',
  network: 'ropsten',
  proxyContractAddress: '0x4023d2a0D330bF11426B12C6144Cfb96B7fa6183',
  redirectToOpener: true,
})
torus.init()

const mapStateToProps = (state: GlobalState) => ({
  loading: state.loader.loading,
  wallet: state.wallet.wallet
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({ 
  finishLoading: Actions.loader.finishLoading,
  setWallet: Actions.wallet.setWallet,
  startLoading: Actions.loader.startLoading
}, dispatch);

const enhancer = (Component: React.ComponentType<Props>) => (props: RouterProps) => (
  reduxConnect(mapStateToProps, mapDispatchToProps, (reduxProps, actions) => (
    withProps({
      handleCancel: () => {
        props.history.goBack();
      },
      handleGoogle: async () => {
        try {
          const obj = await torus.triggerLogin('google', 'google')
          const { wallet } = accountImportPrivateKey(obj.privateKey.toString(), '', reduxProps.wallet)
          await actions.setWallet(wallet);
          await getBackgroundManager().refreshBalance();
          props.history.push('/dashboard');
        } catch (e) {
          // tslint:disable-next-line:no-console
          console.warn("could not retrieve key from DirectAuth: ", e)
        }
      }
    }, (injectedProps) => (
      <Component {...injectedProps} loading={reduxProps.loading} />
    ))
  ))
)

export const DirectAuthLogin = enhancer(DirectAuthLoginView);
