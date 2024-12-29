import { useState } from 'react';

import styled from '@emotion/styled';

import { useAppSelector } from '../../../../../../redux/store';
import ExperienceCard from './ExperienceCard';
import ExperienceForm from './ExperienceForm';

const Experiences = () => {
  const { authData } = useAppSelector((state) => state.auth);
  const [editExperienceForm, setEditExperienceForm] = useState<boolean>(false);
  const [formIndex, setFormIndex] = useState<number>();

  if (editExperienceForm) {
    return (
      <Container>
        <ExperienceForm
          setEditExperienceForm={setEditExperienceForm}
          editExperienceForm
          formIndex={formIndex}
        />
      </Container>
    );
  }

  return (
    <Container>
      {authData?.experiences.length === 0 ? (
        <ExperienceForm />
      ) : (
        <ExperienceCard
          setEditExperienceForm={setEditExperienceForm}
          setFormIndex={setFormIndex}
        />
      )}
      {!!authData?.experiences.length ? (
        <AddAnotherBtn onClick={() => setEditExperienceForm(true)}>
          Add another experience
        </AddAnotherBtn>
      ) : (
        <></>
      )}
    </Container>
  );
};

export default Experiences;

const Container = styled.div``;

const AddAnotherBtn = styled.div`
  display: flex;
  color: ${({ theme }) => theme.palette.mainBlue};
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
`;
