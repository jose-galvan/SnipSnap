import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export type CreateSlugInput = {
  url: Scalars['String']['input'];
};

export type Mutation = {
  createUrl: UrlType;
};


export type MutationCreateUrlArgs = {
  input: CreateSlugInput;
};

export type Query = {
  mostRecent: Array<UrlType>;
};

export type UrlType = {
  clickCount: Scalars['Int']['output'];
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  originalUrl: Scalars['String']['output'];
  slug?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type UrlFieldsFragment = { id: string, slug?: string | null, clickCount: number, originalUrl: string };

export type CreateSlugMutationVariables = Exact<{
  input: CreateSlugInput;
}>;


export type CreateSlugMutation = { createUrl: { id: string, slug?: string | null, clickCount: number, originalUrl: string } };

export type MostRecentQueryVariables = Exact<{ [key: string]: never; }>;


export type MostRecentQuery = { mostRecent: Array<{ id: string, slug?: string | null, clickCount: number, originalUrl: string }> };

export const UrlFieldsFragmentDoc = gql`
    fragment UrlFields on UrlType {
  id
  slug
  clickCount
  originalUrl
}
    `;
export const CreateSlugDocument = gql`
    mutation createSlug($input: CreateSlugInput!) {
  createUrl(input: $input) {
    ...UrlFields
  }
}
    ${UrlFieldsFragmentDoc}`;

/**
 * __useCreateSlugMutation__
 *
 * To run a mutation, you first call `useCreateSlugMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSlugMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSlugMutation, { data, loading, error }] = useCreateSlugMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSlugMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSlugMutation, CreateSlugMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateSlugMutation, CreateSlugMutationVariables>(CreateSlugDocument, options);
      }
export type CreateSlugMutationHookResult = ReturnType<typeof useCreateSlugMutation>;
export type CreateSlugMutationResult = ApolloReactCommon.MutationResult<CreateSlugMutation>;
export const MostRecentDocument = gql`
    query mostRecent {
  mostRecent {
    ...UrlFields
  }
}
    ${UrlFieldsFragmentDoc}`;

/**
 * __useMostRecentQuery__
 *
 * To run a query within a React component, call `useMostRecentQuery` and pass it any options that fit your needs.
 * When your component renders, `useMostRecentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMostRecentQuery({
 *   variables: {
 *   },
 * });
 */
export function useMostRecentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MostRecentQuery, MostRecentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MostRecentQuery, MostRecentQueryVariables>(MostRecentDocument, options);
      }
export function useMostRecentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MostRecentQuery, MostRecentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MostRecentQuery, MostRecentQueryVariables>(MostRecentDocument, options);
        }
export function useMostRecentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MostRecentQuery, MostRecentQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MostRecentQuery, MostRecentQueryVariables>(MostRecentDocument, options);
        }
export type MostRecentQueryHookResult = ReturnType<typeof useMostRecentQuery>;
export type MostRecentLazyQueryHookResult = ReturnType<typeof useMostRecentLazyQuery>;
export type MostRecentSuspenseQueryHookResult = ReturnType<typeof useMostRecentSuspenseQuery>;
export type MostRecentQueryResult = ApolloReactCommon.QueryResult<MostRecentQuery, MostRecentQueryVariables>;