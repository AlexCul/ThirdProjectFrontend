import './App.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProfileEditor from "./views/ProfileEditor/ProfileEditor.jsx";
import PageNotFound from "./views/PageNotFound/PageNotFound.jsx";
import Profile from "./views/Profile/Profile.jsx";
import Explore from "./views/Explore/Explore.jsx";
import SignUp from "./views/SignUp/SignUp.jsx";
import LogIn from "./views/LogIn/LogIn.jsx";

export default function App() {
  return (
    <>
      <main>
        <BrowserRouter>
          <Routes>
            <Route path="/profile/:nick/edit" element={<ProfileEditor />}></Route>
            <Route path="/profile/:nick" element={<Profile />}></Route>
            <Route path="/explore" element={<Explore />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route path="/login" element={<LogIn />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
          </Routes>
        </BrowserRouter>
      </main>
    </>
  );
};

