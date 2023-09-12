import "./styles/main.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import LoginPage from "./pages/login";
import PostsPage from "./pages/posts";
import PostPage from "./pages/posts/post";

const privateRoutesLoader = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  if (!userData?.userId) {
    return redirect("/");
  }
  return null;
};

const publicRoutesLoader = () => {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  if (userData?.userId) {
    return redirect("/posts");
  }
  return null;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    loader: publicRoutesLoader,
  },
  {
    path: "/posts",
    element: <PostsPage />,
    loader: privateRoutesLoader,
  },
  {
    path: "posts/:postId",
    element: <PostPage />,
    loader: privateRoutesLoader,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
