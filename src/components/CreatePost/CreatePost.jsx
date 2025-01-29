import styles from "./CreatePost.module.css";
import { useMutation, gql } from "@apollo/client";
import { useForm } from "react-hook-form";

import { useState } from "react";

import useUserStore from "/src/stores/user.js";

const CREATE_POST_MUTATION = gql`
  mutation CreatePost($token: String!, $title: String!, $media: [String!]!, $description: String) {
    createPost(token: $token, title: $title, media: $media, description: $description) {
      id
    }
  }
`;

export default function CreatePostForm() {
  const { register, handleSubmit, setValue } = useForm();
  const [createPost, { loading, error, data }] = useMutation(CREATE_POST_MUTATION);
  const jwt = useUserStore((state) => state.user.jwt);
  const [avatar64Base, setAvatar64Base] = useState("");

  const onSubmit = async (formData) => {
    await createPost({
      variables: {
        token: jwt,
        title: formData.title,
        media: [avatar64Base],
        description: formData.description,
      },
    });
  };

  // Placeholder upload function, implement actual file upload logic
  const uploadFile = async (file) => {
    // Replace with actual file upload logic, e.g., using a service like Cloudinary or S3
    return URL.createObjectURL(file);
  };
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "image/png") {
        const reader = new FileReader();
        reader.onloadend = () => {
            setAvatar64Base(reader.result);
        };
        reader.readAsDataURL(file);
        alert(avatar64Base);
    } else {
        alert("Only PNG images are allowed.");
    }
  };


  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", width: "24rem" }}>
      <h2 style={{ fontSize: "1.25rem", fontWeight: "600", marginBottom: "1rem" }}>Create a Post</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <input type="text" placeholder="Title" {...register("title")} />
        <input type="file" accept="image/png" onChange={handleImageUpload} />
        <textarea placeholder="Description" {...register("description")} />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Post"}
        </button>
        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
        {data && <p style={{ color: "green" }}>Post created successfully!</p>}
      </form>
    </div>
  );
}

