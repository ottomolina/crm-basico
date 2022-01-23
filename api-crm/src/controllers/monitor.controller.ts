import { Request, Response } from 'express';

export const monitor = async(req: Request, res: Response) => {
    const name = 'backend-crm';
    const version = '1.0.0';

    res.status(200).json({
        name, version
    });
}

