import React, { useEffect, useState, useMemo } from "react";
import { ScrollHelper } from "./Helpers/ScrollHelper.js";
import CommitTable from "./Objects/CommitTable.jsx";
import BuildExplorerNavigation from "./Objects/BuildExplorerNavigation.jsx";

const LOADING_TEXT = "Loading...";
const ERROR_TEXT = "Failed to fetch data. Please try again later.";

const AllData = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProject, setSelectedProject] = useState("");
    const [selectedBranch, setSelectedBranch] = useState("");
    const [projects, setProjects] = useState([]);
    const [branches, setBranches] = useState({});

    useEffect(() => {
        fetchAllData();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            ScrollHelper();
        }
    }, [isLoading]);

    const fetchAllData = async () => {
        try {
            const response = await fetch("/data");
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const responseData = await response.json();
            const formattedData = formatData(responseData);
            setData(formattedData);
            setIsLoading(false);
            setProjects(getUniqueProjects(formattedData));
        } catch (error) {
            console.error("Error fetching all data:", error);
            setError(ERROR_TEXT);
            setIsLoading(false);
        }
    };

    const formatData = (responseData) => {
        const formattedData = [];
        const projectBranches = {};

        for (const projectName in responseData.returnMessage) {
            const project = responseData.returnMessage[projectName];
            const branches = Object.keys(project);

            branches.forEach((branchName) => {
                const builds = project[branchName].builds;

                for (const buildNumber in builds) {
                    const build = builds[buildNumber];
                    const formattedBuild = {
                        projectName,
                        branchName,
                        buildNumber: build.build,
                        download: build.download,
                        commits: build.commits,
                        downloads: build.downloads,
                        md5: build.md5,
                        timestamp: build.timestamp,
                    };
                    formattedData.push(formattedBuild);
                }
            });

            projectBranches[projectName] = branches;
        }

        setBranches(projectBranches);
        return formattedData;
    };

    const getUniqueProjects = (data) => {
        return [...new Set(data.map((item) => item.projectName))];
    };

    const handleProjectSelection = (selectedProject) => {
        setSelectedProject(selectedProject);
        setSelectedBranch("");
    };

    const handleBranchSelection = (selectedBranch, selectedProject) => {
        setSelectedBranch(selectedBranch);
        setSelectedProject(selectedProject);
    };

    const MemoizedCommitTable = ({ project, branch }) => {
        const filteredData = useMemo(() => {
            return getFilteredData(project, branch);
        }, [project, branch]);
    
        return (
            <CommitTable
                key={`${project}-${branch}`}
                filteredData={filteredData}
                projectName={project}
                branchName={branch}
            />
        );
    };
    
    const renderCommitTables = () => {
        if (selectedProject) {
            if (selectedBranch) {
                return (
                    <MemoizedCommitTable
                        project={selectedProject}
                        branch={selectedBranch}
                    />
                );
            } else {
                return branches[selectedProject].map((branch) => (
                    <MemoizedCommitTable
                        key={`${selectedProject}-${branch}`}
                        project={selectedProject}
                        branch={branch}
                    />
                ));
            }
        } else {
            return projects.flatMap((project) =>
                branches[project].map((branch) => (
                    <MemoizedCommitTable
                        key={`${project}-${branch}`}
                        project={project}
                        branch={branch}
                    />
                ))
            );
        }
    };

    const getFilteredData = (project, branch) => {
        return data.filter(
            (item) =>
                (!project || item.projectName === project) &&
                (!branch || item.branchName === branch)
        );
    };

    return (
        <React.Fragment>
            <div className="jumbotron">
                <center>
                    <h3>Script Repository Website</h3>
                    <p>
                        A ScriptRepository for Denizen Scripts. Looking for{" "}
                        <a href="https://denizenscript.com/">Denizen</a> instead?
                    </p>
                </center>
            </div>
            <div className="d-flex flex-row">
                <div className="col-3">
                    <BuildExplorerNavigation
                        projects={projects}
                        branches={branches}
                        selectedProject={selectedProject}
                        selectedBranch={selectedBranch}
                        handleProjectClick={handleProjectSelection}
                        handleBranchClick={handleBranchSelection}
                    />
                </div>
                <div className="container col-9">
                    <center>
                    {isLoading ? <div className="status">{LOADING_TEXT}</div> : error ? <div className="status">{error}</div> : renderCommitTables()}
                    </center>
                </div>
            </div>
        </React.Fragment>
    );
};

export default AllData;

