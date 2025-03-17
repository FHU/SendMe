/**
 * This file was auto-generated by @openapi-qraft/cli.
 * Do not make direct changes to the file.
 */

import type { paths } from "../schema";
import type { InvalidateQueryFilters, OperationInfiniteData, PartialParameters, QueryFiltersByParameters, QueryFiltersByQueryKey, QueryFnOptionsByParameters, QueryFnOptionsByQueryKey, RequestFnResponse, ServiceOperationEnsureInfiniteQueryDataOptions, ServiceOperationEnsureQueryDataOptions, ServiceOperationFetchInfiniteQueryOptions, ServiceOperationFetchQueryOptions, ServiceOperationInfiniteQueryKey, ServiceOperationQueryKey, UseQueryOptionsForUseQueries, UseQueryOptionsForUseSuspenseQuery, WithOptional } from "@openapi-qraft/tanstack-query-react-types";
import type { CancelOptions, InfiniteQueryPageParamsOptions, InvalidateOptions, NoInfer, QueryState, RefetchOptions, ResetOptions, SetDataOptions, Updater } from "@tanstack/query-core";
import type { DefinedInitialDataInfiniteOptions, DefinedInitialDataOptions, DefinedUseInfiniteQueryResult, DefinedUseQueryResult, UndefinedInitialDataInfiniteOptions, UndefinedInitialDataOptions, UseInfiniteQueryResult, UseQueryResult, UseSuspenseInfiniteQueryOptions, UseSuspenseInfiniteQueryResult, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
export interface HelloService {
    /** @summary Hello World */
    helloWorldHelloGet: {
        /** @summary Hello World */
        cancelQueries<TInfinite extends boolean = false>(filters?: QueryFiltersByParameters<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError> | QueryFiltersByQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError>, options?: CancelOptions): Promise<void>;
        /** @summary Hello World */
        getQueryKey(parameters: HelloWorldHelloGetParameters | void): ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>;
        /**
         * Performs asynchronous data fetching, manages loading states and error handling.
         *
         * @summary Hello World
         * @see {@link https://openapi-qraft.github.io/openapi-qraft/docs/hooks/useQuery|`useQuery(...)` documentation}
         * @example Query without parameters
         * ```ts
         * const { data, isLoading } = qraft.helloService.helloWorldHelloGet.useQuery()
         * ```
         */
        useQuery<TData = HelloWorldHelloGetData>(parameters: ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters> | (HelloWorldHelloGetParameters | void), options?: Omit<UndefinedInitialDataOptions<HelloWorldHelloGetData, HelloWorldHelloGetError, TData, ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>>, "queryKey">): UseQueryResult<TData, HelloWorldHelloGetError | Error>;
        /**
         * Performs asynchronous data fetching, manages loading states and error handling.
         *
         * @summary Hello World
         * @see {@link https://openapi-qraft.github.io/openapi-qraft/docs/hooks/useQuery|`useQuery(...)` documentation}
         * @example Query without parameters
         * ```ts
         * const { data, isLoading } = qraft.helloService.helloWorldHelloGet.useQuery()
         * ```
         */
        useQuery<TData = HelloWorldHelloGetData>(parameters: ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters> | (HelloWorldHelloGetParameters | void), options: Omit<DefinedInitialDataOptions<HelloWorldHelloGetData, HelloWorldHelloGetError, TData, ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>>, "queryKey">): DefinedUseQueryResult<TData, HelloWorldHelloGetError | Error>;
        /** @summary Hello World */
        fetchInfiniteQuery<TPageParam extends HelloWorldHelloGetParameters>(options: ServiceOperationFetchInfiniteQueryOptions<HelloWorldHelloGetSchema, HelloWorldHelloGetData, HelloWorldHelloGetParameters, TPageParam, HelloWorldHelloGetError>): Promise<OperationInfiniteData<HelloWorldHelloGetData, HelloWorldHelloGetParameters>>;
        /** @summary Hello World */
        prefetchInfiniteQuery<TPageParam extends HelloWorldHelloGetParameters>(options: ServiceOperationFetchInfiniteQueryOptions<HelloWorldHelloGetSchema, HelloWorldHelloGetData, HelloWorldHelloGetParameters, TPageParam, HelloWorldHelloGetError>): Promise<void>;
        /** @summary Hello World */
        ensureInfiniteQueryData<TPageParam extends HelloWorldHelloGetParameters>(options: ServiceOperationEnsureInfiniteQueryDataOptions<HelloWorldHelloGetSchema, HelloWorldHelloGetData, HelloWorldHelloGetParameters, TPageParam, HelloWorldHelloGetError>): Promise<OperationInfiniteData<HelloWorldHelloGetData, HelloWorldHelloGetParameters>>;
        /** @summary Hello World */
        fetchQuery(options: ServiceOperationFetchQueryOptions<HelloWorldHelloGetSchema, HelloWorldHelloGetData, HelloWorldHelloGetParameters, HelloWorldHelloGetError> | void): Promise<HelloWorldHelloGetData>;
        /** @summary Hello World */
        prefetchQuery(options: ServiceOperationFetchQueryOptions<HelloWorldHelloGetSchema, HelloWorldHelloGetData, HelloWorldHelloGetParameters, HelloWorldHelloGetError> | void): Promise<void>;
        /** @summary Hello World */
        ensureQueryData(options: ServiceOperationEnsureQueryDataOptions<HelloWorldHelloGetSchema, HelloWorldHelloGetData, HelloWorldHelloGetParameters, HelloWorldHelloGetError> | void): Promise<HelloWorldHelloGetData>;
        /** @summary Hello World */
        getInfiniteQueryData(parameters: ServiceOperationInfiniteQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters> | (HelloWorldHelloGetParameters | void)): OperationInfiniteData<HelloWorldHelloGetData, HelloWorldHelloGetParameters> | undefined;
        /** @summary Hello World */
        getQueriesData<TInfinite extends boolean = false>(filters?: QueryFiltersByParameters<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError> | QueryFiltersByQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError>): TInfinite extends true ? Array<[
            queryKey: ServiceOperationInfiniteQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>,
            data: NoInfer<OperationInfiniteData<HelloWorldHelloGetData, HelloWorldHelloGetParameters>> | undefined
        ]> : Array<[
            queryKey: ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>,
            data: HelloWorldHelloGetData | undefined
        ]>;
        /** @summary Hello World */
        getQueryData(parameters: ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters> | (HelloWorldHelloGetParameters | void)): HelloWorldHelloGetData | undefined;
        /** @summary Hello World */
        getQueryState(parameters: ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters> | (HelloWorldHelloGetParameters | void)): QueryState<HelloWorldHelloGetData, HelloWorldHelloGetError> | undefined;
        /** @summary Hello World */
        getInfiniteQueryState(parameters: HelloWorldHelloGetParameters | ServiceOperationInfiniteQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters> | void): QueryState<OperationInfiniteData<HelloWorldHelloGetData, HelloWorldHelloGetParameters>, HelloWorldHelloGetError> | undefined;
        /** @summary Hello World */
        invalidateQueries<TInfinite extends boolean = false>(filters?: InvalidateQueryFilters<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError>, options?: InvalidateOptions): Promise<void>;
        /** @summary Hello World */
        isFetching<TInfinite extends boolean = false>(filters?: QueryFiltersByParameters<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError> | QueryFiltersByQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError>): number;
        /** @summary Hello World */
        <TMeta extends Record<string, any>, TSignal extends AbortSignal = AbortSignal>(options: QueryFnOptionsByQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters, TMeta, TSignal> | (QueryFnOptionsByParameters<HelloWorldHelloGetParameters, TMeta, TSignal> | void), client?: (schema: HelloWorldHelloGetSchema, options: {
            parameters: HelloWorldHelloGetParameters;
            signal?: TSignal;
            meta?: TMeta;
        }) => Promise<RequestFnResponse<HelloWorldHelloGetData, HelloWorldHelloGetError>>): Promise<RequestFnResponse<HelloWorldHelloGetData, HelloWorldHelloGetError>>;
        /** @summary Hello World */
        refetchQueries<TInfinite extends boolean = false>(filters?: QueryFiltersByParameters<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError> | QueryFiltersByQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError>, options?: RefetchOptions): Promise<void>;
        /** @summary Hello World */
        removeQueries<TInfinite extends boolean = false>(filters?: QueryFiltersByParameters<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError> | QueryFiltersByQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError>): void;
        /** @summary Hello World */
        resetQueries<TInfinite extends boolean = false>(filters?: QueryFiltersByParameters<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError> | QueryFiltersByQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError>, options?: ResetOptions): Promise<void>;
        /** @summary Hello World */
        setInfiniteQueryData(parameters: HelloWorldHelloGetParameters | ServiceOperationInfiniteQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>, updater: Updater<NoInfer<OperationInfiniteData<HelloWorldHelloGetData, HelloWorldHelloGetParameters>> | undefined, NoInfer<OperationInfiniteData<HelloWorldHelloGetData, HelloWorldHelloGetParameters>> | undefined>, options?: SetDataOptions): OperationInfiniteData<HelloWorldHelloGetData, HelloWorldHelloGetParameters> | undefined;
        /** @summary Hello World */
        setQueriesData<TInfinite extends boolean = false>(filters: QueryFiltersByParameters<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError> | QueryFiltersByQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError>, updater: Updater<NoInfer<HelloWorldHelloGetData> | undefined, NoInfer<HelloWorldHelloGetData> | undefined>, options?: SetDataOptions): Array<HelloWorldHelloGetData | undefined>;
        /** @summary Hello World */
        setQueryData(parameters: (HelloWorldHelloGetParameters | undefined) | ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>, updater: Updater<NoInfer<HelloWorldHelloGetData> | undefined, NoInfer<HelloWorldHelloGetData> | undefined>, options?: SetDataOptions): HelloWorldHelloGetData | undefined;
        /** @summary Hello World */
        getInfiniteQueryKey(parameters: HelloWorldHelloGetParameters | void): ServiceOperationInfiniteQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>;
        /**
         * Performs asynchronous data fetching with support for infinite scrolling scenarios.
         * Manages paginated data and provides utilities for fetching additional pages.
         *
         * @see {@link https://openapi-qraft.github.io/openapi-qraft/docs/hooks/useInfiniteQuery|`useInfiniteQuery(...)` documentation}
         *
         * @example Infinite Query
         * ```ts
         * const { data, isLoading, fetchNextPage } = qraft.helloService.helloWorldHelloGet.useInfiniteQuery({}, {
         *     initialPageParam: {},
         *     getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => getNextPageParams(lastPage)
         * })
         *
         * console.log(data);
         * fetchNextPage(); // Fetch the next page
         * ```
         */
        useInfiniteQuery<TPageParam extends HelloWorldHelloGetParameters, TQueryFnData = HelloWorldHelloGetData, TData = OperationInfiniteData<TQueryFnData, HelloWorldHelloGetParameters>>(parameters: ServiceOperationInfiniteQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters> | (HelloWorldHelloGetParameters | void), options: Omit<UndefinedInitialDataInfiniteOptions<TQueryFnData, HelloWorldHelloGetError, TData, ServiceOperationInfiniteQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>, PartialParameters<TPageParam>>, "queryKey" | "getPreviousPageParam" | "getNextPageParam" | "initialPageParam"> & InfiniteQueryPageParamsOptions<TQueryFnData, PartialParameters<TPageParam>>): UseInfiniteQueryResult<TData, HelloWorldHelloGetError | Error>;
        /**
         * Performs asynchronous data fetching with support for infinite scrolling scenarios.
         * Manages paginated data and provides utilities for fetching additional pages.
         *
         * @see {@link https://openapi-qraft.github.io/openapi-qraft/docs/hooks/useInfiniteQuery|`useInfiniteQuery(...)` documentation}
         *
         * @example Infinite Query
         * ```ts
         * const { data, isLoading, fetchNextPage } = qraft.helloService.helloWorldHelloGet.useInfiniteQuery({}, {
         *     initialPageParam: {},
         *     getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => getNextPageParams(lastPage)
         * })
         *
         * console.log(data);
         * fetchNextPage(); // Fetch the next page
         * ```
         */
        useInfiniteQuery<TPageParam extends HelloWorldHelloGetParameters, TQueryFnData = HelloWorldHelloGetData, TData = OperationInfiniteData<TQueryFnData, HelloWorldHelloGetParameters>>(parameters: ServiceOperationInfiniteQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters> | (HelloWorldHelloGetParameters | void), options: Omit<DefinedInitialDataInfiniteOptions<TQueryFnData, HelloWorldHelloGetError, TData, ServiceOperationInfiniteQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>, PartialParameters<TPageParam>>, "queryKey" | "getPreviousPageParam" | "getNextPageParam" | "initialPageParam"> & InfiniteQueryPageParamsOptions<HelloWorldHelloGetData, PartialParameters<TPageParam>>): DefinedUseInfiniteQueryResult<TData, HelloWorldHelloGetError | Error>;
        /**
         * Monitors the number of queries currently fetching, matching the provided filters.
         * Useful for creating loading indicators or performing actions based on active requests.
         *
         * @see {@link https://openapi-qraft.github.io/openapi-qraft/docs/hooks/useIsFetching|`useIsFetching(...)` documentation}
         * @example Checks the total number of queries fetching from the specified service method,
         * both normal and infinite. If no parameters are provided, no filtering is applied.
         * ```ts
         * const helloWorldHelloGetTotal = qraft.helloService.helloWorldHelloGet.useIsFetching()
         * ```
         */
        useIsFetching<TInfinite extends boolean = false>(filters?: QueryFiltersByParameters<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError> | QueryFiltersByQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetData, TInfinite, HelloWorldHelloGetParameters, HelloWorldHelloGetError>): number;
        /**
         * Allows you to execute multiple asynchronous data fetching operations concurrently. This is especially useful for managing complex data dependencies in parallel.
         *
         * @summary Hello World
         * @see {@link https://openapi-qraft.github.io/openapi-qraft/docs/hooks/useQueries|`useQueries(...)` documentation}
         * @example Multiple queries. Returns `data`, `error`, `isSuccess` and other properties.
         * ```ts
         * const helloWorldHelloGetResults = qraft.helloService.helloWorldHelloGet.useQueries({
         *     queries: [
         *         {},
         *         {}
         *     ]
         * });
         * helloWorldHelloGetResults.forEach(({ isSuccess, data, error }) => console.log({ isSuccess, data, error }));
         * ```
         * @example Combined results. Only the data will be returned.
         * ```ts
         * const helloWorldHelloGetCombinedResults = qraft.helloService.helloWorldHelloGet.useQueries({
         *     combine: results => results.map(result => result.data),
         *     queries: [
         *         {},
         *         {}
         *     ]
         * });
         * helloWorldHelloGetCombinedResults.forEach(data => console.log({ data }));
         * ```
         */
        useQueries<T extends Array<UseQueryOptionsForUseQueries<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters, HelloWorldHelloGetData, HelloWorldHelloGetError>>, TCombinedResult = Array<UseQueryResult<HelloWorldHelloGetData, HelloWorldHelloGetError>>>(options: {
            queries: T;
            combine?: (results: Array<UseQueryResult<HelloWorldHelloGetData, HelloWorldHelloGetError>>) => TCombinedResult;
        }): TCombinedResult;
        /** @summary Hello World */
        getQueryKey(parameters: HelloWorldHelloGetParameters | void): ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>;
        /**
         * Performs asynchronous data fetching, manages loading states and error handling.
         *
         * @summary Hello World
         * @see {@link https://openapi-qraft.github.io/openapi-qraft/docs/hooks/useQuery|`useQuery(...)` documentation}
         * @example Query without parameters
         * ```ts
         * const { data, isLoading } = qraft.helloService.helloWorldHelloGet.useQuery()
         * ```
         */
        useQuery<TData = HelloWorldHelloGetData>(parameters: ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters> | (HelloWorldHelloGetParameters | void), options?: Omit<UndefinedInitialDataOptions<HelloWorldHelloGetData, HelloWorldHelloGetError, TData, ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>>, "queryKey">): UseQueryResult<TData, HelloWorldHelloGetError | Error>;
        /**
         * Performs asynchronous data fetching, manages loading states and error handling.
         *
         * @summary Hello World
         * @see {@link https://openapi-qraft.github.io/openapi-qraft/docs/hooks/useQuery|`useQuery(...)` documentation}
         * @example Query without parameters
         * ```ts
         * const { data, isLoading } = qraft.helloService.helloWorldHelloGet.useQuery()
         * ```
         */
        useQuery<TData = HelloWorldHelloGetData>(parameters: ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters> | (HelloWorldHelloGetParameters | void), options: Omit<DefinedInitialDataOptions<HelloWorldHelloGetData, HelloWorldHelloGetError, TData, ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>>, "queryKey">): DefinedUseQueryResult<TData, HelloWorldHelloGetError | Error>;
        /**
         * Performs asynchronous data fetching with support for infinite scrolling scenarios.
         * Manages paginated data and provides utilities for fetching additional pages.
         * It functions similarly to `useInfiniteQuery`, but with added support for React Suspense.
         *
         * @see {@link https://openapi-qraft.github.io/openapi-qraft/docs/hooks/useSuspenseInfiniteQuery|`useSuspenseInfiniteQuery(...)` documentation}
         *
         * @example Suspense Infinite Query
         * ```ts
         * const { data, isLoading, fetchNextPage } = qraft.helloService.helloWorldHelloGet.useSuspenseInfiniteQuery({}, {
         *     initialPageParam: {},
         *     getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => getNextPageParams(lastPage)
         * })
         *
         * console.log(data);
         * fetchNextPage(); // Fetch the next page
         * ```
         */
        useSuspenseInfiniteQuery<TPageParam extends HelloWorldHelloGetParameters, TData = HelloWorldHelloGetData>(parameters: ServiceOperationInfiniteQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters> | (HelloWorldHelloGetParameters | void), options: Omit<UseSuspenseInfiniteQueryOptions<HelloWorldHelloGetData, HelloWorldHelloGetError, OperationInfiniteData<TData, HelloWorldHelloGetParameters>, HelloWorldHelloGetData, ServiceOperationInfiniteQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>, PartialParameters<TPageParam>>, "queryKey" | "getPreviousPageParam" | "getNextPageParam" | "initialPageParam"> & InfiniteQueryPageParamsOptions<HelloWorldHelloGetData, PartialParameters<TPageParam>>): UseSuspenseInfiniteQueryResult<OperationInfiniteData<TData, HelloWorldHelloGetParameters>, HelloWorldHelloGetError | Error>;
        /** @summary Hello World */
        useSuspenseQueries<T extends Array<UseQueryOptionsForUseSuspenseQuery<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters, HelloWorldHelloGetData, HelloWorldHelloGetError>>, TCombinedResult = Array<UseSuspenseQueryResult<HelloWorldHelloGetData, HelloWorldHelloGetError>>>(options: {
            queries: T;
            combine?: (results: Array<WithOptional<UseSuspenseQueryResult<HelloWorldHelloGetData, HelloWorldHelloGetError>, "data">>) => TCombinedResult;
        }): TCombinedResult;
        /** @summary Hello World */
        useSuspenseQuery<TData = HelloWorldHelloGetData>(parameters: ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters> | (HelloWorldHelloGetParameters | void), options?: Omit<UseSuspenseQueryOptions<HelloWorldHelloGetData, HelloWorldHelloGetError, TData, ServiceOperationQueryKey<HelloWorldHelloGetSchema, HelloWorldHelloGetParameters>>, "queryKey">): UseSuspenseQueryResult<TData, HelloWorldHelloGetError | Error>;
        schema: HelloWorldHelloGetSchema;
        types: {
            parameters: HelloWorldHelloGetParameters;
            data: HelloWorldHelloGetData;
            error: HelloWorldHelloGetError;
        };
    };
}
export const helloService: {
    /** @summary Hello World */
    helloWorldHelloGet: {
        schema: {
            method: "get";
            url: "/hello";
        };
    };
} = {
    helloWorldHelloGet: {
        schema: {
            method: "get",
            url: "/hello"
        }
    }
};
type HelloWorldHelloGetSchema = {
    method: "get";
    url: "/hello";
};
type HelloWorldHelloGetParameters = undefined;
type HelloWorldHelloGetData = paths["/hello"]["get"]["responses"]["200"]["content"]["application/json"];
type HelloWorldHelloGetError = unknown;
