/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export enum OrderQuoteSideKindBuy {
  Buy = "buy",
}

export enum OrderQuoteSideKindSell {
  Sell = "sell",
}

/** How was the order signed? */
export enum EcdsaSigningScheme {
  Eip712 = "eip712",
  Ethsign = "ethsign",
}

/** How was the order signed? */
export enum SigningScheme {
  Eip712 = "eip712",
  Ethsign = "ethsign",
  Presign = "presign",
  Eip1271 = "eip1271",
}

/** The current order status. */
export enum OrderStatus {
  PresignaturePending = "presignaturePending",
  Open = "open",
  Fulfilled = "fulfilled",
  Cancelled = "cancelled",
  Expired = "expired",
}

/**
 * How good should the price estimate be?
 *
 * Fast: The price estimate is chosen among the fastest N price estimates.
 * Optimal: The price estimate is chosen among all price estimates.
 * Verified: The price estimate is chosen among all verified/simulated
 * price estimates.
 *
 * **NOTE**: Orders are supposed to be created from `verified` or `optimal`
 * price estimates.
 */
export enum PriceQuality {
  Fast = "fast",
  Optimal = "optimal",
  Verified = "verified",
}

/** Where should the `buyToken` be transferred to? */
export enum BuyTokenDestination {
  Erc20 = "erc20",
  Internal = "internal",
}

/** Where should the `sellToken` be drawn from? */
export enum SellTokenSource {
  Erc20 = "erc20",
  Internal = "internal",
  External = "external",
}

/** Order class. */
export enum OrderClass {
  Market = "market",
  Limit = "limit",
  Liquidity = "liquidity",
}

/** Is this order a buy or sell? */
export enum OrderKind {
  Buy = "buy",
  Sell = "sell",
}

/**
 * 32 byte digest encoded as a hex with `0x` prefix.
 * @example "0xd51f28edffcaaa76be4a22f6375ad289272c037f3cc072345676e88d92ced8b5"
 */
export type TransactionHash = string;

/**
 * 20 byte Ethereum address encoded as a hex with `0x` prefix.
 * @example "0x6810e776880c02933d47db1b9fc05908e5386b96"
 */
export type Address = string;

/**
 * The string encoding of a JSON object representing some `appData`. The
 * format of the JSON expected in the `appData` field is defined
 * [here](https://github.com/cowprotocol/app-data).
 * @example "{"version":"0.9.0","metadata":{}}"
 */
export type AppData = string;

/**
 * 32 bytes encoded as hex with `0x` prefix.
 * It's expected to be the hash of the stringified JSON object representing the `appData`.
 * @example "0x0000000000000000000000000000000000000000000000000000000000000000"
 */
export type AppDataHash = string;

/** An `appData` document that is registered with the API. */
export interface AppDataObject {
  /**
   * The string encoding of a JSON object representing some `appData`. The
   * format of the JSON expected in the `appData` field is defined
   * [here](https://github.com/cowprotocol/app-data).
   */
  fullAppData?: AppData;
}

/**
 * A big unsigned integer encoded in decimal.
 * @example "1234567890"
 */
export type BigUint = string;

/**
 * Some `calldata` sent to a contract in a transaction encoded as a hex with `0x` prefix.
 * @example "0xca11da7a"
 */
export type CallData = string;

/**
 * Amount of a token. `uint256` encoded in decimal.
 * @example "1234567890"
 */
export type TokenAmount = string;

export interface OnchainOrderData {
  /** If orders are placed as on-chain orders, the owner of the order might be a smart contract, but not the user placing the order. The actual user will be provided in this field. */
  sender: Address;
  /** Describes the error, if the order placement was not successful. This could happen, for example, if the `validTo` is too high, or no valid quote was found or generated. */
  placementError?:
    | "QuoteNotFound"
    | "ValidToTooFarInFuture"
    | "PreValidationError";
}

/** Provides the additional data for ethflow orders. */
export interface EthflowData {
  /**
   * Specifies in which transaction the order was refunded. If
   * this field is null the order was not yet refunded.
   */
  refundTxHash: TransactionHash | null;
  /**
   * Describes the `validTo` of an order ethflow order.
   *
   * **NOTE**: For ethflow orders, the `validTo` encoded in the smart
   * contract is `type(uint256).max`.
   */
  userValidTo: number;
}

