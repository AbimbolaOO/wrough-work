import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import useGetUserData from "../../hooks/getData/useGetUserData";
import useGetExperience from "../../hooks/getData/useGetExperience";
import useGetVerification from "../../hooks/getData/useGetVerification";
import { LoadingOutlined } from "@ant-design/icons";
import { calculateTimeAgo } from "../../utils/utils";

interface PopupProfileProps {
  selectedButton?: string; // Prop for determining the initially selected button
  forApplicant?: boolean; // Flag to show if it's for an applicant
  applicantId?: string; // The optional applicant ID, passed when forApplicant is true
}

const PopupProfile: React.FC<PopupProfileProps> = ({
  selectedButton,
  forApplicant = false, // Default, value of forApplicant is false
  applicantId,
}) => {
  const colors = ["#2857d1", "#27AE60"]; // Predefined colors for dynamic background

  const [activeButton, setActiveButton] = useState<string>("Experience"); // State to track which tab is active
  const [showButtons, setShowButtons] = useState<boolean>(forApplicant); // Show buttons if it's for an applicant
  const { userData, loading } = useGetUserData(applicantId); // Fetch user profile data

  const { userExperience } = useGetExperience(applicantId); // Fetch user experience data

  // Fetch user verification data
  // TODO: Find a better way to handle this logic if possible
  const { verificationData } = useGetVerification(
    applicantId
      ? userData?.verification?.id ?? " " // If `applicantId` exists and `userData?.verification?.id` is undefined, pass "  ", otherwise pass the ID
      : userData?.verification?.id || undefined // If no `applicantId`, pass `userData?.verification?.id` or undefined
  );

  // Set active button based on selectedButton prop or default to "Experience"
  useEffect(() => {
    setActiveButton(selectedButton || "Experience");
  }, [selectedButton]);

  // Toggle buttons visibility when forApplicant changes
  useEffect(() => {
    setShowButtons(forApplicant);
    return () => {
      setShowButtons(false); // Reset to false on unmount
    };
  }, [forApplicant]);

  // Handle button click and set the active tab
  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  // Generate a random color (used for dynamic backgrounds)
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Get the initials from the user's name or company name
  function getFirstAlphabets(input: string): string {
    const words = input.split(" ");
    let result: string;
    if (words.length === 1) {
      const firstLetter = words[0][0].toUpperCase();
      const lastLetter = words[0][words[0].length - 1].toUpperCase();
      result = firstLetter + lastLetter;
    } else if (words.length >= 2) {
      const firstAlphabet = words[0][0].toUpperCase();
      const secondAlphabet = words[1][0].toUpperCase();
      result = firstAlphabet + secondAlphabet;
    } else {
      throw new Error("The input string must contain at least one word.");
    }
    return result;
  }

  console.log(userData?.verification?.id);

  return (
    <Container>
      {/* Left section for profile image and bio */}
      <Left>
        <div>
          <div>
            <div>
              <img src="/static/img/profileAppDum.jpg" alt="" />
            </div>
            <p>
              <span>
                <p>
                  {loading ? (
                    <LoadingOutlined />
                  ) : (
                    `${userData?.firstName} ${userData?.lastName}`
                  )}
                </p>
              </span>
              <span>{userData?.occupation}</span>
            </p>
          </div>
          {/* Display user's bio */}
          <p>{userData?.bio}</p>
        </div>
      </Left>

      {/* Right section for details and tabs */}
      <Right>
        <div>
          <h3>Basic Information</h3>
          <div>
            <p>
              <span>Age:</span>
              <br />
              <span>
                {userData?.birthday ? (
                  <>{calculateTimeAgo(userData?.birthday)}</>
                ) : (
                  "N/A"
                )}
              </span>
            </p>
            <p>
              {" "}
              <span>Years of Experience</span>
              <br />
              <span>{userData?.yearsOfExperience} years</span>
            </p>
            <p>
              {" "}
              <span>Location</span>
              <br />
              <span>{userData?.state} Nigeria</span>
            </p>
            <p>
              {" "}
              <span>Availability</span>
              <br />
              <span>Full Time</span>
            </p>
            {/* Display applicant-specific buttons if forApplicant is true */}
            {showButtons && (
              <p>
                <button>Schedule an Interview</button>
              </p>
            )}
            {showButtons && (
              <p>
                <button>View CV</button>
              </p>
            )}
          </div>
        </div>

        {/* Buttons for Experience, Education, and Licenses tabs */}
        <div>
          <ul>
            <li>
              <Button
                isActive={activeButton === "Experience"}
                onClick={() => {
                  handleButtonClick("Experience");
                }}
              >
                Experience
              </Button>
            </li>
            <li>
              <Button
                isActive={activeButton === "Education"}
                onClick={() => {
                  handleButtonClick("Education");
                }}
              >
                Education
              </Button>
            </li>
            <li>
              <Button
                isActive={activeButton === "Licenses"}
                onClick={() => {
                  handleButtonClick("Licenses");
                }}
              >
                Licenses & certifications
              </Button>
            </li>
          </ul>
          <hr />

          {/* Content for the selected tab */}
          {loading ? (
            <LoadingOutlined />
          ) : activeButton === "Experience" ? (
            <div>
              {/* Display user experience */}
              {userExperience.map((experience, index) => (
                <DetailsInfo key={index}>
                  <div
                    style={{
                      backgroundColor: colors[index] || getRandomColor(),
                    }}
                  >
                    {getFirstAlphabets(experience.companyName)}
                  </div>
                  <div>
                    <h3>{experience.companyName}</h3>
                    <p>
                      {experience.title} | {experience.employmentType}
                    </p>
                    <span>{`${
                      experience.startDate
                        ? new Date(experience.startDate).toLocaleDateString()
                        : "N/A"
                    } - ${
                      experience.endDate
                        ? new Date(experience.endDate).toLocaleDateString()
                        : "N/A"
                    } | ${experience.location}`}</span>
                  </div>
                  <hr />
                </DetailsInfo>
              ))}
            </div>
          ) : activeButton === "Education" ? (
            <div>
              {/* Display user education */}
              {userExperience
                .filter((ed) => ed.otherQualification) // Filter where otherQualification is not null or undefined
                .map((ed, index) => (
                  <DetailsInfo key={index}>
                    <div
                      style={{
                        backgroundColor: colors[index] || getRandomColor(),
                      }}
                    >
                      {ed.otherQualification &&
                        ed.otherQualification
                          .split(" ")
                          .filter((word) => word[0] === word[0].toUpperCase())
                          .slice(0, 2)
                          .map((word) => word[0])
                          .join("")}
                    </div>
                    <div>
                      <h3>{ed.otherQualification && ed.otherQualification}</h3>
                      <p>
                        {typeof ed?.qualificationCertificate === "string"
                          ? ed.qualificationCertificate.includes("Certificate")
                            ? ed.qualificationCertificate.substring(
                                ed.qualificationCertificate.indexOf(
                                  "Certificate"
                                ),
                                ed.qualificationCertificate.indexOf(
                                  "Certificate"
                                ) + 19
                              )
                            : "No certificate available"
                          : "No certificate available"}
                      </p>
                      <span>
                        {"date issued : "}
                        {ed.yearOfQualification
                          ? new Date(
                              ed.yearOfQualification
                            ).toLocaleDateString() // Safely convert to Date and extract year
                          : "No license year available"}
                      </span>
                    </div>
                    <hr />
                  </DetailsInfo>
                ))}
              {/* Display user verification data for education */}
              {verificationData && Object.keys(verificationData).length > 0 ? (
                <DetailsInfo>
                  <div
                    style={{
                      backgroundColor: colors[0] || getRandomColor(),
                    }}
                  >
                    {verificationData.primaryDegreeName
                      .split(" ")
                      .filter((word) => word[0] === word[0].toUpperCase())
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")}
                  </div>
                  <div>
                    <h3>{verificationData.primaryDegreeName}</h3>
                    <p>
                      {typeof verificationData.primaryDegreeCertificate ===
                      "string"
                        ? verificationData.primaryDegreeCertificate.includes(
                            "Certificate"
                          )
                          ? verificationData.primaryDegreeCertificate.substring(
                              verificationData.primaryDegreeCertificate.indexOf(
                                "Certificate"
                              ),
                              verificationData.primaryDegreeCertificate.indexOf(
                                "Certificate"
                              ) + 19
                            )
                          : "No certificate available"
                        : "No certificate available"}
                    </p>
                    <span>
                      {"date issued :   "}
                      {verificationData.yearOfCurrentLicense
                        ? new Date(
                            verificationData.yearOfCurrentLicense
                          ).toLocaleDateString() // Safely convert to Date and extract year
                        : "No license year available"}
                    </span>
                  </div>
                  <hr />
                </DetailsInfo>
              ) : (
                <p>...</p> // Display if the object is empty or null
              )}
            </div>
          ) : activeButton === "Licenses" ? (
            <div>
              {/* Display user licenses */}
              {verificationData && Object.keys(verificationData).length > 0 ? (
                <DetailsInfo>
                  <div
                    style={{
                      backgroundColor: colors[0] || getRandomColor(),
                    }}
                  >
                    {verificationData.primaryDegreeName
                      .split(" ")
                      .filter((word) => word[0] === word[0].toUpperCase())
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")}
                  </div>
                  <div>
                    <h3>{verificationData.validationNumber}</h3>
                    <p>{verificationData.status}</p>
                    <span>
                      {"date issued :   "}
                      {verificationData.yearOfCurrentLicense
                        ? new Date(
                            verificationData.yearOfCurrentLicense
                          ).toLocaleDateString() // Safely convert to Date and extract year
                        : "No license year available"}
                    </span>
                  </div>
                  <button>View Certificates</button>
                  <hr />
                </DetailsInfo>
              ) : (
                <p>...</p> // Display if the object is empty or null
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </Right>
    </Container>
  );
};

export default PopupProfile;

/* --- STYLED COMPONENTS --- */

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;

  //mobile-specific styles
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

/* Left section for profile */
const Left = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    box-shadow: 0px 20px 26px 0px #bab6b629;
    width: 22.6rem;
    height: 41.8rem;
    padding: 40px 33px 131px 32px;
    border-radius: 6px;
    display: flex;
    gap: 1rem;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    & > div {
      display: flex;
      flex-direction: column;
      justify-content: start;
      align-items: center;
      width: 10rem;
      height: 10.4rem;
      & > div {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        & > img {
          width: 100%;
          height: auto;
        }
      }
      & > p {
        flex-grow: 1;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        & span {
          font-size: 18px;
          font-weight: 500;
          text-wrap: nowrap;
          line-height: 26.91px;
          letter-spacing: -0.02em;
          text-align: left;
        }
        & > span:nth-of-type(1) {
        }
        & > span:nth-of-type(2) {
          color: #2857d1;
          font-size: 16px;
          font-weight: 400;
          line-height: 23.92px;
          letter-spacing: -0.02em;
        }
      }
    }
    & > p {
      width: 100%;
      flex-grow: 1;
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      letter-spacing: -0.02em;
    }
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    width: 100%;
    height: fit-content;
    background-color: ${({ theme }) => theme.palette.white};
    border-radius: 10px;

    & > div {
      height: fit-content;
      padding: 20px;

      & > div {
        height: fit-content;

        & > div {
          width: 50px;
          height: 50px;
        }
      }
    }
  }
`;

/* Right section for details and tabs */
const Right = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
  height: 41.8rem;
  & > div {
    width: 100%;
    border-radius: 6px;
    padding: 33px;
  }
  & > div:nth-of-type(1) {
    height: 13.6rem;
    box-shadow: 0px 20px 26px 0px #bab6b629;
    & h3 {
      font-size: 18px;
      font-weight: 500;
      line-height: 26.91px;
      letter-spacing: -0.05em;
      text-align: left;
    }
    & > div {
      height: 85%;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: start;
      align-items: start;
      & > p {
        height: 53px;
        width: 12.5rem;
        & > span:nth-of-type(1) {
          color: #828282;
          font-size: 16px;
          font-weight: 400;
        }
        & > span:nth-of-type(2) {
          color: #4f4f4f;
          font-size: 18px;
          font-weight: 400;
          line-height: 26.91px;
        }
        & > button {
          width: 11rem;
          height: 2.5rem;
          border-radius: 4px;
          opacity: 0px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-family: Kanit;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
        }
      }
      & > p:nth-of-type(5) {
        display: flex;
        justify-content: start;
        align-items: center;
        & > button {
          border: none;
          background-color: #2857d1;
        }
      }
      & > p:nth-of-type(6) {
        display: flex;
        justify-content: start;
        align-items: center;
        & > button {
          border: none;
          background-color: #7a40f2;
        }
      }
    }
  }
  & > div:nth-of-type(2) {
    overflow: auto;
    overflow-x: hidden;
    position: relative;
    height: 26.3rem;
    box-shadow: 0px 20px 26px 0px #bab6b629;
    & > ul {
      z-index: 10;
      background-color: white;
      list-style-type: none;
      display: flex;
      gap: 1rem;
      justify-content: start;
      align-items: center;
      & > li {
        width: 180px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        font-weight: 500;
      }
    }
    & > hr {
      position: absolute;
      top: 17%;
      left: 0;
      right: 0;
      border: 0.1px solid #bdbdbd;
      opacity: 0.2;
    }
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    width: 100%;
    height: fit-content;

    & > div {
      background-color: ${({ theme }) => theme.palette.white};
      padding: 20px;
    }

    & > div:nth-of-type(1) {
      height: fit-content;

      & > h3 {
        font-size: 16px;
        font-weight: 500;
      }

      & > div {
        & > p {
          width: 50%;
          margin-bottom: 1rem;
        }

        & > p:nth-child(5) {
          display: flex;
          justify-content: start;
          align-items: center;
          width: 100%;
          & > button {
            width: 100%;
            border: none;
            background-color: #2857d1;
          }
        }
        & > p:nth-child(6) {
          display: flex;
          justify-content: start;
          align-items: center;
          width: 100%;
          & > button {
            width: 100%;
            border: none;
            background-color: #7a40f2;
          }
        }
      }
    }

    & > div:nth-of-type(2) {
      & > ul {
        justify-content: center;
        align-items: center;
        padding: 0;
        gap: 0;

        & > li {
          width: fit-content;
          text-wrap: nowrap;
          font-size: 13px;
        }
      }
    }
  }
`;

interface ButtonProps {
  isActive: boolean;
}

/* Style for the buttons used in the tabs */
const Button = styled.button<ButtonProps>`
  border: none;
  background-color: inherit;
  color: #bdbdbd;
  color: ${({ isActive }) => (isActive ? "#2857D1" : "#BDBDBD")};
`;

/* Style for displaying experience, education, and license details */
const DetailsInfo = styled.div`
  width: 100%;
  height: 4.4rem;
  max-width: 18.5rem;
  display: flex;
  gap: 0.2rem;
  justify-content: start;
  align-items: start;
  margin-left: 5.8rem;
  margin-top: 32px;
  margin-bottom: 16px;
  position: relative;
  & > hr {
    position: absolute;
    border: 0.1px solid #bdbdbd;
    opacity: 0.2;
    width: 730px;
    left: -128px;
    bottom: -16px;
  }
  & > button {
    position: absolute;
    right: -15rem;
    top: 25%;
    border: none;
    white-space: nowrap;
    font-size: 16px;
    font-weight: 400;
    line-height: 23.92px;
    letter-spacing: -1px;
    background-color: inherit;
    color: #2f80ed;
  }
  & > div:nth-child(1) {
    border: none;
    width: 3rem;
    height: 3rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    font-size: 18px;
    font-weight: 400;
    line-height: 26.91px;
  }
  & > div:nth-child(2) {
    flex-grow: 1;
    height: 100%;
    & > h3 {
      white-space: nowrap;
      font-size: 16px;
      font-weight: 400;
      line-height: 23.92px;
      letter-spacing: -1px;
    }
    & > p {
      font-size: 16px;
      font-weight: 400;
      line-height: 23.92px;
      color: #828282;
    }
    & > span {
      font-size: 14px;
      font-weight: 400;
      line-height: 20.93px;
      letter-spacing: -1px;
      color: #828282;
    }
  }

  //mobile-specific styles
  @media (max-width: 768px) {
    margin-left: 0;

    & > div:nth-child(1) {
      width: 2rem;
      height: 2rem;
      font-size: 16px;
      font-weight: 300;
    }

    & > div:nth-child(2) {
      & > h3 {
        font-size: 14px;
      }

      & p > {
        font-size: 14px;
      }
    }
  }
`;
