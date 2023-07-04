export function ShrinkCommit(commit) {
    return commit.substring(0,7);
}

export function BranchToWords(branch) {
    switch (branch) {
        case "main":
        case "master":
            return "Release";
        case "dev":
            return "Developmental";
        default:
            return branch;
    }
}

export function TimestampToDate(timestamp) {
    const date = new Date(timestamp).toISOString().split('T')[0];
    return date;
}

export default ShrinkCommit;
