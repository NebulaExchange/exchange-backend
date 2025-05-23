// import { Response, Request} from 'express';
// import { cowswapService } from '../services/cowswapService';
// import { nearintentService } from '../services/nearIntentService';
// import { TokenModel } from '../models/TokenModel';

// // GET /api/tokens
// export const getTokens = async (req: Request, res: Response):  Promise<void> => 
// {
//   const cowTokens = cowswapService.GetTokens();
//   const nearTokens = nearintentService.GetTokens();

//   var tokens = [...cowTokens, ...nearTokens].reduce((acc, current) => {
//     const x = acc.find(
//       (item) =>
//         item.address === current.address && item.chain === current.chain
//     );
//     if (!x) {
//       return acc.concat([current]);
//     } else {
//       return acc;
//     }
//   }, [] as TokenModel[]);

//   res.status(200).json({
//     success: true,
//     message: "OK",
//     data: tokens,
//   });
// };