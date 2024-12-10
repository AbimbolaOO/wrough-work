import styled from '@emotion/styled';

import { useAppSelector } from '../../../../../../redux/store';
import VerificationForm from './VerificationForm';
import VerificationTable from './VerificationTable';

const Verification = () => {
  const { authData } = useAppSelector((state) => state.auth);

  return (
    <Container>
      {authData?.verification == null ? (
        <VerificationForm />
      ) : (
        <VerificationTable />
      )}
    </Container>
  );
};

const Container = styled.div``;

export default Verification;
