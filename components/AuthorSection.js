import { Follow } from "react-twitter-widgets";
import styled from "styled-components";
import Image from "next/image";

const AuthorSectionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    & img {
        border-radius: 20%;
    }
`;

const AuthorMetadata = styled.div`
    font-size: 11px;

    margin-left: 10px;
    & > * {
        margin-bottom: 2px;
    }
`;

const AuthorSection = ({ image, name, followButton }) => (
    <AuthorSectionContainer>
        <Image
            src={image}
            alt="author profile picture"
            width={30}
            height={30}
            objectFit="cover"
        />
        <AuthorMetadata>
            <p>
                Written by: <b>{name}</b>
            </p>
            {followButton && <Follow username="polcodes" />}
        </AuthorMetadata>
    </AuthorSectionContainer>
);

export default AuthorSection;
