import NavBar from "/src/components/NavBar/NavBar.jsx";
import Footer from "/src/components/Footer/Footer.jsx";
import CreatePost from "/src/components/CreatePost/CreatePost.jsx";

export default function PostCreator() {
  return (
    <>
      <div className="content">
        <NavBar />
        <CreatePost />
      </div>
      <Footer />
    </>
  );
}
