import React from "react";
import ShrinkCommit from "../Helpers/TextHelper";
import HandleDownload from "../Helpers/DownloadHelper";
import { BranchToWords, TimestampToDate } from "../Helpers/TextHelper";

const CommitTable = ({ filteredData, projectName, branchName }) => {
    return (
        <div className="p-2">
            <h4>{projectName} - {BranchToWords(branchName)}</h4>
            <table className="table table-hover">
                <thead>
                    <tr className="table-primary">
                        <th width="5%">Build</th>
                        <th width="47%">Commits</th>
                        <th width="25%">MD5</th>
                        <th width="8%">Time</th>
                        <th width="10%">Download</th>
                        <th width="5%">Count</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData
                        .sort((a, b) => b.buildNumber - a.buildNumber)
                        .map((item, index) => (
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
                            <td className="md5">
                                {item.md5 || 0}
                            </td>
                            <td>
                                {TimestampToDate(item.timestamp)}
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CommitTable;
