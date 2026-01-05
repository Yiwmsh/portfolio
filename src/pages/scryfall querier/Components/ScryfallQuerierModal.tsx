import { SemanticColors } from "@chrisellis/react-carpentry";
import React from "react";
import { SiteModalSettingKey, useSiteSetting } from "../hooks/siteSettings";
import { ModalBackdrop } from "./ModalBackdrop";

interface ScryfallQuerierModalProps {
  modalSettingKey: SiteModalSettingKey;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  title?: string;
}

export const ScryfallQuerierModal: React.FC<ScryfallQuerierModalProps> = ({
  modalSettingKey,
  children,
  style,
  title,
}) => {
  const { settingValue: isOpen, setSetting: setIsOpen } =
    useSiteSetting(modalSettingKey);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalBackdrop
      isOpen={isOpen ?? false}
      setIsOpen={(e) => setIsOpen(false)}
    >
      <div
        style={{
          position: "relative",
          zIndex: 2,
          background: `var(${SemanticColors.midground})`,
          margin: "auto",
          border: `1px solid var(${SemanticColors.primary})`,
          padding: "2rem",
          overflow: "hidden",
          maxHeight: "80%",
          maxWidth: "80%",
          ...style,
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          style={{
            background: "none",
            width: "2rem",
            height: "2rem",
            fontSize: "1.5rem",
            border: "none",
            cursor: "pointer",
            right: "0",
            top: "0",
            position: "absolute",
          }}
          onClick={() => setIsOpen(false)}
        >
          x
        </button>
        {title && (
          <h1
            style={{
              position: "absolute",
              top: 0,
            }}
          >
            {title}
          </h1>
        )}
        {children}
      </div>
    </ModalBackdrop>
  );
};
