import { useQuery, QueryHookOptions, OperationVariables } from "@apollo/client";
import { queryList } from "@/utils/queryList";

type UseAppQueryOptions<TData> = QueryHookOptions<TData, OperationVariables> & {
  // Diğer opsiyonlar burada tanımlanabilir
};

// useAppQuery fonksiyonu
export function useAppQuery<TQueryName extends keyof QueryNameMap>(
  queryName: TQueryName,
  options?: UseAppQueryOptions<QueryTypeMap[TQueryName]>
) {
  // Sorgu adını sorgu dökümanına eşle
  const query = queryList[queryName];
  const { data, loading, error, refetch } = useQuery<QueryTypeMap[TQueryName]>(query, options);

  return {
    data,
    loading,
    error,
    refetch,
  };
}
