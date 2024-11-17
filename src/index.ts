import { envs } from "./config";
import { AppRouter } from "./presentation/router";
import { Server } from "./presentation/server";

const main = () => {
  const server = new Server({
    apiVersion: envs.API_VERSION,
    port: envs.PORT,
    router: AppRouter.routes,
  });

  server.start();
};

(() => {
  main();
})();
