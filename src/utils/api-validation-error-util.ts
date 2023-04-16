import FieldErrorType from "src/types/field-error-type";

class ApiValidationErrorUtil {

  static getServerError(errors: Array<FieldErrorType>, fieldName: string): string | undefined {
    return errors.find((error) => error.fieldName === fieldName)?.message;
  }
}

export default ApiValidationErrorUtil;
