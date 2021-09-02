import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
import LoginPage from "./views/LoginPage/LoginPage.js";
import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage"
import VideoDetailPage from './views/VideoDetailPage/VideoDetailPage'
import SubscriptionPage from './views/SubscriptionPage/SubscriptionPage';
//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: "69px", minHeight: "calc(100vh - 80px)" }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)} />{" "}
          {/*아무나들어갈수있음*/}
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="/video/upload"
            component={Auth(VideoUploadPage, true)}
          />{" "}
          {/*로그인한사람만 들어갈수있음*/}
          <Route
            exact
            path="/video/:videoId"
            component={Auth(VideoDetailPage, null)} //아무나 들어갈수있어야 하니까 null
          />
          <Route
            exact
            path="/subscription"
            component={Auth(SubscriptionPage, null)} //아무나 들어갈수있어야 하니까 null
          />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
