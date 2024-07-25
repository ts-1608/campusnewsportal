import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import News from "./components/News";
import Auth from "./components/Auth";
import PublishArticle from "./components/PublishArticle";
import DeleteArticle from "./components/DeleteArticle";
import ArchiveArticle from "./components/ArchiveArticle";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<News />} />
        <Route path="/auth/success" element={<Auth />} />
        <Route
          path="/publish"
          element={
            <ProtectedRoute>
              <PublishArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/delete"
          element={
            <ProtectedRoute>
              <DeleteArticle />
            </ProtectedRoute>
          }
        />
        <Route
          path="/archive"
          element={
            <ProtectedRoute>
              <ArchiveArticle />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;
