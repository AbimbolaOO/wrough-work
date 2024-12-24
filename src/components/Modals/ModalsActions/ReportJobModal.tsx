import React from 'react';

import styled from '@emotion/styled';

import useReportJobPost from '../../../hooks/dashboard/jobs/useReportJobPost';
import {
  ReportJobPostDataType,
  reportJobPostInitialValues,
  ReportJobPostSchema,
} from '../../../models/dashboard/jobs/reportJobPost.model';
import ValidatingFormSubmitButton from '../../Button/FormSubmitButton';
import { CustomRadio, CustomRadioGroup } from '../../Form/CustomRadioField';
import { FormComponent } from '../../Form/FormComponent';
import { TextAreaInputField } from '../../Form/FormField';
import ModalContainer from '../ModalContainer';

interface ReportJobModalProps {
  title: string;
  description: string;
}

const ReportJobModal: React.FC<ReportJobModalProps> = ({
  title,
  description,
}) => {
  const { reportJobPost, loading } = useReportJobPost();

  const handleOnSubmit = (values: ReportJobPostDataType, actions: any) => {
    reportJobPost(values, () =>
      actions.resetForm({ values: reportJobPostInitialValues })
    );
  };

  return (
    <ModalContainer width='739px' padding='32px'>
      <Container>
        <Header>Report this Job</Header>
        <FormShell>
          <FormComponent
            initialValues={reportJobPostInitialValues}
            schema={ReportJobPostSchema}
            onSubmit={handleOnSubmit}
          >
            <FormContentLayout>
              <RadioButtonArea>
                <SelectionText>
                  <Title>{title}</Title>
                  <Description>{description}</Description>
                </SelectionText>

                <CustomRadioGroup name='reason'>
                  <CustomRadio
                    name='reason'
                    value='It is Offensive, discriminatory'
                  >
                    It is Offensive, discriminatory
                  </CustomRadio>
                  <CustomRadio name='reason' value='It seems like a fake job'>
                    It seems like a fake job
                  </CustomRadio>
                  <CustomRadio name='reason' value='Pay is too low'>
                    Pay is too low
                  </CustomRadio>
                  <CustomRadio
                    name='reason'
                    value='Job description is not clear enough'
                  >
                    Job description is not clear enough
                  </CustomRadio>
                  <CustomRadio
                    name='reason'
                    value='This is a duplicate of another job post'
                  >
                    This is a duplicate of another job post
                  </CustomRadio>
                  <CustomRadio name='reason' value='Others'>
                    Others
                  </CustomRadio>
                </CustomRadioGroup>
              </RadioButtonArea>

              <BottomArea>
                <AdditionalInfo>Additional Information</AdditionalInfo>
                <TextAreaInputField
                  name='otherReason'
                  id='otherReason'
                  type='text'
                />
                <ValidatingFormSubmitButton
                  className='fillParent'
                  loading={loading}
                >
                  Submit
                </ValidatingFormSubmitButton>
              </BottomArea>
            </FormContentLayout>
          </FormComponent>
        </FormShell>
      </Container>
    </ModalContainer>
  );
};

export default ReportJobModal;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.palette.blackBlack2};
  font-size: 24px;
  line-height: 27px;
  width: 100%;
`;

const FormContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const RadioButtonArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Header = styled.div`
  font-weight: 500;
  color: ${({ theme }) => theme.palette.blackBlack2};
  border-bottom: 1px solid rgba(189, 189, 189, 0.4);
  padding: 32px;
  padding-bottom: 18px;
  margin: -32px;
  margin-top: -98px;
`;

const FormShell = styled.div`
  display: flex;
  margin-top: 42px;
  /* border: 1px solid red; */
`;

const SelectionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
`;

const Title = styled.div`
  display: flex;
  font-weight: 600;
`;

const Description = styled.div`
  font-weight: 400;
  color: ${({ theme }) => theme.palette.mainBlue};
  font-size: 16px;
  line-height: 24px;
`;

const AdditionalInfo = styled.div`
  display: flex;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: -12px;
`;

const BottomArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
