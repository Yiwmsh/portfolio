import { QueryTextDisplay } from "../Components/QueryTextDisplay";
import { ScryfallCardTextLink } from "../Components/ScryfallCardTextLink";

export const Instructions: React.FC = () => {
  return (
    <>
      <p>
        This tool is a wrapper around{" "}
        <a href="https://scryfall.com/">Scryfall</a>'s Magic: The Gathering card
        search engine.
      </p>
      <p>
        Its intended purpose is to augment Scryfall searches by sorting the
        resulting cards based on how well they synergize with your deck.
      </p>
      <h3>Getting Started</h3>
      <p>
        To begin, open the settings modal by clicking the header right under
        where it says "Orrery" at the top of the screen.
      </p>
      <p>
        The header you want to click should read "No Deck Selected" or "Deck: "
        and then the name of a deck.
      </p>
      <h3>Decks</h3>
      <p>
        From the settings modal, you can create or select decks from the list on
        the left-hand side.
      </p>
      <p>
        This tool is not intended for keeping track of decklists, so it doesn't
        offer that functionality.
      </p>
      <p>
        Instead, "Deck" here means a collection of query terms related to a deck
        you're trying to find cards for.
      </p>
      <h3>Query Compositing</h3>
      <p>
        In the settings modal, you'll see a "Global Query Terms" field, and if
        you have a deck selected you'll also see a "Deck Query Terms" field.
      </p>
      <p>
        Whenever you execute a Scryfall query, whether that's the primary search
        or updating the caches of any goals (which we'll get to in a moment),
        this tool compiles all of your query terms into a single search.
      </p>
      <h4>For example:</h4>
      <p>
        I don't like to play with Universes Beyond cards in my decks, so I might
        add <QueryTextDisplay>-is:universes-beyond</QueryTextDisplay> to my
        Global Query Terms.
      </p>
      <p>
        Next, let's say I'm building a{" "}
        <ScryfallCardTextLink cardName="Duke Ulder Ravengard" /> EDH deck, so I
        only want cards in the Boros color identity; I would add
        <QueryTextDisplay>id:boros</QueryTextDisplay> to my Deck Query Terms.
      </p>
      <p>
        Now let's say I'm looking for removal options in that deck. I might use
        the main Scryfall Search field to look for{" "}
        <QueryTextDisplay>otag:removal</QueryTextDisplay>.
      </p>
      <p>
        When I press enter or hit "search", the resulting query will be{" "}
        <QueryTextDisplay>
          ( -is:universes-beyond ) ( id:boros ) ( otag:removal )
        </QueryTextDisplay>
        , because all of those query fragments get composited together.
      </p>
      <h3>Deck Goals</h3>
      <p>
        Your deck's goals are the things you want to do, or avoid doing. They
        are comprised of:
      </p>
      <ul>
        <li>
          <b>A name</b>, so they're easier to make sense of at a glance,
        </li>
        <li>
          <b>Query terms</b> that define what sort of cards fulfil the goal in
          question,
        </li>
        <li>
          <b>A score</b> which is applied to cards that match the goal's query,
          and
        </li>
        <li>
          <b>A cache</b> of all the cards that were found the last time the
          goal's query was executed.
        </li>
      </ul>
      <p>
        If you have a deck selected, and you have goals with valid caches, then
        whenever you search via the main search bar, the resulting cards
        returned by the query will be <b>scored</b> based on which of your goals
        they overlap with, and then all of the results will be <b>sorted</b>{" "}
        based on those scores.
      </p>
      <h4>Example Goals:</h4>
      <p>
        For some example goals, let's look at the ones I use for my{" "}
        <ScryfallCardTextLink cardName={"Roon of the Hidden Realm"} /> deck.
      </p>
      <ul>
        <li>
          This deck causes creatures to be exiled from the battlefield often, so
          I have a goal called "Creatures being exiled" with the query:{" "}
          <QueryTextDisplay>
            (o:"left the battlefield" or (otag:leaves-battlefield-trigger
            -otag:death-trigger) or keyword:void or keyword:revolt or
            o:"creature is exiled" ) -otag:leaves-trigger-self
          </QueryTextDisplay>{" "}
          with a score of 1.
        </li>
        <li>
          I also care about creatures ETBing under my control, so I have:
          "Creatures entering"{" "}
          <QueryTextDisplay>
            otag:creaturefall -keyword:evolve -o:"entering under an opponent's
            control" -o:"~ enters"
          </QueryTextDisplay>{" "}
          with a score of 1.
        </li>
        <li>
          And of course I care about creatures with ETBs:{" "}
          <QueryTextDisplay>t:creature o:"When ~ enters"</QueryTextDisplay> with
          a score of 1.
        </li>
        <li>
          Because I'm flickering things, I don't want to be putting counters on
          them, so I have: "Antisynergy with counters"{" "}
          <QueryTextDisplay>otag:gives-pp-counters</QueryTextDisplay> with a
          score of -0.03
        </li>
      </ul>
      <p>
        I suggest making a lot of very specific goals, as opposed to fewer goals
        that are very broad.
      </p>
      <p>
        The more discrete things you can identify that your deck cares about,
        the more likely you are to find otherwise overlooked gems that synergize
        extremely well with your deck.
      </p>
      <p>
        Even just the process of listing the things your deck cares about can be
        really eye-opening.
      </p>
      <p>
        For example, I had overlooked{" "}
        <ScryfallCardTextLink cardName={"All-Fates Stalker"} /> for a while
        because at a glance it seemed like a standard "banish" effect. However,
        in a{" "}
        <ScryfallCardTextLink cardName={"Roon of the hidden realm"}>
          Roon
        </ScryfallCardTextLink>{" "}
        deck, "Banish" can be a way to turn 'Slow Flicker' (re-enters at the end
        of your turn) into 'Fast Flicker'. It can also save your flicker value
        creatures from board wipes or removal. It can be used as a banish effect
        in a pinch, as well. In addition to that,{" "}
        <ScryfallCardTextLink cardName={"All-Fates Stalker"} /> has Warp, which
        means it can also be a cheap 2-mana slow-flicker well before I could get{" "}
        <ScryfallCardTextLink cardName={"Roon of the hidden realm"}>
          Roon
        </ScryfallCardTextLink>{" "}
        himself into play.
        <p>
          I would have probably continued to overlook this card, because of my
          bias against banish effects, were it not for the process of using this
          tool, and the fact that no matter how I tweaked my goals,{" "}
          <ScryfallCardTextLink cardName={"All-Fates Stalker"} /> continued to
          be among the highest scoring results of my searches.
        </p>
      </p>
    </>
  );
};
