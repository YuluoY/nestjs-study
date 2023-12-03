import { resolve } from 'path';

export const config = {
  ormconfig: {
    type: 'postgres',
    host: process.env.HOST,
    port: process.env.PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE_NAME,
    entities: [resolve(__dirname, '/**/*.entity{.ts,.js}')],
    synchronize: true, // 是否自动将实体类同步到数据库，生成环境下不建议使用
    retryDelay: 500, // 重试连接数据库的间隔
    retryAttempts: 1, // 重连的次数
    autoLoadEntities: true, // 自动加载实体，forFeature()方法注册的每个实体都将自动添加到配置对象的实体类中
    logging: true,
    maxQueryExecutionTime: 1,
  },
};
