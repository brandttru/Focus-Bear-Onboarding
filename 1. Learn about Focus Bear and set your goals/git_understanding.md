# Merge Conflicts & Conflict Resolution
### Research what causes merge conflicts in Git.
In a situation where you do some work in a branch and the branch is updated before you can merge then there will be a merge conflict if the same file has been updated.
i.e. you are working in an outdated branch.

### Create a merge conflict in your test repo
This was done by
1. Created a file in main called test_conflict.md with some text and commited it
2. Created a branch called test
3. Edited the file by changing some text and committed
4. Merged test into main
A merge conflict will be present now
5. Resolve conflicts in VS Code by accepting either version of test_conflict.md
6. Continue and merge the two branches

### What caused the conflict?
The conflict was caused by the two branches having differing text in test_conflict.md, as such git did not know which one I wanted in the repo.

### How did you resolve it?
Using VS Code in built in conflict resolution I accepted the changes in main, merged the branches locally and then synced them to the cloud.

![alt text](../images/merge_conflict.png)

### What did you learn?
It is important to know how to resolve conflicts as it is not uncommon to experience conflicts. The overall process of merge conflicts was not new to me and I was able to navigate through the through VS Code confliction resolution as I had prior experience with it. In the future I will continue to use my knowledge of merge conflicts to prevent them from happening and resolve them in case they do happen.