# Static Analysis Checks in CI/CD
### What is the purpose of CI/CD?
CI/CD's purpose is to automate QA checks in code. This can include formatting, test cases, and spell checks. This streamlines the development process, ensuring that each change is testing and check before deployment.

### How does automating style checks improve project quality?
By integrating style checks, it ensures that code is consistent across the code base. When there are many developers working on the same project it can be hard for all of them to consciously apply the same coing standards. Thus, the style checks will ensure consistency across the code base.

### What are some challenges with enforcing checks in CI/CD?
Some challenges are:
- Slower deployment time
    - Changes must satisfy checks before being merged
- Overly strict rules
    - Some rules may end up being restrictive to the code and hinder development
- Maintenance
    - As the code base grows, the rules must all remain up to date

### How do CI/CD pipelines differ between small projects and large teams?
In smaller projects you can expect one YAML file to test and few pipelines used to focus on speed and simplicity. Whereas in larger projects you can expect multiple pipelines with several workflows, as well as multiple tools in order to run a scalable and a reliable CI/CD pipeline.
