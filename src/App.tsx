import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import RecipePage from "./pages/RecipePage";
import { routes } from "./routes";

function App() {
  return (
    <Routes>
      <Route path={routes.homePage} element={<HomePage />} />
      <Route path={routes.recipePage} element={<RecipePage />} />
    </Routes>
  );
}

export default App;
