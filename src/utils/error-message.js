const ERROR_MESSAGE = {
  USER: {
    EMAIL_EMPTY: "Email must not be empty",
    PASSWORD_EMPTY: "Password must not be empty",
    CONFIRM_PASSWORD_EMPTY: "Confirm password must not be empty",
    EMAIL_ALREADY_IN_USE: "Email already in use",
    PASSWORD_DOES_NOT_MATCH: "Passwords do not match",
    OLD_PASSWORD_DOES_NOT_MATCH: "Old passwords do not match",
    USER_NOT_FOUND: "User not found",
    ID_EMPTY: "Id is required",
    NEW_PASSWORD_EMPTY: "New password is required",
    PASSWORD_INCORRECT: "Password is incorrect",
  },
  UPLOAD: {
    FILE_EMPTY: "File is empty",
    FILE_NOT_FOUND: "File not found",
    DOCUMENT_NOT_FOUND: "Document not found",
  }
};

module.exports = ERROR_MESSAGE;
