import { SemanticColors } from "@chrisellis/react-carpentry";
import React from "react";
import { generateGUID } from "../../utils/generateGuid";
import { NAVBAR_HEIGHT_VAR_NAME } from "../SiteNavbar";
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
          height: `calc(100vh - var(${NAVBAR_HEIGHT_VAR_NAME}))`,
          top: `var(${NAVBAR_HEIGHT_VAR_NAME})`,
          left: 0,
          zIndex: 1,
          backdropFilter: "blur(4px)",
        }}
        onClick={() => setIsOpen(false)}
      >
        <div
          style={{
            width: "80%",
            height: "80%",
            position: "relative",
            zIndex: 2,
            background: `var(${SemanticColors.midground})`,
            margin: "auto",
            border: `1px solid var(${SemanticColors.primary})`,
            padding: "2rem",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "1rem",
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
          <DeckPicker />
          <QueryModifiersView />
        </div>
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

    return decks?.filter((deck) =>
      deck.name.toLowerCase().includes(search.toLowerCase())
    );
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
        width: "400px",
        border: `1px solid var(${SemanticColors.primary})`,
        maxHeight: "100%",
        overflowY: "scroll",
        overflowX: "hidden",
      }}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div
        style={{
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
      <div
        style={{
          textAlign: "center",
          padding: "10px",
          margin: "auto",
        }}
      >
        <label>Search Decks: </label>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
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
        border: `1px solid var(${SemanticColors.primary})`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: selected ? `var(${SemanticColors.primary})` : "none",
        margin: "5px",
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
          onClick={(e) => {
            e.stopPropagation();
            setEditing(true);
          }}
          style={{ ...buttonStyle }}
        >
          e
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteDeck(guid);
          }}
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
            onClick={(e) => {
              e.stopPropagation();
            }}
            autoFocus
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
