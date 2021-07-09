import { Follow } from "react-twitter-widgets";
import styled from "styled-components";

const AuthorSectionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & img {
        height: 40px;
        border-radius: 50%;
        margin-right: 10px;
    }
`;

const AuthorMetadata = styled.div`
    font-size: 11px;

    & > * {
        margin-bottom: 2px;
    }
`;

const AuthorSection = ({ image, name, followButton }) => (
    <AuthorSectionContainer>
        <img src={image} alt="author profile picture" />
        <AuthorMetadata>
            <p>
                Written by: <b>{name}</b>
            </p>
            {followButton && <Follow username="polcodes" />}
        </AuthorMetadata>
    </AuthorSectionContainer>
);

export default AuthorSection;
