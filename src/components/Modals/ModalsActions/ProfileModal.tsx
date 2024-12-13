import { capitalize } from 'lodash';

import styled from '@emotion/styled';

import { useAppSelector } from '../../../redux/store';
import { DEFAULT_IMAGE_URL } from '../../../utils/utils';
import EducationCard from '../../Card/EducationCard';
import ExperienceCard from '../../Card/ExperienceCard';
import LicenseCard from '../../Card/LicenseCard';
import Img from '../../Img/Img';
import {
  SegmentedViewControllerLite,
  SegmentedViewDataLite,
  SegmentedViewLite,
} from '../../SegmentedView/SegmentedViewLite';
import ModalContainer from '../ModalContainer';

const segmentedControlConfData = [
  { title: 'Experience' },
  { title: 'Education' },
  { title: ' Licenses & certifications' },
];

const ProfileModal = () => {
  const { authData } = useAppSelector((state) => state.auth);

  return (
    <ModalContainer>
      <Container>
        <BioSection>
          <BioImageArea>
            <BioImageCircle>
              <Img
                src={authData?.profileImage ?? DEFAULT_IMAGE_URL}
                alt='profile image'
              />
            </BioImageCircle>
            <BioName>
              Dr. {capitalize(authData?.lastName ?? '')}{' '}
              {capitalize(authData?.firstName ?? '')}
            </BioName>
            <BioOccupation>{authData?.occupation ?? 'N/A'}</BioOccupation>
          </BioImageArea>
          <Bio>{authData?.bio ?? 'N/A'}</Bio>
        </BioSection>

        <BasicInformationSection>
          <BasicLabel>Basic information </BasicLabel>
          <AgeArea>
            <div>
              <div>Age</div>
              <DarkCell>37years</DarkCell>
            </div>
            <div>
              <div>Years of Experience</div>
              <DarkCell>6years</DarkCell>
            </div>
            <div>
              <div>Location</div>
              <DarkCell>Lagos, Nigeria</DarkCell>
            </div>
          </AgeArea>
          <Availability>
            <div>
              <div>Availability</div>
              <DarkCell>Full Time</DarkCell>
            </div>
            <Button onClick={() => alert('Lol LOl')}>
              Schedule an interview
            </Button>
            <Button className='purple' onClick={() => alert('Lol')}>
              View CV
            </Button>
          </Availability>
        </BasicInformationSection>

        {/*  */}
        <ExperienceSection>
          <SegmentedViewLite>
            <SegmentedViewControllerLite
              segmentedViewControllerTitle={segmentedControlConfData}
              className={'sm-header'}
            />

            <SegmentedViewDataLite>
              <div>
                <SegmentContainer className='experiences'>
                  {authData?.experiences.map((data, index) => (
                    <ExperienceCard
                      key={index}
                      title={data.title}
                      companyName={data.companyName}
                      employmentType={data.employmentType}
                      location={data.location}
                      startDate={data.startDate}
                      endDate={data.endDate}
                    />
                  ))}
                </SegmentContainer>
              </div>
              <div>
                <SegmentContainer>
                  <EducationCard
                    school={authData?.occupation ?? 'N/A'}
                    state={authData?.state ?? 'N/A'}
                    degree={authData?.verification?.primaryDegreeName ?? 'N/A'}
                    license={authData?.verification?.license ?? 'N/A'}
                  />
                </SegmentContainer>
              </div>
              <div>
                <SegmentContainer>
                  <LicenseCard
                    school={authData?.occupation ?? 'N/A'}
                    title={authData?.verification?.license ?? 'N/A'}
                    degree={authData?.verification?.primaryDegreeName ?? 'N/A'}
                    profession={authData?.occupation ?? 'N/A'}
                    licensedAt={
                      authData?.verification?.yearOfCurrentLicense ?? 'N/A'
                    }
                  />
                </SegmentContainer>
              </div>
            </SegmentedViewDataLite>
          </SegmentedViewLite>
        </ExperienceSection>
      </Container>
    </ModalContainer>
  );
};

export default ProfileModal;

const Container = styled.div`
  /* border: 1px solid red; */
  display: grid;
  grid-template-columns: 364px 1fr;
  gap: 30px;
  /* border: 1px solid blue; */

  & > * {
    border: 1px solid ${({ theme }) => theme.palette.greyGrey4};
    box-shadow: 0px 20px 26px 0px rgba(186, 182, 182, 0.16);
    padding: 32px;
    border-radius: 6px;
  }
`;

const ExperienceSection = styled.div`
  display: flex;
`;

const BioSection = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;
  grid-row: span 2;
`;

const BioImageArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  text-align: center;
  align-items: center;
  font-size: 16px;
`;

const BioImageCircle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100px;
  overflow: hidden;
  /* border: 1px solid red; */
  border-radius: 50%;
  margin-bottom: 16px;
`;

const BioName = styled.div`
  display: flex;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.blackBlackMain};
`;

const BioOccupation = styled.div`
  display: flex;
  color: ${({ theme }) => theme.palette.mainBlue};
`;

const Bio = styled.div`
  display: flex;
  font-weight: 400;
  color: ${({ theme }) => theme.palette.blackBlack3};
  line-height: 24px;
  max-height: 320px;
  overflow: auto;
`;

const BasicInformationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  color: ${({ theme }) => theme.palette.greyGrey2};
  /* border: 1px solid blue; */
`;

const BasicLabel = styled.div`
  color: ${({ theme }) => theme.palette.blackBlack3};
  font-weight: 500;
`;

const AgeArea = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 34px;
`;

const Availability = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  gap: 34px;
`;

const DarkCell = styled.div`
  color: ${({ theme }) => theme.palette.greyGrey1};
  font-size: 18px;
`;

const SegmentContainer = styled.div`
  display: flex;

  &.experiences {
    flex-direction: column;
    max-height: 320px;
    margin-left: -32px;
    margin-right: -32px;
    overflow-y: auto;
  }
`;

const Button = styled.div`
  display: grid;
  place-content: center;
  color: white;
  font-weight: 500;
  font-size: 14px;
  height: fit-content;
  /* line-height: 20px; */
  border-radius: 4px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.palette.mainBlue};
  cursor: pointer;

  &.purple {
    background-color: ${({ theme }) => theme.palette.mainPurple};
  }
`;
