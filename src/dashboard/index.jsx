import React, { useEffect, useState, useCallback, useMemo } from "react";
import AddResume from "./components/AddResume";
import GlobalApi from "./../../service/GlobalApi";
import { useUser } from "@clerk/clerk-react";
import ResumeCardItem from "./components/ResumeCardItem";
import { Rabbit } from "lucide-react";

const Dashboard = () => {
  const [resumeList, setResumeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const GetResumesList = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await GlobalApi.getUserResumes(
        user?.primaryEmailAddress?.emailAddress
      );
      console.log(resp.data);
      setResumeList(resp.data.data);
    } catch (error) {
      console.log("Error Fetching User ResumeLists: ", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user, GetResumesList]);

  const resumeContent = useMemo(() => {
    if (loading) {
      return [1, 2, 3, 4].map((item, index) => (
        <div
          key={index}
          className="h-[280px] rounded-lg bg-slate-200 animate-pulse"
        ></div>
      ));
    }

    if (resumeList.length > 0) {
      return resumeList.map((resume, index) => (
        <ResumeCardItem
          key={index}
          resume={resume}
          refreshData={GetResumesList}
        />
      ));
    }

    return (
      <div className="flex flex-col justify-center items-center">
        <Rabbit size={150} />
        <h2 className="font-bold text-xl">No Resume Found!</h2>
      </div>
    );
  }, [loading, resumeList, GetResumesList]);

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI Resume for your next Job Role!</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5">
        <AddResume />
        {resumeContent}
      </div>
    </div>
  );
};

export default Dashboard;
