# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

# Project Reference

- https://cdkworkshop.com/20-typescript/70-advanced-topics/200-pipelines/3000-new-pipeline.html

Github Repo CRUD

Reference Docs - https://docs.github.com/en/rest/branches/branches?apiVersion=2022-11-28#get-a-branch

Get Branch

https://api.github.com/repos/Geranimo/amplify-todo-app/branches/main

Creating a new branch is via the reference endpoint in Github
Document - https://docs.github.com/en/rest/git/refs?apiVersion=2022-11-28#create-a-reference 

curl https://api.github.com/repos/Geranimo/amplify-todo-app/git/refs
-d {"ref":"refs/heads/test_feature_2","sha":"355061341e3dbcddf64f97877427d2995a6a09a8"}


Deleting a branch 

Delete -  https://api.github.com/repos/Geranimo/amplify-todo-app/git/refs/heads/test1

**Note - The :ref in the URL must be formatted as heads/<branch name> for branches** 
 create pr 
-https://docs.github.com/en/rest/pulls/pulls?apiVersion=2022-11-28#create-a-pull-request

create commit object
https://git-scm.com/book/en/v2/Git-Internals-Git-Objects
https://docs.github.com/en/graphql/reference/mutations#createcommitonbranch

https://docs.github.com/en/graphql/overview/explorer

https://stackoverflow.com/questions/72836597/how-to-create-new-commit-with-the-github-graphql-api
https://iq.opengenus.org/api-requests-in-java/#apirequestforfileuploadorreupload

Escaping the JSON when framing the query for graphql - https://library.humio.com/logscale-graphql-reference/api-graphql-curl.html