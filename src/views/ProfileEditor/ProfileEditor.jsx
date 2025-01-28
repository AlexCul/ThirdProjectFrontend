import styles from "./ProfileEditor.module.css";

import Link from "/src/assets/images/icons/link.svg";

import { useParams, useNavigate } from "react-router-dom";

import Button from "/src/components/Button/Button.jsx";
import NavBar from "/src/components/NavBar/NavBar.jsx";
import Footer from "/src/components/Footer/Footer.jsx";

import { gql, useQuery } from "@apollo/client";

import { useForm } from "react-hook-form";

import useUserStore from "/src/stores/user.js";

const userByTokenQuery = gql`
query ($token: String!) {
    userByToken(token: $token) {
        nickname
        avatar {
            base64
        }
        description
        website
    }
}
`;

export default function ProfileEditor() {
    const jwt = useUserStore((state) => state.user.jwt);
    const { nick } = useParams();

    const { loading, error, data } = useQuery(userByTokenQuery, {
        variables: { token: jwt },
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: ${error.message}</p>;

    if (nick !== data.userByToken.nickname) return <p>Not your profile</p>;

    const avatar = (data.userByToken.avatar !== null)
        ? data.userByToken.avatar.base64
        : "";

    return (
        <>
        <div className="content">
            <NavBar />
            <form className={styles.editor} onSubmit={handleSubmit((user) => {}) }>
                <h3>Edit profile</h3>
                <div className={styles.avatar}>
                    <div className={styles.info}>
                    <img src={avatar} alt="avatar" />
                    <div className={styles.text}>
                        <h5>{nick}</h5>
                        <p>{data.userByToken.description || "No description..."}</p>
                    </div>
                    </div>
                    <Button onClick={() => {}} text="New photo" type="primary" />
                </div>
                <h3>Nickname</h3>
                <input type="text" placeholder="Nickname" { ...register("nickname", { required: "It's required", value: nick }) } />
                { errors.nickname && <p className={styles.error}>{errors.nickname.message}</p> }
                <h3>Website</h3>
                <img src={Link} alt="" />
                <input type="text" { ...register("website", { value: data.userByToken.website || "" }) } style={{color: "#00376B",}} />
                <h3>About</h3>
                <textarea { ...register("description", {value: data.userByToken.description || ""}) }></textarea><br />
                <button type="submit">Save</button>
            </form>
        </div>
        <Footer />
        </>
    );
}
