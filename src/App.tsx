import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Header from "./components/Header";
import SideNav from "./components/SideNav";

import Root from "./routes/root";
import Employees from "./routes/employees";
import Departments from "./routes/departments";
import ErrorPage from "./routes/error-page";
import { populateDB } from "./services/dbService";

import "./App.css";

populateDB();

const routes = [
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/employees",
    element: <Employees />,
  },
  {
    path: "/departments",
    element: <Departments />,
  },
];
const router = createBrowserRouter(routes);

function App() {
  return (
    <div className="App">
      <Header />
      <SideNav />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
