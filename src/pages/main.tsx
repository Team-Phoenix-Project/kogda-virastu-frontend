import React, { useEffect, FC } from 'react';
import { batch } from 'react-redux';
import styled from 'styled-components';
import { useIntl } from 'react-intl';
import TopAnnounceWidget from '../widgets/top-announce-widget';
import PopularTags from '../widgets/popular-tags';
import { useSelector, useDispatch } from '../services/hooks';
import {
  desktopBreakpoint,
  mobileViewThreshold,
  tabletBreakpoint,
} from '../constants';
import {
  setTopLikedThunk,
  setNewPostsThunk,
  getPublicFeedThunk,
} from '../thunks';
import { FeedRibbon, Slider } from '../widgets';
import { settingsResetUpdateSucceeded } from '../store';

export const desktopToTabletGapStep = (80 - 40) / (desktopBreakpoint - tabletBreakpoint);
export const tabletToMobileGapStep = (40 - 20) / (tabletBreakpoint - mobileViewThreshold);
export const tabletToMobileMainWidthStop = (720 - 595) / (tabletBreakpoint - mobileViewThreshold);
export const desktopToTabletAsideWidthStep = (359 - 227) / (desktopBreakpoint - tabletBreakpoint);

export const MainSection = styled.main`
  display: flex;
  justify-content: center;
  margin: 0;
`;
export const MainContainer = styled.div`
  display: flex;
  margin: 56px 0 0 0;
  column-gap: 32px;
  justify-content: center;
  align-items: flex-start;
  max-width: 1140px;
  position: relative;
  z-index: 10;

  @media screen and (max-width: ${tabletBreakpoint}px) {
    padding: 0 24px;
    column-gap: 20px;
    width: calc(
      720px - ${tabletToMobileMainWidthStop} * (${tabletBreakpoint}px - 100vw)
    );
  }
  @media screen and (max-width: 765px) {
    flex-direction: column-reverse;
    gap: 0;
    max-width: 400px;
  }
  @media screen and (min-width: ${desktopBreakpoint}px) {
    gap: 40px;
  }

  @media screen and (max-width: 420px) {
    padding: 0 20px;
    max-width: 280px;
  }
`;
export const LeftColumn = styled.div`
  overflow: hidden;

  @media screen and (max-width: 420px) {
    max-width: 280px;
  }
`;

export const RightColumn = styled.aside`
  display: flex;
  overflow: hidden;
  align-self: flex-start;
  flex-direction: column;
  max-width: 360px;

  @media screen and (max-width: 768px) {
    max-width: 227px;
    align-items: center;
    justify-content: center;
    @media screen and (max-width: 765px) {
      max-width: 100%;
    }
  }
`;

const Main: FC = () => {
  const posts = useSelector((state) => state.view.feed);
  const { isPublicFeedFetching } = useSelector((state) => state.api);
  const dispatch = useDispatch();
  const intl = useIntl();
  const { articles } = useSelector((state) => state.all);
  useEffect(() => {
    batch(() => {
      dispatch(getPublicFeedThunk());
      dispatch(setNewPostsThunk());
      dispatch(settingsResetUpdateSucceeded());
    });
  }, [dispatch]);
  useEffect(() => {
    if (articles && articles.length > 0) {
      dispatch(setTopLikedThunk());
    }
  }, [dispatch, articles]);

  return (
    <MainSection>
      <MainContainer>
        <LeftColumn>
          <FeedRibbon type='all' />
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
export default Main;
