import React from "react";
import ShrinkCommit from "../Helpers/TextHelper";
import HandleDownload from "../Helpers/DownloadHelper";
import { BranchToWords } from "../Helpers/TextHelper";

const CommitTable = ({ filteredData, projectName, branchName }) => {
    return (
        <div className="p-2">
            <h4>{projectName} - {BranchToWords(branchName)}</h4>
            <table className="table">
                <thead>
                    <tr className="table-primary">
                        <th scope="col">Build</th>
                        <th scope="col">Commits</th>
                        <th scope="col">Download</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr className="table-active" key={index}>
                            <td className="td-doc-key">
                                <td>
                                    <button className="btn btn-primary">
                                        #{item.buildNumber}
                                    </button>
                                </td>
                            </td>
                            <td className="td-doc-key">
                                <td>
                                    {item.commits.map((commit, i) => (
                                        <li key={i}>
                                            <a href={commit.url}>{ShrinkCommit(commit.id)}</a> -{" "}
                                            {commit.message}
                                        </li>
                                    ))}
                                </td>
                            </td>
                            <td className="td-doc-key">
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
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommitTable;