/** Order parameters. */
export interface OrderParameters {
  /** ERC-20 token to be sold. */
  sellToken: Address;
  /** ERC-20 token to be bought. */
  buyToken: Address;
  /** An optional Ethereum address to receive the proceeds of the trade instead of the owner (i.e. the order signer). */
  receiver?: Address | null;
  /** Amount of `sellToken` to be sold in atoms. */
  sellAmount: TokenAmount;
  /** Amount of `buyToken` to be bought in atoms. */
  buyAmount: TokenAmount;
  /** Unix timestamp (`uint32`) until which the order is valid. */
  validTo: number;
  /**
   * 32 bytes encoded as hex with `0x` prefix.
   * It's expected to be the hash of the stringified JSON object representing the `appData`.
   */
  appData: AppDataHash;
  /** feeRatio * sellAmount + minimal_fee in atoms. */
  feeAmount: TokenAmount;
  /** The kind is either a buy or sell order. */
  kind: OrderKind;
  /** Is the order fill-or-kill or partially fillable? */
  partiallyFillable: boolean;
  /** @default "erc20" */
  sellTokenBalance?: SellTokenSource;
  /** @default "erc20" */
  buyTokenBalance?: BuyTokenDestination;
  /** @default "eip712" */
  signingScheme?: SigningScheme;
}

/** Data a user provides when creating a new order. */
export interface OrderCreation {
  /** see `OrderParameters::sellToken` */
  sellToken: Address;
  /** see `OrderParameters::buyToken` */
  buyToken: Address;
  /** see `OrderParameters::receiver` */
  receiver?: Address | null;
  /** see `OrderParameters::sellAmount` */
  sellAmount: TokenAmount;
  /** see `OrderParameters::buyAmount` */
  buyAmount: TokenAmount;
  /** see `OrderParameters::validTo` */
  validTo: number;
  /** see `OrderParameters::feeAmount` */
  feeAmount: TokenAmount;
  /** see `OrderParameters::kind` */
  kind: OrderKind;
  /** see `OrderParameters::partiallyFillable` */
  partiallyFillable: boolean;
  /**
   * see `OrderParameters::sellTokenBalance`
   * @default "erc20"
   */
  sellTokenBalance?: SellTokenSource;
  /**
   * see `OrderParameters::buyTokenBalance`
   * @default "erc20"
   */
  buyTokenBalance?: BuyTokenDestination;
  /** How was the order signed? */
  signingScheme: SigningScheme;
  /** A signature. */
  signature: Signature;
  /** If set, the backend enforces that this address matches what is decoded as the *signer* of the signature. This helps catch errors with invalid signature encodings as the backend might otherwise silently work with an unexpected address that for example does not have any balance. */
  from?: Address | null;
  /** Orders can optionally include a quote ID. This way the order can be linked to a quote and enable providing more metadata when analysing order slippage. */
  quoteId?: number | null;
  /** This field comes in two forms for backward compatibility. The hash form will eventually stop being accepted. */
  appData: AppData | AppDataHash;
  /** May be set for debugging purposes. If set, this field is compared to what the backend internally calculates as the app data hash based on the contents of `appData`. If the hash does not match, an error is returned. If this field is set, then `appData` **MUST** be a string encoding of a JSON object. */
  appDataHash?: AppDataHash | null;
}

/** Extra order data that is returned to users when querying orders but not provided by users when creating orders. */
export interface OrderMetaData {
  /**
   * Creation time of the order. Encoded as ISO 8601 UTC.
   * @example "2020-12-03T18:35:18.814523Z"
   */
  creationDate: string;
  /** Order class. */
  class: OrderClass;
  /** 20 byte Ethereum address encoded as a hex with `0x` prefix. */
  owner: Address;
  /**
   * Unique identifier for the order: 56 bytes encoded as hex with `0x`
   * prefix.
   *
   * Bytes 0..32 are the order digest, bytes 30..52 the owner address and
   * bytes 52..56 the expiry (`validTo`) as a `uint32` unix epoch timestamp.
   */
  uid: UID;
  /**
   * Unused field that is currently always set to `null` and will be removed in the future.
   * @deprecated
   */
  availableBalance?: TokenAmount | null;
  /** The total amount of `sellToken` that has been transferred from the user for this order so far. */
  executedSellAmount: BigUint;
  /** The total amount of `sellToken` that has been transferred from the user for this order so far minus tokens that were transferred as part of the signed `fee` of the order. This is only relevant for old orders because now all orders have a signed `fee` of 0 and solvers compute an appropriate fee dynamically at the time of the order execution. */
  executedSellAmountBeforeFees: BigUint;
  /** The total amount of `buyToken` that has been executed for this order. */
  executedBuyAmount: BigUint;
  /** [DEPRECATED] The total amount of the user signed `fee` that have been executed for this order. This value is only non-negative for very old orders. */
  executedFeeAmount: BigUint;
  /** Has this order been invalidated? */
  invalidated: boolean;
  /** Order status. */
  status: OrderStatus;
  /**
   * Liquidity orders are functionally the same as normal smart contract
   * orders but are not placed with the intent of actively getting
   * traded. Instead they facilitate the trade of normal orders by
   * allowing them to be matched against liquidity orders which uses less
   * gas and can have better prices than external liquidity.
   *
   * As such liquidity orders will only be used in order to improve
   * settlement of normal orders. They should not be expected to be
   * traded otherwise and should not expect to get surplus.
   */
  isLiquidityOrder?: boolean;
  ethflowData?: EthflowData;
  /**
   * This represents the actual trader of an on-chain order.
   * ### ethflow orders
   * In this case, the `owner` would be the `EthFlow` contract and *not* the actual trader.
   */
  onchainUser?: Address;
  /** There is some data only available for orders that are placed on-chain. This data can be found in this object. */
  onchainOrderData?: OnchainOrderData;
  /** Total fee charged for execution of the order. Contains network fee and protocol fees. This takes into account the historic static fee signed by the user and the new dynamic fee computed by solvers. */
  executedFee?: BigUint;
  /** Token the executed fee was captured in. */
  executedFeeToken?: Address;
  /** Full `appData`, which the contract-level `appData` is a hash of. See `OrderCreation` for more information. */
  fullAppData?: string | null;
}

