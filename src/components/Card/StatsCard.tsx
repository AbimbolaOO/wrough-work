import styled from "@emotion/styled";

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

const CardHeader = styled.p`
  font-size: 1.125rem;
  font-weight: 500;

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 15px;
    font-weight: 500;
    text-wrap: nowrap;
  }
`;

const StatsArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.31rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatsCardContainer = styled.div`
  border-radius: 0.375rem;
  padding: 0.38rem 0.81rem;
  @media (max-width: 768px) {
    width: 150px;
    height: 68px;
    padding: 7px 16px 8px 9px;
    border-radius: 6px;
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

    //mobile-specific styles
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const StatsData = styled.p`
  font-size: 2.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.blackBlackMain};

  //mobile-specific styles
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;
