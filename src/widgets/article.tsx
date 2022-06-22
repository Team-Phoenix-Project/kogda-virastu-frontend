import React, { FC, MouseEventHandler, useState } from 'react';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch, useSelector } from '../services/hooks';
import {
  addLikeThunk, deleteLikeThunk,
} from '../thunks';
import { DeletePostButton, EditPostButton, PublishPostButton } from '../ui-lib';
import { openConfirm } from '../store';
import BarTags, { MessageSubscriptionTag, MessageText } from './bar-tags';
import Likes from './likes';
import {
  PublishAdminPostButton,
  PublishedAdminPostButton,
  RejectAdminPostButton,
  RemovePublicationAdminPostButton,
} from '../ui-lib/buttons';
import publishArticleAdminThunk from '../thunks/publish-article-admin-thunk';
import declineArticleAdminThunk from '../thunks/decline-article-admin-thunk';
import removePublishArticleAdminThunk from '../thunks/remove-article-publish-admin-thunk';

type TArticleProps = {
  slug: string;
};

type TArticleActionsProps = {
  onClickEdit: MouseEventHandler<HTMLButtonElement>;
  onClickDelete: MouseEventHandler<HTMLButtonElement>;
};

export type TArticleAdminPublishActions = {
  onClickPublish: MouseEventHandler<HTMLButtonElement>;
  onClickReject: MouseEventHandler<HTMLButtonElement>;
};

type TArticleAdminPublishedActions = {
  onClickRemove: MouseEventHandler<HTMLButtonElement>;
};

const ArticleContainer = styled.div`
  display: flex;
  flex-flow: column  nowrap;
  gap: 24px 0;
  width: 100%;
  max-width: 700px;

  @media screen and (max-width:768px) {
    gap: 16px 0;
 }
`;

const ArticleTitle = styled.h1`
    margin: 0;
    font-size: ${({ theme: { firstLevelHeading: { size } } }) => `${size}px`} ;
    font-family: ${({ theme: { firstLevelHeading: { family } } }) => family};
    line-height: ${({ theme: { firstLevelHeading: { height } } }) => `${height}px`} ;
    font-weight: ${({ theme: { firstLevelHeading: { weight } } }) => weight};
    color: ${({ theme: { primaryText } }) => primaryText};
`;

const ArticleActionsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  && > button {
    /* width:233px; */
    @media screen  and (max-width:725px) {
      /* width:175px; */
    }
  }
`;

const ArticleAuthor = styled.p`
  font-size: ${({ theme: { text16: { size } } }) => size}px ;
  font-family: ${({ theme: { text16: { family } } }) => family};
  line-height: ${({ theme: { text16: { height } } }) => height}px;
  font-weight: ${({ theme: { text16: { weight } } }) => weight};
  margin: 0;
  grid-row: 1;
`;

const ArticleCreateDate = styled.p`
  font-size: ${({ theme: { text16: { size } } }) => size}px ;
  font-family: ${({ theme: { text16: { family } } }) => family};
  line-height: ${({ theme: { text16: { height } } }) => height}px;
  font-weight: ${({ theme: { text16: { weight } } }) => weight};
  margin: 0;
  grid-row: 1;
`;

const ArticleLikeWrapper = styled.div`
  grid-row: 1;
  justify-self: end;
`;

const ArticleAuthorContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  gap: 0 24px;
`;

const ArticleImage = styled.img`
  width: 100%;
  object-fit: cover;
  height: 100%;
`;

const ArticleBody = styled.div`
  position: relative;
  font-family: ${({ theme: { text18: { family } } }) => family};
  font-size: ${({ theme: { text18: { size } } }) => size}px ;
  line-height: ${({ theme: { text18: { height } } }) => height}px;
  font-weight: ${({ theme: { text18: { weight } } }) => weight};
  margin: 0;
  @media screen and (max-width:768px) {
    font-family: ${({ theme: { text16: { family } } }) => family};
    font-size: ${({ theme: { text16: { size } } }) => size}px ;
    line-height: ${({ theme: { text16: { height } } }) => height}px;
    font-weight: ${({ theme: { text16: { weight } } }) => weight};
 }
`;

