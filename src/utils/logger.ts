type LogLevel = "info" | "warn" | "error" | "debug";

const getTimestamp = (): string => {
  return new Date().toISOString();
};

const log = (level: LogLevel, message: string, data?: unknown): void => {
  const timestamp = getTimestamp();
  const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

  if (level === "error") {
    console.error(prefix, message, data || "");
  } else if (level === "warn") {
    console.warn(prefix, message, data || "");
  } else if (level === "debug" && process.env.NODE_ENV === "development") {
    console.log(prefix, message, data || "");
  } else if (level === "info") {
    console.log(prefix, message, data || "");
  }
};

export const logger = {
  info: (message: string, data?: unknown) => log("info", message, data),
  warn: (message: string, data?: unknown) => log("warn", message, data),
  error: (message: string, data?: unknown) => log("error", message, data),
  debug: (message: string, data?: unknown) => log("debug", message, data),
};
