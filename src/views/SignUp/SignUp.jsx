import styles from "./SignUp.module.css";

import Logo from "/src/assets/images/pictures/logo.png";

import { useForm } from "react-hook-form";

import { gql, useMutation } from "@apollo/client";

import useUserStore from "/src/stores/user.js";

const signUpMutation = gql`
  mutation (
    $email: String
    $fullName: String!
    $password: String!
    $nickname: String!
  ) {
    createUser(
      email: $email
      fullName: $fullName
      password: $password
      nickname: $nickname
    ) {
      status
      token
    }
  }
`;

export default function SignUp() {
  const set = useUserStore((state) => state.set);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signUp, { loading, error, data }] = useMutation(signUpMutation);

  return (
    <form
      className={styles.signup}
      onSubmit={handleSubmit((user) => {
        signUp({ variables: user });

        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: ${error.message}</p>;

        if (data.createUser.status !== 403) {
          alert(data.createUser.token);
          set(data.createUser.token);
        } else {
          alert("user exists");
        }
      })}
    >
      <img src={Logo} alt="" />
      <p>Sign up to see photos and videos from your friends.</p>
      <input
        id="email"
        type="text"
        placeholder="Email"
        {...register("email")}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input
        id="fullName"
        type="text"
        placeholder="Full Name"
        {...register("fullName", { required: "Full Name is required" })}
      />
      {errors.fullName && (
        <p className={styles.error}>{errors.fullName.message}</p>
      )}

      <input
        id="nickname"
        type="text"
        placeholder="Nickname"
        {...register("nickname", { required: "Nickname is required" })}
      />
      {errors.nickname && (
        <p className={styles.error}>{errors.nickname.message}</p>
      )}

      <input
        id="password"
        type="password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
      />
      {errors.password && (
        <p className={styles.error}>{errors.password.message}</p>
      )}

      <button type="submit">Sign Up</button>
      <a href="/login">Log in</a>
    </form>
  );
}
