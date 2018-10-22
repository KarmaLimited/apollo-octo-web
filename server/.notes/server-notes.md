deployed to:
up ->:
https://syaulcjsnd.execute-api.eu-west-1.amazonaws.com/

[**stage**](https://syaulcjsnd.execute-api.eu-west-1.amazonaws.com/staging/)

[**prod**](https://syaulcjsnd.execute-api.eu-west-1.amazonaws.com/production/)

faq:
Root fields define the available API operations
The 'node' field of a subscription is always null for DELETED-mutations

### PRISMA SETUP

```
mkdir database
touch database/prisma.yml
touch database/datamodel.graphql
```
must be -g installed: `npm install -g prisma` <br/>
Deploy and setup configs with: `prisma deploy` <br/>
then create token with: `prisma token` <br/>

Note: If you ever lose the endpoint, you can get access to it again by running `prisma info` in the terminal.

➜ prisma token<br/>
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJteS13ZWItc3RlZmFuQGRldiIsInJvbGVzIjpbImFkbWluIl19LCJpYXQiOjE1MzkyNTA1NzMsImV4cCI6MTUzOTg1NTM3M30.JABtk0dCPYXjnA55lejetnGWAMly4wSgm2TUcym_FzI

Written endpoint `https://eu1.prisma.sh/stefan-lachmann-e05219/my-web-stefan/dev` to prisma.yml

Creating stage dev for service my-web-stefan ✔
Deploying service `my-web-stefan` to stage `dev` to server `prisma-eu1` 

Changes:

  Link (Type)
  + Created type `Link`
  + Created field `id` of type `GraphQLID!`
  + Created field `createdAt` of type `DateTime!`
  + Created field `description` of type `String!`
  + Created field `url` of type `String!`
  + Created field `updatedAt` of type `DateTime!`

Your Prisma GraphQL database endpoint is live:
  HTTP:  https://eu1.prisma.sh/stefan-lachmann-e05219/my-web-stefan/dev
  WS:    wss://eu1.prisma.sh/stefan-lachmann-e05219/my-web-stefan/dev