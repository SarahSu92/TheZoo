import { RouterProvider } from "react-router";
import "./App.css";
import { Router } from "./Router";

function App() {
  return <>
  <RouterProvider router={Router}></RouterProvider>
  </>;
}

export default App;
