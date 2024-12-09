import React from 'react';

import styled from '@emotion/styled';

import { PrimaryButton } from '../Button';
import { ButtonLink } from '../Link/Link';

interface IbulletList {
  content: string;
}

interface IBulletCard {
  title: string;
  description: string;
  btnLink: string;
  btnText: string;
  bulletList: IbulletList[];
  className?: string;
}

const BulletCard: React.FC<IBulletCard> = ({
  title,
  description,
  btnLink,
  btnText,
  bulletList,
  className,
}) => {
  return (
    <Container className={className ? className : ''}>
      <Title>{title}</Title>
      <Discription>{description}</Discription>
      <Ul>
        {bulletList.map((item, index) => (
          <li key={index}>{item.content}</li>
        ))}
      </Ul>
      <ButtonLink to={btnLink}>
        <PrimaryButton className="transparent">{btnText}</PrimaryButton>
      </ButtonLink>
    </Container>
  );
};

export default BulletCard;

// Styles
const Container = styled.section`
  display: flex;
  flex-direction: column;
  /* gap: 1rem; */
  color: white;
  padding: 3.94rem 2.38rem;
  border-radius: 0.375rem;
  background-color: ${({ theme }) => theme.palette.mainPurple};

  &.business {
    background-color: ${({ theme }) => theme.palette.mainBlue};
  }
`;

const Title = styled.h3`
  font-size: 2.5rem;
  font-weight: 600;
`;

const Discription = styled.p`
  font-size: 1.25rem;
  font-weight: 400;
`;

const Ul = styled.ul`
  font-size: 1.25rem;
  font-weight: 400;
  /* border: 2px solid red; */
  display: flex;
  gap: 1.25rem;
  flex-direction: column;
  list-style: none;
  margin: 1.5rem 0;
  padding: 0;

  & li {
    position: relative;
    margin-left: 0;
    padding-left: 34px;
  }

  & li::before {
    content: url('/static/svg/bulletIcon.svg');
    position: absolute;
    left: 0;
    top: calc(0% + 4px);
  }
`;
