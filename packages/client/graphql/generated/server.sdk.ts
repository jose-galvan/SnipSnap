import { gql } from '@apollo/client'
import * as ApolloReactCommon from '@apollo/client/react'
import * as ApolloReactHooks from '@apollo/client/react'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: any; output: any }
}

export type AuthResponse = {
  access_token: Scalars['String']['output']
}

export type CreateSlugInput = {
  url: Scalars['String']['input']
}

export type Mutation = {
  createUrl: UrlType
  setUrlOwner: UrlType
  signIn: AuthResponse
  signUp: AuthResponse
  updateSlug: UrlType
}

export type MutationCreateUrlArgs = {
  input: CreateSlugInput
}

export type MutationSetUrlOwnerArgs = {
  id: Scalars['String']['input']
}

export type MutationSignInArgs = {
  input: SignInInput
}

export type MutationSignUpArgs = {
  input: SignUpInput
}

export type MutationUpdateSlugArgs = {
  input: UpdateSlugInput
}

export type Query = {
  count: Scalars['Float']['output']
  countClicks: Scalars['Float']['output']
  mostPopular: Array<UrlType>
  mostRecent: Array<UrlType>
}

export type SignInInput = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type SignUpInput = {
  password: Scalars['String']['input']
  username: Scalars['String']['input']
}

export type UpdateSlugInput = {
  id: Scalars['String']['input']
  slug: Scalars['String']['input']
}

export type UrlType = {
  clickCount: Scalars['Int']['output']
  createdAt: Scalars['DateTime']['output']
  createdById?: Maybe<Scalars['String']['output']>
  id: Scalars['String']['output']
  originalUrl: Scalars['String']['output']
  slug?: Maybe<Scalars['String']['output']>
  updatedAt: Scalars['DateTime']['output']
}

export type AuthFieldsFragment = { access_token: string }

export type SignInMutationVariables = Exact<{
  input: SignInInput
}>

export type SignInMutation = { signIn: { access_token: string } }

export type SignUpMutationVariables = Exact<{
  input: SignUpInput
}>

export type SignUpMutation = { signUp: { access_token: string } }

export type UrlFieldsFragment = {
  id: string
  slug?: string | null
  clickCount: number
  originalUrl: string
  createdById?: string | null
}

export type CreateSlugMutationVariables = Exact<{
  input: CreateSlugInput
}>

export type CreateSlugMutation = {
  createUrl: { id: string; slug?: string | null; clickCount: number; originalUrl: string; createdById?: string | null }
}

export type MostRecentQueryVariables = Exact<{ [key: string]: never }>

export type MostRecentQuery = {
  mostRecent: Array<{
    id: string
    slug?: string | null
    clickCount: number
    originalUrl: string
    createdById?: string | null
  }>
}

export type MostPopularQueryVariables = Exact<{ [key: string]: never }>

export type MostPopularQuery = {
  mostPopular: Array<{
    id: string
    slug?: string | null
    clickCount: number
    originalUrl: string
    createdById?: string | null
  }>
}

export type CountQueryVariables = Exact<{ [key: string]: never }>

export type CountQuery = { count: number }

export type CountClicksQueryVariables = Exact<{ [key: string]: never }>

export type CountClicksQuery = { countClicks: number }

export type UpdateSlugMutationVariables = Exact<{
  input: UpdateSlugInput
}>

export type UpdateSlugMutation = {
  updateSlug: { id: string; slug?: string | null; clickCount: number; originalUrl: string; createdById?: string | null }
}

export type SetUrlOwnerMutationVariables = Exact<{
  id: Scalars['String']['input']
}>

export type SetUrlOwnerMutation = {
  setUrlOwner: {
    id: string
    slug?: string | null
    clickCount: number
    originalUrl: string
    createdById?: string | null
  }
}

export const AuthFieldsFragmentDoc = gql`
  fragment AuthFields on AuthResponse {
    access_token
  }
`
export const UrlFieldsFragmentDoc = gql`
  fragment UrlFields on UrlType {
    id
    slug
    clickCount
    originalUrl
    createdById
  }
`
export const SignInDocument = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      ...AuthFields
    }
  }
  ${AuthFieldsFragmentDoc}
`

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SignInMutation, SignInMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options)
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>
export type SignInMutationResult = ApolloReactCommon.MutationResult<SignInMutation>
export const SignUpDocument = gql`
  mutation signUp($input: SignUpInput!) {
    signUp(input: $input) {
      ...AuthFields
    }
  }
  ${AuthFieldsFragmentDoc}
`

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options)
}
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>
export const CreateSlugDocument = gql`
  mutation createSlug($input: CreateSlugInput!) {
    createUrl(input: $input) {
      ...UrlFields
    }
  }
  ${UrlFieldsFragmentDoc}
`

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
export function useCreateSlugMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateSlugMutation, CreateSlugMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<CreateSlugMutation, CreateSlugMutationVariables>(CreateSlugDocument, options)
}
export type CreateSlugMutationHookResult = ReturnType<typeof useCreateSlugMutation>
export type CreateSlugMutationResult = ApolloReactCommon.MutationResult<CreateSlugMutation>
export const MostRecentDocument = gql`
  query mostRecent {
    mostRecent {
      ...UrlFields
    }
  }
  ${UrlFieldsFragmentDoc}
