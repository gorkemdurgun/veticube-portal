// GraphQL Errors to Meaningful Error Messages for UI

export const uiError = (errorMessage: string) => {
  // error messages include structure
  const errorWords: {
    [key: string]: string;
  } = {
    "unique constraint": "Bu kayıt zaten mevcut",
    "violates foreign key constraint": "Geçersiz veri girişi",
    "violates check constraint": "Geçersiz veri girişi",
    "duplicate key value": "Bu kayıt zaten mevcut",
    "not-null constraint": "Bu alan boş bırakılamaz",
    "violates not-null constraint": "Bu alan boş bırakılamaz",
    "violates unique constraint": "Bu kayıt zaten mevcut",
  };

  // Check if error message includes any of the errorWords
  for (const key in errorWords) {
    if (typeof errorMessage !== "string") {
      return "Bir hata oluştu";
    } else {
      if (errorMessage?.includes(key)) {
        return errorWords[key];
      } else {
        return errorMessage;
      }
    }
  }
};
