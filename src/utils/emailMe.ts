export const DEFAULT_CONTACT_EMAIL = "Contact@whimsy.page";
export const FEEDBACK_EMAIL = "Feedback@whimsy.page";

interface EmailProps {
  address?: string;
  subject?: string;
  message?: string;
}

export const emailLink = ({
  address = DEFAULT_CONTACT_EMAIL,
  subject,
  message,
}: EmailProps = {}) => {
  return `mailto:${address}${subject ? "?subject=" + subject : ""}${
    message ? "?message=" + message : ""
  }`;
};

export const emailMe = ({
  address = DEFAULT_CONTACT_EMAIL,
  subject,
  message,
}: EmailProps = {}) => {
  window.location.assign(emailLink({ address, subject, message }));
};
