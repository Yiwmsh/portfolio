import { SemanticColors } from "@chrisellis/react-carpentry";
import styled from "@emotion/styled";
import { motion } from "framer-motion";

interface SwitchControlProps {
  label: string;
  falseValueLabel?: string;
  trueValueLabel?: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

const SwitchControlWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SwitchControlButtonLine = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SwitchControlButton = styled(motion.button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 4.5rem;
  height: 2rem;
  border-radius: 25px;
  box-shadow: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
`;

const SwitchButtonRoller = styled(motion.div)`
  display: flex;
  pointer-events: none;
  background-color: var(${SemanticColors.background});
  width: 1rem;
  height: 1rem;
  border-radius: 100%;
`;

export const SwitchControl: React.FC<SwitchControlProps> = ({
  label,
  trueValueLabel,
  falseValueLabel,
  value,
  onChange,
}) => {
  return (
    <SwitchControlWrapper>
      <label>{label}</label>
      <SwitchControlButtonLine>
        {trueValueLabel}
        <SwitchControlButton
          onClick={() => onChange(!value)}
          animate={{
            justifyContent: value ? "flex-end" : "flex-start",
            backgroundColor: value
              ? `var(${SemanticColors.secondary})`
              : `var(${SemanticColors.shadow})`,
          }}
          transition={{
            duration: 1,
          }}
        >
          <SwitchButtonRoller layout />
        </SwitchControlButton>
        {falseValueLabel}
      </SwitchControlButtonLine>
    </SwitchControlWrapper>
  );
};
