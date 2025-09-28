
export const validateFields = (
  fields: any, // Objeto con claves y valores
  notNullKeys: string[], // Claves que no pueden ser nulas
  omitKeys: string[] // Claves que deben omitirse
): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      // Omitir claves especificadas
      omitSpecifiedKeys(fields, omitKeys);

      // Validar campos restantes
      validateNotNullKeys(fields, notNullKeys);

      resolve();
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });
};

const omitSpecifiedKeys = (fields: any, omitKeys: string[]) => {
  for (const key of omitKeys) {
    delete fields[key];
  }
};

// Valida que las claves no nulas tengan valores válidos
const validateNotNullKeys = (fields: any, notNullKeys: string[]): void => {
  for (const key of notNullKeys) {
    if (
      fields[key] === undefined ||
      fields[key] === null ||
      fields[key] === ""
    ) {
      throw new Error(`The field ${key} cannot be null or undefined`);
    }
    if (
      typeof fields[key] === "number" &&
      fields[key] < 0 &&
      !/latitude|longitude/i.test(key)
    ) {
      throw new Error(`The field ${key} must be greater than 0`);
    }
  }
};