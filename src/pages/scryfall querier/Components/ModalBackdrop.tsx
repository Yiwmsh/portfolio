import { NAVBAR_HEIGHT_VAR_NAME } from "../../SiteNavbar";

interface ModalBackdropProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
}

export const ModalBackdrop: React.FC<ModalBackdropProps> = ({
  children,
  isOpen,
  setIsOpen,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        display: isOpen ? "flex" : "none",
        width: `100vw`,
        maxWidth: `100vw`,
        height: `calc(100vh - var(${NAVBAR_HEIGHT_VAR_NAME}))`,
        top: `var(${NAVBAR_HEIGHT_VAR_NAME})`,
        left: 0,
        zIndex: 1,
        backdropFilter: "blur(4px)",
      }}
      onClick={() => setIsOpen(false)}
    >
      {children}
    </div>
  );
};
