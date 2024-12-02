import { exec } from "node:child_process";

export function execPromise(command: string, cwd: string): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log(`Executing command: ${command} in ${cwd}`);
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        reject(`Error executing command: ${stderr || error.message}`);
        return;
      }
      resolve(stdout);
    });
  });
}
