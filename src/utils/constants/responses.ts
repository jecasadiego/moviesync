export enum codeHTTPStatus {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  AMBIGUOUS = 300,
  MOVED_PERMANENTLY = 301,
  FOUND = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  PAYLOAD_TOO_LARGE = 413,
  URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  I_AM_A_TEAPOT = 418,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
}

export enum ErrorMessage {
  GET_DATA_ERROR = "Error al listar la información",
  CREATE_DATA_ERROR = "Error al crear la información",
  UPDATE_DATA_ERROR = "Error al actualizar la información",
  DELETE_DATA_ERROR = "Error al eliminar la información",
  CONFLICT_DATA_ERROR = "Se encontro conflicto al crear la información",
  NOT_FOUND_ERROR = "No se encontro ningun registro",
  NOT_FOUND_ERROR_USER_EMAIL = "Error, usuario o contraseña inválido",
  NOT_FOUND_ERROR_USER_PASS = "Error, actualmente su contraseña no coincide, vuelva a escribir una contraseña correcta",
  NOT_FOUND_USER = "El usuario no existe",
  NOT_FOUND_ADMIN = "No eres un usuario ADMIN autorizado, comunicate con el Administrador",
  NOT_FOUND_ROOT = "No eres un usuario ROOT autorizado, comunicate con el Administrador",
  NOT_FOUND_LOGIN = "Debes iniciar sesion para acceder",
  NOT_FOUND_CREATED_USER = "Solo usuarios rol root pueden crear nuevos usuarios",
  NOT_FOUND_UPDATE_USER = "Solo usuarios rol root pueden actualizar usuarios",
  NOT_FOUND_DELETE_USER = "Solo usuarios rol root pueden eliminar usuarios",
  NOT_FOUND_EXIST_USER = "El correo ingresado ya existe en nuestro sistema.",
  NOT_FOUND_EXIST_DOCUMENT = "El documento de identidad ingresado ya existe en nuestro sistema.",
  NOT_FOUND_FILES = "Debes de subir un archivo",
  NOR_FOUND_EXIST_FILES = "no file specified",
  NOT_FOUND_SEARCH = "No se ha enviado el parámetro de búsqueda",
  NOT_FOUND_TOKEN = "Token no encontrado",
  NOT_FOUND_TOKEN_EXPIRED = "El token ha expirado.",
  NOT_FOUND_UNAUTHORIZED_ADMIN_EXPERT_COLLABORATOR = "No eres un usuario autorizado, comunicate con soporte",
  NOT_DATA_MATCH = "Error, los datos no coinciden",
  INVALID_TOKEN = "Token no válido",
}

export enum CorrectMessage {
  GET_DATA_CORRECT = "Lista de registros",
  CREATE_DATA_CORRECT = "añadido con éxito",
  UPDATE_DATA_CORRECT = "actualizado con éxito",
  DELETE_DATA_CORRECT = "eliminado con éxito",
  GET_USER_CORRECT = "Usuario conectado con éxito",
  UPDATE_CHANGE_PASS = "Se realizo el cambio de password del usuario con exito",
}

/**
 * @function Api succes response
 * @param {string} typeOrMessage Can be "FETCH","UPDATE","DELETE" or any custom message
 * @param {any} data Any data type array, object etc.
 */
export const success = (
  res: any,
  typeOrMessage: any,
  code: any,
  data: any,
  clean = false
) => {
  let message = "";

  switch (typeOrMessage) {
    case "GET":
      message = "Data get successfully";
      code = codeHTTPStatus.OK;
      break;
    case "FETCH":
      message = "Data fetched successfully";
      code = codeHTTPStatus.OK;
      break;

    case "PUT":
      message = "Data updated successfully";
      code = codeHTTPStatus.OK;
      break;

    case "POST":
      message = "Data created successfully";
      code = codeHTTPStatus.CREATED;
      break;

    case "DELETE":
      message = "Data deleted successfully";
      code = codeHTTPStatus.NO_CONTENT
      break;

    case "DATA NOT FOUND":
      message = "Data not found";
      code = codeHTTPStatus.NOT_FOUND;
      break;

    default:
      message = typeOrMessage;
      break;
  }
  let jsonData = clean ? data : { data, message, code };
  return res.status(code).json(jsonData);
};

export const warning = (res: any, message: any, code: any, error: any) => {
  const json: any = {};
  json.message = message;
  json.error = error;
  json.data = [];
  return res.status(code).json(json);
};

export const warningHandler = (log: any) => {
  interface JSON {
    message: string;
    stack: string;
    code: number;
    data: string;
  }
  let json: JSON = {
    message: log.name + ": " + log.message,
    stack: log.stack,
    code: 500,
    data: "",
  };
  if (
    log.hasOwnProperty("response") &&
    log.response !== undefined &&
    log.response.hasOwnProperty("data") &&
    log.response.data != ""
  ) {
    let data = log.response.data;
    if (typeof data != "string") data = JSON.stringify(data);
    json.data = data;
    json.message += " \n .Error Servidor Externo: " + data;
  }
  return json;
};

export const fromStatusAndCode = async (
  res: any,
  row: any,
  action: any,
  clean?: any
) => {
  try {
    return success(res, action, row?.code ?? 200, row, clean);
  } catch (error: any) {
    return warning(res, error.message, 500, error);
  }
};
