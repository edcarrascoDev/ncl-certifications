export interface RequestResponse<TData> {
  success: boolean;
  error?: any;
  result?: TData | TData[] | string | string[];
}
