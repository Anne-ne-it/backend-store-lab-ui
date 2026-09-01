import fs from "node:fs/promises";

export async function readJson(file) {
  const content = await fs.readFile(file, "utf8");

  return JSON.parse(content);
}

export async function writeJson(file, data) {
  await fs.writeFile(
    file,
    JSON.stringify(data, null, 2),
    "utf8"
  );
}