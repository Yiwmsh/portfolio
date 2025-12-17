import React from "react";
import { ScryfallCard } from "./types";

const MAX_CARDS_ON_SCREEN = 42;
const CARDS_PER_ROW = 6;

const CARD_MARGIN = "5px";
const CARD_PADDING = "5px";
const CARD_IMAGE_HEIGHT = "300px";
const TOTAL_CARD_HEIGHT = `(${CARD_MARGIN} + (${CARD_PADDING} * 2) + ${CARD_IMAGE_HEIGHT})`;

interface CardsGridProps {
  cards: ScryfallCard[];
}

export const CardsGrid: React.FC<CardsGridProps> = ({ cards }) => {
  const [page, setPage] = React.useState(0);

  const { loadedCards, totalHeight, spaceBehind, spaceAhead } =
    React.useMemo(() => {
      let loadedCards: ScryfallCard[] = [];
      const pageStart = page * CARDS_PER_ROW;

      let i = pageStart;

      while (loadedCards.length < MAX_CARDS_ON_SCREEN && i < cards.length) {
        loadedCards.push(cards[i]);
        i += 1;
      }

      const totalPages = Math.ceil(cards.length / CARDS_PER_ROW);
      const totalHeight = `calc(${TOTAL_CARD_HEIGHT} * ${totalPages})`;

      const pagesBehind = page;
      const spaceBehind = `calc(${TOTAL_CARD_HEIGHT} * ${pagesBehind})`;

      const cardsAhead = cards.length - i;
      const pagesAhead = Math.ceil(cardsAhead / CARDS_PER_ROW);
      const spaceAhead = `calc(${TOTAL_CARD_HEIGHT} * ${pagesAhead})`;

      return { loadedCards, totalHeight, spaceBehind, spaceAhead };
    }, [page, cards]);

  return (
    // Grid Scroll Container
    <div
      style={{
        width: "90vw",
        background: "#ADD8E6",
        overflowY: "scroll",
        border: "1px solid red",
      }}
    >
      {/* Scrollable Page */}
      <div
        style={{
          height: totalHeight,
        }}
      >
        {/* Spacer for cards behind */}
        <div
          style={{
            height: spaceBehind,
          }}
        />
        {/* Grid */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {loadedCards.map((card) => (
            <CardDisplay card={card} />
          ))}
        </div>
        {/* Spacer for cards ahead */}
        <div
          style={{
            height: spaceAhead,
          }}
        />
      </div>
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
        margin: CARD_MARGIN,
        padding: CARD_PADDING,
      }}
    >
      <img
        style={{
          height: CARD_IMAGE_HEIGHT,
        }}
        key={card.id}
        src={imageUrl}
        alt={card.name}
      />
      <div>Score: {card.score}</div>
    </a>
  );
};
