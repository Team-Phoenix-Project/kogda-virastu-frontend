import React, { FC } from 'react';
import styled from 'styled-components';
import { PreloaderBox } from '../ui-lib';

const PreloaderContainer = styled.div`
        @keyframes rotate360 {
          to { transform: rotate(360deg); }
        }
        animation: 1s rotate360 infinite linear;
        margin: 10% auto;
        width: 32px;
        height: 32px;
        display: flex;
    `;
const Preloader: FC = () => {
  const color = '$secondary-text';
  return (
    <PreloaderContainer>
      <PreloaderBox color={color} />
    </PreloaderContainer>
  );
};
export default Preloader;
