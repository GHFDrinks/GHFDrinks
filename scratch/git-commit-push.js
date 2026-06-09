const { execSync } = require('child_process');
try {
  console.log("Staging files...");
  execSync('git add src/app/');
  console.log("Committing files...");
  console.log(execSync('git commit -m "fix: resolve map arrow function syntax errors in category brand cards"').toString());
  console.log("Pushing files...");
  console.log(execSync('git push').toString());
  console.log("Git sync completed successfully!");
} catch (e) {
  console.error("Error executing git command:");
  console.error(e.stdout ? e.stdout.toString() : e.message);
}
