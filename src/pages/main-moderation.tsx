import React, { useEffect, FC } from 'react';
import { useIntl } from 'react-intl';
import TopAnnounceWidget from '../widgets/top-announce-widget';
import PopularTags from '../widgets/popular-tags';
import { useSelector, useDispatch } from '../services/hooks';
import { FeedRibbon, Slider } from '../widgets';
import {
  MainSection, MainContainer, LeftColumn, RightColumn,
} from './main';
import getPendingPostsThunk from '../thunks/get-pending-posts-thunk';

const MainModeration: FC = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPendingPostsThunk());
  });

  return (
    <MainSection>
      <MainContainer>
        <LeftColumn>
          <FeedRibbon type='moderation' />
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
export default MainModeration;
