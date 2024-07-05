import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormSection from "../../component/FormSection";
import ResumePreview from "../../component/ResumePreview";
import { ResumeInfoContext } from "@/contect/ResumeInfoContext";
import dummy from "@/data/dummy";
import GlobalApi from "./../../../../../service/GlobalApi";

const EditResume = () => {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    try {
      GlobalApi.GetResumeById(resumeId).then((resp) => {
        console.log(resp.data.data);
        setResumeInfo(resp.data.data);
      });
    } catch (error) {
      console.log("Error fetching ResumeinfoByID : ", error);
    }
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        {/* Form Section */}
        <FormSection />
        {/* Preview Section */}
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
