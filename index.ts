import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import { CustomErrorMessageFunction, query, body, validationResults } from "koa-req-validation";

const app: Koa = new Koa();
/*const router: Router = new Router();*/

const welcomeAPI = async (ctx: RouterContext, next: any) => {
  ctx.body = {
    msg: "Welcome to blog API"
  };
  await next();
}

const router: Router = new Router();
/*const customErrorMessage: CustomErrorMessageFunction = (
  _ctx: RouterContext,
  value: string
) => {
  return (
    `The name has to be between 3 and 20 ` +
    `characters long but received length ${value.length}`
  );
};

const validatorName = [
  body("name").isLength({ min: 3 }).withMessage(customErrorMessage).build(),
  body("id").isInt({ min: 10000, max: 20000 }).build()
];

router.get('/',
  query("name")
    .isLength({ min: 3 }).optional()
    .withMessage(customErrorMessage)
    .build(),
  async (ctx: RouterContext, next: any) => {
    const result = validationResults(ctx);
    if (result.hasErrors()) {
      ctx.status = 422;
      ctx.body = { err: result.mapped() }
    } else {
      ctx.body = { msg: `Hello world! ${ctx.query.name}` };
    }
    await next();
  });*/

/*router.post('/', ...validatorName, async (ctx: RouterContext, next: any) => {
  const result = validationResults(ctx)
  if (result.hasErrors()) {
    ctx.status = 422;
    ctx.body = { err: result.mapped() }
  } else {
    const data: any = ctx.request.body;
    ctx.body = { respname: data.name };
  }
  await next();
});*/

router.get('/api/v1', welcomeAPI);
app.use(json());
app.use(logger());
app.use(bodyParser());
app.use(router.
        allowedMethods());
app.use(async (ctx: RouterContext, next: any) => {
  try {
    await next()
    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = { err: "No such endpoint existed" }
    }
  } catch (err: any) {
    ctx.body = { err: err }
  }
})

app.listen(10888, () => {
  console.log("Koa Started");
})