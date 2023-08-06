import React, { useState } from 'react';
import { Collapse, Nav, NavLink } from 'reactstrap';
import { BranchToWords } from "../Helpers/TextHelper";

const BuildExplorerNavigation = ({
    projects,
    branches,
    selectedProject,
    selectedBranch,
    handleProjectClick,
    handleBranchClick,
}) => {
    const [expandedProjects, setExpandedProjects] = useState(new Set());

    const toggleExpandedProject = (project) => {
        const updatedExpandedProjects = new Set(expandedProjects);

        if (updatedExpandedProjects.has(project)) {
            updatedExpandedProjects.delete(project);
        } else {
            updatedExpandedProjects.add(project);
        }

        setExpandedProjects(updatedExpandedProjects);
        handleProjectClick(project);
    };

    const renderBranchLinks = (project) => {
        return branches[project].map((branch) => (
            <li className="build-explorer-nav-link" key={branch}>
                <NavLink
                    onClick={() => handleBranchClick(branch, project)}
                    active={selectedBranch === branch && selectedProject === project}
                >
                    {BranchToWords(branch)}
                </NavLink>
            </li>
        ));
    };

    const renderProjectLinks = () => {
        return projects.map((project) => (
            <li key={project}>
                <NavLink
                    className="bg-secondary"
                    onClick={() => toggleExpandedProject(project)}
                >
                    {project}
                </NavLink>
                <Collapse isOpen={expandedProjects.has(project)} navbar={false}>
                    <ul>{renderBranchLinks(project)}</ul>
                </Collapse>
            </li>
        ));
    };

    return (
        <Nav pills vertical>
            <li>
                <NavLink
                    className="bg-info"
                    onClick={() => {
                        handleProjectClick("");
                        handleBranchClick("", "");
                    }}
                >
                    Projects
                </NavLink>
            </li>
            {renderProjectLinks()}
        </Nav>
    );
};

export default BuildExplorerNavigation;
