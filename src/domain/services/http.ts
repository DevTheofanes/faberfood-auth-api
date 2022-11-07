export interface IHeaders {
  host: string;
  authorization?: string;
  accept: string;
}

export interface IRequest {
  url: string;
  method: string;
  headers: IHeaders;
  route: {
    path: string;
  };
}

export interface IReq {
  userId: number;
}
