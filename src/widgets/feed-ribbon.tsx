import React, {
  FC, MouseEventHandler, useEffect, useState,
} from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../services/hooks';
import { Divider } from '../ui-lib';
import ScrollRibbon from './scroll-ribbon';
import ArticleFullPreview from './article-full-preview';
import { addLikeThunk, deleteLikeThunk } from '../thunks';
import { TArticle } from '../services/types';
import declineArticleAdminThunk from '../thunks/decline-article-admin-thunk';
import publishArticleAdminThunk from '../thunks/publish-article-admin-thunk';
import Preloader from './preloader';
import getPendingPostsThunk from '../thunks/get-pending-posts-thunk';
import { PublishAdminPostButton, RejectAdminPostButton } from '../ui-lib/buttons';

const RibbonWrapper = styled.ul`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 52vw;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  list-style: none outside;
  margin: 0;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  row-gap: 32px;

  @media screen and (max-width: 1100px) {
    padding-left: 5%;
  }

  @media screen and (max-width: 769px) {
    column-gap: 20px;
    max-width: 474px;
    padding: 0;
    min-width: 61vw;
  }

  @media screen and (max-width: 765px) {
    flex-flow: column nowrap;
    row-gap: 64px;
  }
`;

const ItemWrapper = styled.li`
  list-style: none outside;
  max-width: calc(50% - 16px);
  width: 100%;
  margin: 0;
  padding: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 0;
  padding-inline-end: 0;

  @media screen and (max-width: 800px) {
    max-width: calc(50% - 10px);
  }

  @media screen and (max-width: 765px) {
    max-width: 100%;
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
`;

const FirstButtonContainer = styled.div`
margin-right: 16px;
`;

const SecondButtonContainer = styled.div`

@media screen and (max-width: 890px) {
  margin-top: 16px;
  }

@media screen and (max-width: 765px) {
  margin-top: 0;
  }
`;

const activeStyle = {
  fontFamily: 'Alegreya Sans',
  fontSize: '18px',
  lineHeight: '24px',
  textDecoration: 'none',
  padding: '16px 8px',
  marginBottom: '33px',
  color: '#0A0A0B',
  borderBottom: '2px solid #008aff',
};
const notActiveStyle = {
  fontFamily: 'Alegreya Sans',
  fontSize: '18px',
  lineHeight: '24px',
  padding: '16px 8px',
  textDecoration: 'none',
  color: '#62626A',
};
const Links = styled.div`
  display: flex;
  padding: 0;

  ::-webkit-scrollbar {
    width: 0;
  }

  @media screen and (max-width: 1100px) {
    padding-left: 5%;
  }

  @media screen and (max-width: 769px) {
    padding: 0;
    overflow-x: auto;
  }
`;

type TFeedRibbon = {
  type: string;
};

const FeedRibbon: FC<TFeedRibbon> = ({ type }) => {
  const [mobileScreen, setMobileScreen] = useState(false);
  const { pathname } = useLocation();
  const resizeHandler = () => {
    if (window.screen.width > 765) {
      setMobileScreen(true);
    } else {
      setMobileScreen(false);
    }
  };
  useEffect(() => {
    if (window.screen.width > 765) setMobileScreen(true);
    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.view.feed);
  const pendingPosts = useSelector((state) => state.view.pendingFeed);
  const { tagsFollow } = useSelector((state) => state.view);
  const tags = useSelector((state) => state.view.selectedTags) ?? [];
  const { isPublicFeedFetching } = useSelector((state) => state.api);
  const currentUser = useSelector((state) => state.profile);
  const isAdmin = currentUser.roles && currentUser.roles[1] === 'admin';

  const sortPendingPosts = pendingPosts
  && pendingPosts?.length !== 0
  && [...pendingPosts]?.sort((a: TArticle, b: TArticle) => {
    if (a.createdAt > b.createdAt) return -1;
    if (a.createdAt < b.createdAt) return 1;
    return 0;
  });

  if (posts) {
    posts.filter((post) => post.tagList.some((tag) => tags.includes(tag)));
  }
  if (!posts || isPublicFeedFetching) {
    return (
      <Preloader />
    );
  }
  const activeLink = ({ isActive }: { isActive: boolean }) => {
    if (isActive) {
      return activeStyle;
    }
    return notActiveStyle;
  };

  const onClickReject = async (slug: string) => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await dispatch(declineArticleAdminThunk(slug));
    dispatch(getPendingPostsThunk());
  };

  const onClickPublish = async (slug: string) => {
    // eslint-disable-next-line @typescript-eslint/await-thenable
    await dispatch(publishArticleAdminThunk(slug));
    dispatch(getPendingPostsThunk());
  };

  const allPosts = posts.filter(
    (post) => post.tagList.find(
      (tag) => tags.includes(tag) || !tags || tags.length < 1,
    ) && post.state === 'published',
  );
  const authorPosts = posts.filter(
    (post) => post.author.following
    || post.tagList.some((tag) => tagsFollow?.includes(tag)),
  );

  const renderArticle = (arr: Array<TArticle>) => arr.map((post, i) => {
    const onClick: MouseEventHandler = () => {
      if (post.favorited) {
        dispatch(deleteLikeThunk(post.slug));
      } else {
        dispatch(addLikeThunk(post.slug));
      }
    };
    return (
      <React.Fragment key={post.slug}>
        <ItemWrapper>
          <ArticleFullPreview article={post} onLikeClick={onClick} />
          {isAdmin && post.state === 'pending' && (
            <ButtonsContainer>
              <FirstButtonContainer>
                <PublishAdminPostButton
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={() => onClickPublish(post.slug)} />
              </FirstButtonContainer>
              <SecondButtonContainer>
                <RejectAdminPostButton
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                  onClick={() => onClickReject(post.slug)} />
              </SecondButtonContainer>
            </ButtonsContainer>
          )}
        </ItemWrapper>
        {i % 2 && i !== arr.length - 1 && mobileScreen ? (
          <Divider distance={0} />
        ) : null}
      </React.Fragment>
    );
  });

  return (
    <>
      {(pathname === '/'
      || pathname === '/article'
      || pathname === '/moderation') && (
        <Links>
          <NavLink to='/' style={activeLink}>
            Все&nbsp;посты
          </NavLink>
          <NavLink to='/article' style={activeLink}>
            Мои&nbsp;подписки
          </NavLink>
          {isAdmin && (
            <NavLink to='/moderation' style={activeLink}>
              На&nbsp;модерации
            </NavLink>
          )}
        </Links>
      )}
      <ScrollRibbon>
        <RibbonWrapper>
          {type === 'all' && renderArticle(allPosts)}
          {type === 'subscribe' && renderArticle(authorPosts)}
          {type === 'moderation' && sortPendingPosts && renderArticle(sortPendingPosts)}
        </RibbonWrapper>
      </ScrollRibbon>
    </>
  );
};

export default FeedRibbon;
