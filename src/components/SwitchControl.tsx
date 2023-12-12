import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";

interface SwitchControlProps {
  label: string;
  falseValueLabel?: string;
  trueValueLabel?: string;
  value: boolean;
  onChange: (value: boolean) => void;
  lateral?: boolean;
}

const SwitchControlWrapper = styled.div<{ extraLabels: boolean }>`
  display: inline-grid;
  grid-template: ${({ extraLabels }) =>
    extraLabels
      ? `"label label label" 1rem
    "falseLabel switch trueLabel" 2rem / 4.5rem 4.5rem 4.5rem`
      : `"label" 1rem "switch" 2rem / 4.5rem`};
  gap: 5px;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const SwitchControlInputWrapper = styled.div<{ trueColor: string }>`
  position: relative;
  grid-area: switch;

  input:checked + label {
    background: var(${({ trueColor }) => trueColor});
  }

  input:checked + label:after {
    right: 4px;
    background-color: var(${SemanticColors.altText});
    box-shadow: -2px 0px 0px var(${SemanticColors.shadow});
  }
`;

const SwitchLabel = styled.label`
  grid-area: label;
`;

const TrueLabel = styled.label`
  grid-area: trueLabel;
`;

const FalseLabel = styled.label`
  grid-area: falseLabel;
`;

const SwitchControlInputLabel = styled.label<{ falseColor: string }>`
  line-height: 2rem;
  vertical-align: middle;
  display: inline-block;
  position: relative;
  height: 2rem;
  width: 4.5rem;
  background-color: var(${({ falseColor }) => falseColor});

  cursor: pointer;
  font-size: 0;
  color: transparent;
  border-radius: 22px;

  &:after {
    content: "";
    display: block;
    height: 1.7rem;
    width: 1.7rem;
    position: absolute;
    top: 2px;
    right: 2.6rem;
    border-radius: 50%;
    background-color: #e8e8e8;
    box-shadow: 2px 0px 0px rgba(0, 0, 0, 0.15);
  }
  transition: background-color 500ms ease;
  &:after {
    transition: all 500ms ease;
  }
`;

const SwitchControlInput = styled.input`
  position: absolute !important;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  bottom: 0;
`;

export const SwitchControl: React.FC<SwitchControlProps> = ({
  label,
  trueValueLabel,
  falseValueLabel,
  value,
  onChange,
  lateral,
}) => {
  const controlId = uuidv4();
  const trueColor = SemanticColors.secondary;
  const falseColor = lateral ? SemanticColors.primary : SemanticColors.shadow;
  return (
    <SwitchControlWrapper
      extraLabels={falseValueLabel != null || trueValueLabel != null}
    >
      <SwitchLabel>{label}</SwitchLabel>
      <TrueLabel>{trueValueLabel}</TrueLabel>
      <SwitchControlInputWrapper trueColor={trueColor}>
        <SwitchControlInput
          id={controlId}
          onClick={() => onChange(!value)}
          type="checkbox"
          checked={value}
        />
        <SwitchControlInputLabel
          falseColor={falseColor}
          htmlFor={controlId}
        >
          {label}
        </SwitchControlInputLabel>
      </SwitchControlInputWrapper>
      <FalseLabel>{falseValueLabel}</FalseLabel>
    </SwitchControlWrapper>
  );
};