export type Order = OrderCreation & OrderMetaData;

/** A solvable order included in the current batch auction. Contains the data forwarded to solvers for solving. */
export interface AuctionOrder {
  /**
   * Unique identifier for the order: 56 bytes encoded as hex with `0x`
   * prefix.
   *
   * Bytes 0..32 are the order digest, bytes 30..52 the owner address and
   * bytes 52..56 the expiry (`validTo`) as a `uint32` unix epoch timestamp.
   */
  uid: UID;
  /** see `OrderParameters::sellToken` */
  sellToken: Address;
  /** see `OrderParameters::buyToken` */
  buyToken: Address;
  /** see `OrderParameters::sellAmount` */
  sellAmount: TokenAmount;
  /** see `OrderParameters::buyAmount` */
  buyAmount: TokenAmount;
  /**
   * Creation time of the order. Denominated in epoch seconds.
   * @example "123456"
   */
  created: string;
  /** see `OrderParameters::validTo` */
  validTo: number;
  /** see `OrderParameters::kind` */
  kind: OrderKind;
  /** see `OrderParameters::receiver` */
  receiver: Address | null;
  /** 20 byte Ethereum address encoded as a hex with `0x` prefix. */
  owner: Address;
  /** see `OrderParameters::partiallyFillable` */
  partiallyFillable: boolean;
  /** Currently executed amount of sell/buy token, depending on the order kind. */
  executed: TokenAmount;
  /** The pre-interactions that need to be executed before the first execution of the order. */
  preInteractions: InteractionData[];
  /** The post-interactions that need to be executed after the execution of the order. */
  postInteractions: InteractionData[];
  /**
   * see `OrderParameters::sellTokenBalance`
   * @default "erc20"
   */
  sellTokenBalance: SellTokenSource;
  /**
   * see `OrderParameters::buyTokenBalance`
   * @default "erc20"
   */
  buyTokenBalance: BuyTokenDestination;
  /** Order class. */
  class: OrderClass;
  /**
   * 32 bytes encoded as hex with `0x` prefix.
   * It's expected to be the hash of the stringified JSON object representing the `appData`.
   */
  appData: AppDataHash;
  /** A signature. */
  signature: Signature;
  /** The fee policies that are used to compute the protocol fees for this order. */
  protocolFees: FeePolicy[];
  /** A winning quote. */
  quote?: Quote;
}

/** A batch auction for solving. */
export interface Auction {
  /** The unique identifier of the auction. Increment whenever the backend creates a new auction. */
  id?: number;
  /** The block number for the auction. Orders and prices are guaranteed to be valid on this block. Proposed settlements should be valid for this block as well. */
  block?: number;
  /** The solvable orders included in the auction. */
  orders?: AuctionOrder[];
  /** The reference prices for all traded tokens in the auction as a mapping from token addresses to a price denominated in native token (i.e. 1e18 represents a token that trades one to one with the native token). These prices are used for solution competition for computing surplus and converting fees to native token. */
  prices?: AuctionPrices;
  /** List of addresses on whose surplus will count towards the objective value of their solution (unlike other orders that were created by the solver). */
  surplusCapturingJitOrderOwners?: Address[];
}

/** The components that describe a batch auction for the solver competition. */
export interface CompetitionAuction {
  /** The UIDs of the orders included in the auction. */
  orders?: UID[];
  /** The reference prices for all traded tokens in the auction as a mapping from token addresses to a price denominated in native token (i.e. 1e18 represents a token that trades one to one with the native token). These prices are used for solution competition for computing surplus and converting fees to native token. */
  prices?: AuctionPrices;
}

export interface ExecutedAmounts {
  /** A big unsigned integer encoded in decimal. */
  sell: BigUint;
  /** A big unsigned integer encoded in decimal. */
  buy: BigUint;
}

export interface CompetitionOrderStatus {
  type:
    | "open"
    | "scheduled"
    | "active"
    | "solved"
    | "executing"
    | "traded"
    | "cancelled";
  /**
   * A list of solvers who participated in the latest competition, sorted
   * by score in ascending order, where the last element is the winner.
   *
   * The presence of executed amounts defines whether the solver provided
   * a solution for the desired order.
   */
  value?: {
    /** Name of the solver. */
    solver: string;
    executedAmounts?: ExecutedAmounts;
  }[];
}

