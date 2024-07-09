import React, { useEffect, useState } from "react";
import AddResume from "./components/AddResume";
import GlobalApi from "./../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItem from "./components/ResumeCardItem";
import { Rabbit } from "lucide-react";

const Dashboard = () => {
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    user && GetResumesList();
  }, [user]);

  // To get all the Resumes Created by Current loggedIn User
  const GetResumesList = async () => {
    setLoading(true);
    try {
      await GlobalApi.getUserResumes(
        user?.primaryEmailAddress?.emailAddress
      ).then((resp) => {
        console.log(resp.data);
        setResumeList(resp.data.data);
        setLoading(false);
      });
    } catch (error) {
      console.log("Error Fetching User ResumeLists: ", error);
      setLoading(false);
    }
  };
  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI Resume for your next Job Role!</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {loading ? (
          [1, 2, 3, 4].map((item, index) => (
            <div
              key={index}
              className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
            ></div>
          ))
        ) : resumeList.length > 0 ? (
          resumeList.map((resume, index) => (
            <ResumeCardItem
              key={index}
              resume={resume}
              refreshData={GetResumesList}
            />
          ))
        ) : (
          <div className="flex flex-col justify-center items-center">
            <Rabbit size={150} />
            <h2 className="font-bold text-xl">No Resume Found!</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
