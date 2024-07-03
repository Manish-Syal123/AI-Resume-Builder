import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/contect/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { Brain, Loader } from "lucide-react";

const Summery = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

  const onSave = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const data = {
        data: {
          summery: summery,
        },
      };
      GlobalApi.UpdateResumeDetail(params?.resumeId, data).then((resp) => {
        console.log(resp);
        enableNext(true);
        setLoading(false);
        toast.success("Details Updated.");
      });
    } catch (error) {
      console.log("Error Updating user summery: ", error);
      toast.error("⚠️Some Error Occured while Updating your Summery Details!");
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Summery</h2>
      <p>Add Summery for your job title</p>
      <div>
        <form onSubmit={onSave} className="mt-7">
          <div className="flex justify-between items-center">
            <label>Add Summery</label>
            <Button
              type="button" // just to prevent form from submitting directly
              variant="outline"
              size="sm"
              className="border-primary text-primary flex gap-2"
            >
              <Brain size={20} />
              Generate From AI
            </Button>
          </div>
          <Textarea
            required
            onChange={(e) => setSummery(e.target.value)}
            className="mt-5"
          />
          <div className="mt-2 flex justify-end">
            <Button disabled={loading} type="submit">
              {loading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Summery;