`

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
export function useMostRecentQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MostRecentQuery, MostRecentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<MostRecentQuery, MostRecentQueryVariables>(MostRecentDocument, options)
}
export function useMostRecentLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MostRecentQuery, MostRecentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<MostRecentQuery, MostRecentQueryVariables>(MostRecentDocument, options)
}
export function useMostRecentSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<MostRecentQuery, MostRecentQueryVariables>
) {
  const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useSuspenseQuery<MostRecentQuery, MostRecentQueryVariables>(MostRecentDocument, options)
}
export type MostRecentQueryHookResult = ReturnType<typeof useMostRecentQuery>
export type MostRecentLazyQueryHookResult = ReturnType<typeof useMostRecentLazyQuery>
export type MostRecentSuspenseQueryHookResult = ReturnType<typeof useMostRecentSuspenseQuery>
export type MostRecentQueryResult = ApolloReactCommon.QueryResult<MostRecentQuery, MostRecentQueryVariables>
export const MostPopularDocument = gql`
  query mostPopular {
    mostPopular {
      ...UrlFields
    }
  }
  ${UrlFieldsFragmentDoc}
`

/**
 * __useMostPopularQuery__
 *
 * To run a query within a React component, call `useMostPopularQuery` and pass it any options that fit your needs.
 * When your component renders, `useMostPopularQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMostPopularQuery({
 *   variables: {
 *   },
 * });
 */
export function useMostPopularQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MostPopularQuery, MostPopularQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<MostPopularQuery, MostPopularQueryVariables>(MostPopularDocument, options)
}
export function useMostPopularLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MostPopularQuery, MostPopularQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<MostPopularQuery, MostPopularQueryVariables>(MostPopularDocument, options)
}
export function useMostPopularSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<MostPopularQuery, MostPopularQueryVariables>
) {
  const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useSuspenseQuery<MostPopularQuery, MostPopularQueryVariables>(MostPopularDocument, options)
}
export type MostPopularQueryHookResult = ReturnType<typeof useMostPopularQuery>
export type MostPopularLazyQueryHookResult = ReturnType<typeof useMostPopularLazyQuery>
export type MostPopularSuspenseQueryHookResult = ReturnType<typeof useMostPopularSuspenseQuery>
export type MostPopularQueryResult = ApolloReactCommon.QueryResult<MostPopularQuery, MostPopularQueryVariables>
export const CountDocument = gql`
  query count {
    count
  }
`

/**
 * __useCountQuery__
 *
 * To run a query within a React component, call `useCountQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CountQuery, CountQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<CountQuery, CountQueryVariables>(CountDocument, options)
}
export function useCountLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CountQuery, CountQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<CountQuery, CountQueryVariables>(CountDocument, options)
}
export function useCountSuspenseQuery(
  baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CountQuery, CountQueryVariables>
) {
  const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useSuspenseQuery<CountQuery, CountQueryVariables>(CountDocument, options)
}
export type CountQueryHookResult = ReturnType<typeof useCountQuery>
export type CountLazyQueryHookResult = ReturnType<typeof useCountLazyQuery>
export type CountSuspenseQueryHookResult = ReturnType<typeof useCountSuspenseQuery>
export type CountQueryResult = ApolloReactCommon.QueryResult<CountQuery, CountQueryVariables>
export const CountClicksDocument = gql`
  query countClicks {
    countClicks
  }
`

/**
 * __useCountClicksQuery__
 *
 * To run a query within a React component, call `useCountClicksQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountClicksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountClicksQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountClicksQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<CountClicksQuery, CountClicksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useQuery<CountClicksQuery, CountClicksQueryVariables>(CountClicksDocument, options)
}
export function useCountClicksLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CountClicksQuery, CountClicksQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useLazyQuery<CountClicksQuery, CountClicksQueryVariables>(CountClicksDocument, options)
}
export function useCountClicksSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<CountClicksQuery, CountClicksQueryVariables>
) {
  const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useSuspenseQuery<CountClicksQuery, CountClicksQueryVariables>(CountClicksDocument, options)
}
export type CountClicksQueryHookResult = ReturnType<typeof useCountClicksQuery>
export type CountClicksLazyQueryHookResult = ReturnType<typeof useCountClicksLazyQuery>
export type CountClicksSuspenseQueryHookResult = ReturnType<typeof useCountClicksSuspenseQuery>
export type CountClicksQueryResult = ApolloReactCommon.QueryResult<CountClicksQuery, CountClicksQueryVariables>
export const UpdateSlugDocument = gql`
  mutation updateSlug($input: UpdateSlugInput!) {
    updateSlug(input: $input) {
      ...UrlFields
    }
  }
  ${UrlFieldsFragmentDoc}
`

/**
 * __useUpdateSlugMutation__
 *
 * To run a mutation, you first call `useUpdateSlugMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSlugMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateSlugMutation, { data, loading, error }] = useUpdateSlugMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateSlugMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateSlugMutation, UpdateSlugMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<UpdateSlugMutation, UpdateSlugMutationVariables>(UpdateSlugDocument, options)
}
export type UpdateSlugMutationHookResult = ReturnType<typeof useUpdateSlugMutation>
export type UpdateSlugMutationResult = ApolloReactCommon.MutationResult<UpdateSlugMutation>
export const SetUrlOwnerDocument = gql`
  mutation setUrlOwner($id: String!) {
    setUrlOwner(id: $id) {
      ...UrlFields
    }
  }
  ${UrlFieldsFragmentDoc}
`

/**
 * __useSetUrlOwnerMutation__
 *
 * To run a mutation, you first call `useSetUrlOwnerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetUrlOwnerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setUrlOwnerMutation, { data, loading, error }] = useSetUrlOwnerMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSetUrlOwnerMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<SetUrlOwnerMutation, SetUrlOwnerMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions }
  return ApolloReactHooks.useMutation<SetUrlOwnerMutation, SetUrlOwnerMutationVariables>(SetUrlOwnerDocument, options)
}
export type SetUrlOwnerMutationHookResult = ReturnType<typeof useSetUrlOwnerMutation>
export type SetUrlOwnerMutationResult = ApolloReactCommon.MutationResult<SetUrlOwnerMutation>