const ArticleActions: FC<TArticleActionsProps> = ({ onClickEdit, onClickDelete }) => (
  <ArticleActionsContainer>
    <EditPostButton onClick={onClickEdit} />
    <DeletePostButton onClick={onClickDelete} />
  </ArticleActionsContainer>
);

export const ArticleAdminPublishActions: FC<TArticleAdminPublishActions> = ({
  onClickPublish,
  onClickReject,
}) => (
  <ArticleActionsContainer>
    <PublishAdminPostButton onClick={onClickPublish} />
    <RejectAdminPostButton onClick={onClickReject} />
  </ArticleActionsContainer>
);

const ArticleAdminPublishedActions: FC<TArticleAdminPublishedActions> = ({
  onClickRemove,
}) => (
  <ArticleActionsContainer>
    <PublishedAdminPostButton />
    <RemovePublicationAdminPostButton onClick={onClickRemove} />
  </ArticleActionsContainer>
);

const Article: FC<TArticleProps> = ({ slug }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [active, setActiveState] = useState(false);
  const [tagText, setTagState] = useState('');

  const { article } = useSelector((state) => state.view);
  const currentUser = useSelector((state) => state.profile);
  const isAuthor = article?.author.username === currentUser.username;
  const isAdmin = currentUser.roles && currentUser.roles[1] === 'admin';
  const isPending = article?.state === 'pending';

  const onClickDelete = () => {
    if (article) {
      dispatch(openConfirm());
    }
  };

  const onClickEdit = () => {
    if (article && slug) {
      navigate(`/editArticle/${slug}`);
    }
  };

  const onClickReject = () => {
    if (article && slug) {
      dispatch(declineArticleAdminThunk(slug));
      navigate(-1);
    }
  };

  const onClickPublish = () => {
    if (article && slug) {
      dispatch(publishArticleAdminThunk(slug));
      navigate(-1);
    }
  };

  const onClickRemovePublish = () => {
    if (article && slug) {
      dispatch(removePublishArticleAdminThunk(slug));
      navigate('/');
    }
  };

  const onClickLike = (ev: React.MouseEvent) => {
    ev.preventDefault();
    if (article?.favorited) {
      dispatch(deleteLikeThunk(slug));
    } else {
      dispatch(addLikeThunk(slug));
    }
  };

  if (!article) {
    return null;
  }
  return (
    <ArticleContainer>
      {isAuthor && !isPending && (
        <ArticleActions
          onClickDelete={onClickDelete}
          onClickEdit={onClickEdit} />
      )}
      {isAdmin && isPending && (
        <ArticleAdminPublishActions
          onClickPublish={onClickPublish}
          onClickReject={onClickReject} />
      )}
      {isAdmin && !isPending && (
        <ArticleAdminPublishedActions
          onClickRemove={onClickRemovePublish} />
      )}
      <ArticleTitle>{article.title}</ArticleTitle>
      <ArticleAuthorContainer>
        <ArticleAuthor>
          {article.author.nickname ?? article.author.username}
        </ArticleAuthor>
        <ArticleCreateDate>
          <FormattedDate
            value={article.createdAt}
            year='numeric'
            month='long'
            day='2-digit'
            weekday='short' />
        </ArticleCreateDate>
        <ArticleLikeWrapper>
          <Likes
            likesCounterValue={article.favoritesCount}
            handleClick={onClickLike}
            favorite={article.favorited} />
        </ArticleLikeWrapper>
      </ArticleAuthorContainer>
      {article.link && <ArticleImage src={article.link} />}
      <ArticleBody>
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
        <MessageSubscriptionTag active={active}>
          <MessageText>
            <FormattedMessage id='youSubscribedToTheTag' />
            { tagText }
          </MessageText>
        </MessageSubscriptionTag>
      </ArticleBody>
      <BarTags
        setTagState={setTagState}
        setActiveState={setActiveState}
        tagList={article.tagList} />
    </ArticleContainer>
  );
};

export default Article;
