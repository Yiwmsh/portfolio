import React from "react";

type QueryInputProps = {
  value?: string;
  onUpdate?: (newValue: string) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const LowFrictionInput: React.FC<QueryInputProps> = ({
  value,
  onUpdate,
  autoFocus = false,
  ...rest
}) => {
  const [inputValue, setInputValue] = React.useState(value ?? "");
  const ref = React.useRef<HTMLInputElement>(null);

  return (
    <input
      {...rest}
      ref={ref}
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={(e) => onUpdate?.(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.blur();
        }
      }}
    />
  );
};
