import styles from "./Explore.module.css";

import NavBar from "/src/components/NavBar/NavBar.jsx";
import Footer from "/src/components/Footer/Footer.jsx";
import PostCover from "/src/components/PostCover/PostCover.jsx";

import { gql, useQuery } from "@apollo/client";

import useUserStore from "/src/stores/user.js";

const postsQuery = gql`
{
  randomPosts(count: 100) {
    media {
      base64
    }
    id
  }
}
`;

export default function Explore() {
    const { loading, error, data } = useQuery(postsQuery);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: ${error.message}</p>

    console.log(data.randomPosts);
    return (
    <>
        <div className="content">
            <NavBar />
            <div className={styles.posts}>
                { data.randomPosts.map(post => (
                    <PostCover post={post} key={post.id} />
                )) }
            </div>
        </div>
        <Footer />
    </>
    );
}
