import express, { Router } from "express";

interface Options {
  apiVersion: string;
  port: number;
  router: Router;
}

export class Server {
  private app = express();
  private readonly apiVersion: string;
  private readonly port: number;
  private readonly router: Router;

  constructor({ apiVersion, port, router }: Options) {
    this.apiVersion = apiVersion;
    this.port = port;
    this.router = router;
  }

  start = async () => {
    // * Middlewares
    this.app.use(express.json());

    // * Routes
    this.app.use(`/api/${this.apiVersion}`, this.router);

    // * Start server
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  };
}
