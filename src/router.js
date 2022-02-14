//Home
import Home from "pages/Home";
//Explore
import Explore from "pages/Explore";
//Notifications
import Notifications from "pages/Notifications";
//Bookmarks
import Bookmarks from "pages/Bookmarks";
//Auth
import Register from "pages/auth/Register";
import Login from "pages/auth/Login";
import LogOut from "pages/auth/LogOut";
import ForgetPassword from "pages/auth/ForgetPassword";
import ResetPassword from "pages/auth/ResetPassword";
//Profile
import Profile from "pages/profile/Profile";
import EditProfile from "pages/profile/Edit";
//Users
import User from "pages/users/User";
import Followers from "pages/users/Followers";
import Following from "pages/users/Following";
//PostsProfile
import CreatePost from "pages/profile/posts/Create";
// import SinglePostProfile from "pages/profile/posts/Single";
import EditPost from "pages/profile/posts/Edit";
//Posts
import SinglePost from "pages/posts/Single";


const routes = [
  //Auth
  {
    path: "/register",
    Component: Register,
    exact: true,
  },
  {
    path: "/login",
    Component: Login,
    exact: true,
  },
  {
    path: "/logout",
    Component: LogOut,
    exact: true,
  },
  {
    path: "/forget-password",
    Component: ForgetPassword,
    exact: true,
  },
  {
    path: "/reset-password/:token",
    Component: ResetPassword,
    exact: true,
  },
  //Home
  {
    path: "/",
    Component: Home,
    exact: true,
  },
  //Explore
  {
    path: "/explore",
    Component: Explore,
    exact: true,
  },
  //Notifications
  {
    path: "/notifications",
    Component: Notifications,
    exact: true,
  },
  //Bookmarks
  {
    path: "/bookmarks",
    Component: Bookmarks,
    exact: true,
  },
  //Profile
  {
    path: "/profile",
    Component: Profile,
    exact: true,
  },
  {
    path: "/setting/profile",
    Component: EditProfile,
    exact: true,
  },
  //Users
  {
    path: "/:username",
    Component: User,
    exact: true,
  },
  {
    path: "/:username/followers",
    Component: Followers,
    exact: true,
  },
  {
    path: "/:username/following",
    Component: Following,
    exact: true,
  },
  //Posts
  {
    path: "/posts/create",
    Component: CreatePost,
    exact: true,
  },
  {
    path: "/posts/:post",
    Component: SinglePost,
    exact: true,
  },
  {
    path: "/posts/:post/edit",
    Component: EditPost,
    exact: true,
  },
];

export default routes;
