import { Request } from 'express';
import { OrderCreation } from '@cowprotocol/cow-sdk';
import { SubmitDepositTxRequest } from '@defuse-protocol/one-click-sdk-typescript';

export type CowswapOrder = OrderCreation; 
export type NearIntentsOrder = SubmitDepositTxRequest;
export type OrderRequestModel = CowswapOrder | NearIntentsOrder;

export interface OrderRequest extends Request {
    data?: OrderRequestModel;
}

// Determine if the order is a CowswapOrder by checking key properties
export const isCowswapOrder = (order: any): order is CowswapOrder => {
    return (
        order &&
        typeof order === 'object' &&
        'sellToken' in order &&
        'buyToken' in order &&
        'sellAmount' in order &&
        'buyAmount' in order
    );
};

// Determine if the order is a NearIntentsOrder by checking key properties
export const isNearIntentsOrder = (order: any): order is NearIntentsOrder => {
    return (
        order &&
        typeof order === 'object' &&
        'txHash' in order &&
        'depositAddress' in order
    );
};

// Check if the order is valid
export const isValid = (order: OrderRequestModel): boolean => {
    return getValidationErrors(order).length === 0;
};

// Get validation errors for the order
export const getValidationErrors = (order: OrderRequestModel): string[] => {
    const errors: string[] = [];

    if (!order || typeof order !== 'object') {
        errors.push('Order is invalid or not an object');
        return errors;
    }

    if (isCowswapOrder(order)) {
        // Validate CowswapOrder
        if (!order.sellToken) errors.push('sellToken is required');
        if (!order.buyToken) errors.push('buyToken is required');
        if (!order.sellAmount) errors.push('sellAmount is required');
        if (!order.buyAmount) errors.push('buyAmount is required');
        if (order.validTo === undefined) errors.push('validTo is required');
        if (!order.feeAmount) errors.push('feeAmount is required');
        if (!order.kind) errors.push('kind is required');
        if (order.partiallyFillable === undefined) errors.push('partiallyFillable is required');
        if (!order.signingScheme) errors.push('signingScheme is required');
        if (!order.signature) errors.push('signature is required');
        if (!order.appData) errors.push('appData is required');
    } else if (isNearIntentsOrder(order)) {
        // Validate NearIntentsOrder
        if (!order.txHash) errors.push('txHash is required');
        if (!order.depositAddress) errors.push('depositAddress is required');
    } else {
        errors.push('Unknown order type');
    }

    return errors;
};