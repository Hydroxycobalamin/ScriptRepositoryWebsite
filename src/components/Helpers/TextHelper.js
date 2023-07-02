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


export default ShrinkCommit;
