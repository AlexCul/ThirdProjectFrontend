import styles from "./Profile.module.css";

import { useParams, useNavigate } from "react-router-dom";

import NavBar from "/src/components/NavBar/NavBar.jsx";
import Footer from "/src/components/Footer/Footer.jsx";
import Button from "/src/components/Button/Button.jsx";
import PostCover from "/src/components/PostCover/PostCover.jsx";

import Link from "/src/assets/images/icons/link.svg";

import { gql, useQuery } from "@apollo/client";

import useUserStore from "/src/stores/user.js";

const profileQuery = gql`
query ($id: ID!) {
  user(id: $id) {
    avatar {
      base64
    }
    followers
    following
    posts {
      media {
        base64
      }
      id
    }
    description
    website
    nickname
  }
}
`;
const idQuery = gql`
query ($nickname: String!) {
  userByNickname(nickname: $nickname) {
    id
  }
}
`;
const jwtQuery = gql`
query ($token: String!) {
    userByToken(token: $token) {
        id
    }
}
`;

export default function Profile() {
    const { nick } = useParams();
    const jwt = useUserStore((state) => state.user.jwt);
    const navigate = useNavigate();
    
    const {
        loading: loadingId,
        error: errorId,
        data: dataId,
    } = useQuery(idQuery, {
        variables: { nickname: nick },
    });

    const userId = dataId?.userByNickname?.id;

    const {
        loading: loadingProfile,
        error: errorProfile,
        data: dataProfile,
    } = useQuery(profileQuery, {
        variables: { id: userId },
        skip: !userId,
    });

    const {
        loading: loadingJwt,
        error: errorJwt,
        data: dataJwt,
    } = useQuery(jwtQuery, {
        variables: { token: jwt },
    });

    if (loadingId || loadingProfile || loadingJwt) return <p>Loading...</p>;
    if (errorId || errorProfile || errorJwt) return <p>Error: {errorId?.message || errorProfile?.message || errorJwt?.message}</p>;

    if (!userId) return <p>Profile not found</p>;
    if (!dataJwt) return <p>Not logged in</p>;

    console.log(jwt);
    console.log("dataJwt:", dataJwt);

    const handleEdit = () => {
        navigate(`/profile/${dataProfile.user.nickname}/edit`);
    }

    return (
        <>
            <div className="content">
                <NavBar />
                <div className={styles.user}>
                    <img src={dataProfile.user.avatar?.base64 || ""} alt="ps" />
                    <div className={styles.info}>
                        <a href="#">{dataProfile.user.nickname}</a>
                        {
                            dataJwt.userByToken.id === userId
                            ? <Button onClick={handleEdit} type="secondary" text="Edit profile" style={{
                                width: "132px",
                                height: "32px",
                            }} />
                            : <Button onClick={() => {
                            }} type="primary" text="Follow" style={{
                                width: "132px",
                                height: "32px",
                            }} />
                        }
                        <div className={styles.counts}>
                            <p><b>{dataProfile.user.posts.length}</b> posts</p>
                            <p><b>{dataProfile.user.followers.length}</b> followers</p>
                            <p><b>{dataProfile.user.following.length}</b> following</p>
                        </div>
                        <p>{dataProfile.user.description || "No description..."}</p>
                        <a href={dataProfile.user.website || "#"}>{
                            dataProfile.user.website
                            ? <><img src={Link} alt="" /> {dataProfile.user.website}</>
                            : ""
                        }</a>
                    </div>
                </div>
            </div>
            { dataProfile.user.posts.map(post => (
                <PostCover post={post} key={post.id} />
            )) }
            <Footer />
        </>
    );
}
