import { MikroORM } from '@mikro-orm/core';
import { __prod__, PORT } from './constants';
import mikroOrmConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  
  await orm.getMigrator().up();
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false
    })
  });

  apolloServer.applyMiddleware({ app });

  app.listen(PORT, () => {
    console.log(`server has started on the port: ${PORT}`);
  });
  app.get('/', (_, res) => {
    res.send('hello');
  })
};

main().catch(err => {
    console.error(err);
});
