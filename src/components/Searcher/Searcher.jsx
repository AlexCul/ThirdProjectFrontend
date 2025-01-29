import styles from "./Searcher.module.css";

import { gql, useLazyQuery } from "@apollo/client";

import useUserStore from "/src/stores/user.js";

import { useState } from "react";

const userQuery = gql`
  query ($nickname: String!) {
    userByNickname(nickname: $nickname) {
      avatar {
        base64
      }
    }
  }
`;

export default function Searcher({
  style = {
    display: "none",
  },
}) {
  const [nickname, setNickname] = useState("");
  const [getUser, { loading, error, data }] = useLazyQuery(userQuery);

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && nickname.trim()) {
      getUser({ variables: { nickname } });
    }
  };

  let searchResult = null;
  if (loading) {
    searchResult = <p>Loading...</p>;
  } else if (error) {
    searchResult = <p>Error: {error.message}</p>;
  } else if (data && data.userByNickname) {
    const avatar = data.userByNickname.avatar?.base64 || null;

    searchResult = (
      <a href={`/profile/${nickname}`} className={styles.user}>
        <img src={avatar} alt="us" />
        <p>
          {" "}
          <b>{nickname}</b>
        </p>
      </a>
    );
  }

  return (
    <div className={styles.searcher} style={style}>
      <div className={styles.ui}>
        <h3>Search</h3>
        <input
          type="text"
          onKeyDown={handleKeyDown}
          onChange={(e) => setNickname(e.target.value)}
          value={nickname}
          placeholder="Search"
        />
        <br />
        {searchResult || "Not found anything"}
      </div>
    </div>
  );
}
