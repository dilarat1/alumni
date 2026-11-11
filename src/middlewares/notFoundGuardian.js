const { logErrorToFile } = require('./fileLogger');

/**
 * Step 4 & Step 7: 404 Guardian Middleware
 * - Returns 404 JSON errors with a clear `reason` for API requests.
 * - Redirects invalid browser/web requests to the generic `/404` page (Step 7).
 * - Logs 404 events into `logs/error.logs` (Step 6).
 */
function notFoundGuardian(req, res, next) {
  const reason = `The requested resource or route '${req.method} ${req.originalUrl}' was not found on this server.`;

  // Log 404 to logs/error.logs
  res.locals._errorLogged = true;
  logErrorToFile({
    method: req.method,
    route: req.originalUrl,
    status: 404,
    reason
  });

  const isApiRequest =
    req.originalUrl.startsWith('/api') ||
    req.xhr ||
    (req.headers.accept &&
      req.headers.accept.includes('application/json') &&
      !req.headers.accept.includes('text/html'));

  if (isApiRequest) {
    return res.status(404).json({
      error: 'Not Found',
      status: 404,
      reason,
      method: req.method,
      path: req.originalUrl
    });
  }

  // Step 7: Redirect invalid web requests to the generic /404 page
  return res.redirect(
    `/404?from=${encodeURIComponent(req.originalUrl)}&reason=${encodeURIComponent(reason)}`
  );
}

module.exports = notFoundGuardian;
