/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CreateGameIdentifiersDto {
  endDate?: string;
  startDate?: string;
  gameIdentifiers?: string;
}

export interface GameIdentifiers {
  endDate: string | null;
  startDate: string | null;
  gameIdentifiers: string | null;
  id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface InfinityPaginationGameIdentifiersResponseDto {
  data: GameIdentifiers[];
  /** @example true */
  hasNextPage: boolean;
}

export interface UpdateGameIdentifiersDto {
  endDate?: string;
  startDate?: string;
  gameIdentifiers?: string;
}

export interface CreatehighestXPrizesDto {
  minBet?: number;
  prize?: number;
}

export interface HighestXPrizes {
  minBet: number | null;
  prize: number | null;
  id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface InfinityPaginationhighestXPrizesResponseDto {
  data: HighestXPrizes[];
  /** @example true */
  hasNextPage: boolean;
}

export interface UpdatehighestXPrizesDto {
  minBet?: number;
  prize?: number;
}

export interface CreateleaderboardPrizesDto {
  leaderboardPrizes?: string;
}

export interface LeaderboardPrizes {
  leaderboardPrizes: string | null;
  id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface InfinityPaginationleaderboardPrizesResponseDto {
  data: LeaderboardPrizes[];
  /** @example true */
  hasNextPage: boolean;
}

export interface UpdateleaderboardPrizesDto {
  leaderboardPrizes?: string;
}

export interface CreatestreamerDataDto {
  discord?: string;
  tiktok?: string;
  twitter?: string;
  instagram?: string;
  streamerlogo?: string;
  roobetCode?: string;
  streamerName?: string;
}

export interface StreamerData {
  discord: string | null;
  tiktok: string | null;
  twitter: string | null;
  instagram: string | null;
  streamerlogo: string | null;
  roobetCode: string | null;
  streamerName: string | null;
  id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface InfinityPaginationstreamerDataResponseDto {
  data: StreamerData[];
  /** @example true */
  hasNextPage: boolean;
}

export interface UpdatestreamerDataDto {
  discord?: string;
  tiktok?: string;
  twitter?: string;
  instagram?: string;
  streamerlogo?: string;
  roobetCode?: string;
  streamerName?: string;
}

export interface PlayerVerificationDto {
  playerUserName: string;
}

export interface PlayerVerificationResponseDto {
  playerUserName: string;
  isAffiliate: boolean;
}

export interface PlayerStatsDto {
  playerUserName: string;
  startDate: string;
  endDate: string;
}

export interface PlayerStatsResponseDto {
  playerUserName: string;
  totalWageredAmount: number;
  totalWeightedAmount: number;
  favoriteGame: string;
  rankLevel: number;
  rankLevelImage: string;
}

export interface LeaderboardDataDto {
  startDate: object;
  endDate: object;
  wagerAmount: number;
  isCurrentMonth: boolean;
}

export interface LeaderboardDto {
  username: string;
  weightedWagered: number;
  rankLevelImage: string;
}

export interface LeaderboardDataResponseDto {
  startDate: string;
  endDate: string;
  leaderboard: LeaderboardDto;
}

export interface UserDto {
  /** @example "userId" */
  id: string;
}

export interface CreateLoginHistoryDto {
  ip: string;
  user?: UserDto;
}

export interface FileType {
  /** @example "cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae" */
  id: string;
  /** @example "https://example.com/path/to/file.jpg" */
  path: string;
}

export interface Role {
  id: number;
  /** @example "admin" */
  name: string;
}

export interface Status {
  id: number;
  /** @example "active" */
  name: string;
}

export interface User {
  flagged: boolean | null;
  id: number;
  /** @example "john.doe@example.com" */
  email: string;
  /** @example "email" */
  provider: string;
  /** @example "1234567890" */
  socialId: string;
  /** @example "John" */
  firstName: string;
  /** @example "Doe" */
  lastName: string;
  photo: FileType;
  role: Role;
  status: Status;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
  /** @format date-time */
  deletedAt: string;
}

export interface LoginHistory {
  ip: string;
  user: User | null;
  id: string;
  /** @format date-time */
  createdAt: string;
  /** @format date-time */
  updatedAt: string;
}

export interface InfinityPaginationLoginHistoryResponseDto {
  data: LoginHistory[];
  /** @example true */
  hasNextPage: boolean;
}

export interface UpdateLoginHistoryDto {
  ip?: string;
  user?: UserDto;
}

export interface FileDto {
  id: string;
}

export interface RoleDto {
  id: object;
}

export interface StatusDto {
  id: object;
}

export interface CreateUserDto {
  flagged?: boolean;
  /** @example "test1@example.com" */
  email: string;
  password: string;
  /** @example "John" */
  firstName: string;
  /** @example "Doe" */
  lastName: string;
  photo?: FileDto;
  role?: RoleDto;
  status?: StatusDto;
}

export interface InfinityPaginationUserResponseDto {
  data: User[];
  /** @example true */
  hasNextPage: boolean;
}

export interface UpdateUserDto {
  flagged?: boolean;
  /** @example "test1@example.com" */
  email?: string;
  password?: string;
  /** @example "John" */
  firstName?: string;
  /** @example "Doe" */
  lastName?: string;
  photo?: FileDto;
  role?: RoleDto;
  status?: StatusDto;
}

export interface FileResponseDto {
  file: FileType;
}

export interface AuthEmailLoginDto {
  /** @example "test1@example.com" */
  email: string;
  password: string;
}

export interface LoginResponseDto {
  token: string;
  refreshToken: string;
  tokenExpires: number;
  user: User;
}

export interface AuthRegisterLoginDto {
  /** @example "test1@example.com" */
  email: string;
  password: string;
  /** @example "John" */
  firstName: string;
  /** @example "Doe" */
  lastName: string;
}

export interface AuthConfirmEmailDto {
  hash: string;
}

export interface AuthForgotPasswordDto {
  /** @example "test1@example.com" */
  email: string;
}

export interface AuthResetPasswordDto {
  password: string;
  hash: string;
}

export interface RefreshResponseDto {
  token: string;
  refreshToken: string;
  tokenExpires: number;
}

export interface AuthUpdateDto {
  photo?: FileDto;
  /** @example "John" */
  firstName?: string;
  /** @example "Doe" */
  lastName?: string;
  /** @example "new.email@example.com" */
  email?: string;
  password?: string;
  oldPassword?: string;
}

export interface AuthGoogleLoginDto {
  /** @example "abc" */
  idToken: string;
}

export type QueryParamsType = Record<string | number, any>;
export type ResponseFormat = keyof Omit<Body, 'body' | 'bodyUsed'>;

export interface FullRequestParams extends Omit<RequestInit, 'body'> {
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

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> {
  baseUrl?: string;
  baseApiParams?: Omit<RequestParams, 'baseUrl' | 'cancelToken' | 'signal'>;
  securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
  customFetch?: typeof fetch;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
  data: D;
  error: E;
}

type CancelToken = Symbol | string | number;

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public baseUrl: string = '';
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private abortControllers = new Map<CancelToken, AbortController>();
  private customFetch = (...fetchParams: Parameters<typeof fetch>) => fetch(...fetchParams);

  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {},
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  };

  constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
    Object.assign(this, apiConfig);
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected encodeQueryParam(key: string, value: any) {
    const encodedKey = encodeURIComponent(key);
    return `${encodedKey}=${encodeURIComponent(typeof value === 'number' ? value : `${value}`)}`;
  }

  protected addQueryParam(query: QueryParamsType, key: string) {
    return this.encodeQueryParam(key, query[key]);
  }

  protected addArrayQueryParam(query: QueryParamsType, key: string) {
    const value = query[key];
    return value.map((v: any) => this.encodeQueryParam(key, v)).join('&');
  }

  protected toQueryString(rawQuery?: QueryParamsType): string {
    const query = rawQuery || {};
    const keys = Object.keys(query).filter((key) => 'undefined' !== typeof query[key]);
    return keys
      .map((key) => (Array.isArray(query[key]) ? this.addArrayQueryParam(query, key) : this.addQueryParam(query, key)))
      .join('&');
  }

  protected addQueryParams(rawQuery?: QueryParamsType): string {
    const queryString = this.toQueryString(rawQuery);
    return queryString ? `?${queryString}` : '';
  }

  private contentFormatters: Record<ContentType, (input: any) => any> = {
    [ContentType.Json]: (input: any) =>
      input !== null && (typeof input === 'object' || typeof input === 'string') ? JSON.stringify(input) : input,
    [ContentType.Text]: (input: any) => (input !== null && typeof input !== 'string' ? JSON.stringify(input) : input),
    [ContentType.FormData]: (input: any) =>
      Object.keys(input || {}).reduce((formData, key) => {
        const property = input[key];
        formData.append(
          key,
          property instanceof Blob
            ? property
            : typeof property === 'object' && property !== null
              ? JSON.stringify(property)
              : `${property}`,
        );
        return formData;
      }, new FormData()),
    [ContentType.UrlEncoded]: (input: any) => this.toQueryString(input),
  };

