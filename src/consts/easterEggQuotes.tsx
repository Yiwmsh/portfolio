import React from "react";

interface EasterEggQuoteDisplayProps {
  quote: string;
  attribution?: string;
  author: string;
}

export const EasterEggQuoteDisplay: React.FC<EasterEggQuoteDisplayProps> = ({
  quote,
  attribution,
  author,
}) => {
  return (
    <div>
      {quote}
      <br />― {author + (attribution != null ? ", " + attribution : "")}
    </div>
  );
};

export const randomEasterEggQuote = (): React.ReactNode => {
  return easterEggQuotes[Math.floor(Math.random() * easterEggQuotes.length)];
};

export const easterEggQuotes: React.ReactNode[] = [
  <a href="http://www.gnuterrypratchett.com/">GNU Terry Pratchett</a>,
  // # Terry Pratchett quotes
  <EasterEggQuoteDisplay
    quote={`Real stupidity beats artificial intelligence every time`}
    attribution="Hogfather"
    author="Terry Pratchett"
  />,
  <EasterEggQuoteDisplay
    quote={`There isn't a way things should be. There's just what happens, and what we do`}
    attribution={`A Hat Full of Sky`}
    author={`Terry Pratchett`}
  />,
  <EasterEggQuoteDisplay
    quote={`Humans need fantasy to be human. To be the place where the falling angel meets the rising ape`}
    attribution={`Hogfather`}
    author={`Terry Pratchett`}
  />,
  <EasterEggQuoteDisplay
    quote={`It is well known that a vital ingredient of success is not knowing that what you're attempting can't be done`}
    attribution={`Equal Rites`}
    author={`Terry Pratchett`}
  />,
  <EasterEggQuoteDisplay
    quote={`It doesn't stop being magic just because you know how it works`}
    attribution={`The Wee Free Men`}
    author={`Terry Pratchett`}
  />,
  <EasterEggQuoteDisplay
    quote={`It was sad music. But it waved its sadness like a battle flag. It said the universe had done all it could, but you were still alive`}
    attribution={`Soul Music`}
    author={`Terry Pratchett`}
  />,
  // # Ursula K. Le Guin quotes
  <EasterEggQuoteDisplay
    quote={`Go to bed; tired is stupid.`}
    attribution={`A Wizard of Earthsea`}
    author={`Ursula K. Le Guin`}
  />,
  <EasterEggQuoteDisplay
    quote={`Love doesn't just sit there, like a stone, it has to be made, like bread; remade all the time, made new`}
    attribution={`The Lathe of Heaven`}
    author={`Ursula K. Le Guin`}
  />,
  <EasterEggQuoteDisplay
    quote={`To learn which questions are unanswerable, and not to answer them: this skill is most needful in times of stress and darkness`}
    attribution={`The Left Hand of Darkness`}
    author={`Ursula K. Le Guin`}
  />,
  <EasterEggQuoteDisplay
    quote={`It is very hard for evil to take hold of the unconsenting soul`}
    attribution={`A Wizard of Earthsea`}
    author={`Ursula K. Le Guin`}
  />,
  <EasterEggQuoteDisplay
    quote={`No darkness lasts forever. And even there, there are stars.`}
    attribution={`The Farthest Shore`}
    author={`Ursula K. Le Guin`}
  />,
  <EasterEggQuoteDisplay
    quote={`If civilization has an opposite, it is war.`}
    attribution={`The Left Hand of Darkness`}
    author={`Ursula K. Le Guin`}
  />,
  // # Tolkien quotes
  <EasterEggQuoteDisplay
    quote="If more of us valued food and cheer and song above hoarded gold, it would be a merrier world"
    author="J.R.R. Tolkien"
  />,
  <EasterEggQuoteDisplay
    quote={`His grief he will not forget; but it will not darken his heart, it will teach him wisdom.`}
    attribution={`The Return of the King`}
    author={`J.R.R. Tolkien`}
  />,
  // # Doctor Who quotes
  <EasterEggQuoteDisplay
    quote={`There's no point in being grown up if you can't be childish sometimes`}
    author={`Doctor Who`}
  />,
  <EasterEggQuoteDisplay
    quote={`Courage isn't just a matter of not being frightened, you know. It's being afraid and doing what you have to do anyway`}
    author={`Doctor Who`}
  />,
  <EasterEggQuoteDisplay
    quote={`There's this mountain of pure diamond. It takes an hour to climb it and an hour to go around it, and every hundred years a little bird comes and sharpens its beak on the diamond mountain. And when the entire mountain is chiseled away, the first second of eternity will have passed.' You may think that's a hell of a long time. Personally, I think that's a hell of a bird`}
    author={`Doctor Who`}
  />,
  <EasterEggQuoteDisplay
    quote={`Laugh hard. Run fast. Be kind.`}
    author={`Doctor Who`}
  />,
  <EasterEggQuoteDisplay
    quote={`Never be cruel. Never be cowardly. Hate is always foolish. Love is always wise. Always try to be nice, but never fail to be kind.`}
    author={`Doctor Who`}
  />,
  <EasterEggQuoteDisplay
    quote={`Letting it get to you. You know what that's called? Being alive. Best thing there is. Being alive right now is all that counts.`}
    author={`Doctor Who`}
  />,
  <EasterEggQuoteDisplay
    quote={`Everything ends, and it's always sad, but everything begins again, too. And that's always happy. Be happy.`}
    author={`Doctor Who`}
  />,
  // # Watership Down quotes
  <EasterEggQuoteDisplay
    quote={`I'd rather succeed in doing what we can than fail to do what we can't`}
    attribution={`Watership Down`}
    author={`Richard Adams`}
  />, // # Anarchist quotes
  <EasterEggQuoteDisplay
    quote={`All things for all.`}
    attribution={`The Conquest of Bread`}
    author={`Pyotr Kropotkin`}
  />, // # Song lyrics
  <EasterEggQuoteDisplay
    quote={`Time's gray hand won't catch me, while the stars shine down.`}
    attribution={`Formentera Lady`}
    author={`King Crimson`}
  />,
  <EasterEggQuoteDisplay
    quote={`Nothing ever burns down by itself, every fire needs a little bit of help.`}
    attribution={`Give the Anarchist a Cigarette`}
    author={`Chumbawumba`}
  />,
];
