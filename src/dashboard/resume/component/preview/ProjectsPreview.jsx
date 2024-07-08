import React from "react";

const ProjectsPreview = ({ resumeInfo }) => {
  return (
    <div className="my-6">
      <h2
        className="text-center font-bold text-sm mb-2"
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Projects
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />

      {resumeInfo?.projects?.map((item, index) => (
        <div key={index} className="my-5">
          <h2
            className="text-sm font-bold"
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {item?.title}
          </h2>

          <h2 className="text-xs flex justify-end items-center text-center">
            <div
              className="text-xs my-2"
              dangerouslySetInnerHTML={{ __html: item?.livedemo }}
            />
            👈👉
            <div
              className="text-xs my-2"
              dangerouslySetInnerHTML={{ __html: item?.sourcecode }}
            />
          </h2>

          <div
            className="text-xs my-2"
            dangerouslySetInnerHTML={{ __html: item?.projectSummery }}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectsPreview;
