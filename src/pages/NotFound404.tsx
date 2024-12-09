import styled from '@emotion/styled';

export const NotFound404 = () => {
  return <Styled404>404-NotFound</Styled404>;
};

const Styled404 = styled.div`
  display: grid;
  place-content: center;
  color: ${({ theme }) => theme.palette.mainBlue};
  font-size: 8rem;
  height: 100vh;
  font-weight: 400;

  @media (max-width: 480px) {
    padding: 1rem;
    margin-bottom: 1rem;
    font-size: 2rem;
  }
`;
