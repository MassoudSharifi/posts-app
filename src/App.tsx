import "./styles/main.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import PostsPage from "./pages/posts";
import PostPage from "./pages/posts/post";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/posts",
    element: <PostsPage />,
  },
  {
    path: "posts/:postId",
    element: <PostPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
