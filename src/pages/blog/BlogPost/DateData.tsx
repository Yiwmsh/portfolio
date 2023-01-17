import styled from "@emotion/styled";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { ScreenMaxWidth } from "../../../components/MediaQueries";
import { fancyDisplayTimestamp } from "./BlogPost";

const ScreenWidthBreakpoints = {
  dateData: 630,
};

const DateDataBase = styled.ul`
  font-size: 0.8em;
  list-style: none;
  display: inline-flex;

  & > li {
    margin: 5px;
  }
`;

const NormalDateData = styled(DateDataBase)`
  ${ScreenMaxWidth(
    ScreenWidthBreakpoints.dateData,
    `
    display: none;
`
  )}
`;

const SmallScreenDateData = styled(DateDataBase)`
  display: none;
  margin: 0 auto;
  padding: 0;
  ${ScreenMaxWidth(
    ScreenWidthBreakpoints.dateData,
    `
    display: inline-flex;
`
  )}
`;

const PublishedDate = styled.li``;

const UpdatedDate = styled.li``;

export const DateData: React.FC<{
  publishedDate?: Timestamp | null;
  lastUpdated?: Timestamp;
  smallScreen?: boolean;
}> = ({ publishedDate, lastUpdated, smallScreen }) => {
  const dataInterior = (
    <>
      <PublishedDate>
        Published {fancyDisplayTimestamp(publishedDate ?? Timestamp.now())}
      </PublishedDate>
      <li>&#183;</li>
      <UpdatedDate>
        Last Updated {fancyDisplayTimestamp(lastUpdated ?? Timestamp.now())}
      </UpdatedDate>
    </>
  );

  return (
    <>
      {smallScreen ? (
        <SmallScreenDateData>{dataInterior}</SmallScreenDateData>
      ) : (
        <NormalDateData>{dataInterior}</NormalDateData>
      )}
    </>
  );
};
