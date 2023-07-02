import React from "react";
import ShrinkCommit from "../Helpers/TextHelper";
import HandleDownload from "../Helpers/DownloadHelper";

const CommitTable = ({ filteredData }) => {
    return (
        <div className="p-2">
            <tbody>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Build</th>
                            <th>Download</th>
                            <th>Commits</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                    >
                                        #{item.buildNumber}
                                    </button>
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
                                        Download#{item.buildNumber}
                                    </button>
                                </td>
                                <td>
                                    <ul>
                                        {item.commits.map((commit, i) => (
                                            <li key={i}>
                                                <a href={commit.url}>{ShrinkCommit(commit.id)}</a> - {commit.message}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </tbody>
        </div>
    );
};

export default CommitTable;
