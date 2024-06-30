import React from "react";
import { Button } from "../ui/button";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
const Header = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  return (
    <div className="p-3 px-5 flex justify-between shadow-md">
      <img
        src="/logowithname.png"
        alt="logo"
        width={240}
        height={300}
        className="-ml-4"
      />
      {!isSignedIn && isLoaded ? (
        <Link to={"/auth/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      ) : (
        <div className="flex gap-2 items-center">
          <Link to={"/dashboard"}>
            {" "}
            <Button variant="outline" className="border-2 border-primary">
              Dashboard
            </Button>
          </Link>{" "}
          <UserButton />
        </div>
      )}
    </div>
  );
};

export default Header;
