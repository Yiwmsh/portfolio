import React from "react";
import { clamp } from "../../utils/clamp";
import { ScryfallCard } from "./types";

const CARDS_PER_ROW = 6;
const CARDS_PER_PAGE = CARDS_PER_ROW * 6;

const CARD_MARGIN = "5px";
const CARD_PADDING = "5px";
const CARD_IMAGE_HEIGHT = "300px";
const TOTAL_CARD_HEIGHT = `(${CARD_MARGIN} + (${CARD_PADDING} * 2) + ${CARD_IMAGE_HEIGHT})`;

const parseCssNumberToNumber = (cssNumber: string) => {
  return Number(cssNumber.replace(/[\D]/gm, ""));
};

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
    if (nextPage < lastPage && loadedCards.length < cards.length) {
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
        overflowY: "scroll",
        background: "#ADD8E6",
        border: "1px solid red",
        maxHeight: "77.5vh",
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
