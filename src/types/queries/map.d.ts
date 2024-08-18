// Sorgu türlerini içeren bir tip haritası
type QueryTypeMap = {
  GetClinicAndBranches: GetClinicAndBranchesResponse;
  GetClinicPets: GetClinicPetsResponse;
  // Diğer sorgu türleri burada tanımlanabilir
};

// Sorgu adlarını ve sorgu dökümanlarını eşleştiren tür
type QueryNameMap = {
  GetClinicAndBranches: TypedDocumentNode<GetClinicAndBranchesResponse, OperationVariables>;
  GetClinicPets: TypedDocumentNode<GetClinicPetsResponse, OperationVariables>;
  // Diğer sorgu dökümanları burada tanımlanabilir
};
