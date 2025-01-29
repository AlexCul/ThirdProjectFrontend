import styles from "./Home.module.css";

import Done from "/src/assets/images/pictures/done.png";

import NavBar from "/src/components/NavBar/NavBar.jsx";
import Footer from "/src/components/Footer/Footer.jsx";
import PostCover from "/src/components/PostCover/PostCover.jsx";

import { gql, useQuery } from "@apollo/client";

const postsQuery = gql`
{
  randomPosts(count: 100) {
    media {
      base64
    }
    id
    likes {
      likedBy {
        id
      }
    }
    owner
    comments {
      content
      writtenBy {
        id
      }
    }
  }
}
`;

export default function Home() {
    const {
        loading,
        error,
        data,
    } = useQuery(postsQuery);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: ${error.message}</p>

    return (
        <>
        <div className="content">
            <NavBar />
            { data.randomPosts.map(post => (
                <PostCover post={post} key={post.id} />
            )) }
        </div>
        <Footer />
        </>
    );
}
