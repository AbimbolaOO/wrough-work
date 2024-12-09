import React from 'react';

import styled from '@emotion/styled';

import {
  MailingListDataType,
  mailingListInitialValues,
  MailingListSchema,
} from '../../models/mailingList/mailingList.model';
import { FormSubmitButton } from '../Button/FormSubmitButton';
import { FormComponent } from '../Form/FormComponent';
import { TextInputField } from '../Form/FormField';
import Img from '../Img/Img';

const MailingList = () => {
  const onSubmit = (value: MailingListDataType) => {
    alert('I also got the mail');
  };

  return (
    <Container>
      <Img src="/static/img/group-doctor.png" />
      <FormArea>
        <div>
          <Title>Join our Mailing list</Title>
          <Description>
            Be the first to know about our news, app features and events
          </Description>
        </div>
        <FormComponent
          initialValues={mailingListInitialValues}
          schema={MailingListSchema}
          onSubmit={onSubmit}
          className="flex"
        >
          <TextInputField
            label=""
            name="email"
            type="text"
            placeholder="Enter your email address "
            className="spanTwo mailingList"
          />
          <FormSubmitButton type="submit">Subscribe</FormSubmitButton>
        </FormComponent>
      </FormArea>
    </Container>
  );
};

export default MailingList;

// Styles
const Container = styled.div`
  display: grid;

  & > * {
    grid-column: 1;
    grid-row: 1;
  }
`;

const FormArea = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  gap: 2rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 500;
`;

const Description = styled.p`
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 400;
`;
