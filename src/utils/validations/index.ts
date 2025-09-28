import { EErrorMessage } from "@app/utils/shared/enums";
import { verifyTokenRoute } from "@app/utils/token";
// Valida si un correo electrónico es válido
export const isValidEmail = (email: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    try {
      validateEmail(email);
      resolve();
    } catch (error) {
      reject(error instanceof Error ? error : new Error(String(error)));
    }
  });
};

// Valida el formato del correo electrónico
const validateEmail = (email: string): void => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("El correo no tiene el formato correcto");
  }
};

// Valida campos específicos y omite claves no deseadas
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

export function getIdUserLogged(header: string | undefined): number {
  const token = header?.split(" ")[1];

  if (!token) {
    throw new Error(EErrorMessage.NOT_FOUND_TOKEN);
  }

  const tokenVerificationResult = verifyTokenRoute(token);

  if (!tokenVerificationResult) {
    throw new Error(EErrorMessage.NOT_FOUND_TOKEN);
  }

  const userId = tokenVerificationResult.decoded?.sub as number;
  return userId;
}