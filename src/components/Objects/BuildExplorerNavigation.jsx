import React, { useState } from 'react';
import { Collapse, Nav, NavLink } from 'reactstrap';
import { BranchToWords } from "../Helpers/TextHelper";

const BuildExplorerNavigation = (props) => {
  const {
    projects,
    branches,
    selectedProject,
    selectedBranch,
    handleProjectClick,
    handleBranchClick,
  } = props;

  const [expandedProjects, setExpandedProjects] = useState(new Set());

  const handleProjectItemClick = (project) => {
    const isExpanded = expandedProjects.has(project);
    const updatedExpandedProjects = new Set(expandedProjects);

    if (isExpanded) {
      updatedExpandedProjects.delete(project);
    } else {
      updatedExpandedProjects.add(project);
    }

    setExpandedProjects(updatedExpandedProjects);
    handleProjectClick(project);
  };

  const handleBranchItemClick = (branch, project) => {
    handleBranchClick(branch, project);
  };

  const handleShowAllProjects = () => {
    handleProjectClick("");
    handleBranchClick("", "");
  };

  return (
    <Nav pills vertical>
      <li>
        <NavLink
          className="bg-info"
          onClick={() => handleShowAllProjects()}
        >
          Projects
        </NavLink>
      </li>
      {projects
        .sort((a, b) => a.localeCompare(b))
        .map((project) => (
        <li key={project}>
          <NavLink
            className="bg-secondary"
            onClick={() => handleProjectItemClick(project)}
          >
            {project}
          </NavLink>
          <Collapse isOpen={expandedProjects.has(project)} navbar={false}>
            <ul>
              {branches[project].map((branch) => (
                <li className="build-explorer-nav-link" key={branch}>
                  <NavLink
                    onClick={() => handleBranchItemClick(branch, project)}
                    active={selectedBranch === branch && selectedProject === project}
                  >
                    {BranchToWords(branch)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </Collapse>
        </li>
      ))}
    </Nav>
  );
};

export default BuildExplorerNavigation;
