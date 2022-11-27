import styled from "@emotion/styled";
import { AnimatedText, TextContent } from "@yiwmsh/react-carpentry";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import { CenteringSection } from "../../components/CenteringSection";
import { ScrollButton } from "../../components/ScrollButton";
import { NameContext } from "../home";

const CenteringTextContent = styled(TextContent)`
  text-align: center;
`;

const IntroductorySpan = styled(motion.span)`
  font-size: 2em;
  grid-row: auto;
`;

const NameSpan = styled(motion.span)`
  font-size: 3em;
  grid-row: auto;
`;

const SplashGrid = styled.div`
  display: grid;
  grid-template-rows: 2em 2em 3em;
  row-gap: 20px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SplashSection: React.FC = () => {
  return (
    <CenteringSection id="Splash">
      <CenteringTextContent altColor>
        <NameContext.Consumer>
          {({ name }) => (
            <AnimatePresence>
              <SplashGrid>
                <IntroductorySpan
                  layout
                  initial={{ display: "none" }}
                  animate={{ display: "inline" }}
                  transition={{ delay: 5 }}
                >
                  <AnimatedText
                    text={`Hello, ${name}, it's lovely to meet you.`}
                    animationVariants={{
                      hidden: {
                        opacity: 0,

                        y: `0.25em`,
                      },

                      visible: {
                        opacity: 1,

                        y: `0em`,

                        transition: {
                          duration: 1,
                          ease: [0.2, 0.65, 0.3, 0.9],
                        },
                      },
                    }}
                  />
                </IntroductorySpan>
                <IntroductorySpan
                  layout
                  initial={{ display: "none" }}
                  animate={{ display: "inline" }}
                  transition={{ delay: 7 }}
                >
                  <AnimatedText
                    text={`My name is`}
                    animationVariants={{
                      hidden: {
                        opacity: 0,

                        y: `0.25em`,
                      },

                      visible: {
                        opacity: 1,

                        y: `0em`,

                        transition: {
                          duration: 1,
                          ease: [0.2, 0.65, 0.3, 0.9],
                        },
                      },
                    }}
                  />
                </IntroductorySpan>
                <NameSpan
                  layout
                  initial={{ display: "none" }}
                  animate={{ display: "inline" }}
                  transition={{ delay: 8 }}
                >
                  <AnimatedText
                    text={`Whimsy`}
                    animationVariants={{
                      hidden: {
                        opacity: 0,

                        y: `0.25em`,
                      },

                      visible: {
                        opacity: 1,

                        y: `0em`,

                        transition: {
                          duration: 1,
                          ease: [0.2, 0.65, 0.3, 0.9],
                        },
                      },
                    }}
                  />
                </NameSpan>
              </SplashGrid>
            </AnimatePresence>
          )}
        </NameContext.Consumer>
      </CenteringTextContent>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 10,
        }}
      >
        <ScrollButton direction="down" target={"Bio"} />
      </motion.div>
    </CenteringSection>
  );
};
