import { SemanticColors } from "@chrisellis/react-carpentry";
import React from "react";
import { generateGUID } from "../../utils/generateGuid";
import { LowFrictionInput } from "./Components/LowFrictionInput";
import { ScryfallQuerierModal } from "./Components/ScryfallQuerierModal";
import {
  DEFAULT_DECK,
  useDecks,
  useDeleteDeck,
  useSelectedDeck,
  useSetSelectedDeck,
  useUpdateDeck,
  useUpdateDeckId,
} from "./hooks/decks";
import { SiteModalSettingKey, useSiteSetting } from "./hooks/siteSettings";
import { QueryModifiersView } from "./QueryModifiers/QueryModifiersView";
import { Deck, DeckId } from "./types";

const settingKey: SiteModalSettingKey = "deck modal status";

export const DeckModal: React.FC = () => {
  const { toggleSetting: toggleIsOpen } = useSiteSetting(settingKey);

  const { data: { selectedDeck } = {} } = useSelectedDeck();

  return (
    <>
      <h1
        style={{
          cursor: "pointer",
          textAlign: "center",
        }}
        onClick={() => toggleIsOpen()}
      >
        {selectedDeck ? `Deck: ${selectedDeck.name}` : "No Deck Selected"}
      </h1>
      <ScryfallQuerierModal
        modalSettingKey={settingKey}
        style={{
          width: "80%",
          height: "80%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <DeckPicker />
        <QueryModifiersView />
      </ScryfallQuerierModal>
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
    const preSorted =
      (search.trim() === ""
        ? decks
        : decks?.filter((deck) =>
            deck.name.toLowerCase().includes(search.toLowerCase())
          )) ?? [];

    if (!selectedDeckId) {
      return preSorted;
    }

    const sorted = preSorted.sort((a, b) => {
      if (a.guid === selectedDeckId) {
        return -1;
      } else if (b.guid === selectedDeckId) {
        return 1;
      } else {
        if (a.lastUpdated > b.lastUpdated) {
          return -1;
        } else if (b.lastUpdated > a.lastUpdated) {
          return 1;
        } else {
          return 0;
        }
      }
    });

    return sorted;
  }, [decks, search, selectedDeckId]);

  function createNewDeck() {
    const newDeck: Deck = {
      ...DEFAULT_DECK,
      name: input.trim(),
      guid: generateGUID(),
      lastUpdated: new Date(),
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

const buttonStyle: React.CSSProperties = {};

const topBarStyle: React.CSSProperties = {
  height: "calc(1rem + 6px)",
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
  lastUpdated,
  ...rest
}) => {
  const [editing, setEditing] = React.useState(false);

  const { mutate: updateDeck } = useUpdateDeckId();
  const { mutate: deleteDeck } = useDeleteDeck();

  const lastUpdatedDisplay = `${lastUpdated.getUTCDate()}/${
    lastUpdated.getUTCMonth() + 1
  }/${lastUpdated.getUTCFullYear()}`;

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
        padding: "3px",
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width={`1rem`}
            height={`1rem`}
          >
            {/* !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc. */}
            <path d="M432.5 82.3L382.4 132.4L507.7 257.7L557.8 207.6C579.7 185.7 579.7 150.3 557.8 128.4L511.7 82.3C489.8 60.4 454.4 60.4 432.5 82.3zM343.3 161.2L342.8 161.3L198.7 204.5C178.8 210.5 163 225.7 156.4 245.5L67.8 509.8C64.9 518.5 65.9 528 70.3 535.8L225.7 380.4C224.6 376.4 224.1 372.3 224.1 368C224.1 341.5 245.6 320 272.1 320C298.6 320 320.1 341.5 320.1 368C320.1 394.5 298.6 416 272.1 416C267.8 416 263.6 415.4 259.7 414.4L104.3 569.7C112.1 574.1 121.5 575.1 130.3 572.2L394.6 483.6C414.3 477 429.6 461.2 435.6 441.3L478.8 297.2L478.9 296.7L343.4 161.2z" />
          </svg>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            deleteDeck(guid);
          }}
          style={{ ...buttonStyle }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 640"
            width={`1rem`}
            height={`1rem`}
          >
            {/* !Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2026 Fonticons, Inc. */}
            <path d="M232.7 69.9L224 96L128 96C110.3 96 96 110.3 96 128C96 145.7 110.3 160 128 160L512 160C529.7 160 544 145.7 544 128C544 110.3 529.7 96 512 96L416 96L407.3 69.9C402.9 56.8 390.7 48 376.9 48L263.1 48C249.3 48 237.1 56.8 232.7 69.9zM512 208L128 208L149.1 531.1C150.7 556.4 171.7 576 197 576L443 576C468.3 576 489.3 556.4 490.9 531.1L512 208z" />
          </svg>
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
      <div style={topBarStyle}>Last Updated: {lastUpdatedDisplay}</div>
    </div>
  );
};
