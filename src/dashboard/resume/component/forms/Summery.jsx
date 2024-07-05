import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/contect/ResumeInfoContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GlobalApi from "./../../../../../service/GlobalApi";
import { Brain, Loader } from "lucide-react";
import { AIChatSession } from "./../../../../../service/AIModal";
import { toast } from "sonner";

// const prompt = `Job Title: {jobTitle} , Depends on job title give me list of  summary for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format. And use this JSON format for generating the output
// {"experience_level": "Fresher", "summary": ""},
// {"experience_level": "Mid-Level", "summary": ""},
// {"experience_level": "Experienced", "summary": ""}`;

const prompt =
  "Job Title: {jobTitle} , Depends on job title give me list of  summary for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format";

const Summery = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [summery, setSummery] = useState();
  const [aiGeneratedSummeryList, setAiGeneratedSummeryList] = useState();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    summery &&
      setResumeInfo({
        ...resumeInfo,
        summery: summery,
      });
  }, [summery]);

  const GenerateSummeryFormAI = async () => {
    try {
      setLoading(true);
      const PROMPT = prompt.replace("{jobTitle}", resumeInfo?.jobTitle);
      console.log(PROMPT);
      const result = await AIChatSession.sendMessage(PROMPT);
      console.log(JSON.parse(result.response.text()));

      setAiGeneratedSummeryList(JSON.parse(result.response.text()));
      setLoading(false);
    } catch (error) {
      console.error("Error while generating summery from AI : ", error);
      toast.error(
        "Something went wrong while generating from AI. Please try again Later. "
      );
      setLoading(false);
    }
  };

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
              disabled={loading}
              onClick={() => GenerateSummeryFormAI()}
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  <Brain size={20} /> Generate From AI
                </>
              )}
            </Button>
          </div>
          <Textarea
            required
            value={summery}
            defaultValue={summery ? summery : resumeInfo?.summery}
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

      {aiGeneratedSummeryList && (
        <div className=" border-[1.9px] border-primary rounded-xl mt-3 py-3 px-4 flex flex-col justify-center items-center">
          <h2 className="font-bold text-lg">Suggestions</h2>
          {aiGeneratedSummeryList.map((item, index) => (
            <div
              key={index}
              onClick={() => setSummery(item?.summary)}
              className="p-5 shadow-lg my-4 rounded-lg cursor-pointer"
            >
              <h2 className="font-bold my-1">
                ⚡Level:{" "}
                <span className="text-indigo-600">
                  {item?.experience_level}
                </span>
              </h2>
              <p className="text-justify">{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Summery;