/** The reference prices for all traded tokens in the auction as a mapping from token addresses to a price denominated in native token (i.e. 1e18 represents a token that trades one to one with the native token). These prices are used for solution competition for computing surplus and converting fees to native token. */
export type AuctionPrices = Record<string, BigUint>;

/** EIP-712 signature of struct OrderCancellations { orderUid: bytes[] } from the order's owner. */
export interface OrderCancellations {
  /** UIDs of orders to cancel. */
  orderUids?: UID[];
  /** `OrderCancellation` signed by the owner. */
  signature: EcdsaSignature;
  signingScheme: EcdsaSigningScheme;
}

/**
 * [EIP-712](https://eips.ethereum.org/EIPS/eip-712) signature of struct
 * `OrderCancellation(bytes orderUid)` from the order's owner.
 */
export interface OrderCancellation {
  /** OrderCancellation signed by owner */
  signature: EcdsaSignature;
  /** How was the order signed? */
  signingScheme: EcdsaSigningScheme;
}

/** Trade data such as executed amounts, fees, `orderUid` and `block` number. */
export interface Trade {
  /** Block in which trade occurred. */
  blockNumber: number;
  /** Index in which transaction was included in block. */
  logIndex: number;
  /** UID of the order matched by this trade. */
  orderUid: UID;
  /** Address of trader. */
  owner: Address;
  /** Address of token sold. */
  sellToken: Address;
  /** Address of token bought. */
  buyToken: Address;
  /** Total amount of `sellToken` that has been executed for this trade (including fees). */
  sellAmount: TokenAmount;
  /** The total amount of `sellToken` that has been executed for this order without fees. */
  sellAmountBeforeFees: BigUint;
  /** Total amount of `buyToken` received in this trade. */
  buyAmount: TokenAmount;
  /** Transaction hash of the corresponding settlement transaction containing the trade (if available). */
  txHash: TransactionHash | null;
  /** Executed protocol fees for this trade, together with the fee policies used. Listed in the order they got applied. */
  executedProtocolFees?: ExecutedProtocolFee[];
}

/**
 * Unique identifier for the order: 56 bytes encoded as hex with `0x`
 * prefix.
 *
 * Bytes 0..32 are the order digest, bytes 30..52 the owner address and
 * bytes 52..56 the expiry (`validTo`) as a `uint32` unix epoch timestamp.
 * @example "0xff2e2e54d178997f173266817c1e9ed6fee1a1aae4b43971c53b543cffcc2969845c6f5599fbb25dbdd1b9b013daf85c03f3c63763e4bc4a"
 */
export type UID = string;

/** A signature. */
export type Signature = EcdsaSignature | PreSignature;

/**
 * 65 bytes encoded as hex with `0x` prefix. `r || s || v` from the spec.
 * @example "0x0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
 */
export type EcdsaSignature = string;

/**
 * Empty signature bytes. Used for "presign" signatures.
 * @example "0x"
 */
export type PreSignature = string;

export interface OrderPostError {
  errorType:
    | "DuplicatedOrder"
    | "QuoteNotFound"
    | "QuoteNotVerified"
    | "InvalidQuote"
    | "MissingFrom"
    | "WrongOwner"
    | "InvalidEip1271Signature"
    | "InsufficientBalance"
    | "InsufficientAllowance"
    | "InvalidSignature"
    | "SellAmountOverflow"
    | "TransferSimulationFailed"
    | "ZeroAmount"
    | "IncompatibleSigningScheme"
    | "TooManyLimitOrders"
    | "TooMuchGas"
    | "UnsupportedBuyTokenDestination"
    | "UnsupportedSellTokenSource"
    | "UnsupportedOrderType"
    | "InsufficientValidTo"
    | "ExcessiveValidTo"
    | "InvalidNativeSellToken"
    | "SameBuyAndSellToken"
    | "UnsupportedToken"
    | "InvalidAppData"
    | "AppDataHashMismatch"
    | "AppdataFromMismatch"
    | "OldOrderActivelyBidOn";
  description: string;
}

export interface OrderCancellationError {
  errorType:
    | "InvalidSignature"
    | "WrongOwner"
    | "OrderNotFound"
    | "AlreadyCancelled"
    | "OrderFullyExecuted"
    | "OrderExpired"
    | "OnChainOrder";
  description: string;
}

export interface PriceEstimationError {
  errorType:
    | "QuoteNotVerified"
    | "UnsupportedToken"
    | "ZeroAmount"
    | "UnsupportedOrderType";
  description: string;
}

/** The buy or sell side when quoting an order. */
export type OrderQuoteSide =
  | {
      kind: OrderQuoteSideKindSell;
      /** The total amount that is available for the order. From this value, the fee is deducted and the buy amount is calculated. */
      sellAmountBeforeFee: TokenAmount;
    }
  | {
      kind: OrderQuoteSideKindSell;
      /** The `sellAmount` for the order. */
      sellAmountAfterFee: TokenAmount;
    }
  | {
      kind: OrderQuoteSideKindBuy;
      /** The `buyAmount` for the order. */
      buyAmountAfterFee: TokenAmount;
    };

