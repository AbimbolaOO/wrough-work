import styled from '@emotion/styled';

import { useAppSelector } from '../../../../../../redux/store';
import ExperienceCard from './ExperienceCard';
import ExperienceForm from './ExperienceForm';

const Experiences = () => {
  const { authData } = useAppSelector((state) => state.auth);
  return (
    <Container>
      {authData?.experiences.length !== 0 ? (
        <ExperienceForm />
      ) : (
        <ExperienceCard />
      )}
    </Container>
  );
};

export default Experiences;

const Container = styled.div``;
