# Git Concepts: Staging vs. Committing
## Tasks
### Research the difference between staging and committing.
Staging - Select what changes we want in our next commit
Commit - Save staged changes to the cloud

### Experiment with adding and committing files in your repo using A Git desktop client (e.g., GitHub Desktop, VS Code Git integration).
I normally commit using VS Code, where I typically "Commit and Push" to commit all the changes I currently made. For me, this is easier than working across different files and staging changes that I want to commit.

## Reflection
### What is the difference between staging and committing?
Staging - Marking changes (file changes, deleted files, etc) to be uploaded in the next commit

Commiting - Uploading the currently staged changes to the Git repository.

### Why does Git separate these two steps?
This makes it so that users can easily separate what changes have been made per commit and makes it easier to define in the commit message.

### When would you want to stage changes without committing?
A recent example of mine was when I was working on an assignment and after finishing a task I started another. However, I found an issue with the task I just finished and went back to fix it. If I then commit all my files I would have two files from two different tasks in the same commit and committing them together would make it harder to track the history of them. As such, I staged one and committed that to ensure a clear divide between the commits and what changes have been made within them.

# Creating & Reviewing Pull Requests
## Tasks
### Research what a Pull Request (PR) is and why it’s used.
PR is a request to merge code changes from one branch into another branch. It is used as a buffer before actually merging changes and allows teams to code review, enable CI/CD actions such as linting, document changes and bug fixing.

### Open a Pull Request on GitHub
I created a [PR](https://github.com/brandttru/Focus-Bear-Onboarding/pull/80)

## Reflection
### Why are PRs important in a team workflow?
PRs are especially important because people will be working in different branches at different rates. If we were free to merge branches whenever we wanted to then there would be likely chance of merge conflict on top of different approaches to development, leading to inconsistencies in code. By having PRs code can be reviewed before merge ensuring things such as code correctness, consistency and quality. 

### What makes a well-structured PR?
A well structured PR will have a clear and specific title, concise and informative description that includes context such as the problem, approach, fix and screenshots. Other things such as Asignees, Labels and test coverage will depend on the structure that is enforced.

### What did you learn from reviewing an open-source PR?
I learnt that PRs are sometimes rather small. I had the misconception that a PR be raised when a large feature or bug was fixed. But going through the public PRs of React shows that more often than not PRs are rather small, featuring a couple commits and less than 100 lines changed.