/** The validity for the order. */
export type OrderQuoteValidity =
  | {
      /** Unix timestamp (`uint32`) until which the order is valid. */
      validTo?: number;
    }
  | {
      /** Number (`uint32`) of seconds that the order should be valid for. */
      validFor?: number;
    };

/** Request fee and price quote. */
export type OrderQuoteRequest = OrderQuoteSide &
  OrderQuoteValidity & {
    /** ERC-20 token to be sold */
    sellToken: Address;
    /** ERC-20 token to be bought */
    buyToken: Address;
    /**
     * An optional address to receive the proceeds of the trade instead of the
     * `owner` (i.e. the order signer).
     */
    receiver?: Address | null;
    /**
     * AppData which will be assigned to the order.
     *
     * Expects either a string JSON doc as defined on
     * [AppData](https://github.com/cowprotocol/app-data) or a hex
     * encoded string for backwards compatibility.
     *
     * When the first format is used, it's possible to provide the
     * derived appDataHash field.
     */
    appData?: AppData | AppDataHash;
    /**
     * The hash of the stringified JSON appData doc.
     *
     * If present, `appData` field must be set with the aforementioned
     * data where this hash is derived from.
     *
     * In case they differ, the call will fail.
     */
    appDataHash?: AppDataHash;
    /** @default "erc20" */
    sellTokenBalance?: SellTokenSource;
    /** @default "erc20" */
    buyTokenBalance?: BuyTokenDestination;
    /** 20 byte Ethereum address encoded as a hex with `0x` prefix. */
    from: Address;
    /** @default "verified" */
    priceQuality?: PriceQuality;
    /** @default "eip712" */
    signingScheme?: SigningScheme;
    /**
     * Flag to signal whether the order is intended for on-chain order placement. Only valid for non ECDSA-signed orders."
     * @default false
     */
    onchainOrder?: any;
  };

/**
 * An order quoted by the backend that can be directly signed and
 * submitted to the order creation backend.
 */
export interface OrderQuoteResponse {
  /** Order parameters. */
  quote: OrderParameters;
  /** 20 byte Ethereum address encoded as a hex with `0x` prefix. */
  from?: Address;
  /**
   * Expiration date of the offered fee. Order service might not accept
   * the fee after this expiration date. Encoded as ISO 8601 UTC.
   * @example "1985-03-10T18:35:18.814523Z"
   */
  expiration: string;
  /** Quote ID linked to a quote to enable providing more metadata when analysing order slippage. */
  id?: number;
  /** Whether it was possible to verify that the quoted amounts are accurate using a simulation. */
  verified: boolean;
}

/**
 * The settlements submitted by every solver for a specific auction.
 * The `auctionId` corresponds to the id external solvers are provided
 * with.
 */
export interface SolverCompetitionResponse {
  /** The ID of the auction the competition info is for. */
  auctionId?: number;
  /** The hash of the transaction that the winning solution of this info was submitted in. */
  transactionHash?: TransactionHash | null;
  /** Gas price used for ranking solutions. */
  gasPrice?: number;
  liquidityCollectedBlock?: number;
  competitionSimulationBlock?: number;
  /** The components that describe a batch auction for the solver competition. */
  auction?: CompetitionAuction;
  /** Maps from solver name to object describing that solver's settlement. */
  solutions?: SolverSettlement[];
}

export interface SolverSettlement {
  /** Name of the solver. */
  solver?: string;
  /**
   * The address used by the solver to execute the settlement on-chain.
   *
   * This field is missing for old settlements, the zero address has been
   * used instead.
   */
  solverAddress?: string;
  objective?: {
    /** The total objective value used for ranking solutions. */
    total?: number;
    surplus?: number;
    fees?: number;
    cost?: number;
    gas?: number;
  };
  /**
   * The score of the current auction as defined in [CIP-20](https://snapshot.org/#/cow.eth/proposal/0x2d3f9bd1ea72dca84b03e97dda3efc1f4a42a772c54bd2037e8b62e7d09a491f).
   * It is `null` for old auctions.
   */
  score?: BigUint | null;
  /** The prices of tokens for settled user orders as passed to the settlement contract. */
  clearingPrices?: Record<string, BigUint>;
  /** Touched orders. */
  orders?: {
    /**
     * Unique identifier for the order: 56 bytes encoded as hex with `0x`
     * prefix.
     *
     * Bytes 0..32 are the order digest, bytes 30..52 the owner address and
     * bytes 52..56 the expiry (`validTo`) as a `uint32` unix epoch timestamp.
     */
    id?: UID;
    /** A big unsigned integer encoded in decimal. */
    executedAmount?: BigUint;
  }[];
  /** whether the solution is a winner (received the right to get executed) or not */
  isWinner?: boolean;
}

