import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from "@/contect/ResumeInfoContext";
import { Loader } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RichTextEditor from "../RichTextEditor";

const PROMPT = `project titile: {projectTitle}, technologies used: {Technologies} , Depends on project title and technologies used in project, give me 5-7 bullet points for my project in resume.Use this format for generating the output ["•text,•text","•text,•text","•text,•text"]. And whenever you regenerate the output make sure to only generate based on the given projectTitle and technologies, don't explicitly change the projectTitle on your own `;
const Projects = () => {
  const [projectList, setProjectList] = useState([]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  // TODO: to make changes in ProjectPreview as it has hardcode data.
  const handleChange = (index, event) => {
    const newEntries = projectList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setProjectList(newEntries);
  };

  const AddNewProjects = () => {
    setProjectList([
      ...projectList,
      {
        title: "",
        technologies: "",
        livedemo: "",
        sourcecode: "",
        projectSummery: "",
      },
    ]);
  };

  const RemoveProjects = () => {
    setProjectList((projectList) => projectList.slice(0, -1));
  };

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = projectList.slice();
    newEntries[index][name] = e.target.value;
    setProjectList(newEntries);
  };

  useEffect(() => {
    // console.log(projectList);
    setResumeInfo({
      ...resumeInfo,
      projects: projectList,
    });
  }, [projectList]);

  const onSave = () => {};
  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Projects</h2>
        <p>Add Your Top Projects</p>
        <div>
          {projectList?.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-1 lg:grid-cols-2  gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label className="text-xs">Project Title</label>
                  <Input
                    name="title"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.title}
                  />
                </div>
                <div>
                  <label className="text-xs">Technologies Used</label>
                  <Input
                    name="technologies"
                    required
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.technologies}
                    placeholder="html, css, js, ......"
                  />
                </div>
                <div>
                  <label className="text-xs">Live Demo</label>
                  <Textarea
                    name="livedemo"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.livedemo}
                  />
                </div>
                <div>
                  <label className="text-xs">Source Code</label>
                  <Textarea
                    name="sourcecode"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.sourcecode}
                  />
                </div>
                <div className="col-span-2">
                  {/* Project Summery */}
                  {/* <Textarea
                    name="projectSummery"
                    onChange={(event) => handleChange(index, event)}
                    defaultValue={item?.projectSummery}
                  /> */}
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.projectSummery}
                    onRichTextEditorChange={(event) =>
                      handleRichTextEditor(event, "projectSummery", index)
                    }
                    userPrompt={PROMPT}
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
              onClick={AddNewProjects}
              variant="outline"
              className="text-primary text-wrap"
            >
              + Add More Experience
            </Button>
            {projectList.length > 0 ? (
              <Button
                onClick={RemoveProjects}
                variant="outline"
                className="text-red-600"
              >
                - Remove
              </Button>
            ) : null}
          </div>

          {projectList.length > 0 ? (
            <Button disabled={loading} onClick={() => onSave()}>
              {loading ? <Loader className="animate-spin" /> : "Save"}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Projects;
