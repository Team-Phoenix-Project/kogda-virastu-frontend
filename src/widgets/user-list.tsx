import React, { FC } from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from '../services/hooks';
import { patchUserRolesThunk } from '../thunks';
import { AvatarIcon, CheckBox } from '../ui-lib';
import { ADMIN_ROLE } from '../constants';
import { TUserData } from '../types/types';
import Preloader from './preloader';

interface UserListProps {
  users: TUserData[];
}

const Title = styled.h2`
  margin: 0 0 30px 0;
  color: ${({ theme }) => theme.primaryText};
  text-align: center;
  font-size: ${({ theme }) => theme.secondLevelHeading.size}px;
  font-family: ${({ theme }) => theme.secondLevelHeading.family};
  font-weight: ${({ theme }) => theme.secondLevelHeading.weight};
  line-height: ${({ theme }) => theme.secondLevelHeading.height}px;

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.secondLevelHeadingMobile.size}px;
    font-family: ${({ theme }) => theme.secondLevelHeadingMobile.family};
    font-weight: ${({ theme }) => theme.secondLevelHeadingMobile.weight};
    line-height: ${({ theme }) => theme.secondLevelHeadingMobile.height}px;
  }

  @media screen and (max-width: 576px) {
    margin-bottom: 15px;
  }
`;

const List = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
  list-style-type: none;
  font-family: 'Alegreya Sans';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme: { secondaryText } }) => secondaryText};
`;

const ListItem = styled.li`
  width: 100%;
  padding: 15px 5px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${({ theme: { dividerColor } }) => dividerColor};
  @media screen and (max-width: 576px) {
    padding: 25px 5px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const UserData = styled.div`
  display: flex;
  align-items: center;
  width: 46%;
  @media screen and (max-width: 576px) {
    width: unset;
    margin-bottom: 20px;
  }
`;

const UserName = styled.p`
  padding: 0;
  margin: 0;
  @media screen and (max-width: 576px) {
    width: unset;
  }
`;

const UserRole = styled.p`
  padding: 0;
  margin: 0;
  width: 28%;
  @media screen and (max-width: 576px) {
    width: unset;
    margin-bottom: 26px;
    padding-left: 16%;
    box-sizing: border-box;
  }
`;

const CheckBoxContainer = styled.div`
  @media screen and (max-width: 576px) {
    padding-left: 6%;
    box-sizing: border-box;
  }
`;

const UserList: FC<UserListProps> = ({ users }) => {
  const dispatch = useDispatch();
  const sortUsers = (firstUser: TUserData, secondUser: TUserData) => (
    +secondUser.roles.includes(ADMIN_ROLE) - +firstUser.roles.includes(ADMIN_ROLE)
  );

  const getUserRole = (rolesList: string[]) => (rolesList.includes(ADMIN_ROLE) ? 'administratorRole' : 'userRole');

  const grantOrRevokeAdminRole = (username: string, roles: string[], grant: boolean) => {
    if (grant) {
      dispatch(patchUserRolesThunk(username, [...roles, ADMIN_ROLE]));
    } else {
      dispatch(patchUserRolesThunk(username, roles.filter((role) => role !== ADMIN_ROLE)));
    }
  };

  return (
    <>
      <Title>
        <FormattedMessage id='userList' />
      </Title>
      { users.length ? (
        <List>
          {[...users].sort(sortUsers).map((user) => (
            <ListItem key={user._id}>
              <UserData>
                <AvatarIcon distance={12} size='medium' name={user.nickname} image={user.image} />
                <UserName>{`${user.nickname}`}</UserName>
              </UserData>
              <UserRole>
                <FormattedMessage id={getUserRole(user.roles)} />
              </UserRole>
              <CheckBoxContainer>
                <CheckBox
                  name='grantAdminRole'
                  checked={user.roles.includes(ADMIN_ROLE)}
                  message='grantAdminRole'
                  marginRight={8}
                  onChange={
                    (evt) => grantOrRevokeAdminRole(
                      user.username,
                      user.roles,
                      evt.currentTarget.checked,
                    )
                  } />
              </CheckBoxContainer>
            </ListItem>
          ))}
        </List>
      ) : (<Preloader />)}
    </>
  );
};

export default UserList;
