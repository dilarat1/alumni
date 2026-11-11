/**
 * Validation Middleware & Helpers (Step 2 Rules)
 *
 * JobPosting Rules:
 *   - title: required, max 120 characters
 *   - company: required
 *   - city / location, description: optional
 *
 * User Rules:
 *   - username: required
 *   - email: required, valid email format
 */

function validateJobPosting(req, res, next) {
  const { title, company, city, description } = req.body || {};

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({
      error: 'Validation failed',
      reason: 'title is required'
    });
  }

  if (title.trim().length > 120) {
    return res.status(400).json({
      error: 'Validation failed',
      reason: 'title must be at most 120 characters'
    });
  }

  if (!company || typeof company !== 'string' || company.trim() === '') {
    return res.status(400).json({
      error: 'Validation failed',
      reason: 'company is required'
    });
  }

  if (city !== undefined && city !== null && typeof city !== 'string') {
    return res.status(400).json({
      error: 'Validation failed',
      reason: 'city must be a string when provided'
    });
  }

  if (description !== undefined && description !== null && typeof description !== 'string') {
    return res.status(400).json({
      error: 'Validation failed',
      reason: 'description must be a string when provided'
    });
  }

  next();
}

function validateJobPostingPatch(req, res, next) {
  const { title, company } = req.body || {};

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        error: 'Validation failed',
        reason: 'title cannot be empty'
      });
    }
    if (title.trim().length > 120) {
      return res.status(400).json({
        error: 'Validation failed',
        reason: 'title must be at most 120 characters'
      });
    }
  }

  if (company !== undefined) {
    if (typeof company !== 'string' || company.trim() === '') {
      return res.status(400).json({
        error: 'Validation failed',
        reason: 'company cannot be empty'
      });
    }
  }

  next();
}

function validateUser(req, res, next) {
  const { username, email } = req.body || {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!username || typeof username !== 'string' || username.trim() === '') {
    return res.status(400).json({
      error: 'Validation failed',
      reason: 'username is required'
    });
  }

  if (!email || typeof email !== 'string' || !emailRegex.test(email.trim())) {
    return res.status(400).json({
      error: 'Validation failed',
      reason: 'bad email: a valid email address is required'
    });
  }

  next();
}

module.exports = {
  validateJobPosting,
  validateJobPostingPatch,
  validateUser
};
