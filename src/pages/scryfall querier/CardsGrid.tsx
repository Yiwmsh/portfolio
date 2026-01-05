import { SemanticColors } from "@chrisellis/react-carpentry";
import React from "react";
import { randomEasterEggQuote } from "../../consts/easterEggQuotes";
import { clamp } from "../../utils/clamp";
import { isMultiFaced, ScryfallCard } from "./types";

const parseCssNumberToNumber = (cssNumber: string) => {
  return Number(cssNumber.replace(/[\D]/gm, ""));
};

const CARDS_PER_ROW = 6;
const CARDS_PER_PAGE = CARDS_PER_ROW * 6;

const CARD_MARGIN = "5px";
const CARD_PADDING = "5px";
const CARD_IMAGE_HEIGHT = "300px";
const CARD_IMAGE_WIDTH = `${
  parseCssNumberToNumber(CARD_IMAGE_HEIGHT) * 0.71766666666
}px`;
const TOTAL_CARD_HEIGHT = `(${CARD_MARGIN} + (${CARD_PADDING} * 2) + ${CARD_IMAGE_HEIGHT})`;

const TOTAL_CARD_HEIGHT_NUMBER =
  parseCssNumberToNumber(CARD_MARGIN) +
  parseCssNumberToNumber(CARD_IMAGE_HEIGHT) +
  parseCssNumberToNumber(CARD_PADDING);

interface CardsGridProps {
  cards: ScryfallCard[];
}

export const CardsGrid: React.FC<CardsGridProps> = ({ cards }) => {
  const [nextPage, setNextPage] = React.useState(0);
  const [loadedCards, setLoadedCards] = React.useState<ScryfallCard[]>([]);

  const lastPage = React.useMemo(() => {
    return Math.ceil(cards.length / CARDS_PER_PAGE);
  }, [cards.length]);

  const loadPage = () => {
    if (nextPage <= lastPage && loadedCards.length < cards.length) {
      const pageStart = clamp(CARDS_PER_PAGE * nextPage, 0, cards.length);
      const pageEnd = clamp(pageStart + CARDS_PER_PAGE, 0, cards.length);
      const pageCards = cards.slice(pageStart, pageEnd);
      const newLoadedCards = [...loadedCards, ...pageCards];
      setLoadedCards(newLoadedCards);
      setNextPage(nextPage + 1);
    }
  };

  React.useEffect(() => {
    console.log("Resetting loaded cards");
    setLoadedCards([]);
    setNextPage(0);
    loadPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  if (cards.length === 0) {
    return null;
  }

  return (
    // Grid Scroll Container
    <div
      style={{
        width: "100%",
        overflowY: "auto",
      }}
      onScroll={(e) => {
        const distanceFromBottom =
          e.currentTarget.scrollHeight -
          e.currentTarget.scrollTop -
          e.currentTarget.clientHeight;
        if (distanceFromBottom <= TOTAL_CARD_HEIGHT_NUMBER / 2) {
          loadPage();
        }
      }}
    >
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
        {loadedCards.length === cards.length ? (
          <div
            style={{
              width: "100%",
              margin: "2rem auto",
              padding: "0 25%",
              textAlign: "center",
              color: `var(${SemanticColors.text})`,
              opacity: `60%`,
            }}
          >
            {randomEasterEggQuote()}
          </div>
        ) : null}
      </div>
    </div>
  );
};

interface CardDisplayProps {
  card: ScryfallCard;
}

const CardDisplay: React.FC<CardDisplayProps> = ({ card }) => {
  const [activeFace, setActiveFace] = React.useState(0);
  const isMultifaced = isMultiFaced(card.layout);

  const imageUrl = React.useMemo(() => {
    console.log(card.card_faces);
    if (isMultifaced && card.card_faces != null) {
      return card.card_faces[activeFace].image_uris.normal;
    } else {
      return card?.image_uris?.normal;
    }
  }, [activeFace, card.card_faces, card?.image_uris?.normal, isMultifaced]);

  if (!imageUrl) {
    return null;
  }

  return (
    <a
      href={card.scryfall_uri}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        border: `1px solid var(${SemanticColors.primary})`,
        margin: CARD_MARGIN,
        padding: CARD_PADDING,
        color: "inherit",
        textDecoration: "none",
        overflow: "hidden",
        position: "relative",
      }}
      key={card.id}
    >
      <img
        style={{
          height: CARD_IMAGE_HEIGHT,
        }}
        key={card.id}
        src={imageUrl}
        alt={card.name}
      />
      {isMultifaced && (
        <button
          style={{
            position: "absolute",
            left: `calc(${CARD_PADDING} + (${CARD_IMAGE_WIDTH} * .03))`,
            top: `calc(${CARD_PADDING} + (${CARD_IMAGE_HEIGHT} * .03))`,
            borderRadius: "100%",
            cursor: "pointer",
            // opacity: "50%",
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (activeFace === 0) {
              setActiveFace(1);
            } else {
              setActiveFace(0);
            }
          }}
        >
          <svg
            width={15}
            height={15}
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M4 10H17C19.2091 10 21 11.7909 21 14V14C21 16.2091 19.2091 18 17 18H12"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7 6L3 10L7 14"
              stroke="#000000"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>${card.prices.usd}</span>
        <span
          style={{
            maxWidth: "50%",
            textWrap: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Score: {card.score ?? 0}
        </span>
      </div>
    </a>
  );
};