  protected mergeRequestParams(params1: RequestParams, params2?: RequestParams): RequestParams {
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

  protected createAbortSignal = (cancelToken: CancelToken): AbortSignal | undefined => {
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
      ((typeof secure === 'boolean' ? secure : this.baseApiParams.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const queryString = query && this.toQueryString(query);
    const payloadFormatter = this.contentFormatters[type || ContentType.Json];
    const responseFormat = format || requestParams.format;

    return this.customFetch(`${baseUrl || this.baseUrl || ''}${path}${queryString ? `?${queryString}` : ''}`, {
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      signal: (cancelToken ? this.createAbortSignal(cancelToken) : requestParams.signal) || null,
      body: typeof body === 'undefined' || body === null ? null : payloadFormatter(body),
    }).then(async (response) => {
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
 * @title API
 * @version 1.0
 * @contact
 *
 * API docs
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Home
   * @name HomeControllerAppInfo
   * @request GET:/
   */
  homeControllerAppInfo = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/`,
      method: 'GET',
      ...params,
    });

  api = {
    /**
     * No description
     *
     * @tags Gameidentifiers
     * @name GameIdentifiersControllerCreateV1
     * @request POST:/api/v1/game-identifiers
     * @secure
     */
    gameIdentifiersControllerCreateV1: (data: CreateGameIdentifiersDto, params: RequestParams = {}) =>
      this.request<GameIdentifiers, any>({
        path: `/api/v1/game-identifiers`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Gameidentifiers
     * @name GameIdentifiersControllerFindAllV1
     * @request GET:/api/v1/game-identifiers
     * @secure
     */
    gameIdentifiersControllerFindAllV1: (
      query?: {
        page?: number;
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InfinityPaginationGameIdentifiersResponseDto, any>({
        path: `/api/v1/game-identifiers`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Gameidentifiers
     * @name GameIdentifiersControllerFindByIdV1
     * @request GET:/api/v1/game-identifiers/{id}
     * @secure
     */
    gameIdentifiersControllerFindByIdV1: (id: string, params: RequestParams = {}) =>
      this.request<GameIdentifiers, any>({
        path: `/api/v1/game-identifiers/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Gameidentifiers
     * @name GameIdentifiersControllerUpdateV1
     * @request PATCH:/api/v1/game-identifiers/{id}
     * @secure
     */
    gameIdentifiersControllerUpdateV1: (id: string, data: UpdateGameIdentifiersDto, params: RequestParams = {}) =>
      this.request<GameIdentifiers, any>({
        path: `/api/v1/game-identifiers/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Gameidentifiers
     * @name GameIdentifiersControllerRemoveV1
     * @request DELETE:/api/v1/game-identifiers/{id}
     * @secure
     */
    gameIdentifiersControllerRemoveV1: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/game-identifiers/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Highestxprizes
     * @name HighestXPrizesControllerCreateV1
     * @request POST:/api/v1/highest-x-prizes
     * @secure
     */
    highestXPrizesControllerCreateV1: (data: CreatehighestXPrizesDto, params: RequestParams = {}) =>
      this.request<HighestXPrizes, any>({
        path: `/api/v1/highest-x-prizes`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Highestxprizes
     * @name HighestXPrizesControllerFindAllV1
     * @request GET:/api/v1/highest-x-prizes
     * @secure
     */
    highestXPrizesControllerFindAllV1: (
      query?: {
        page?: number;
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InfinityPaginationhighestXPrizesResponseDto, any>({
        path: `/api/v1/highest-x-prizes`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Highestxprizes
     * @name HighestXPrizesControllerFindByIdV1
     * @request GET:/api/v1/highest-x-prizes/{id}
     * @secure
     */
    highestXPrizesControllerFindByIdV1: (id: string, params: RequestParams = {}) =>
      this.request<HighestXPrizes, any>({
        path: `/api/v1/highest-x-prizes/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Highestxprizes
     * @name HighestXPrizesControllerUpdateV1
     * @request PATCH:/api/v1/highest-x-prizes/{id}
     * @secure
     */
    highestXPrizesControllerUpdateV1: (id: string, data: UpdatehighestXPrizesDto, params: RequestParams = {}) =>
      this.request<HighestXPrizes, any>({
        path: `/api/v1/highest-x-prizes/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Highestxprizes
     * @name HighestXPrizesControllerRemoveV1
     * @request DELETE:/api/v1/highest-x-prizes/{id}
     * @secure
     */
    highestXPrizesControllerRemoveV1: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/highest-x-prizes/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Leaderboardprizes
     * @name LeaderboardPrizesControllerCreateV1
     * @request POST:/api/v1/leaderboard-prizes
     * @secure
     */
    leaderboardPrizesControllerCreateV1: (data: CreateleaderboardPrizesDto, params: RequestParams = {}) =>
      this.request<LeaderboardPrizes, any>({
        path: `/api/v1/leaderboard-prizes`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Leaderboardprizes
     * @name LeaderboardPrizesControllerFindAllV1
     * @request GET:/api/v1/leaderboard-prizes
     * @secure
     */
    leaderboardPrizesControllerFindAllV1: (
      query?: {
        page?: number;
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InfinityPaginationleaderboardPrizesResponseDto, any>({
        path: `/api/v1/leaderboard-prizes`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Leaderboardprizes
     * @name LeaderboardPrizesControllerFindByIdV1
     * @request GET:/api/v1/leaderboard-prizes/{id}
     * @secure
     */
    leaderboardPrizesControllerFindByIdV1: (id: string, params: RequestParams = {}) =>
      this.request<LeaderboardPrizes, any>({
        path: `/api/v1/leaderboard-prizes/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Leaderboardprizes
     * @name LeaderboardPrizesControllerUpdateV1
     * @request PUT:/api/v1/leaderboard-prizes/{id}
     * @secure
     */
    leaderboardPrizesControllerUpdateV1: (id: string, data: UpdateleaderboardPrizesDto, params: RequestParams = {}) =>
      this.request<LeaderboardPrizes, any>({
        path: `/api/v1/leaderboard-prizes/${id}`,
        method: 'PUT',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Leaderboardprizes
     * @name LeaderboardPrizesControllerRemoveV1
     * @request DELETE:/api/v1/leaderboard-prizes/{id}
     * @secure
     */
    leaderboardPrizesControllerRemoveV1: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/leaderboard-prizes/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Streamerdata
     * @name StreamerDataControllerCreateV1
     * @request POST:/api/v1/streamer-data
     * @secure
     */
    streamerDataControllerCreateV1: (data: CreatestreamerDataDto, params: RequestParams = {}) =>
      this.request<StreamerData, any>({
        path: `/api/v1/streamer-data`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Streamerdata
     * @name StreamerDataControllerFindAllV1
     * @request GET:/api/v1/streamer-data
     * @secure
     */
    streamerDataControllerFindAllV1: (
      query?: {
        page?: number;
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InfinityPaginationstreamerDataResponseDto, any>({
        path: `/api/v1/streamer-data`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Streamerdata
     * @name StreamerDataControllerFindByIdV1
     * @request GET:/api/v1/streamer-data/{id}
     * @secure
     */
    streamerDataControllerFindByIdV1: (id: string, params: RequestParams = {}) =>
      this.request<StreamerData, any>({
        path: `/api/v1/streamer-data/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Streamerdata
     * @name StreamerDataControllerUpdateV1
     * @request PATCH:/api/v1/streamer-data/{id}
     * @secure
     */
    streamerDataControllerUpdateV1: (id: string, data: UpdatestreamerDataDto, params: RequestParams = {}) =>
      this.request<StreamerData, any>({
        path: `/api/v1/streamer-data/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Streamerdata
     * @name StreamerDataControllerRemoveV1
     * @request DELETE:/api/v1/streamer-data/{id}
     * @secure
     */
    streamerDataControllerRemoveV1: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/streamer-data/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliatedata
     * @name AffiliateDataControllerValidatePlayerRbV1
     * @request POST:/api/v1/affiliate-data/player/verification
     * @secure
     */
    affiliateDataControllerValidatePlayerRbV1: (data: PlayerVerificationDto, params: RequestParams = {}) =>
      this.request<PlayerVerificationResponseDto, any>({
        path: `/api/v1/affiliate-data/player/verification`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliatedata
     * @name AffiliateDataControllerFetchPlayerStatsV1
     * @request POST:/api/v1/affiliate-data/player/stats
     * @secure
     */
    affiliateDataControllerFetchPlayerStatsV1: (data: PlayerStatsDto, params: RequestParams = {}) =>
      this.request<PlayerStatsResponseDto, any>({
        path: `/api/v1/affiliate-data/player/stats`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliatedata
     * @name AffiliateDataControllerFetchLeaderboardDataV1
     * @request POST:/api/v1/affiliate-data/leaderboard/data
     * @secure
     */
    affiliateDataControllerFetchLeaderboardDataV1: (data: LeaderboardDataDto, params: RequestParams = {}) =>
      this.request<LeaderboardDataResponseDto, any>({
        path: `/api/v1/affiliate-data/leaderboard/data`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliatedata
     * @name AffiliateDataControllerFetchStatsByWagerV1
     * @request POST:/api/v1/affiliate-data/statsbywager
     * @secure
     */
    affiliateDataControllerFetchStatsByWagerV1: (data: LeaderboardDataDto, params: RequestParams = {}) =>
      this.request<LeaderboardDataResponseDto, any>({
        path: `/api/v1/affiliate-data/statsbywager`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliatedata
     * @name AffiliateDataControllerFetchPublicLeaderboardDataV1
     * @request POST:/api/v1/affiliate-data/public/leaderboard/data
     * @secure
     */
    affiliateDataControllerFetchPublicLeaderboardDataV1: (data: LeaderboardDataDto, params: RequestParams = {}) =>
      this.request<LeaderboardDataResponseDto, any>({
        path: `/api/v1/affiliate-data/public/leaderboard/data`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliatedata
     * @name AffiliateDataControllerFetchPublicHighestMultipliersV1
     * @request POST:/api/v1/affiliate-data/public/highestx/data
     * @secure
     */
    affiliateDataControllerFetchPublicHighestMultipliersV1: (data: LeaderboardDataDto, params: RequestParams = {}) =>
      this.request<LeaderboardDataResponseDto, any>({
        path: `/api/v1/affiliate-data/public/highestx/data`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Affiliatedata
     * @name AffiliateDataControllerFetchAdminHighestMultipliersV1
     * @request POST:/api/v1/affiliate-data/highestx/data
     * @secure
     */
    affiliateDataControllerFetchAdminHighestMultipliersV1: (data: LeaderboardDataDto, params: RequestParams = {}) =>
      this.request<LeaderboardDataResponseDto, any>({
        path: `/api/v1/affiliate-data/highestx/data`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loginhistories
     * @name LoginHistoriesControllerCreateV1
     * @request POST:/api/v1/login-histories
     * @secure
     */
    loginHistoriesControllerCreateV1: (data: CreateLoginHistoryDto, params: RequestParams = {}) =>
      this.request<LoginHistory, any>({
        path: `/api/v1/login-histories`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loginhistories
     * @name LoginHistoriesControllerFindAllV1
     * @request GET:/api/v1/login-histories
     * @secure
     */
    loginHistoriesControllerFindAllV1: (
      query?: {
        page?: number;
        limit?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<InfinityPaginationLoginHistoryResponseDto, any>({
        path: `/api/v1/login-histories`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loginhistories
     * @name LoginHistoriesControllerFindByIdV1
     * @request GET:/api/v1/login-histories/{id}
     * @secure
     */
    loginHistoriesControllerFindByIdV1: (id: string, params: RequestParams = {}) =>
      this.request<LoginHistory, any>({
        path: `/api/v1/login-histories/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loginhistories
     * @name LoginHistoriesControllerUpdateV1
     * @request PATCH:/api/v1/login-histories/{id}
     * @secure
     */
    loginHistoriesControllerUpdateV1: (id: string, data: UpdateLoginHistoryDto, params: RequestParams = {}) =>
      this.request<LoginHistory, any>({
        path: `/api/v1/login-histories/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Loginhistories
     * @name LoginHistoriesControllerRemoveV1
     * @request DELETE:/api/v1/login-histories/{id}
     * @secure
     */
    loginHistoriesControllerRemoveV1: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/login-histories/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerCreateV1
     * @request POST:/api/v1/users
     * @secure
     */
    usersControllerCreateV1: (data: CreateUserDto, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/v1/users`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerFindAllV1
     * @request GET:/api/v1/users
     * @secure
     */
    usersControllerFindAllV1: (
      query?: {
        page?: number;
        limit?: number;
        filters?: string;
        sort?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<InfinityPaginationUserResponseDto, any>({
        path: `/api/v1/users`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerFindOneV1
     * @request GET:/api/v1/users/{id}
     * @secure
     */
    usersControllerFindOneV1: (id: string, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/v1/users/${id}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerUpdateV1
     * @request PATCH:/api/v1/users/{id}
     * @secure
     */
    usersControllerUpdateV1: (id: string, data: UpdateUserDto, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/v1/users/${id}`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Users
     * @name UsersControllerRemoveV1
     * @request DELETE:/api/v1/users/{id}
     * @secure
     */
    usersControllerRemoveV1: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/users/${id}`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Files
     * @name FilesLocalControllerUploadFileV1
     * @request POST:/api/v1/files/upload
     * @secure
     */
    filesLocalControllerUploadFileV1: (
      data: {
        /** @format binary */
        file?: File;
      },
      params: RequestParams = {},
    ) =>
      this.request<FileResponseDto, any>({
        path: `/api/v1/files/upload`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLoginV1
     * @request POST:/api/v1/auth/email/login
     */
    authControllerLoginV1: (data: AuthEmailLoginDto, params: RequestParams = {}) =>
      this.request<LoginResponseDto, any>({
        path: `/api/v1/auth/email/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRegisterV1
     * @request POST:/api/v1/auth/email/register
     */
    authControllerRegisterV1: (data: AuthRegisterLoginDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/email/register`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerConfirmEmailV1
     * @request POST:/api/v1/auth/email/confirm
     */
    authControllerConfirmEmailV1: (data: AuthConfirmEmailDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/email/confirm`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerConfirmNewEmailV1
     * @request POST:/api/v1/auth/email/confirm/new
     */
    authControllerConfirmNewEmailV1: (data: AuthConfirmEmailDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/email/confirm/new`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerForgotPasswordV1
     * @request POST:/api/v1/auth/forgot/password
     */
    authControllerForgotPasswordV1: (data: AuthForgotPasswordDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/forgot/password`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerResetPasswordV1
     * @request POST:/api/v1/auth/reset/password
     */
    authControllerResetPasswordV1: (data: AuthResetPasswordDto, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/reset/password`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerMeV1
     * @request GET:/api/v1/auth/me
     * @secure
     */
    authControllerMeV1: (params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/v1/auth/me`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerUpdateV1
     * @request PATCH:/api/v1/auth/me
     * @secure
     */
    authControllerUpdateV1: (data: AuthUpdateDto, params: RequestParams = {}) =>
      this.request<User, any>({
        path: `/api/v1/auth/me`,
        method: 'PATCH',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerDeleteV1
     * @request DELETE:/api/v1/auth/me
     * @secure
     */
    authControllerDeleteV1: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/me`,
        method: 'DELETE',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerRefreshV1
     * @request POST:/api/v1/auth/refresh
     * @secure
     */
    authControllerRefreshV1: (params: RequestParams = {}) =>
      this.request<RefreshResponseDto, any>({
        path: `/api/v1/auth/refresh`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthControllerLogoutV1
     * @request POST:/api/v1/auth/logout
     * @secure
     */
    authControllerLogoutV1: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/api/v1/auth/logout`,
        method: 'POST',
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth
     * @name AuthGoogleControllerLoginV1
     * @request POST:/api/v1/auth/google/login
     */
    authGoogleControllerLoginV1: (data: AuthGoogleLoginDto, params: RequestParams = {}) =>
      this.request<LoginResponseDto, any>({
        path: `/api/v1/auth/google/login`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
}
