import { Club } from "../models/ApiTypes";



export function isArrayOfClubs(arr: unknown): arr is Club[] {
  if (!Array.isArray(arr)) {
    return false;
  }

  for (const item of arr) {
    if (
      typeof item !== "object" ||
      item === null ||
      !("title" in item) ||
      !("about" in item) ||
      !("pastActiveMembers" in item) ||
      !("contactName" in item) ||
      !("contact" in item) ||
      !("fee" in item) ||
      !("id" in item) ||
      !("users" in item)
    ) {
      return false;
    }
  }

  return true;
}
