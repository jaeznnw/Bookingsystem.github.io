import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Dashboard from "./Dashboard/Dashboard";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { store } from "./redux/store";






function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },

    {
      path: "Login",
      element: <Login />,
    },

    {
      path: "Register",
      element: <Register />,
    },

   

    {
      path: "Dashboard",
      element: <Dashboard />,
    },

   

   


  ]);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;




