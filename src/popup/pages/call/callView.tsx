/*
 * Copyright (C) 2018 Matus Zamborsky
 * This file is part of The Ontology Wallet&ID.
 *
 * The The Ontology Wallet&ID is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * The Ontology Wallet&ID is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with The Ontology Wallet&ID.  If not, see <http://www.gnu.org/licenses/>.
 */
import * as React from 'react';
import { Field, Form } from 'react-final-form';
import { Button, Form as SemanticForm } from 'semantic-ui-react';
import { AccountLogoHeader, Filler, Spacer, StatusBar, View } from '../../components';
import { required } from '../../utils/validate';

export interface InitialValues {
  contract?: string;
  method?: string;
}

export interface Props {
  initialValues: InitialValues;
  locked: boolean;
  handleConfirm: (values: object) => Promise<void>;
  handleCancel: () => void;
}

export const CallView: React.SFC<Props> = (props) => (
  <View orientation="column" fluid={true}>
    <View orientation="column" className="part gradient">
      <AccountLogoHeader title="Call SC" />
      <View content={true} className="spread-around">
        <View>Call to a smart contract.</View>
      </View>
    </View>
    <View orientation="column" fluid={true} content={true}>
      <Form
        initialValues={props.initialValues}
        onSubmit={props.handleConfirm}
        render={(formProps) => (
          <SemanticForm onSubmit={formProps.handleSubmit} className="sendForm">
            <View orientation="column">
              <label>Address</label>
              <Field
                name="contract"
                validate={required}
                render={(t) => (
                  <SemanticForm.Input
                    onChange={t.input.onChange}
                    value={t.input.value}
                    error={t.meta.touched && t.meta.invalid}
                    disabled={props.locked}
                  />
                )}
              />
            </View>
            <Spacer />
            <View orientation="column">
              <label>Method</label>
              <Field
                name="method"
                validate={required}
                render={(t) => (
                  <SemanticForm.Input
                    onChange={t.input.onChange}
                    value={t.input.value}
                    error={t.meta.touched && t.meta.invalid}
                    disabled={props.locked}
                  />
                )}
              />
            </View>
            <Spacer />
            <Filler />
            <View className="buttons">
              <Button icon="check" content="Confirm" />
              <Button onClick={props.handleCancel}>Cancel</Button>
            </View>
          </SemanticForm>
        )}
      />
    </View>
    <StatusBar />
  </View>
);
