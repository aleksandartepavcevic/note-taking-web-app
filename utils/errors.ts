import { ErrorType } from '@/types/api/errors';

class GenericError extends Error {
    constructor(public name: ErrorType, message?: string) {
        const genericErrorMessage = 'An error occurred.';
        super(message || genericErrorMessage);
        this.name = name || 'GenericError';
    }
}

export default GenericError;
