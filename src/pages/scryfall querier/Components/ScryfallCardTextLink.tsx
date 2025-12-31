import { useScryfallCard } from "../hooks/scryfallQuery";

interface ScryfallCardTextLinkProps {
  cardName: string;
  children?: React.ReactNode;
}

export const ScryfallCardTextLink: React.FC<ScryfallCardTextLinkProps> = ({
  cardName,
  children,
}) => {
  const { data: card, status } = useScryfallCard(cardName);

  if (status === "loading") {
    return null;
  }

  if (status === "error") {
    return <b>{cardName}</b>;
  }

  return (
    <a
      href={card?.scryfall_uri}
      // TODO Display image preview on hover.
    >
      {children != null ? children : card != null ? card?.name : cardName}
    </a>
  );
};
