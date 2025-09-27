export type DateOrString = Date | string;
export type TNullableDate = string | Date | null;
export type TNullableString = string | null;
export type TNullableBoolean = boolean | null;
export type TNullableNumber = number | null;
export type OnTick = (id: number | null) => void | Promise<void>;
export type TstringDate = string | Date;

export type TPortsSMTP = "port01" | "port02" | "port03";

export type TActionType = "create" | "update" | "delete";
export type TEntityType = "question" | "static" | "table";
