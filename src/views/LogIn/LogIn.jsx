import styles from "./LogIn.module.css";

import Logo from "/src/assets/images/pictures/logo.png";
import Phones from "/src/assets/images/pictures/phones.png";

import { gql, useMutation } from "@apollo/client";

import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";

import useUserStore from "/src/stores/user.js";

import { useEffect } from "react";

const logInMutation = gql`
  mutation ($nickname: String!, $password: String!) {
    login(nickname: $nickname, password: $password) {
      status
      token
    }
  }
`;

export default function LogIn() {
  const set = useUserStore((state) => state.setJwtToken);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const [logIn, { loading, error, data }] = useMutation(logInMutation);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: ${error.message}</p>

  useEffect(() => {
    if (data?.login?.status === 200) {
      set(data.login.token);
      navigate("/explore");
    } else if (data) {
      alert("Failed, some of your data is wrong");
    }
  }, [data, set, navigate]);

  const handleLogin = (user) => {
    logIn({ variables: user });
  };

  return (
    <div className={styles.login}>
      <img src={Phones} alt="" />
      <form onSubmit={handleSubmit(handleLogin)}>
        <img src={Logo} alt="" />
        <input
          type="text"
          placeholder="Nickname"
          {...register("nickname", { required: "It's required" })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "It's required" })}
        />
        <button type="submit" disabled={loading}>
          Log in
        </button>
      </form>
    </div>
  );
}
