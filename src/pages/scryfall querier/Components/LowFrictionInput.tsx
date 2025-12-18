import React from "react";

type LowFrictionInputProps = {
  value?: string;
  onUpdate?: (newValue: string) => void;
  onFocusChange?: (isFocused: boolean) => void;
} & (
  | ({
      textArea?: false | undefined | null;
    } & React.InputHTMLAttributes<HTMLInputElement>)
  | ({
      textArea: true;
    } & React.TextareaHTMLAttributes<HTMLTextAreaElement>)
);

export const LowFrictionInput: React.FC<LowFrictionInputProps> = ({
  value,
  onUpdate,
  onFocusChange,
  textArea,
  ...rest
}) => {
  const [inputValue, setInputValue] = React.useState(value ?? "");

  React.useEffect(() => {
    setInputValue(value ?? "");
  }, [value]);

  return textArea ? (
    <textarea
      {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      value={inputValue}
      onFocus={() => {
        onFocusChange?.(true);
      }}
      onBlur={(e) => {
        onFocusChange?.(false);
        onUpdate?.(e.target.value);
      }}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.blur();
        }
      }}
    />
  ) : (
    <input
      {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
      value={inputValue}
      onFocus={() => {
        onFocusChange?.(true);
      }}
      onBlur={(e) => {
        onFocusChange?.(false);
        onUpdate?.(e.target.value);
      }}
      onChange={(e) => setInputValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.currentTarget.blur();
        }
      }}
    />
  );
};
