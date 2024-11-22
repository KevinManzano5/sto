import { NextFunction, Request, Response } from "express";

export class RoleMiddleware {
  validateAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.body.userRole !== "ADMIN")
        return res.status(403).json({
          message: "You do not have permissions to perform this action",
        });

      next();
    } catch (error: any) {
      console.error({ error: JSON.stringify(error) });

      return res.status(500).json({ message: "Internal server error" });
    }
  };
}
