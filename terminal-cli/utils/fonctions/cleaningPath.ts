import path from "path";

export function cleaningPath(appName: string, appPath: string) {
  const sanitizedAppName = appName.trim();
  const sanitizedAppPath = path.resolve(appPath.trim());
  const fullPath = path.join(sanitizedAppPath, sanitizedAppName);

  return fullPath;
}
