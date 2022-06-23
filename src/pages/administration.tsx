import React, { useMemo, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector, useDispatch } from '../services/hooks';
import { getAllUsersThunk } from '../thunks';
import UserList from '../widgets/user-list';
import { ADMIN_ROLE } from '../constants';

const Page = styled.section`
  padding: 56px 0;
  margin: 0 auto;
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media screen and (max-width: 576px) {
    max-width: 280px;
  }
`;

const Administration = () => {
  const dispatch = useDispatch();

  const roles = useSelector((state) => state.profile.roles);
  const isAdmin = useMemo(() => (
    roles?.includes(ADMIN_ROLE)
  ), [roles]);

  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);

  return (
    <Page>
      {
        isAdmin
          ? (<UserList users={users} />)
          : (<Navigate to='/' />)
      }
    </Page>
  );
};

export default Administration;
