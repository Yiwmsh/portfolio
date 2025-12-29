import { SemanticColors } from "@chrisellis/react-carpentry";
import React from "react";
import { generateGUID } from "../../utils/generateGuid";
import { LowFrictionInput } from "./Components/LowFrictionInput";
import {
  DEFAULT_DECK,
  useDecks,
  useDeleteDeck,
  useSelectedDeck,
  useSetSelectedDeck,
  useUpdateDeck,
  useUpdateDeckId,
} from "./hooks/decks";
import { useSiteSetting } from "./hooks/siteSettings";
import { QueryModifiersView } from "./QueryModifiers/QueryModifiersView";
import { Deck, DeckId } from "./types";

export const DeckModal: React.FC = () => {
  const {
    settingValue: isOpen,
    toggleSetting: toggleIsOpen,
    setSetting: setIsOpen,
  } = useSiteSetting("deck modal status");

  const { data: { selectedDeck } = {} } = useSelectedDeck();

  return (
    <>
      <h1
        style={{
          cursor: "pointer",
        }}
        onClick={() => toggleIsOpen()}
      >
        {selectedDeck ? `Deck: ${selectedDeck.name}` : "No Deck Selected"}
      </h1>
      <div
        style={{
          position: "fixed",
          display: isOpen ? "flex" : "none",
          width: `100vw`,
          maxWidth: `100vw`,
          height: "100vh",
          maxHeight: "100vh",
          top: 0,
          left: 0,
          zIndex: 1,
          backdropFilter: "blur(4px)",
        }}
        onClick={() => setIsOpen(false)}
      >
        <DeckPicker />
        <QueryModifiersView />
      </div>
    </>
  );
};

export const DeckPicker: React.FC = () => {
  const { data: { selectedDeckId } = {} } = useSelectedDeck();
  const { mutate: setSelectedDeck } = useSetSelectedDeck();

  const { data: decks } = useDecks();
  const { mutate: updateDeck } = useUpdateDeck();

  const [input, setInput] = React.useState("");
  const [search, setSearch] = React.useState("");

  const inputIsEmpty = React.useMemo(() => {
    return input.trim() === "";
  }, [input]);
  const deckNameTaken = React.useMemo(() => {
    return decks?.some((deck) => deck.name === input.trim());
  }, [decks, input]);

  const searchedDecks = React.useMemo(() => {
    if (search.trim() === "") {
      return decks;
    }

    return decks?.filter((deck) => deck.name.includes(search));
  }, [decks, search]);

  function createNewDeck() {
    const newDeck: Deck = {
      ...DEFAULT_DECK,
      name: input.trim(),
      guid: generateGUID(),
    };
    updateDeck(newDeck);
  }

  return (
    <div
      style={{
        position: "relative",
        width: "400px",
        zIndex: 2,
        background: `var(${SemanticColors.midground})`,
        border: `1px solid var(${SemanticColors.primary})`,
        height: "100%",
        paddingTop: "calc(5vh + 60px)",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        style={{
          margin: "1rem",
        }}
      >
        <div
          style={{
            border: "1px solid black",
            textAlign: "center",
            padding: "10px",
            margin: "auto",
          }}
        >
          <h3>Create A New Deck</h3>
          <label>Deck Name: </label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !inputIsEmpty && !deckNameTaken) {
                createNewDeck();
              }
            }}
          />
          <button
            disabled={inputIsEmpty || deckNameTaken}
            onClick={() => createNewDeck()}
          >
            Create New Deck
          </button>
        </div>
        <div>
          <label>Search Decks: </label>
          <LowFrictionInput
            value={search}
            onUpdate={(newValue) => setSearch(newValue)}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "5px",
            padding: "10px",
          }}
        >
          {searchedDecks &&
            searchedDecks.map((deck) => (
              <DeckDisplay
                selected={selectedDeckId === deck.guid}
                setSelected={(newSelection) => {
                  setSelectedDeck(newSelection);
                }}
                {...deck}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const buttonStyle: React.CSSProperties = {
  height: "100%",
  lineHeight: "100%",
  padding: "0 5px",
  textAlign: "center",
};

const topBarStyle: React.CSSProperties = {
  height: "20px",
  display: "flex",
  flexDirection: "row",
  padding: "0px 2px",
  justifyContent: "space-between",
};

type DeckDisplayProps = {
  selected?: boolean;
  setSelected: (newSelection?: string) => void;
} & DeckId;

const DeckDisplay: React.FC<DeckDisplayProps> = ({
  guid,
  name,
  selected,
  setSelected,
  ...rest
}) => {
  const [editing, setEditing] = React.useState(false);

  const { mutate: updateDeck } = useUpdateDeckId();
  const { mutate: deleteDeck } = useDeleteDeck();

  return (
    <div
      style={{
        width: "10rem",
        height: "10rem",
        border: `1px solid ${selected ? "blue" : "black"}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onClick={() => {
        if (selected) {
          setSelected(undefined);
        } else {
          setSelected(guid);
        }
      }}
    >
      <div style={topBarStyle}>
        <button
          onClick={() => {
            setEditing(true);
          }}
          style={{ ...buttonStyle }}
        >
          e
        </button>
        <button
          onClick={() => deleteDeck(guid)}
          style={{ ...buttonStyle }}
        >
          x
        </button>
      </div>
      <div
        style={{
          textAlign: "center",
        }}
      >
        {editing ? (
          <LowFrictionInput
            value={name}
            onUpdate={(newValue) => {
              updateDeck({
                guid,
                name: newValue,
                lastUpdated: new Date(),
              });
              setEditing(false);
            }}
          />
        ) : (
          name
        )}
      </div>
      {/* Spacer to make vertical alignment easier. */}
      <div style={topBarStyle} />
    </div>
  );
};
