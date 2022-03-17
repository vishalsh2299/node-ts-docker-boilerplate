import { User } from "../models/user";

export type NullableAny = any | null | undefined;
export type NullableDate = Date | null | undefined;
export type NullableString = string | null | undefined;
export type NullableNumber = number | null | undefined;
export type NullableBoolean = boolean | null | undefined;
export type NullableBuffer = Buffer | null | undefined;

/// Array
export type NullableArrayString = Array<string> | null | undefined;

/// Custom
export type NullableUser = User | null | undefined;
