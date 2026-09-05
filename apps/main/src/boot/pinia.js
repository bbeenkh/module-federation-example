import { boot } from "quasar/wrappers";
import { createPinia } from 'pinia';

// "async" is optional;
export default boot(async (ctx) => {
  const { app } = ctx;
  const pinia = createPinia();

  app.use(pinia);
});
