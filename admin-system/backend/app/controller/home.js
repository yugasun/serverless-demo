'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }

  async getAppConfig() {
    const { ctx, app } = this;
    ctx.body = app.config;
  }

  async login() {
    const { ctx, app, config } = this;
    const { service, helper } = ctx;
    const { username, password } = ctx.request.body;
    const user = await service.user.findByName(username);
    if (!user) {
      ctx.status = 403;
      ctx.body = {
        code: 403,
        message: 'Username or password wrong',
      };
    } else {
      if (user.password === helper.encryptPwd(password)) {
        ctx.status = 200;
        const token = app.jwt.sign({
          id: user.id,
          name: user.name,
          role: user.role.name,
          avatar: user.avatar,
        }, config.jwt.secret, {
          expiresIn: '1h',
        });
        try {

          await app.redis.set(`token_${user.id}`, token);
          ctx.body = {
            code: 0,
            message: 'Get token success',
            token,
          };
        } catch (e) {
          console.error(e);
          ctx.body = {
            code: 500,
            message: 'Server busy, please try again',
          };
        }
      } else {
        ctx.status = 403;
        ctx.body = {
          code: 403,
          message: 'Username or password wrong',
        };
      }
    }
  }

  async userInfo() {
    const { ctx } = this;
    const { user } = ctx.state;
    ctx.status = 200;
    ctx.body = {
      code: 0,
      data: user,
    };
  }

  async logout() {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = {
      code: 0,
      message: 'Logout success',
    };
  }

  async authingAuth() {
    const { ctx, app, config } = this;
    const { helper } = ctx;
    const authingConfig = config.authing;
    const { code } = ctx.query;
    try {
      const authRes = await ctx.curl('https://oauth.authing.cn/oauth/oidc/token', {
        // 必须指定 method
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: helper.stringify({
          code,
          client_id: authingConfig.appId,
          client_secret: authingConfig.appSecret,
          grant_type: 'authorization_code',
          redirect_uri: `${config.deployUrl}authing/auth`,
        }),
        // 明确告诉 HttpClient 以 JSON 格式处理返回的响应 body
        dataType: 'json',
      });

      const { access_token } = authRes.data;
      // token 换用户信息
      const userInfoRes = await ctx.curl(`https://users.authing.cn/oauth/oidc/user/userinfo?access_token=${access_token}`, {
        dataType: 'json',
      });

      const userInfo = userInfoRes.data;

      const username = userInfo.name || userInfo.email || userInfo.phone_number;
      const newUser = {
        name: username,
        avatar: userInfo.picture,
        email: userInfo.email,
        register_type: 'authing',
        phone_number: userInfo.phone_number,
        role_id: 2,
      };
      const regRes = await this.authingRegister(newUser);
      // console.log('regRes', regRes);
      const token = app.jwt.sign({
        id: regRes.id,
        name: regRes.name,
        role: 'editor',
        avatar: regRes.avatar,
      }, app.config.jwt.secret, {
        expiresIn: '1h',
      });
      await app.redis.set(`token_${regRes.id}`, token);

      ctx.redirect(`${app.config.authRedirectUrl}?token=${token}`);
    } catch (e) {
      ctx.body = {
        code: 403,
        message: 'Authing auth failed',
        error: e,
      };
      return;
    }
  }

  // authing user register
  async authingRegister(authingUser) {
    const { service } = this.ctx;
    const user = authingUser;
    user.password = '';
    // find same name user
    const exist = await service.user.findByName(user.name);
    if (!exist) {
      return service.user.create(authingUser);
    }
    return exist;
  }
}

module.exports = HomeController;
