import { useQuery, QueryHookOptions, OperationVariables } from "@apollo/client";

type Role = "user" | "manager" | "veterinarian" | "staff";

type UseAppQueryOptions<TData> = QueryHookOptions<TData, OperationVariables> & {
  // Diğer opsiyonlar burada tanımlanabilir
};

// useNewAppQuery fonksiyonu
function useNewAppQuery<TData = any>({ query, options, asRole }: { query: any; options?: UseAppQueryOptions<TData>; asRole?: Role }) {
  const { data, loading, error, refetch } = useQuery<TData>(query, { ...options, context: { headers: { "x-hasura-role": asRole || "user" } } });

  return {
    data,
    loading,
    error,
    refetch,
  };
}

export { useNewAppQuery };
