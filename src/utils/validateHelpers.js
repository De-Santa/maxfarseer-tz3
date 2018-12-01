export const required = fieldValue => {
  const errorText = 'Поле обязательно для заполнения';
  if (Array.isArray(fieldValue)) {
    return fieldValue.length > 0
      ? null
      : errorText;
  }
  return fieldValue ? null : errorText;
};