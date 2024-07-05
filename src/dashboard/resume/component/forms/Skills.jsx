import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { ResumeInfoContext } from "@/contect/ResumeInfoContext";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { toast } from "sonner";

const Skills = () => {
  const [skillsList, setSkillsList] = useState([{ name: "", rating: 0 }]);
  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const { resumeId } = useParams();

  useEffect(() => {
    resumeInfo && setSkillsList(resumeInfo?.skills);
  }, []);

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  const AddNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };

  const RemoveSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const onSave = async () => {
    try {
      setLoading(true);
      const data = {
        data: {
          skills: skillsList,
        },
      };

      await GlobalApi.UpdateResumeDetail(resumeId, data).then((resp) => {
        console.log(resp);
        setLoading(false);
        toast.success("Details Updated!");
      });
    } catch (error) {
      setLoading(false);
      toast.error("Something went wrong while updating Skills details.");
      toast.error("Please try again later!!");
    }
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your professional Skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-2 rounded-lg p-3 mb-2"
          >
            <div className="w-[55%]">
              <label className="text-xs">Name</label>
              <Input
                onChange={(e) => handleChange(index, "name", e.target.value)}
                defaultValue={item.name}
              />
            </div>

            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <Button
            onClick={AddNewSkills}
            variant="outline"
            className="text-primary text-wrap"
          >
            + Add More Skills
          </Button>
          {skillsList.length > 0 ? (
            <Button
              onClick={RemoveSkills}
              variant="outline"
              className="text-red-600"
            >
              - Remove
            </Button>
          ) : null}
        </div>

        {skillsList.length > 0 ? (
          <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <Loader className="animate-spin" /> : "Save"}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default Skills;
