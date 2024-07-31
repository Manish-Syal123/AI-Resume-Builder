import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";

const NotFoundPage = () => {
  const navigation = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center gap-4 m-auto h-screen">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Button onClick={() => navigation("/")}>Go Home</Button>
    </div>
  );
};

export default NotFoundPage;
