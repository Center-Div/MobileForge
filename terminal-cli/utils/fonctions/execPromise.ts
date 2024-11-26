import { exec } from "child_process";

export function execPromise(command: string, cwd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing command: ${stderr || error.message}`);
        throw new Error();
      }
      resolve(stdout);
    });
  });
}
