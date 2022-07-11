import React, { FC } from 'react';
import styled from 'styled-components';
import {
  AvatarIcon, FollowButton, HeaderTwoText, UnfollowButton,
} from '../ui-lib';
import { TAvatarSizes } from '../types/styles.types';
import { useDispatch } from '../services/hooks';
import {
  unfollowProfileThunk,
  followProfileThunk,
} from '../thunks';

type TProfileWidget = {
  userName: string | undefined,
  isFollow: boolean,
  userImage: string | undefined,
  bio: string | undefined,

  isUser: boolean,
  size: TAvatarSizes,
  distance: number,
  color: string,
};

const ProfileContainer = styled.div`
    width: 304px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:24px;
    margin-top: 56px;
    margin-bottom: 48px;
    @media screen and (max-width:768px) {
        width:271px;
        margin-top: 48px;
    }

     @media screen and (max-width: 320px) {
         width:280px;
         margin-top:40px;
     }

`;

const ProfileBio = styled.p`
    min-width: 500px;
    margin: 0;
    color: #0A0A0B;
    font-family: 'Alegreya';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
    word-wrap: break-word;  

     @media screen and (max-width: 515px) {
         min-width:280px;
     }

`;

const ProfileWidgetButton: FC<{
  isUser: boolean,
  isFollow: boolean,
}> = ({
  isUser,
  isFollow,
}) => {
  const dispatch = useDispatch();

  if (isUser) {
    return null;
  }

  return (
    isFollow ? <UnfollowButton onClick={() => dispatch(unfollowProfileThunk())} />
      : <FollowButton onClick={() => dispatch(followProfileThunk())} />
  );
};

const ProfileWidget: FC<TProfileWidget> = ({
  userName,
  isFollow,
  userImage,
  bio,
  isUser,
  size,
  distance,
  color,
}) => (
  <ProfileContainer>
    <AvatarIcon name={userName ?? ''} image={userImage} size={size} distance={distance} color={color} />
    <HeaderTwoText>{userName}</HeaderTwoText>
    <ProfileBio>{bio}</ProfileBio>
    <ProfileWidgetButton isUser={isUser} isFollow={isFollow} />
  </ProfileContainer>

);

export default ProfileWidget;
