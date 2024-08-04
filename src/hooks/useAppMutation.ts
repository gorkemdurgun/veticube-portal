import { store } from "@/redux/store";
import { useMutation, MutationHookOptions, TypedDocumentNode, MutationResult, MutationFunctionOptions, FetchResult } from "@apollo/client";
import { useCallback } from "react";
// import { getAuthHeaders } from './utils'; // Authentication header eklemek için yardımcı bir fonksiyon

type AppMutationResult<TData, TVariables> = MutationResult<TData> & {
  appMutate: (options?: MutationFunctionOptions<TData, TVariables>) => Promise<FetchResult<TData>>;
};

export function useAppMutation<TData, TVariables>(
  mutation: TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables>
): AppMutationResult<TData, TVariables> {
  const [mutate, result] = useMutation<TData, TVariables>(mutation, {
    ...options,
    context: {
      headers: {
        Authorization: store.getState().auth.clientSession?.idToken,
        ...options?.context?.headers,
      },
      ...options?.context,
    },
  });

  const appMutate = useCallback(
    async (mutationOptions?: MutationFunctionOptions<TData, TVariables>) => {
      return mutate({
        ...mutationOptions,
        context: {
          headers: {
            Authorization: store.getState().auth.clientSession?.idToken,
            ...mutationOptions?.context?.headers,
          },
          ...mutationOptions?.context,
        },
      });
    },
    [mutate]
  );

  return { ...result, appMutate };
}
