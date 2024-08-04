import { useQuery, QueryHookOptions, OperationVariables } from '@apollo/client';
import { TypedDocumentNode } from '@graphql-typed-document-node/core';
import { GET_CLINIC_AND_BRANCHES, GetClinicAndBranchesResponse } from '@/services/db/queries/clinic';

// Sorgu türlerini içeren bir tip haritası
type QueryTypeMap = {
  GetClinicAndBranches: GetClinicAndBranchesResponse;
  // Diğer sorgu türleri burada tanımlanabilir
};

// Sorgu adlarını ve sorgu dökümanlarını eşleştiren tür
type Queries = {
  GetClinicAndBranches: TypedDocumentNode<GetClinicAndBranchesResponse, OperationVariables>;
  // Diğer sorgu dökümanları burada tanımlanabilir
};

type UseAppQueryOptions<TData> = QueryHookOptions<TData, OperationVariables> & {
  // Diğer opsiyonlar burada tanımlanabilir
};

// useAppQuery fonksiyonu
export function useAppQuery<TQueryName extends keyof Queries>(
  queryName: TQueryName,
  options?: UseAppQueryOptions<QueryTypeMap[TQueryName]>
) {
  // Sorgu adını sorgu dökümanına eşle
  const queries: Queries = {
    GetClinicAndBranches: GET_CLINIC_AND_BRANCHES,
    // Diğer sorgu dökümanları burada tanımlanabilir
  };

  const query = queries[queryName];
  const { data, loading, error, refetch } = useQuery<QueryTypeMap[TQueryName]>(query, options);

  return {
    data,
    loading,
    error,
    refetch,
  };
}

