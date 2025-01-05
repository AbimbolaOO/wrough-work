import { useState } from 'react';

import styled from '@emotion/styled';

import { useAppSelector } from '../../../../../../redux/store';
import VerificationForm from './VerificationForm';
import VerificationTable from './VerificationTable';

const Verification = () => {
  const { authData } = useAppSelector((state) => state.auth);
  const [editVerification, setEditVerification] = useState<boolean>(false);

  if (editVerification) {
    return (
      <Container>
        <VerificationForm
          setEditVerification={setEditVerification}
          editVerification
        />
      </Container>
    );
  }

  return (
    <Container>
      {authData?.verification == null ? (
        <VerificationForm />
      ) : (
        <VerificationTable
          setEditVerification={setEditVerification}
          // editVerification
        />
      )}
    </Container>
  );
};

export default Verification;

const Container = styled.div``;
