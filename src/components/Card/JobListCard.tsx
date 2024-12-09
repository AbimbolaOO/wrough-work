import React from "react";

import styled from "@emotion/styled";

import BookmarkBoxIcon from "../Icons/BookmarkBoxIcon";
import JobsIcon from "../Icons/JobsIcon";
import Img from "../Img/Img";
import { truncateText } from "../../utils/utils";
import RichTextDisplay from "../../utils/RichTextDisplay";

interface IJobListCard {
  imgSrc: string;
  institutionName: string;
  jobDescription: string;
  yearsOfExperience: string;
  pay: number;
  onClick?: () => void;
  className?: string;
}

const JobListCard: React.FC<IJobListCard> = ({
  imgSrc,
  institutionName,
  jobDescription,
  yearsOfExperience,
  pay,
  onClick,
  className,
}) => {
  return (
    <Container className={className} onClick={onClick}>
      <LeftContent>
        <LeftContentHeader>
          <ImageContainer>
            <Img src={imgSrc} alt="img" />
          </ImageContainer>
          <LeftContentText>{institutionName}</LeftContentText>
        </LeftContentHeader>
        <LeftContentLowerPart>
          <JobCardDescription>
            <RichTextDisplay richTextContent={truncateText(jobDescription)} />
          </JobCardDescription>
          <LeftContentFooter>
            <JobAgeArea>
              <JobsIcon />
              {yearsOfExperience} +years
            </JobAgeArea>
            <div>
              {pay.toLocaleString("en-NG", {
                style: "currency",
                currency: "NGN",
              })}
            </div>
          </LeftContentFooter>
        </LeftContentLowerPart>
      </LeftContent>
      <IconContainer>
        <BookmarkBoxIcon />
      </IconContainer>
    </Container>
  );
};

export default JobListCard;

const Container = styled.div`
  display: grid;
  grid-template-columns: auto 32px;
  gap: 0.5rem;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.palette.borderColor};
  border-radius: 0.3125rem;
  padding: 1.25rem;
  height: 15rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    width: 350px;
    height: 190px;
    background-color: ${({ theme }) => theme.palette.white};
    border: none;

    &.activejobs {
      border: 1px solid ${({ theme }) => theme.palette.borderColor};
      width: 100%;
    }
  }
`;

const ImageContainer = styled.div`
  width: 3.125rem;
  height: 3.125rem;
  /* border: 2px solid red; */
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.38rem;
`;

const JobAgeArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;

  & > svg {
    width: 12px;
    height: 12px;
  }
`;

const LeftContentHeader = styled.div`
  display: flex;
  /* border: 2px solid red; */
  align-items: center;
  gap: 0.38rem;
`;

const LeftContentFooter = styled.div`
  display: flex;
  gap: 1.5rem;
  color: ${({ theme }) => theme.palette.greyGrey1};
  font-size: 0.875rem;
  font-weight: 400;

  //mobile-specific styles
  @media (max-width: 768px) {
    line-height: 20.93px;
    letter-spacing: -0.02em;
  }
`;

const LeftContentText = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.blackBlack2};
  /* border: 2px solid yellow; */

  //mobile-specific styles
  @media (max-width: 768px) {
    line-height: 29.9px;
    letter-spacing: -0.05em;
  }
`;

const LeftContentLowerPart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
  /* border: 2px solid green; */
`;

const JobCardDescription = styled.div`
  font-size: 1rem;
  font-weight: 300;
  color: ${({ theme }) => theme.palette.greyGrey1};

  //mobile-specific styles
  @media (max-width: 768px) {
    line-height: 23.92px;
    letter-spacing: -0.05em;
  }
`;

const IconContainer = styled.div`
  /* width: 2rem; */
  margin-left: auto;
  /* border: 2px solid green; */
`;
