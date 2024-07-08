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

      <div className="my-5">
        <h2
          className="text-sm font-bold"
          style={{
            color: resumeInfo?.themeColor,
          }}
        >
          Expense Tracker
        </h2>

        <h2 className="text-xs flex justify-end">Live Demo | Source Code</h2>

        <div
          className="text-xs my-2"
          dangerouslySetInnerHTML={{ __html: "project description..." }}
        />
      </div>
    </div>
  );
};

export default ProjectsPreview;
