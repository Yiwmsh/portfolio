import { SemanticColors } from "@chrisellis/react-carpentry";
import React from "react";
import { ScryfallQuerierModal } from "../Components/ScryfallQuerierModal";
import { SiteModalSettingKey, useSiteSetting } from "../hooks/siteSettings";
import { Instructions } from "./Instructions";

const modalSettingKey: SiteModalSettingKey = "help modal status";

const HELP_SECTIONS = [
  "This Is A Work In Progress",
  "Instructions",
  "Why Is The Search So Slow",
] as const;

type HelpSection = (typeof HELP_SECTIONS)[number];

const Sections: Record<HelpSection, React.ReactNode> = {
  "This Is A Work In Progress": (
    <>
      <p>Thank you for using my Orrery!</p>
      <p>
        I threw this together in my free time, and I'm still working on it. I
        hope you like it, and I hope you'll be patient with me while I continue
        to improve it.
      </p>
      <h4>My Apologies To Mobile Users</h4>
      <p>
        I'm working on making this part of my site more responsive, but it's not
        my main priority right now. I highly suggest using this on a desktop or
        laptop instead, for the time being.
      </p>
      <h4>Planned Features</h4>
      <ul>
        <li>
          <b>More mobile-friendly design</b>, as mentioned above.
        </li>
        <li>
          <b>Some additional results views</b>, like an imageless table that
          will allow you to change how cards are sorted and see more info about
          them in a more condensed way.
        </li>
        <li>
          <b>More information on cards</b>, like which of your listed goals each
          card fulfills.
        </li>
        <li>
          <b>Customizable card display</b>, to allow you to change how big cards
          are, how many are shown at once, and what information is shown.
        </li>
        <li>
          <b>General performance and styling improvements.</b>
        </li>
      </ul>
    </>
  ),
  Instructions: <Instructions />,
  "Why Is The Search So Slow": (
    <>
      <h4>The Short Answer</h4>
      <p>
        This tool needs a lot of data, and{" "}
        <a href="https://scryfall.com/">Scryfall</a> asks that requests to their
        API be limited to about 10 per second, so this tool delays each request
        slightly to comply with that.
      </p>
      <p>
        If your estimated wait time seems painfully long, I highly suggest
        letting the tool run while you go and do something else, like sleeping
        or taking a walk. That's what I do.
      </p>
      <p>
        <b>Please be courteous to Scryfall</b>. They provide this amazing
        service to us all for free.
      </p>
      <h4>The Long Answer</h4>
      <p>
        Due to some limitations with Scryfall's API, this tool needs to perform
        a lot of queries in order to get all of the data it needs to provide its
        scoring and sorting features.
      </p>
      <p>
        Scryfall paginates their API responses to a couple hundred cards at a
        time. But Scryfall itself cannot sort by the scores this tool provides.
        As a result, this tool needs <b>every</b> page of each query or deck
        goal, in order to appropriately score and sort the resulting cards.
      </p>
      <p>
        Scryfall asks that requests to their API be limited to about 10 per
        second, so this tool inserts a delay between each page request to comply
        with that.
      </p>
    </>
  ),
};

interface HelpModalProps {}

export const HelpModal: React.FC<HelpModalProps> = ({}) => {
  const { setSetting: setIsOpen, toggleSetting: toggleIsOpen } =
    useSiteSetting(modalSettingKey);
  const [openSection, setOpenSection] = React.useState<HelpSection | "">(
    "This Is A Work In Progress"
  );

  const hasVisitedThisSession = sessionStorage.getItem(modalSettingKey) != null;

  React.useEffect(() => {
    if (!hasVisitedThisSession) {
      setIsOpen(true);
      sessionStorage.setItem(modalSettingKey, "true");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    console.log(openSection);
  }, [openSection]);

  return (
    <>
      {/* Open Button */}
      <h4
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
        onClick={() => toggleIsOpen()}
      >
        Help
      </h4>
      {/* Modal */}
      <ScryfallQuerierModal
        modalSettingKey={modalSettingKey}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {HELP_SECTIONS.map((sectionTitle) => (
          <HelpModalSection
            onClick={(title) => setOpenSection(title)}
            openSection={openSection}
            title={sectionTitle}
          >
            {Sections[sectionTitle]}
          </HelpModalSection>
        ))}
      </ScryfallQuerierModal>
    </>
  );
};

interface HelpModalSectionProps {
  title: string;
  openSection: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  onClick?: (title: HelpSection | "") => void;
}

export const HelpModalSection: React.FC<HelpModalSectionProps> = ({
  title,
  children,
  style,
  onClick,
  openSection,
}) => {
  return (
    <details
      style={{
        border: `1px solid var(${SemanticColors.primary})`,
        padding: "10px",
        overflowX: "hidden",
        overflowY: "auto",
        minHeight: "1.5rem",
        ...style,
      }}
      onClick={(e) => {
        e.preventDefault();
      }}
      open={openSection === title}
    >
      <summary
        onClick={() => {
          onClick?.(openSection === title ? "" : (title as HelpSection));
        }}
        style={{
          textAlign: "center",
          cursor: "pointer",
          padding: "5px",
        }}
      >
        <b>{title}</b>
      </summary>
      {children}
    </details>
  );
};
