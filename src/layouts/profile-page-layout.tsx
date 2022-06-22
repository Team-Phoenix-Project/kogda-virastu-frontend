import styled from 'styled-components';

const ProfilePageLayout = styled.section`
    width:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    padding-bottom: 155px;

        @media screen and (max-width: 768px){
            padding: 0 20px 100px;
            box-sizing: border-box;
        }
`;

export default ProfilePageLayout;
