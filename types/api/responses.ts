import { NextApiResponse } from 'next';

export type ApiResponse<T = unknown> = {
    success: boolean;
    data?: T;
    message?: string;
    status: NextApiResponse['statusCode'];
};
