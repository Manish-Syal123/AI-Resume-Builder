import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/contect/ResumeInfoContext";
import { Brain, Loader, LoaderCircle } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";
import { AIChatSession } from "./../../../../service/AIModal";
import { toast } from "sonner";

const PROMPT = `position titile: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume , give me result in HTML format. Use this format for generating the output ["•text,•text","•text,•text","•text,•text"]`;

const RichTextEditor = ({
  onRichTextEditorChange,
  index,
  defaultValue,
  userPrompt,
  summeryFor,
}) => {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  // const GenerateProjectSummery = async () => {
  //   try {
  //     setLoading(true);
  //     if (!resumeInfo.projects[index].title) {
  //       toast("Please Add Position Title");
  //       setLoading(false);
  //       return;
  //     }
  //     if (!resumeInfo.projects[index].technologies) {
  //       toast("Please Add Technologies");
  //       setLoading(false);
  //       return;
  //     }

  //     const result = await AIChatSession.sendMessage(userPrompt);
  //     console.log("Project Summery 👉", result.response.text());
  //     const resp = result.response.text();
  //     setValue(resp.replace("[", "").replace("]", ""));
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error in generating summery: ", error);
  //     toast(
  //       "Something went wrong, while generating from AI. Please try again Later!!"
  //     );
  //     setLoading(false);
  //   }
  // };

  const GenerateSummeryFromAI = async () => {
    if (summeryFor === "ExperienceSummery") {
      try {
        setLoading(true);
        if (!resumeInfo.Experience[index].title) {
          toast("Please Add Position Title");
          setLoading(false);
          return;
        }
        const prompt = PROMPT.replace(
          "{positionTitle}",
          resumeInfo.Experience[index].title
        );
        const result = await AIChatSession.sendMessage(prompt);
        console.log(result.response.text());
        const resp = result.response.text();
        setValue(resp.replace("[", "").replace("]", ""));
        setLoading(false);
      } catch (error) {
        console.error("Error in generating summery: ", error);
        toast(
          "Something went wrong, while generating from AI. Please try again Later!!"
        );
        setLoading(false);
      }
    } else {
      try {
        setLoading(true);
        if (!resumeInfo.projects[index].title) {
          toast("Please Add Position Title");
          setLoading(false);
          return;
        }
        if (!resumeInfo.projects[index].technologies) {
          toast("Please Add Technologies");
          setLoading(false);
          return;
        }

        let prompt = userPrompt.replace(
          "{projectTitle}",
          resumeInfo.projects[index].title
        );
        prompt = userPrompt.replace(
          "{Technologies}",
          resumeInfo.projects[index].technologies
        );

        console.log("project-Prompt 🚀 ", prompt);
        const result = await AIChatSession.sendMessage(prompt);
        console.log("Project Summery 👉", result.response.text());
        const resp = result.response.text();
        setValue(resp.replace("[", "").replace("]", ""));
        setLoading(false);
      } catch (error) {
        console.error("Error in generating summery: ", error);
        toast(
          "Something went wrong, while generating from AI. Please try again Later!!"
        );
        setLoading(false);
      }
    }
  };

  return (
    <div>
      {/* Generate summery from AI */}
      <div className="flex justify-between my-2">
        <label className="text-xs">Summery</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          //disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <>
              <Brain size={20} /> Generate from AI
            </>
          )}
        </Button>
      </div>
      {/* Markdown Options */}
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
            <BtnUndo />
            <BtnRedo />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
