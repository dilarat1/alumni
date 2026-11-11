const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '..', '..', 'logs');
const errorLogsPath = path.join(logsDir, 'error.logs');
const errorLogAltPath = path.join(logsDir, 'error.log');

// Ensure logs directory and error.logs file exist
function ensureLogFiles() {
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
  }
  if (!fs.existsSync(errorLogsPath)) {
    fs.writeFileSync(
      errorLogsPath,
      '# Error Log File (logs/error.logs)\n# Format: [ISO_TIMESTAMP] TIME | METHOD ROUTE | STATUS | REASON | DETAILS\n',
      'utf-8'
    );
  }
}

/**
 * Appends an error record to logs/error.logs (Step 6)
 */
function logErrorToFile({ method, route, status, reason, stack }) {
  try {
    ensureLogFiles();
    const now = new Date();
    const iso = now.toISOString();
    const time = now.toTimeString().split(' ')[0];
    const cleanReason = (reason || 'Unknown error').replace(/\r?\n/g, ' ');
    const stackSnippet = stack ? ` | Stack: ${stack.split('\n').slice(0, 2).map(s => s.trim()).join(' -> ')}` : '';
    const line = `[${iso}] ${time} | ${method} ${route} | Status: ${status} | Reason: ${cleanReason}${stackSnippet}\n`;

    fs.appendFileSync(errorLogsPath, line, 'utf-8');
    fs.appendFileSync(errorLogAltPath, line, 'utf-8');
  } catch (fileErr) {
    console.error('Failed to write to logs/error.logs:', fileErr.message);
  }
}

module.exports = {
  logErrorToFile,
  errorLogsPath
};
