import { exec } from "child_process";
import path from "path";
const scriptPath = path.join(__dirname, "/opensips_reaload.sh");
const OpensipsRealod = () => {
  exec(scriptPath, (error: any, stdout: any, stderr: any) => {
    if (error) {
      return;
    }
    if (stderr) {
      return;
    }
    return;
  });
};

export default OpensipsRealod;
