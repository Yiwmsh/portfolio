import React from "react";
import { ScryfallCard } from "./hooks/scryfallQuery";

interface CardsGridProps {
  cards: ScryfallCard[];
}

export const CardsGrid: React.FC<CardsGridProps> = ({ cards }) => {
  return (
    <div
      style={{
        width: "90vw",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        background: "#ADD8E6",
        justifyContent: "space-evenly",
      }}
    >
      {cards.map((card) => (
        <CardDisplay card={card} />
      ))}
    </div>
  );
};

interface CardDisplayProps {
  card: ScryfallCard;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
  const imageUrl = card?.image_uris?.normal;

  if (!imageUrl) {
    return null;
  }

  return (
    <a
      href={card.scryfall_uri}
      style={{
        border: "1px solid black",
        margin: "5px",
        padding: "5px",
      }}
    >
      <img
        style={{
          width: "200px",
          margin: "5px",
        }}
        key={card.id}
        src={imageUrl}
        alt={card.name}
      />
      <div>Score: {card.score}</div>
    </a>
  );
};
