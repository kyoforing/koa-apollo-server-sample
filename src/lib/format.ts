'use strict';
/**
 * `format` constructor.
 *
 * @api public
 */

module.exports = {
  create: (statusCode, error, message, data, ctx) => {
    let rtnObj = {};
    if (!statusCode) throw new Error('Status code is required');
    if (isNaN(Number(statusCode))) throw new Error('Status code not a number');

    ctx.status = statusCode;
    rtnObj = {
      statusCode,
      error: error || null,
      data: data || null,
      message: message || ''
    };
    return rtnObj;
  },

  success: (message, data, ctx) => {
    let rtnObj = {};

    ctx.status = 200;
    rtnObj = {
      statusCode: 200,
      error: false,
      data: data || null,
      message: message || 'OK'
    };
    return rtnObj;
  },

  badRequest: (message, data, ctx) => {
    let rtnObj = {};

    ctx.status = 400;
    rtnObj = {
      statusCode: 400,
      error: true,
      data: data || null,
      message: message || 'Bad Request'
    };
    return rtnObj;
  },
};
