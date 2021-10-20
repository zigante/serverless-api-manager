export const assertRequiredParamterWasProvided = (fieldName: string, fieldValue: unknown) => {
  if (typeof fieldValue === 'undefined') throw new Error(`${fieldName} must be provided`);
};

export const assertParamterIsArray = (fieldName: string, fieldValue: unknown) => {
  if (!Array.isArray(fieldValue)) throw new Error(`The parameter "${fieldName}" is expected to be an Array`);
};

export const assertParamterIsString = (fieldName: string, fieldValue: unknown) => {
  if (typeof fieldValue !== 'string') throw new Error(`The parameter "${fieldName}" is expected to be a string`);
};

export const assertParamterIsObject = (fieldName: string, fieldValue: unknown) => {
  if (Array.isArray(fieldValue) || typeof fieldValue === 'object')
    throw new Error(`The parameter "${fieldName}" is expected to be an object`);
};
