import { useMemo, useState } from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { CompanyContext } from "./context/companyContext";
import { dbInit } from './utils/dbInit';
import Header from "./components/Header";
import Root from './routes/root';
import Employees from "./routes/employees";
import Departments from "./routes/departments";
import ErrorPage from "./routes/error-page";
import SideNav from "./components/SideNav";
import './App.css';

dbInit();

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
  const [company, setCompany] = useState('');
  const value = useMemo(
    () => ({ company, setCompany }), 
    [company]
  );
  
  return (
    <div className="App">
      <CompanyContext.Provider value={value}>
        <Header />
        <SideNav />
        <RouterProvider router={router} />
      </CompanyContext.Provider>
    </div>
  )
}

export default App;
