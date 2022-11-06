import {
  Card,
  CardBody,
  CardHeader,
  CardImage,
  TextContent,
} from "@yiwmsh/react-carpentry";
import React from "react";
import { CenteringSection } from "../../components/CenteringSection.tsx";
import styled from "@emotion/styled";
import moment from "moment";

const PortraitOfMe = styled(CardImage)``;

const SideBySide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const Bio = styled(TextContent)``;

export const IntrocutionSection: React.FC = () => {
  const age = moment().diff(moment(), "years");
  const guitarTime = moment().diff(moment([2021, 6]), "years");

  const storedName = localStorage.getItem("name");

  const [name, setName] = React.useState(storedName ?? "Friend");
  React.useEffect(() => {
    document.addEventListener("onNameChange", () =>
      setName(localStorage.getItem("name") ?? "Friend")
    );
  });
  return (
    <CenteringSection>
      <Card>
        <CardHeader>
          <TextContent>
            <h4>Hi, {name}, I'm Whimsy</h4>
          </TextContent>
        </CardHeader>
        <CardBody>
          <SideBySide>
            <PortraitOfMe
              src="https://avatars.githubusercontent.com/u/110123778?v=4"
              alt="A picture of me, Whimsy. 
          The picture is slightly out of focus.
          I am looking to my right. 
          I am pale, with chest-length brown hair combed mostly over the right side of my head. 
          I am wearing glasses, a black choker, and a floral-print t-shirt, 
          and am sitting in front of white, floral-print curtains."
            />
            <Bio>
              <p>I am a queer, non-binary author, musician, and programmer.</p>
              <p>
                Welcome to my little slice of the internet, it's great to have
                you here. I hope you'll allow me to show off, just a little bit.
              </p>
              <p>But, before that, of course, A little bit about me:</p>
              <p>
                I'm {age} years old, a dual citizen, American and British. My
                family travelled a lot when I was growing up, so I was raised in
                lots of places; Florida, Cumbria, the UAE, and not infreqently
                on a boat. My father owned a 52' sailing yatch, and when I was
                young we completed two trans-Atlantic voyages, and did some
                sailing in the Carribean. These are some of my fondest memories,
                and I hope to sail again in my future.
              </p>
              <p>
                I got into programming in 2016, when I started studying computer
                science at college. Unfortunately, in 2019, shortly before I
                would graduate, I had to stop attending for financial reasons.
                As a result of that, and the outset of the pandemic, I took a
                break from coding, and started to explore other options.
                However, in the beginning of 2022, I got back into it and landed
                my first coding job. I made this website towards the end of
                2022.
              </p>
              <p>
                I play piano and guitar, and I sing. I started teaching myself
                to play piano in 2010, but alas I haven't always had access to
                one, so my practice has been a bit spotty. I picked up guitar in
                2021, and have since been playing consistently for{" "}
                {guitarTime === 1 ? `a year` : `${guitarTime} years`}. I also
                started teaching myself how to sing in early 2022.
              </p>
              <p>
                I've always been very interested in writing. I've been a
                bookworm since I learned how to read. I always poured my heart
                into my writing assignments for class, but my first attempt at
                writing a novel was in 2011. The first drafts of my current
                writing projects sit at 16,000 and 85,000 words, respectively.
              </p>
              <p>
                Below, you'll find some examples of my work, and my art. I hope
                I can in some way inspire or entertain you.
              </p>
            </Bio>
          </SideBySide>
        </CardBody>
      </Card>
    </CenteringSection>
  );
};
