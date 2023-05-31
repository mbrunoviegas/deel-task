export interface Response<T = object> {
  statusCode: number;
  body?: T; 
}
