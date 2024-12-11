import React, { useState } from 'react';

import styled from '@emotion/styled';

import useDeleteExperience from '../../../../../../hooks/deleteData/useDeleteExperience';
import useGetExperience from '../../../../../../hooks/getData/useGetExperience';
import SavedExpCard from './SavedExpCard';

const ExperienceCard = () => {
  const { userExperience, refetch } = useGetExperience();

  const { deleteExperience } = useDeleteExperience();

  const [cards, setCards] = useState(false);

  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});

  const handleEdit = (id: string) => {
    const selectedExperience = userExperience.find(
      (experience) => experience.id === id
    );
    if (selectedExperience) {
      setEditing(true);
      setEditData(selectedExperience);
      setCards(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (id) {
      await deleteExperience(id); // Await deleteExperience call
      refetch();
    }
  };

  return (
    <CardContainer>
      {userExperience.map((experience, index) => (
        <SavedExpCard
          key={experience.id}
          title={experience.title}
          companyName={experience.companyName}
          employmentType={experience.employmentType}
          location={experience.location}
          yearOfQualification={experience.yearOfQualification}
          startDate={
            experience.startDate
              ? new Date(experience.startDate).toLocaleDateString()
              : 'N/A'
          }
          endDate={
            experience.endDate
              ? new Date(experience.endDate).toLocaleDateString()
              : 'N/A'
          }
          otherQualification={experience.otherQualification}
          qualificationCertificate={experience.qualificationCertificate}
          onEdit={async () => experience.id && handleEdit(experience.id)}
          onDelete={async () => experience.id && handleDelete(experience.id)}
        />
      ))}
      <p
        onClick={() => {
          setCards(false);
          setEditing(false);
        }}
      >
        Add experience
      </p>
    </CardContainer>
  );
};

export default ExperienceCard;

const CardContainer = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  & > p {
    position: absolute;
    bottom: -50px;
    color: ${({ theme }) => theme.palette.mainBlue};
    font-size: 18px;
    font-weight: 500;
    line-height: 20px;
    cursor: pointer;
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    & > p {
      font-size: 14px;
    }
  }
`;
