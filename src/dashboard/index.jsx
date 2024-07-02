import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import GlobalApi from "./../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItem from "./components/ResumeCardItem";

const Dashboard = () => {
  const [resumeList, setResumeList] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    user && getResumesList();
  }, [user]);

  // To get all the Resumes Created by Current loggedIn User
  const getResumesList = async () => {
    try {
      await GlobalApi.getUserResumes(
        user?.primaryEmailAddress?.emailAddress
      ).then((resp) => {
        console.log(resp.data);
        setResumeList(resp.data.data);
      });
    } catch (error) {
      console.log("Error Fetching User ResumeLists: ", error);
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI Resume for your next Job Role!</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {resumeList.length > 0 &&
          resumeList.map((resume, index) => (
            <ResumeCardItem key={index} resume={resume} />
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
