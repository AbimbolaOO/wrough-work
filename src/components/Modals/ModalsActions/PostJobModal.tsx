import 'quill/dist/quill.snow.css';

import Quill from 'quill';

import styled from '@emotion/styled';

import useCreateJobPost from '../../../hooks/dashboard/jobs/useCreateJobPost';
import {
  CreateJobPostDataType,
  createJobPostInitialValues,
  CreateJobPostSchema,
} from '../../../models/dashboard/jobs/createJobPost.model';
import FormSubmitButton from '../../Button/FormSubmitButton';
import { CustomDatePicker } from '../../Form/CustomDatePicker';
import { CustomTwoValDropDown } from '../../Form/CustomTwoValDropDown';
import { FormComponent } from '../../Form/FormComponent';
import { TextInputField } from '../../Form/FormField';
import NumberOnlyInputField from '../../Form/NumberOnlyInputField';
import RichTextInputField from '../../Form/RichTextInputField';
import { ToggleCheckBox } from '../../Form/ToggleCheckBox';
import ModalContainer from '../ModalContainer';

const salaryInterval: Record<string, string> = {
  'Per Hour': 'HOURLY',
  'Per Day': 'DAILY',
  'Per Week': 'WEEKLY',
  'Per Month': 'MONTHLY',
  'Per Year': 'YEARLY',
};

const PostJobModal = () => {
  const { loading, createJobPost } = useCreateJobPost();

  const handleSubmit = (values: CreateJobPostDataType, actions: any) => {
    if (String(values?.jobEndDate) === '') {
      delete values['jobEndDate'];
    }

    createJobPost(
      {
        ...values,
        payInterval: salaryInterval[values.payInterval],
      },
      () => {
        actions.resetForm({ values: createJobPostInitialValues });
        // Note this extra code below help to reset the react quill on submit without this code react quill wont work properly
        const quill = document.querySelector('.ql-editor') as HTMLDivElement & {
          __quill?: Quill;
        };
        if (quill && quill.__quill) {
          quill.__quill.setText('');
        }
      }
    );
  };

  return (
    <ModalContainer width='1080px'>
      <FormComponent
        initialValues={createJobPostInitialValues}
        schema={CreateJobPostSchema}
        onSubmit={handleSubmit}
      >
        <Row className='two-even'>
          <TextInputField
            label='Job Tittle'
            placeholder=''
            name='title'
            id='title'
            type='text'
          />
          <TextInputField
            label='Institution Name'
            placeholder=''
            name='institutionName'
            id='institutionName'
            type='text'
          />
        </Row>

        <Row className='three'>
          <NumberOnlyInputField
            label='Years of Experience'
            placeholder=''
            name='yearsOfExperience'
            id='yearsOfExperience'
            type='text'
          />
          <CustomTwoValDropDown
            label='Salary'
            placeholder=''
            name='pay'
            id='pay'
            optionData={Object.keys(salaryInterval)}
            optionName='payInterval'
          />
          <TextInputField
            label='Job Location'
            placeholder=''
            name='location'
            id='location'
            type='text'
          />
        </Row>
        <RichTextInputField
          label='Job Description'
          placeholder=''
          name='jobDescription'
          id='jobDescription'
          type='text'
        />

        <Row className='four'>
          <CustomDatePicker
            label='Start Date'
            placeholder=''
            name='jobStartDate'
            id='jobStartDate'
          />
          <CustomDatePicker
            label='Stop Date'
            placeholder=''
            name='jobEndDate'
            id='jobEndDate'
          />
          <CustomDatePicker
            label='Expiry Date'
            placeholder=''
            name='expiryDate'
            id='expiryDate'
          />
        </Row>

        <Row className='flex'>
          <Row className='two'>
            <ToggleCheckBox name='requiresResume'>
              Requires a resume
            </ToggleCheckBox>
            <ToggleCheckBox name='isPublished'>Publish</ToggleCheckBox>
          </Row>

          <FormSubmitButton loading={loading} className='small h-fit-flex-end'>
            Create
          </FormSubmitButton>
        </Row>
      </FormComponent>
    </ModalContainer>
  );
};

export default PostJobModal;

const Row = styled.div`
  display: grid;
  width: 100%;
  gap: 16px;

  &.two-even {
    grid-template-columns: 1fr 1fr;
  }

  &.three {
    grid-template-columns: 1fr 2fr 2fr;
  }
  &.four {
    grid-template-columns: 1fr 1fr 1fr;
  }

  &.flex {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
  }

  @media (max-width: 884px) {
    &.two-even,
    &.three,
    &.four {
      grid-template-columns: 1fr;
      width: 100%;
    }
    &.flex {
      flex-direction: column;
      /* border: 1px solid red; */
      margin-left: auto;
      align-items: flex-end;
      gap: 42px;
    }
  }
`;
