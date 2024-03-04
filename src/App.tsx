import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { Suspense, lazy } from "react";
const RootLayout = lazy(() => import("./pages/Root/RootLayout.tsx"));
const Home = lazy(() => import("./pages/Home/Home.tsx"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

function App() {
  return (
    <Suspense>
      <RouterProvider router={router} />;
    </Suspense>
  );
}

export default App;
