import styled from "@emotion/styled";
import { useField } from "formik";

export const FormikToggleCheckbox: React.FC<IFormikToggleCheckbox> = ({
  name,
}) => {
  const [field, , helpers] = useField({ name, type: "checkbox" });
  const { setValue } = helpers;

  const handleToggle = () => {
    setValue(!field.value);
  };

  return (
    <StyledToggleButton
      className={field.value ? "on" : "off"}
      onClick={handleToggle}
    >
      <MovingCircle className={field.value ? "on" : "off"} />
    </StyledToggleButton>
  );
};

const StyledToggleButton = styled.div`
  width: 2.25rem;
  height: 1.25rem;
  display: flex;
  align-items: center;
  border-radius: 1rem;
  border: 2px solid #27ae60;
  cursor: pointer;
  transition: background-color 0.4s ease;

  &.on {
    background-color: #27ae60;
  }

  &.off {
    background-color: white;
  }
`;

const MovingCircle = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: #fff;
  border-radius: 50%;
  /* box-shadow: 0 0rem 0.5rem -0.1rem #27AE60; */
  transition: transform 0.2s ease;
  transform: translateX(0);

  &.on {
    transform: translateX(1rem);
  }

  &.off {
    background-color: #27ae60;
  }
`;

interface IFormikToggleCheckbox {
  controller: (...args: any) => void;
  name: string;
}
