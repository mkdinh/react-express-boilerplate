const args = ["dev"];
const options = {
  stdio: "inherit",
  cwd: "./client",
  shell: true
};

require("child_process").spawn("yarn", args, options);
