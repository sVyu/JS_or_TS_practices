import IUser from '../models/user';

declare global {
    namespace Express {
        interface User extends IUser{}
    }
    interface Error {
        status: number;
    }
}

// export {}