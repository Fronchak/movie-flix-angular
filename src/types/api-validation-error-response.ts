import ApiErrorResponse from "./api-error-response";
import FieldErrorType from "./field-error-type";

interface ApiValidationErrorResponse extends ApiErrorResponse {
  errors: Array<FieldErrorType>
}

export default ApiValidationErrorResponse;
