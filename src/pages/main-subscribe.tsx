import React, { useEffect, FC } from 'react';
import { useIntl } from 'react-intl';
import TopAnnounceWidget from '../widgets/top-announce-widget';
import PopularTags from '../widgets/popular-tags';
import { FeedRibbon, Slider } from '../widgets';
import {
  MainSection, MainContainer, LeftColumn, RightColumn,
} from './main';

const MainSubscribe: FC = () => {
  const intl = useIntl();

  return (
    <MainSection>
      <MainContainer>
        <LeftColumn>
          <FeedRibbon type='subscribe' />
        </LeftColumn>
        <RightColumn>
          <PopularTags />
          <TopAnnounceWidget caption={intl.messages.popularContent as string} />
          <Slider />
        </RightColumn>
      </MainContainer>
    </MainSection>
  );
};
export default MainSubscribe;
