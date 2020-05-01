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
// import { Field, Form } from 'react-final-form';
import { Button } from 'semantic-ui-react';
import { LogoHeader, Spacer, StatusBar, View } from '../../components';
// import { required } from '../../utils/validate';

export interface Props {
  handleGoogle: () => void;
  handleCancel: () => void;
  loading: boolean;
}

export const DirectAuthLoginView: React.SFC<Props> = (props) => (
  <View orientation="column" fluid={true}>
    <View orientation="column" fluid={true} className="part gradient">
      <LogoHeader title="Login" />
      <Spacer />
      <Button disabled={props.loading} onClick={props.handleGoogle}>Google</Button>
      <Spacer />
      <Button disabled={props.loading} onClick={props.handleCancel}>Cancel</Button>
    </View>
    <StatusBar />
  </View>
);
