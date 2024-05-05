import { getRouterParams } from "h3";
import { getValidatedRouterParams } from "h3";
import { createApp, createRouter, defineEventHandler } from "h3";
import { object, string } from 'myzod'

export const app = createApp();

const router = createRouter();
app.use(router);

const validator = object({
  id: string(),
});

router.get(
  "/:id",
  defineEventHandler(async (event) => {
    console.log(validator.parse(event.context.params))

    try {
      const params = await getValidatedRouterParams(event, (data) => validator.parse(data))
      console.log('validated', params)
      return params;
    } catch (error) {
      console.error(error)
    }

    return event;
  }),
);
