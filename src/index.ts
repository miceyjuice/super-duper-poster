import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import { Post } from './entities/Post';
import mikroOrmConfig from './mikro-orm.config';

const main = async () => {
  console.log(__dirname)
  const orm = await MikroORM.init(mikroOrmConfig);

  const post = orm.em.create(Post, {title: 'my first post'});
  await orm.em.persistAndFlush(post);
};

main().catch(err => {
    console.error(err);
});
