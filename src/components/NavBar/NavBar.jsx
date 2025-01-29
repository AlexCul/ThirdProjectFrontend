import styles from "./NavBar.module.css";

import Logo from "/src/assets/images/pictures/logo.png";

import Home from "/src/assets/images/icons/home.svg";
import Search from "/src/assets/images/icons/search.svg";
import Add from "/src/assets/images/icons/add.svg";
import Heart from "/src/assets/images/icons/heart.svg";
import Explore from "/src/assets/images/icons/explore.svg";

import { gql } from "@apollo/client";

import useUserStore from "/src/stores/user.js";
import { useQuery } from "@apollo/client";

import { useState } from "react";

import Searcher from "/src/components/Searcher/Searcher.jsx";

const userQuery = gql`
  query ($token: String!) {
    userByToken(token: $token) {
      nickname
      avatar {
        base64
      }
    }
  }
`;

export default function NavBar() {
  const jwt = useUserStore((state) => state.user.jwt);
  const [showSearcher, setShowSearcher] = useState(false);

  const { loading, error, data } = useQuery(userQuery, {
    variables: { token: jwt },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: ${error.message}</p>;

  console.log(data);

  const avatar =
    data.userByToken.avatar === null ? "" : data.userByToken.avatar.base64;
  const nickname = data.userByToken.nickname;

  return (
    <nav>
      <img src={Logo} alt="logo" />
      <a href="/">
        <img src={Home} alt="" /> Home
      </a>
      <a onClick={() => setShowSearcher((prev) => !prev)}>
        <img src={Search} alt="" /> Search
      </a>
      <a href="/post/creator">
        <img src={Add} alt="" /> Create
      </a>
      <a onClick={() => {}}>
        <img src={Heart} alt="" /> Notifications
      </a>
      <a href="/explore">
        <img src={Explore} alt="" /> Explore
      </a>
      <a href={`/profile/${nickname}`} className={styles.profile}>
        <img src={avatar} alt="pr" /> Profile
      </a>
      {showSearcher && <Searcher style={{ display: "block" }} />}
    </nav>
  );
}
