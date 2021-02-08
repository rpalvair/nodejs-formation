success = (result) => {
  return {
    status: "success",
    result: result,
  };
};

error = (message) => {
  return {
    status: "error",
    message: message,
  };
};

exports.success = success;
exports.error = error;
