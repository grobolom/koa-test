module.exports = class Exception {
  constructor(code, description) {
    this.code = code;
    this.description = description;
  }

  get body() {
    return { message: this.description };
  }
};
