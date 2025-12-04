const AppErrors = require("./error-handler");
const { StatusCode } = require("http-status-codes");
class ValidationError extends AppErrors {
  constructor(error) {
    let errorName = error.name;
    let explanation = [];
    error.errors.forEach((err) => {
      explanation.push(err.message);
    });
    super(
      errorName,
      "Not able to validate data send in the request",
      explanation,
      StatusCode.BAD_REQUEST
    );
  }
}
