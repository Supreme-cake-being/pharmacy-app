export const handleSaveError = (error: any, data: any, next: any) => {
  error.status = 400;
  next();
};

export const runValidatorsAtUpdate = function (next: any) {
  this.options.runValidators = true;
  this.options.new = true;
  next();
};
