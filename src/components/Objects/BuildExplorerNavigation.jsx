import React, { useState } from 'react';
import { Collapse, Nav, NavItem, NavLink } from 'reactstrap';


const BuildExplorerNavigation = (props) => {
  const { projects, branches, selectedProject, selectedBranch, handleProjectClick, handleBranchClick } = props;
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

  return (
    <Nav pills vertical>
      <NavItem>
        <NavLink disabled className="bg-info">Projects</NavLink>
      </NavItem>
      {projects.map((project) => (
        <NavItem key={project}>
          <NavLink
            className="bg-secondary"
            onClick={() => handleProjectItemClick(project)}
          >
            {project}
          </NavLink>
          <Collapse isOpen={expandedProjects.has(project)} navbar={false}>
            {branches[project].map((branch) => (
              <NavItem key={branch}>
                <NavLink
                  onClick={() => handleBranchItemClick(branch, project)}
                  active={selectedBranch === branch && selectedProject === project}
                >
                  {branch}
                </NavLink>
              </NavItem>
            ))}
          </Collapse>
        </NavItem>
      ))}
    </Nav>
  );
};

export default BuildExplorerNavigation;
