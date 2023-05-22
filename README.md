# 基于NestJS和Vue的问答平台——后端
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>


```bash
安装依赖 pnpm i
启动项目 pnpm run start
or
热更新 pnpm run start:dev
```

src\common\envs\development.env
```env
PORT=3000

DATABASE_HOST=localhost
DATABASE_NAME=question
DATABASE_USER=root
DATABASE_PASSWORD=root
DATABASE_PORT=3306

JWT_KEY=dev
JWT_EXPIRES=7d

```
项目启动后，typeorm会自动根据各模块中的实体类创建数据表及其表间关系

⚠️由于后台管理系统暂未开发，所以启动新项目时需要前往board表手动创建板块数据