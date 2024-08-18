import { useQuery, QueryHookOptions, OperationVariables, TypedDocumentNode } from "@apollo/client";

type UseAppQueryOptions<TData, TVariables extends OperationVariables> = QueryHookOptions<TData, TVariables> & {
  // Diğer opsiyonlar burada tanımlanabilir
};

type UseNewAppQueryParams<TData, TVariables extends OperationVariables> = {
  query: TypedDocumentNode<TData, TVariables>;
  options?: UseAppQueryOptions<TData, TVariables>;
};

// useNewAppQuery fonksiyonu
function useCustomAppQuery<TData = any, TVariables extends OperationVariables = OperationVariables>(
  params: UseNewAppQueryParams<TData, TVariables>
) {
  const { query, options } = params;

  const { data, loading, error, refetch } = useQuery<TData, TVariables>(query, options);

  return {
    data,
    loading,
    error,
    refetch,
  };
}

export { useCustomAppQuery };
