import { createHash } from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { join, relative } from "node:path";

const root = new URL("..", import.meta.url).pathname;
const runsRoot = join(root, "runs");
const blindRoot = join(root, "blinded");
const salt = "e1.1-batch-2-blind-v1";

const sourceFiles = [];
for (const model of readdirSync(runsRoot)) {
  const modelPath = join(runsRoot, model);
  if (!statSync(modelPath).isDirectory()) continue;
  for (const condition of readdirSync(modelPath)) {
    const conditionPath = join(modelPath, condition);
    if (!statSync(conditionPath).isDirectory()) continue;
    for (const filename of readdirSync(conditionPath)) {
      if (/^task-\d+\.md$/.test(filename)) {
        sourceFiles.push(join(conditionPath, filename));
      }
    }
  }
}

const ranked = sourceFiles
  .map((source) => ({
    source,
    key: createHash("sha256")
      .update(`${salt}:${relative(runsRoot, source)}`)
      .digest("hex"),
  }))
  .sort((a, b) => a.key.localeCompare(b.key));

rmSync(blindRoot, { recursive: true, force: true });
mkdirSync(blindRoot, { recursive: true });

const mapping = [];
ranked.forEach(({ source }, index) => {
  const anonymousId = `B${String(index + 1).padStart(3, "0")}`;
  const target = join(blindRoot, `${anonymousId}.md`);
  let content = readFileSync(source, "utf8");
  content = content
    .replace(/gpt-5(?:\.\d+)?(?:-(?:sol|terra|luna))?/gi, "[model-redacted]")
    .replace(/\bfree-skills\b/gi, "[condition-redacted]")
    .replace(/\bArgo condition\b/gi, "[condition-redacted]");
  writeFileSync(target, content);
  mapping.push({ anonymous_id: anonymousId, source: relative(root, source) });
});

writeFileSync(join(blindRoot, "mapping.json"), `${JSON.stringify(mapping, null, 2)}\n`);
console.log(`Created ${mapping.length} blinded run files.`);
