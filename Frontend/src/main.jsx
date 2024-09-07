import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; 
import App from "./App.jsx";
import "./index.css";
import Error from "./Components/Error.jsx";
import PostDetails from "./Components/PostDetails/PostDetails.jsx";
import PostEditor from "./Components/PostEditor/PostEditor.jsx";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Login/Login.jsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children:[{
      path: '/home',
      element: <Home />
    },
    {
      path: "posts/:post_id",
      element: <PostDetails />
    },
    {
      path: "/create-post",
      element: <PostEditor />
    },
    {
      path: "/:post_id",
      element: <PostEditor />
    },
    {
      path: '/login',
      element: <Login />
    }
  ]
  },
  
]);



createRoot(document.getElementById("root")).render(<RouterProvider router={router} />);
