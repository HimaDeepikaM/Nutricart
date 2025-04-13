import React from "react";
import { Routes, Route } from "react-router-dom";
import { NutriCartProvider } from "./context/NutriCartContext";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Dashboard from "./pages/Dashboard";
import Favorites from "./pages/Favorites";
import Checkout from "./pages/Checkout";
import Recipe from "./pages/Recipe";
import PREVIEW from "./pages/TEMP_RecipePreview";
import "./styles.css";

function App() {
  return (
    <NutriCartProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/preview_recipe" element={<PREVIEW />} /> {/* TODO - DELETE Reference ONLY */ }
          {/* Dynamic Routing for Recipe using id */}
          <Route path="/recipe/:title" element={<Recipe />} />
          <Route path="*" element={<ErrorPage />}/>
        </Route>
      </Routes>
    </NutriCartProvider>
  );
}

export default App;
