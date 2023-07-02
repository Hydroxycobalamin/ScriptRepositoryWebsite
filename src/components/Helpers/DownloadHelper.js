import download from "downloadjs";

export const HandleDownload = async (projectName, branchName, build) => {
    const res = await fetch(`/download/${projectName}/${branchName}/${build}`);
    const blob = await res.blob();
    const filename = res.headers
        .get("Content-Disposition")
        .split("filename=")[1]
        .replace(/"/g, "");
    console.log(filename);
    console.log(res.headers.get("Content-Disposition"));
    download(blob, filename);
};

export default HandleDownload;