/** The estimated native price for the token */
export interface NativePriceResponse {
  /** Estimated price of the token. */
  price?: number;
}

/** The total surplus. */
export interface TotalSurplus {
  /** The total surplus. */
  totalSurplus?: string;
}

export interface InteractionData {
  /** 20 byte Ethereum address encoded as a hex with `0x` prefix. */
  target?: Address;
  /** Amount of a token. `uint256` encoded in decimal. */
  value?: TokenAmount;
  /** The call data to be used for the interaction. */
  call_data?: CallData[];
}

/** A calculated order quote. */
export interface Quote {
  /** The amount of the sell token. */
  sellAmount?: TokenAmount;
  /** The amount of the buy token. */
  buyAmount?: TokenAmount;
  /** The amount that needs to be paid, denominated in the sell token. */
  fee?: TokenAmount;
}

/** The protocol fee is taken as a percent of the surplus. */
export interface Surplus {
  /**
   * @min 0
   * @max 1
   * @exclusiveMax true
   */
  factor: number;
  /**
   * @min 0
   * @max 1
   * @exclusiveMax true
   */
  maxVolumeFactor: number;
}

/** The protocol fee is taken as a percent of the order volume. */
export interface Volume {
  /**
   * @min 0
   * @max 1
   * @exclusiveMax true
   */
  factor: number;
}

/** The protocol fee is taken as a percent of the order price improvement which is a difference between the executed price and the best quote. */
export interface PriceImprovement {
  /**
   * @min 0
   * @max 1
   * @exclusiveMax true
   */
  factor: number;
  /**
   * @min 0
   * @max 1
   * @exclusiveMax true
   */
  maxVolumeFactor: number;
  /** The best quote received. */
  quote: Quote;
}

/** Defines the ways to calculate the protocol fee. */
export type FeePolicy = Surplus | Volume | PriceImprovement;

export interface ExecutedProtocolFee {
  /** Defines the ways to calculate the protocol fee. */
  policy?: FeePolicy;
  /** Fee amount taken */
  amount?: TokenAmount;
  /** The token in which the fee is taken */
  token?: Address;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, "body" | "bodyUsed">;

export interface FullRequestParams extends Omit<RequestInit, "body"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseFormat;
  /** request body */
  body?: unknown;
  /** base url */
  baseUrl?: string;
  /** request cancellation token */
  cancelToken?: CancelToken;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown>
  extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = "https://api.cow.fi/mainnet";
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) =>
    fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: "same-origin",
    headers: {},
    redirect: "follow",
    referrerPolicy: "no-referrer",
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === "number" ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join("&");
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter(
      (key) => "undefined" !== typeof query[key],
    );
    return keys
      .map((key) =>
        Array.isArray(query[key])
          ? this.addArrayQueryParam(query, key)
          : this.addQueryParam(query, key),
      )
      .join("&");
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : "";
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === "object" || typeof input === "string")
        ? JSON.stringify(input)
        : input,
    [ContentType.Text]: (input: any) =>
      input !== null && typeof input !== "string"
        ? JSON.stringify(input)
        : input,
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === "object" && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(
    params1: RequestParams,
    params2?: RequestParams,
  ): RequestParams {
    return {
      ...this.baseApiParams,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected createAbortSignal = (
    cancelToken: CancelToken,
  ): AbortSignal | undefined => {
    if (this.abortControllers.has(cancelToken)) {
      const abortController = this.abortControllers.get(cancelToken);
      if (abortController) {
        return abortController.signal;
      }
      return void 0;
    }

    const abortController = new AbortController();
    this.abortControllers.set(cancelToken, abortController);
    return abortController.signal;
  };

  public abortRequest = (cancelToken: CancelToken) => {
    const abortController = this.abortControllers.get(cancelToken);

    if (abortController) {
      abortController.abort();
      this.abortControllers.delete(cancelToken);
    }
  };

  public request = async <T = any, E = any>({
    body,
    secure,
    path,
    type,
    query,
    format,
    baseUrl,
    cancelToken,
    ...params
  }: FullRequestParams): Promise<HttpResponse<T, E>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(
      `${baseUrl || this.baseUrl || ""}${path}${queryString ? `?${queryString}` : ""}`,
      {
        ...requestParams,
        headers: {
          ...(requestParams.headers || {}),
          ...(type && type !== ContentType.FormData
            ? { "Content-Type": type }
            : {}),
        },
        signal:
          (cancelToken
            ? this.createAbortSignal(cancelToken)
            : requestParams.signal) || null,
        body:
          typeof body === "undefined" || body === null
            ? null
            : payloadFormatter(body),
      },
    ).then(async (response) => {
      const r = response.clone() as HttpResponse<T, E>;
      r.data = null as unknown as T;
      r.error = null as unknown as E;

      const data = !responseFormat
        ? r
        : await response[responseFormat]()
            .then((data) => {
              if (r.ok) {
                r.data = data;
              } else {
                r.error = data;
              }
              return r;
            })
            .catch((e) => {
              r.error = e;
              return r;
            });

      if (cancelToken) {
        this.abortControllers.delete(cancelToken);
      }

      if (!response.ok) throw data;
      return data;
    });
  };
}

