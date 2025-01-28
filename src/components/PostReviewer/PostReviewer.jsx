import styles from "./PostReviewer.model.css";

import { gql, useQuery } from "@apollo/client";

import useUserStore from "/src/stores/user.js";

const postQuery = gql`
query ($id: ID!) {
  post(id: $id) {
    media {
      base64
    }
    id
    owner
    comments {
      writtenBy {
        avatar {
          base64
        }
        nickname
      }
      content
    }
  }
}
`;

const ownerQuery = gql`
query ($userId: ID!) {
    {
        user(id: $userId) {
            avatar {
                base64
            }
            nickname
        }
    }
}
`;

export default function PostReviewer({ postId }) {
    const { postsLoading, postsError, postsData } = useQuery(postQuery,
        { variables: { id: postId } },
    );

    if (postsLoading) return <p>Loading posts...</p>;
    if (postsError) return <p>Error with posts: ${postsError.message}</p>;

    const { ownerLoading, ownerError, ownerData } = useQuery(ownerQuery,
        { variables: { userId: postsData.post.owner } },
    );

    if (ownerLoading) return <p>Loading owner...</p>;
    if (ownerError) return <p>Error with owner: ${ownerError.message}</p>;

    return (
        <div className={styles.window}>
            <div className={styles.post}>
                <img src={""} alt="cover" />
                <div className={styles.info}>
                    
                </div>
            </div>
        </div>
    );
}
