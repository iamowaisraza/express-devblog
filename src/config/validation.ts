// Validation Constants
export const VALIDATION_LIMITS = {
  TITLE: {
    MIN: 5,
    MAX: 100,
  },
  CONTENT: {
    MIN: 20,
    MAX: 5000,
  },
  AUTHOR: {
    MIN: 3,
    MAX: 50,
  },
  POST_PREVIEW: {
    TRUNCATE_LENGTH: 110,
  },
};

export const ERROR_MESSAGES = {
  TITLE_SHORT: `Title must be at least ${VALIDATION_LIMITS.TITLE.MIN} characters`,
  TITLE_LONG: `Title must not exceed ${VALIDATION_LIMITS.TITLE.MAX} characters`,
  CONTENT_SHORT: `Content must be at least ${VALIDATION_LIMITS.CONTENT.MIN} characters`,
  CONTENT_LONG: `Content must not exceed ${VALIDATION_LIMITS.CONTENT.MAX} characters`,
  AUTHOR_SHORT: `Author must be at least ${VALIDATION_LIMITS.AUTHOR.MIN} characters`,
  AUTHOR_LONG: `Author must not exceed ${VALIDATION_LIMITS.AUTHOR.MAX} characters`,
  POST_NOT_FOUND: "Post not found",
  INVALID_ID: "Invalid post ID",
  ROUTE_NOT_FOUND: "Route not found",
};
