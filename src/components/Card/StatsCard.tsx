import styled from '@emotion/styled';

interface IStatsData {
  title: string;
  data: number;
}

interface IStatsCard {
  statsData: IStatsData[];
}

const StatsCard: React.FC<IStatsCard> = ({ statsData }) => {
  return (
    <StatsArea>
      {statsData.map((data, index) => (
        <StatsCardContainer key={index}>
          <CardHeader>{data.title}</CardHeader>
          <StatsData>{data.data}</StatsData>
        </StatsCardContainer>
      ))}
    </StatsArea>
  );
};

export default StatsCard;

const StatsArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.31rem;

  @media (max-width: 480px) {
    grid-auto-flow: column;
    overflow: auto;

    /* hide scrollbar */
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const StatsCardContainer = styled.div`
  border-radius: 0.375rem;
  padding: 0.38rem 0.81rem;

  @media (max-width: 480px) {
    width: 180px;
  }

  &:nth-of-type(1) {
    color: ${({ theme }) => theme.palette.mainBlue};
    background: rgba(215, 226, 255, 0.5);
  }

  &:nth-of-type(2) {
    color: ${({ theme }) => theme.palette.stateColorGreen};
    background: rgba(215, 255, 216, 0.5);
  }

  &:nth-of-type(3) {
    color: ${({ theme }) => theme.palette.mainPurple};
    background: rgba(228, 207, 254, 0.5);
  }
`;

const CardHeader = styled.p`
  font-size: 1.125rem;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 16px;
    font-weight: 400;
  }
`;

const StatsData = styled.p`
  font-size: 2.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.blackBlackMain};

  @media (max-width: 480px) {
    font-size: 24px;
    font-weight: 400;
  }
`;
