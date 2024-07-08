import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CirclePlus, Loader } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "../RichTextEditor";
import { ResumeInfoContext } from "@/contect/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import GlobalApi from "./../../../../../service/GlobalApi";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummery: "",
};
const Experience = () => {
  const [experienceList, setExperienceList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    console.log("resumeInfo.experience⚡ ", resumeInfo);
    resumeInfo?.Experience?.length > 0 &&
      setExperienceList(resumeInfo?.Experience);
  }, [resumeInfo]);

  const handleChange = (index, event) => {
    const newEntries = experienceList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setExperienceList(newEntries);
  };

  const AddNewExperience = () => {
    setExperienceList([
      ...experienceList,
      {
        title: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        workSummery: "",
      },
    ]);
  };

  const RemoveExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    // console.log(experienceList);
    setResumeInfo({
      ...resumeInfo,
      Experience: experienceList,
    });
  }, [experienceList]);

  const onSave = async () => {
    try {
      setLoading(true);
      const data = {
        data: {
          Experience: experienceList.map(({ id, ...rest }) => rest),
          // Experience: experienceList,
        },
      };
      console.log(experienceList);

      await GlobalApi.UpdateResumeDetail(params?.resumeId, data).then((res) => {
        console.log(res);
        setLoading(false);
        toast("Details updated !");
      });
    } catch (error) {
      console.error("Error while updating User Experience details: ", error);
      toast("Something went wrong while updating your Experience Details.");
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Position Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                  />
                </div>
                <div>
                  <label className="text-xs">Company Name</label>
                  <Input
                    name="companyName"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.companyName}
                  />
                </div>
                <div>
                  <label className="text-xs">City</label>
                  <Input
                    name="city"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.city}
                  />
                </div>
                <div>
                  <label className="text-xs">State</label>
                  <Input
                    name="state"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.state}
                  />
                </div>
                <div>
                  <label className="text-xs">start Date</label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.startDate}
                  />
                </div>
                <div>
                  <label className="text-xs">End Date</label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.endDate}
                  />
                </div>
                <div className="col-span-2">
                  {/* Work Summery */}
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummery}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "workSummery", index)
                    }
                    userPrompt={""}
                    summeryFor={"ExperienceSummery"}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <Button
              onClick={AddNewExperience}
              variant="outline"
              className="text-primary text-wrap"
            >
              + Add More Experience
            </Button>
            {experienceList.length > 0 ? (
              <Button
                onClick={RemoveExperience}
                variant="outline"
                className="text-red-600"
              >
                - Remove
              </Button>
            ) : null}
          </div>

          {experienceList.length > 0 ? (
            <Button disabled={loading} onClick={() => onSave()}>
              {loading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Experience;
