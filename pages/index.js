import BlogList from "components/BlogList";
import { getAllPosts } from "models/API";
import profileImage from "public/assets/profile.png";
import generateRSSFeed from "services/generateRSSFeed";
import fs from "fs";
import Image from "next/image";
import SEO from "components/SEO";
import styled from "styled-components";

const Container = styled.div`
    margin-top: 40px;
`;

const Intro = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-bottom: 40px;
    align-self: center;

    @media screen and (max-width: 810px) {
        flex-direction: column;
    }

    p {
        width: 70%;
    }
`;

const ProfileImageContainer = styled.div`
    width: 30%;

    div {
        position: unset !important;
    }

    img {
        object-fit: contain;
        width: 100% !important;
        position: relative !important;
        height: unset !important;
        border-radius: 20%;
    }
`;

const IntroSection = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: flex-start;
    padding-left: 30px;
    height: 100%;
    justify-content: center;

    p {
        width: 100%;
    }

    @media screen and (max-width: 810px) {
        p {
            width: 85%;
        }
        text-align: center;
        align-items: center;
        padding-left: 0;
        margin-top: 10px;
    }
`;

export async function getStaticProps() {
    const posts = getAllPosts();
    const rssFeed = await generateRSSFeed(posts);
    fs.writeFileSync("./public/rss.xml", rssFeed);

    return {
        props: { posts },
    };
}

export default function BlogPage({ posts }) {
    return (
        <>
            <SEO
                title="polpielladev 📱 | A blog about software engineering and app development."
                description="A blog where I talk about software development topics in languages like Swift, Javascript and using frameworks such as Next.js, React, Combine and many more!"
                caption=""
            />
            <Container>
                <Intro>
                    <ProfileImageContainer>
                        <Image
                            alt="Author Profile Image"
                            src={profileImage}
                            layout="fill"
                            objectFit="cover"
                        />
                    </ProfileImageContainer>
                    <IntroSection>
                        <h2>
                            <b>Hi! I&apos;m Pol</b> 🤘
                        </h2>
                        <p>
                            Welcome to my personal blog! I am an iOS developer
                            based in the UK and I love talking about software
                            development in general.
                        </p>
                    </IntroSection>
                </Intro>
                <BlogList posts={posts} />
            </Container>
        </>
    );
}
