import React from "react";
import ShrinkCommit from "../Helpers/TextHelper";
import HandleDownload from "../Helpers/DownloadHelper";
import { BranchToWords } from "../Helpers/TextHelper";

const CommitTable = ({ filteredData, projectName, branchName }) => {
    return (
        <div className="p-2">
            <h4>{projectName} - {BranchToWords(branchName)}</h4>
            <table className="table table-hover">
                <thead>
                    <tr className="table-primary">
                        <th width="200">Build</th>
                        <th width="200">Commits</th>
                        <th width="200">Download</th>
                        <th width="200">Count</th>
                        <th width="200">MD5</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr className="table-active" key={index}>
                            <td>
                                <button className="btn btn-primary">
                                    #{item.buildNumber}
                                </button>
                            </td>
                            <td>
                                {item.commits.map((commit, i) => (
                                    <li key={i}>
                                        <a href={commit.url}>{ShrinkCommit(commit.id)}</a> -{" "}
                                        {commit.message}
                                    </li>
                                ))}
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() =>
                                        HandleDownload(
                                            item.projectName,
                                            item.branchName,
                                            item.buildNumber
                                        )
                                    }
                                >
                                    Download
                                </button>
                            </td>
                            <td>
                                {item.downloads || 0}
                            </td>
                            <td>
                                {item.md5 || 0}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommitTable;
