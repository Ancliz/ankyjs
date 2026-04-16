// ankyjs v0.0.1

// src/util.js
function finalise(obj, seen = /* @__PURE__ */ new WeakSet()) {
  if (typeof obj !== "object" || obj === null || seen.has(obj)) return obj;
  seen.add(obj);
  Object.freeze(obj);
  Object.values(obj).forEach((value) => finalise(value, seen));
  return obj;
}
function rand(min, max) {
  return Math.random() * (max - min) + min;
}
function randint(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

// src/request-utils.js
var HttpStatus = Object.freeze({
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
  I_AM_A_TEAPOT: 418,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501
});
var HeaderBuilder = class {
  constructor(base = {}) {
    this.headers = base;
  }
  set(header, value) {
    this.headers[header] = value;
    return this;
  }
  build() {
    return this.headers;
  }
};
var RequestBuilder = class {
  constructor() {
    this.burl = "";
    this.bmethod = "GET";
    this.bheaders = {};
    this.bbody = {};
  }
  getHeaderBuilder() {
    return new HeaderBuilder(this.bheaders);
  }
  url(url) {
    this.burl = url;
    return this;
  }
  method(method) {
    this.bmethod = method;
    return this;
  }
  headers(headers) {
    this.bheaders = headers;
    return this;
  }
  body(body) {
    this.bbody = body;
    return this;
  }
  build() {
    return () => {
      const options = {
        method: this.bmethod,
        headers: this.bheaders
      };
      if (this.bmethod !== "GET" && Object.keys(this.bbody).length > 0) {
        if (typeof this.bbody === "string") {
          options.body = this.bbody;
        } else {
          options.body = JSON.stringify(this.bbody);
        }
      }
      return fetch(this.burl, options);
    };
  }
};
var HttpException = class extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
};
var BadRequestException = class extends HttpException {
  constructor(message = "BAD REQUEST") {
    super("400 " + message);
    this.name = this.constructor.name;
  }
};
var UnauthorizedException = class extends HttpException {
  constructor(message = "UNAUTHORIZED") {
    super("401 " + message);
    this.name = this.constructor.name;
  }
};
var ForbiddenException = class extends HttpException {
  constructor(message = "FORBIDDEN") {
    super("403 " + message);
    this.name = this.constructor.name;
  }
};
var NotFoundException = class extends HttpException {
  constructor(message = "NOT FOUND") {
    super("404 " + message);
    this.name = this.constructor.name;
  }
};
var MethodNotAllowedException = class extends HttpException {
  constructor(message = "METHOD NOT ALLOWED") {
    super("405 " + message);
    this.name = this.constructor.name;
  }
};
var NotAcceptableException = class extends HttpException {
  constructor(message = "NOT ACCEPTABLE") {
    super("406 " + message);
    this.name = this.constructor.name;
  }
};
var ConflictException = class extends HttpException {
  constructor(message = "CONFLICT") {
    super("409 " + message);
    this.name = this.constructor.name;
  }
};
var IAmATeapotException = class extends HttpException {
  constructor(message = "You are a teapot. L.") {
    super("418 " + message);
    this.name = this.constructor.name;
  }
};
var InternalServerErrorException = class extends HttpException {
  constructor(message = "INTERNAL SERVER ERROR") {
    super("500 " + message);
    this.name = this.constructor.name;
  }
};
var NotImplementedException = class extends HttpException {
  constructor(message = "NOT IMPLEMENTED") {
    super("501 " + message);
    this.name = this.constructor.name;
  }
};
function httpException(status, message = "") {
  switch (status) {
    case HttpStatus.BAD_REQUEST:
      return new BadRequestException(message);
    case HttpStatus.UNAUTHORIZED:
      return new UnauthorizedException(message);
    case HttpStatus.FORBIDDEN:
      return new ForbiddenException(message);
    case HttpStatus.NOT_FOUND:
      return new NotFoundException(message);
    case HttpStatus.METHOD_NOT_ALLOWED:
      return new MethodNotAllowedException(message);
    case HttpStatus.NOT_ACCEPTABLE:
      return new NotAcceptableException(message);
    case HttpStatus.CONFLICT:
      return new ConflictException(message);
    case HttpStatus.I_AM_A_TEAPOT:
      return new IAmATeapotException(message);
    case HttpStatus.INTERNAL_SERVER_ERROR:
      return new InternalServerErrorException(message);
    case HttpStatus.NOT_IMPLEMENTED:
      return new NotImplementedException(message);
    default:
      return new Error("Http Error: " + status);
  }
}
export {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  HeaderBuilder,
  HttpException,
  HttpStatus,
  IAmATeapotException,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotAcceptableException,
  NotFoundException,
  NotImplementedException,
  RequestBuilder,
  UnauthorizedException,
  finalise,
  httpException,
  rand,
  randint
};
//# sourceMappingURL=library.esm.js.map
