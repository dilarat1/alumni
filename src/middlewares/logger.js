const { logErrorToFile } = require('./fileLogger');

/**
 * Step 3: Logger Middleware
 * Writes request logs on the terminal in the format:
 *   time      method  route   restype  duration
 *   10:20:30  POST    /user   201      18ms
 * Also records 4xx/5xx error responses into logs/error.logs (Step 6).
 */
function loggerMiddleware(req, res, next) {
  const start = Date.now();

  // Capture response payload reason/error for error logging if status >= 400
  const originalJson = res.json.bind(res);
  res.json = function (body) {
    if (body && typeof body === 'object') {
      res.locals._responseErrorReason = body.reason || body.error || body.message;
    }
    return originalJson(body);
  };

  res.on('finish', () => {
    const durationMs = Date.now() - start;
    const now = new Date();
    const time = now.toTimeString().split(' ')[0]; // HH:MM:SS (e.g. 10:20:30)
    const method = req.method;
    const route = req.originalUrl || req.url;
    const restype = res.statusCode;
    const duration = `${durationMs}ms`;

    // Terminal output matching board specification:
    // time      method  route   restype  duration
    // 10:20:30  POST    /user   201      18ms
    console.log(
      `${time}  ${method.padEnd(6)}  ${route.padEnd(28)}  ${String(restype).padEnd(7)}  ${duration}`
    );

    // If an error status occurred (>= 400) and was not yet logged to logs/error.logs
    if (restype >= 400 && !res.locals._errorLogged) {
      res.locals._errorLogged = true;
      logErrorToFile({
        method,
        route,
        status: restype,
        reason: res.locals._responseErrorReason || `HTTP ${restype} response`
      });
    }
  });

  next();
}

module.exports = loggerMiddleware;
