import { ICreateUser } from "@/shared/model";

export const getAutoCompleteValue = (key: keyof ICreateUser): string => {
  switch (key) {
    case "email":
      return "email";
    case "phone":
      return "tel";
    case "firstName":
      return "given-name";
    case "lastName":
      return "family-name";
    case "city":
      return "address-level2";
    case "country":
      return "country";
    case "occupation":
      return "organization-title";
    case "company":
      return "organization";
    case "department":
      return "department";
    default:
      return "off";
  }
};