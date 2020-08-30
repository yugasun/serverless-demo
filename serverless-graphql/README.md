# serverless-graphql

[Demo](https://service-qgzgjjwo-1251556596.gz.apigw.tencentcs.com/)

This example shows how to implement a **GraphQL server with an email-password-based authentication workflow and authentication rules** based on [graphql-yoga](https://github.com/prisma/graphql-yoga) & [graphql-shield](https://github.com/maticzav/graphql-shield).

## How to use

### Prepare

Before all below steps, you should install
[Serverless Framework](https://www.github.com/serverless/serverless) globally:

```console
$ npm i serverless -g
```

### Create project

```
$ serverless create --template-url https://github.com/yugasun/serverless-demo/tree/master/serverless-graphql
```

Install npm dependencies:

```
$ cd serverless-graphql
$ npm install
```

### Develop locally

Launch your GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API of your GraphQL server in a [GraphQL Playground](https://github.com/prisma/graphql-playground).

### Using the GraphQL API

The schema that specifies the API operations of your GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API using the GraphQL Playground.

Feel free to adjust any operation by adding or removing fields. The GraphQL Playground helps you with its auto-completion and query validation features.

#### Retrieve all published posts and their authors

```graphql
query {
  feed {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

<Details><Summary><strong>See more API operations</strong></Summary>

#### Register a new user

You can send the following mutation in the Playground to sign up a new user and retrieve an authentication token for them:

```graphql
mutation {
  signup(name: "yugasun", email: "yuga_sun@163.com", password: "graphql") {
    token
  }
}
```

#### Log in an existing user

This mutation will log in an existing user by requesting a new authentication token for them:

```graphql
mutation {
  login(email: "yuga_sun@163.com", password: "graphql") {
    token
  }
}
```

#### Check whether a user is currently logged in with the `me` query

For this query, you need to make sure a valid authentication token is sent along with the `Bearer`-prefix in the `Authorization` header of the request:

```json
{
  "Authorization": "Bearer __YOUR_TOKEN__"
}
```

With a real token, this looks similar to this:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTU4MjYzMTIwMH0.ets60PicouiBKRp1T7_W8s0rOgAFKn6YBc6Q66ko9n4"
}
```

Once you've set the header, you can send the following query to check whether the token is valid:

```graphql
{
  me {
    id
    name
    email
  }
}
```

#### Create a new draft

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground.

```graphql
mutation {
  createDraft(title: "Serverless Graphql", content: "https://yugasun.com") {
    id
    published
  }
}
```

#### Publish an existing draft

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground. The authentication token must belong to the user who created the post.

```graphql
mutation {
  publish(id: __POST_ID__) {
    id
    published
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

#### Search for posts with a specific title or content

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground.

```graphql
{
  filterPosts(searchString: "graphql") {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

#### Retrieve a single post

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground.

```graphql
{
  post(id: __POST_ID__) {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

#### Delete a post

You need to be logged in for this query to work, i.e. an authentication token that was retrieved through a `signup` or `login` mutation needs to be added to the `Authorization` header in the GraphQL Playground. The authentication token must belong to the user who created the post.

```graphql
mutation {
  deletePost(id: __POST_ID__) {
    id
  }
}
```

> **Note**: You need to replace the `__POST_ID__`-placeholder with an actual `id` from a `Post` item. You can find one e.g. using the `filterPosts`-query.

</Details>

## Deploy to Tencent Cloud

This project using serverless component [tencnet-scf](https://github.com/serverless-components/tencent-scf) and [tencnet-apigateway](https://github.com/serverless-components/tencent-apigateway) to deploy.

### Create .env file (optional)

In project root, create the following simple boilerplate:

```bash
$ touch .env           # your Tencent api keys
```

Add the access keys of a [Tencent CAM Role](https://console.cloud.tencent.com/cam/capi) with `AdministratorAccess` in the `.env` file, using this format:

```
# .env
TENCENT_SECRET_ID=XXX
TENCENT_SECRET_KEY=XXX
```

If you don't have a Tencent Cloud account, you could [sign up](https://intl.cloud.tencent.com/register) first

### Configure serverless.yml

```yaml
# serverless.yml
app: serverless-graphql
org: slsplus
stage: dev
component: scf
name: GraphqlServerScf

inputs:
  src: ./
  name: serverless-graphql
  region: ap-guangzhou
  handler: app.handler
  description: serverless graphql function
  memorySize: 128
  timeout: 30
```

Create api gateway config `apigw/serverless.yml`:

```yaml
app: serverless-graphql
org: slsplus
stage: dev
component: apigateway
name: GraphqlServerApi

inputs:
  region: ap-guangzhou
  protocols:
    - http
    - https
  serviceName: serverless_graphql
  description: serverless graphql api gateway
  environment: release
  endpoints:
    - path: /
      method: ANY
      function:
        functionName: ${output:${stage}:${app}:GraphqlServerScf.functionName}
        isIntegratedResponse: true
```

### Run Deploy

```bash
$ npm run deploy
```

### Remove

```bash
$ npm run remove
```

## Connect to database

This project using mock data for graphql return, so in your real project, you can change this `TODO` to database handlers, like below:

```js
// before
t.field('me', {
  type: 'User',
  nullable: true,
  resolve: (parent, args, ctx) => {
    const userId = getUserId(ctx)
    // TODO: handle your data with database, below is a mock data
    return {
      id: userId,
      name: 'yugasun',
      email: 'yuga_sun@163.com',
    }
  },
})

// after
t.field('me', {
  type: 'User',
  nullable: true,
  resolve: (parent, args, ctx) => {
    const userId = getUserId(ctx)
    const user = await db.find({where: {id: userId}});
    return user
  },
})
```

## License

MIT, Copyright (c) 2019 Yuga Sun
