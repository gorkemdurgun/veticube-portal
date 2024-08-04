// Sorgu türlerini içeren bir tip haritası
type QueryTypeMap = {
  GetClinicAndBranches: GetClinicAndBranchesResponse;
  // Diğer sorgu türleri burada tanımlanabilir
};

// Sorgu adlarını ve sorgu dökümanlarını eşleştiren tür
type QueryNameMap = {
  GetClinicAndBranches: TypedDocumentNode<GetClinicAndBranchesResponse, OperationVariables>;
  // Diğer sorgu dökümanları burada tanımlanabilir
};
