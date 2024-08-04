// import { HttpService } from '@nestjs/axios';
// import { Injectable } from '@nestjs/common';
// import { kv } from '@vercel/kv';
// import type { VercelRequest, VercelResponse } from '@vercel/node';



// @Injectable()
// export class ExternalAPIService {
//   constructor(private readonly httpService: HttpService) { 
//     async function handler(
//       request: VercelRequest,
//       response: VercelResponse,
//     ) {
//       const user = await kv.hgetall('user:me');
//       return response.status(200).json(user);
//     }

//   }
// }