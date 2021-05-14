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

const AuthorSection = ({ author, followButton }) => (
    <AuthorSectionContainer>
        <img src={author.profile_image} />
        <AuthorMetadata>
            <p>
                Written by: <b>{author.name}</b>
            </p>
            {followButton && <Follow username="polcodes" />}
        </AuthorMetadata>
    </AuthorSectionContainer>
);

export default AuthorSection;
