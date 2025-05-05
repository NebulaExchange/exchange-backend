import { Request, Response } from 'express';

// GET /api/example
export const getExample = (req: Request, res: Response): void => {
  res.status(200).json({
    success: true,
    message: 'Example endpoint working correctly!',
    data: {
      items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
      ]
    }
  });
};