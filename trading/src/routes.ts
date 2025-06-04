/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { QuoteController } from './controllers/quoteController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Address": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenAmount": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AppDataHash": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderKind": {
        "dataType": "refEnum",
        "enums": ["buy","sell"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SellTokenSource": {
        "dataType": "refEnum",
        "enums": ["erc20","internal","external"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BuyTokenDestination": {
        "dataType": "refEnum",
        "enums": ["erc20","internal"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SigningScheme": {
        "dataType": "refEnum",
        "enums": ["eip712","ethsign","presign","eip1271"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OrderParameters": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"signingScheme":{"ref":"SigningScheme"},"buyTokenBalance":{"ref":"BuyTokenDestination"},"sellTokenBalance":{"ref":"SellTokenSource"},"partiallyFillable":{"dataType":"boolean","required":true},"kind":{"ref":"OrderKind","required":true},"feeAmount":{"ref":"TokenAmount","required":true},"appData":{"ref":"AppDataHash","required":true},"validTo":{"dataType":"double","required":true},"buyAmount":{"ref":"TokenAmount","required":true},"sellAmount":{"ref":"TokenAmount","required":true},"receiver":{"dataType":"union","subSchemas":[{"ref":"Address"},{"dataType":"enum","enums":[null]}]},"buyToken":{"ref":"Address","required":true},"sellToken":{"ref":"Address","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CowswapQuote": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"verified":{"dataType":"boolean","required":true},"id":{"dataType":"double"},"expiration":{"dataType":"string","required":true},"from":{"ref":"Address"},"quote":{"ref":"OrderParameters","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequest.swapType": {
        "dataType": "refEnum",
        "enums": ["EXACT_INPUT","EXACT_OUTPUT"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequest.depositType": {
        "dataType": "refEnum",
        "enums": ["ORIGIN_CHAIN","INTENTS"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequest.refundType": {
        "dataType": "refEnum",
        "enums": ["ORIGIN_CHAIN","INTENTS"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequest.recipientType": {
        "dataType": "refEnum",
        "enums": ["DESTINATION_CHAIN","INTENTS"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequest": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"quoteWaitingTimeMs":{"dataType":"double"},"referral":{"dataType":"string"},"deadline":{"dataType":"string","required":true},"recipientType":{"ref":"QuoteRequest.recipientType","required":true},"recipient":{"dataType":"string","required":true},"refundType":{"ref":"QuoteRequest.refundType","required":true},"refundTo":{"dataType":"string","required":true},"amount":{"dataType":"string","required":true},"destinationAsset":{"dataType":"string","required":true},"depositType":{"ref":"QuoteRequest.depositType","required":true},"originAsset":{"dataType":"string","required":true},"slippageTolerance":{"dataType":"double","required":true},"swapType":{"ref":"QuoteRequest.swapType","required":true},"dry":{"dataType":"boolean","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Quote": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"timeEstimate":{"dataType":"double"},"timeWhenInactive":{"dataType":"string"},"deadline":{"dataType":"string"},"minAmountOut":{"dataType":"string","required":true},"amountOutUsd":{"dataType":"string","required":true},"amountOutFormatted":{"dataType":"string","required":true},"amountOut":{"dataType":"string","required":true},"minAmountIn":{"dataType":"string","required":true},"amountInUsd":{"dataType":"string","required":true},"amountInFormatted":{"dataType":"string","required":true},"amountIn":{"dataType":"string","required":true},"depositAddress":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NearIntentsQuote": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"quote":{"ref":"Quote","required":true},"quoteRequest":{"ref":"QuoteRequest","required":true},"signature":{"dataType":"string","required":true},"timestamp":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteResponseModel": {
        "dataType": "refObject",
        "properties": {
            "amountTo": {"dataType":"string","required":true},
            "originalQuote": {"dataType":"union","subSchemas":[{"ref":"CowswapQuote"},{"ref":"NearIntentsQuote"}],"required":true},
            "quoteSource": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["NEARINTENTS"]},{"dataType":"enum","enums":["COWSWAP"]},{"dataType":"enum","enums":["1INCH"]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteKind": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["EXACT_INPUT"]},{"dataType":"enum","enums":["EXACT_OUTPUT"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QuoteRequestModel": {
        "dataType": "refObject",
        "properties": {
            "amount": {"dataType":"string","required":true},
            "accountFrom": {"dataType":"string","required":true},
            "tokenFrom": {"dataType":"string","required":true},
            "chainFrom": {"dataType":"string","required":true},
            "accountTo": {"dataType":"string"},
            "tokenTo": {"dataType":"string","required":true},
            "chainTo": {"dataType":"string","required":true},
            "slippage": {"dataType":"double","required":true},
            "kind": {"ref":"QuoteKind","required":true},
            "ttl": {"dataType":"double","required":true},
            "appData": {"dataType":"string","required":true},
            "isSmartContractWallet": {"dataType":"boolean"},
            "isNative": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsQuoteController_getQuote: Record<string, TsoaRoute.ParameterSchema> = {
                request: {"in":"body","name":"request","required":true,"ref":"QuoteRequestModel"},
        };
        app.post('/quote',
            ...(fetchMiddlewares<RequestHandler>(QuoteController)),
            ...(fetchMiddlewares<RequestHandler>(QuoteController.prototype.getQuote)),

            async function QuoteController_getQuote(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsQuoteController_getQuote, request, response });

                const controller = new QuoteController();

              await templateService.apiHandler({
                methodName: 'getQuote',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
