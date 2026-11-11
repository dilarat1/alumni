const { logErrorToFile } = require('./fileLogger');

/**
 * Step 5 & Step 6: 5xx Guardian Middleware (Global Error Handler)
 * - Catches unhandled runtime/database exceptions and malformed JSON errors.
 * - Writes detailed error entries (with stack trace) to `logs/error.logs`.
 * - Returns structured error responses without crashing the application.
 */
function errorGuardian(err, req, res, next) {
  let status = err.status || err.statusCode || 500;
  let errorTitle = status >= 500 ? 'Internal Server Error' : 'Request Error';
  let reason = err.reason || err.message || 'An unexpected server error occurred.';

  // Handle malformed JSON body from express.json()
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    status = 400;
    errorTitle = 'Bad Request';
    reason = `Malformed JSON body: ${err.message}`;
  }

  // Handle MySQL duplicate key error (Projector slide: if e is duplicate -> 409)
  if (err.code === 'ER_DUP_ENTRY') {
    status = 409;
    errorTitle = 'exists';
    reason = `Duplicate resource already exists: ${err.sqlMessage || err.message}`;
  }

  // Handle MySQL foreign key constraint error
  if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.code === 'ER_ROW_IS_REFERENCED_2') {
    status = 400;
    errorTitle = 'Relational Constraint Error';
    reason = err.sqlMessage || err.message;
  }

  // Step 6: Always log to logs/error.logs
  res.locals._errorLogged = true;
  logErrorToFile({
    method: req.method,
    route: req.originalUrl || req.url,
    status,
    reason,
    stack: err.stack
  });

  if (res.headersSent) {
    return next(err);
  }

  return res.status(status).json({
    error: errorTitle,
    status,
    reason
  });
}

module.exports = errorGuardian;
