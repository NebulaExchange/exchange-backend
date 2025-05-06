import { Request, Response, NextFunction } from "express";
import { QuoteRequest, QuoteRequestModel } from "../models/QuoteRequestModel";

export const validateQuoteRequest = (req: QuoteRequest, res: Response, next: NextFunction): void => {
  try {
    // Create model from request body
    const requestData = req.body as QuoteRequestModel;
    
    // Perform validation (using a validation library or custom logic)
    if (!isValid(requestData)) {
      res.status(400).json({
        success: false,
        message: 'Invalid quote request data',
        errors: getValidationErrors(requestData)
      });
      return;
    }
    
    // Attach the validated data to the request object
    req.data = requestData;
    next();
  } catch (error: unknown) {
    res.status(500).json({
      success: false,
      message: 'Request validation failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Example validation function - replace with your actual validation
function isValid(data: QuoteRequestModel): boolean {
  // Implement your validation logic here
  return !!(data && data.account);
}

// Helper function to get validation errors
function getValidationErrors(data: any): object {
  const errors: Record<string, string> = {};
  
  if (!data.account) errors.account = 'account is missing';
  
  return errors;
}