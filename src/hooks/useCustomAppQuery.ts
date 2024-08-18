import { useQuery, QueryHookOptions, OperationVariables, TypedDocumentNode } from "@apollo/client";

type Role = "user" | "manager" | "veterinarian" | "staff";

type UseAppQueryOptions<TData, TVariables extends OperationVariables> = QueryHookOptions<TData, TVariables> & {
  // Diğer opsiyonlar burada tanımlanabilir
};

type UseNewAppQueryParams<TData, TVariables extends OperationVariables> = {
  query: TypedDocumentNode<TData, TVariables>;
  options?: UseAppQueryOptions<TData, TVariables>;
  asRole?: Role;
};

// useNewAppQuery fonksiyonu
function useCustomAppQuery<TData = any, TVariables extends OperationVariables = OperationVariables>(
  params: UseNewAppQueryParams<TData, TVariables>
) {
  const { query, options, asRole } = params;

  const { data, loading, error, refetch } = useQuery<TData, TVariables>(query, {
    ...options,
    context: {
      headers: {
        "x-hasura-role": asRole || "user",
      },
    },
  });

  return {
    data,
    loading,
    error,
    refetch,
  };
}

export { useCustomAppQuery };
