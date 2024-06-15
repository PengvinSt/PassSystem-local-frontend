import ITokens from './token.interface';

export default interface IUser {
  name: {
    first: string;
    last: string;
  };
  isOnline: boolean;
  gender: string;
  email: string;
  picture: string;
  uuid: string;
  login: {
    username: string;
    password: string;
  };
  role: string;
  phone: string;
  job: string;
  payment: number;
  token?: ITokens;
  ban?: {
    isBaned: boolean;
    banDate?: string;
  };
}

