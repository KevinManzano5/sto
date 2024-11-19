import { Request, Response } from "express";

export class ProductController {
  private handleError = (error: any, res: Response) => {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal server error";

    return res.status(statusCode).json({ message });
  };

  public create = (req: Request, res: Response) => {
    res.json("Create");
  };

  public getAll = (req: Request, res: Response) => {
    res.json("Get All");
  };

  public get = (req: Request, res: Response) => {
    res.json("Get");
  };

  public update = (req: Request, res: Response) => {
    res.json("Udpate");
  };

  public delete = (req: Request, res: Response) => {
    res.json("Delete");
  };
}
