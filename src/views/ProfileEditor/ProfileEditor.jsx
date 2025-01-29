import styles from "./ProfileEditor.module.css";

import Link from "/src/assets/images/icons/link.svg";

import { useParams, useNavigate } from "react-router-dom";

import Button from "/src/components/Button/Button.jsx";
import NavBar from "/src/components/NavBar/NavBar.jsx";
import Footer from "/src/components/Footer/Footer.jsx";

import { gql, useQuery, useMutation } from "@apollo/client";

import { useForm } from "react-hook-form";

import useUserStore from "/src/stores/user.js";

import { useEffect, useState } from "react";

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

const updateUserMutation = gql`
mutation (
    $token: String!, $description: String,
    $website: String, $nickname: String,
    $avatar: String
) {
    updateUser(
        token: $token, description: $description,
        website: $website, nickname: $nickname,
        avatar: $avatar
    )
}
`;

export default function ProfileEditor() {
    const jwt = useUserStore((state) => state.user.jwt);
    const { nick } = useParams();

    const { 
        loading: loadingByToken,
        error: errorByToken,
        data: dataByToken,
    } = useQuery(userByTokenQuery, {
        variables: { token: jwt },
    });

    const [update, { loading: loadingUpdate, error: errorUpdate }] = useMutation(updateUserMutation);

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    const [avatarBase64, setAvatarBase64] = useState("");

    useEffect(() => {
        if (dataByToken) {
            setValue("nickname", dataByToken.userByToken.nickname);
            setValue("website", dataByToken.userByToken.website || "");
            setValue("description", dataByToken.userByToken.description || "");
            setAvatarBase64(dataByToken.userByToken.avatar?.base64 || "");
        }
    }, [dataByToken, setValue]);

    if (loadingByToken) return <p>Loading...</p>;
    if (errorByToken) return <p>Error: {errorByToken.message}</p>;
    if (!dataByToken || nick !== dataByToken.userByToken.nickname) return <p>Not your profile</p>;

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type === "image/png") {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarBase64(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Only PNG images are allowed.");
        }
    };

    const onSave = (user) => {
        update({ variables: { ...user, avatar: avatarBase64, token: jwt } });
    };

    return (
        <>
            <div className="content">
                <NavBar />
                <form className={styles.editor} onSubmit={handleSubmit(onSave)}>
                    <h3>Edit profile</h3>
                    <div className={styles.avatar}>
                        <div className={styles.info}>
                            <img src={`${avatarBase64}`} alt="avatar" />
                            <div className={styles.text}>
                                <h5>{nick}</h5>
                                <p>{dataByToken.userByToken.description || "No description..."}</p>
                            </div>
                        </div>
                        <input type="file" id="file" accept="image/png" onChange={handleImageUpload} style={{ display: "none" }} />
                        <Button text="New photo" type="primary" onClick={() => document.getElementById("file").click()} />
                    </div>
                    <h3>Nickname</h3>
                    <input type="text" {...register("nickname", { required: "It's required" })} />
                    {errors.nickname && <p className={styles.error}>{errors.nickname.message}</p>}
                    <h3>Website</h3>
                    <img src={Link} alt="" />
                    <input type="text" {...register("website")} style={{ color: "#00376B" }} />
                    <h3>About</h3>
                    <textarea {...register("description")}></textarea><br />
                    <button type="submit" disabled={loadingUpdate}>
                        {loadingUpdate ? "Saving..." : "Save"}
                    </button>
                    {errorUpdate && <p className={styles.error}>Error: {errorUpdate.message}</p>}
                </form>
            </div>
            <Footer />
        </>
    );
}

