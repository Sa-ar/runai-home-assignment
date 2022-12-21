import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { dbInit } from './utils/dbInit';
import Root from './routes/root';
import Employees from "./routes/employees";
import Departments from "./routes/departments";
import './App.css';

dbInit();

const routes = [
  {
    path: "/",
    element: <Root />,
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
      <RouterProvider router={router} />
    </div>
  )
}

export default App;