/**
 * @title Order Book API
 * @version 0.0.1
 * @baseUrl https://api.cow.fi/mainnet
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  api = {
    /**
 * No description
 *
 * @name V1OrdersCreate
 * @summary Create a new order. In order to replace an existing order with a new one, the appData must contain a [valid replacement order UID](https://github.com/cowprotocol/app-data/blob/main/src/schemas/v1.1.0.json#L62), then the indicated order is cancelled, and a new one placed.
This allows an old order to be cancelled AND a new order to be created in an atomic operation with a single signature.
This may be useful for replacing orders when on-chain prices move outside of the original order's limit price.
 * @request POST:/api/v1/orders
 */
    v1OrdersCreate: (data: OrderCreation, params: RequestParams = {}) =>
      this.request<UID, OrderPostError | void>({
        path: `/api/v1/orders`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description This is a *best effort* cancellation, and might not prevent solvers from settling the orders (if the order is part of an in-flight settlement transaction for example). Authentication must be provided by an [EIP-712](https://eips.ethereum.org/EIPS/eip-712) signature of an `OrderCancellations(bytes[] orderUids)` message.
     *
     * @name V1OrdersDelete
     * @summary Cancel multiple orders by marking them invalid with a timestamp.
     * @request DELETE:/api/v1/orders
     */
    v1OrdersDelete: (data: OrderCancellations, params: RequestParams = {}) =>
      this.request<void, OrderCancellationError | void>({
        path: `/api/v1/orders`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name V1OrdersDetail
     * @summary Get existing order from UID.
     * @request GET:/api/v1/orders/{UID}
     */
    v1OrdersDetail: (uid: UID, params: RequestParams = {}) =>
      this.request<Order, void>({
        path: `/api/v1/orders/${uid}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description The successful deletion might not prevent solvers from settling the order. Authentication must be provided by providing an [EIP-712](https://eips.ethereum.org/EIPS/eip-712) signature of an `OrderCancellation(bytes orderUid)` message.
     *
     * @name V1OrdersDelete2
     * @summary Cancel an order by marking it invalid with a timestamp.
     * @request DELETE:/api/v1/orders/{UID}
     * @deprecated
     * @originalName v1OrdersDelete
     * @duplicate
     */
    v1OrdersDelete2: (
      uid: UID,
      data: OrderCancellation,
      params: RequestParams = {},
    ) =>
      this.request<void, OrderCancellationError | void>({
        path: `/api/v1/orders/${uid}`,
        method: "DELETE",
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @name V1OrdersStatusList
     * @summary Get the status of an order.
     * @request GET:/api/v1/orders/{UID}/status
     */
    v1OrdersStatusList: (uid: UID, params: RequestParams = {}) =>
      this.request<CompetitionOrderStatus, any>({
        path: `/api/v1/orders/${uid}/status`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @name V1TransactionsOrdersList
     * @summary Get orders by settlement transaction hash.
     * @request GET:/api/v1/transactions/{txHash}/orders
     */
    v1TransactionsOrdersList: (
      txHash: TransactionHash,
      params: RequestParams = {},
    ) =>
      this.request<Order[], any>({
        path: `/api/v1/transactions/${txHash}/orders`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Exactly one of `owner` or `orderUid` must be set.
     *
     * @name V1TradesList
     * @summary Get existing trades.
     * @request GET:/api/v1/trades
     */
    v1TradesList: (
      query?: {
        /** 20 byte Ethereum address encoded as a hex with `0x` prefix. */
        owner?: Address;
        /**
         * Unique identifier for the order: 56 bytes encoded as hex with `0x`
         * prefix.
         *
         * Bytes 0..32 are the order digest, bytes 30..52 the owner address and
         * bytes 52..56 the expiry (`validTo`) as a `uint32` unix epoch timestamp.
         */
        orderUid?: UID;
      },
      params: RequestParams = {},
    ) =>
      this.request<Trade[], any>({
        path: `/api/v1/trades`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description The current batch auction that solvers should be solving right now. This includes: * A list of solvable orders. * The block on which the batch was created. * Prices for all tokens being traded (used for objective value computation). **Note: This endpoint is currently permissioned. Reach out in discord if you need access.**
     *
     * @name V1AuctionList
     * @summary Get the current batch auction.
     * @request GET:/api/v1/auction
     */
    v1AuctionList: (params: RequestParams = {}) =>
      this.request<Auction, any>({
        path: `/api/v1/auction`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description The orders are sorted by their creation date descending (newest orders first). To enumerate all orders start with `offset` 0 and keep increasing the `offset` by the total number of returned results. When a response contains less than `limit` the last page has been reached.
     *
     * @name V1AccountOrdersList
     * @summary Get orders of one user paginated.
     * @request GET:/api/v1/account/{owner}/orders
     */
    v1AccountOrdersList: (
      owner: Address,
      query?: {
        /** The pagination offset. Defaults to 0. */
        offset?: number;
        /** The pagination limit. Defaults to 10. Maximum 1000. Minimum 1. */
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<Order[], void>({
        path: `/api/v1/account/${owner}/orders`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * @description Price is the exchange rate between the specified token and the network's native currency. It represents the amount of native token atoms needed to buy 1 atom of the specified token.
     *
     * @name V1TokenNativePriceList
     * @summary Get native price for the given token.
     * @request GET:/api/v1/token/{token}/native_price
     */
    v1TokenNativePriceList: (token: Address, params: RequestParams = {}) =>
      this.request<NativePriceResponse, void>({
        path: `/api/v1/token/${token}/native_price`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Given a partial order compute the minimum fee and a price estimate for the order. Return a full order that can be used directly for signing, and with an included signature, passed directly to the order creation endpoint.
     *
     * @name V1QuoteCreate
     * @summary Quote a price and fee for the specified order parameters.
     * @request POST:/api/v1/quote
     */
    v1QuoteCreate: (data: OrderQuoteRequest, params: RequestParams = {}) =>
      this.request<OrderQuoteResponse, PriceEstimationError | void>({
        path: `/api/v1/quote`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the competition information by `auction_id`.
     *
     * @name V1SolverCompetitionDetail
     * @summary Get information about a solver competition.
     * @request GET:/api/v1/solver_competition/{auction_id}
     */
    v1SolverCompetitionDetail: (
      auctionId: number,
      params: RequestParams = {},
    ) =>
      this.request<SolverCompetitionResponse, void>({
        path: `/api/v1/solver_competition/${auctionId}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the competition information by `tx_hash`.
     *
     * @name V1SolverCompetitionByTxHashDetail
     * @summary Get information about solver competition.
     * @request GET:/api/v1/solver_competition/by_tx_hash/{tx_hash}
     */
    v1SolverCompetitionByTxHashDetail: (
      txHash: TransactionHash,
      params: RequestParams = {},
    ) =>
      this.request<SolverCompetitionResponse, void>({
        path: `/api/v1/solver_competition/by_tx_hash/${txHash}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the competition information for the last seen auction_id.
     *
     * @name V1SolverCompetitionLatestList
     * @summary Get information about the most recent solver competition.
     * @request GET:/api/v1/solver_competition/latest
     */
    v1SolverCompetitionLatestList: (params: RequestParams = {}) =>
      this.request<SolverCompetitionResponse, void>({
        path: `/api/v1/solver_competition/latest`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Returns the git commit hash, branch name and release tag (code: https://github.com/cowprotocol/services).
     *
     * @name V1VersionList
     * @summary Get the API's current deployed version.
     * @request GET:/api/v1/version
     */
    v1VersionList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/version`,
        method: "GET",
        ...params,
      }),

    /**
     * No description
     *
     * @name V1AppDataDetail
     * @summary Get the full `appData` from contract `appDataHash`.
     * @request GET:/api/v1/app_data/{app_data_hash}
     */
    v1AppDataDetail: (appDataHash: AppDataHash, params: RequestParams = {}) =>
      this.request<AppDataObject, void>({
        path: `/api/v1/app_data/${appDataHash}`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * @description Uploads a full `appData` to orderbook so that orders created with the corresponding `appDataHash` can be linked to the original full `appData`.
     *
     * @name V1AppDataUpdate
     * @summary Registers a full `appData` so it can be referenced by `appDataHash`.
     * @request PUT:/api/v1/app_data/{app_data_hash}
     */
    v1AppDataUpdate: (
      appDataHash: AppDataHash,
      data: AppDataObject,
      params: RequestParams = {},
    ) =>
      this.request<AppDataHash, void>({
        path: `/api/v1/app_data/${appDataHash}`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Uploads a full `appData` to orderbook and returns the corresponding `appDataHash`.
     *
     * @name V1AppDataUpdate2
     * @summary Registers a full `appData` and returns `appDataHash`.
     * @request PUT:/api/v1/app_data
     * @originalName v1AppDataUpdate
     * @duplicate
     */
    v1AppDataUpdate2: (data: AppDataObject, params: RequestParams = {}) =>
      this.request<AppDataHash, void>({
        path: `/api/v1/app_data`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description ### Caution This endpoint is under active development and should NOT be considered stable.
     *
     * @name V1UsersTotalSurplusList
     * @summary Get the total surplus earned by the user. [UNSTABLE]
     * @request GET:/api/v1/users/{address}/total_surplus
     */
    v1UsersTotalSurplusList: (address: Address, params: RequestParams = {}) =>
      this.request<TotalSurplus, any>({
        path: `/api/v1/users/${address}/total_surplus`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
