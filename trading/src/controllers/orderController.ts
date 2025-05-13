import { Response } from 'express';
import { OrderRequest } from '../models/OrderRequestModel';
import { cowswapService } from '../services/cowswapService';
import { nearintentService } from '../services/nearIntentService';
import { CowswapOrder, NearIntentsOrder } from '../models/OrderRequestModel';
import { OrderResponseModel } from '../models/OrderResponseModel';

// POST /api/order
export const createOrder = async (req: OrderRequest, res: Response): Promise<void> => {
  if (!req.data) {
    res.status(500);
    return;
  }

  try {
    let order: OrderResponseModel | null = null;
    if ('quote' in req.data) {
      order = await cowswapService.CreateOrder(req.data as CowswapOrder);
    } else {
      order = await nearintentService.CreateOrder(req.data as NearIntentsOrder);
    }
    if (!order) {
      res.status(400).json({
        success: false,
        message: "Failed to create order",
      });
      return;
    }
    res.status(201).json({
      success: true,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    console.error('Error in createOrder controller:', error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the order",
    });
  }
}; 