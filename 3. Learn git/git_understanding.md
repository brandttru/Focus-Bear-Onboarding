# Git Concepts: Staging vs. Committing
### What is the difference between staging and committing?
Staging - Marking changes (file changes, deleted files, etc) to be uploaded in the next commit

Commiting - Uploading the currently staged changes to the Git repository.

### Experiment with adding and committing files in your repo using A Git desktop client (e.g., GitHub Desktop, VS Code Git integration).
I normally commit using VS Code, where I typically "Commit and Push" to commit all the changes I currently made. For me, this is easier than working across different files and staging changes that I want to commit.

### Why does Git separate these two steps?
This makes it so that users can easily separate what changes have been made per commit and makes it easier to define in the commit message.

### When would you want to stage changes without committing?
A recent example of mine was when I was working on an assignment and after finishing a task I started another. However, I found an issue with the task I just finished and went back to fix it. If I then commit all my files I would have two files from two different tasks in the same commit and committing them together would make it harder to track the history of them. As such, I staged one and committed that to ensure a clear divide between the commits and what changes have been made within them.
