import type { Compiler } from "webpack";

import { exec } from "child_process";

async function runPrismaGenerate(schemaPath: string, outputPath: string) {
  return new Promise<void>((resolve, reject) => {
    exec(
      `npx prisma generate --schema=${schemaPath}`,
      (error, stdout, stderr) => {
        if (error) return reject(error);
        console.log(stdout);
        resolve();
      }
    );
  });
}
export class PrismaPlugin {
  constructor(
    private options: { schemaPath?: string; outputPath?: string } = {}
  ) {}

  async generatePrisma() {
    if (!this.options.schemaPath) {
      throw new Error("schemaPath option is required for Prisma generation");
    }
    if (!this.options.outputPath) {
      throw new Error("outputPath option is required for Prisma generation");
    }
    await runPrismaGenerate(this.options.schemaPath, this.options.outputPath);
  }
  apply(compiler: Compiler) {
    compiler.hooks.beforeCompile.tapPromise("PrismaPlugin", async () => {
      await this.generatePrisma();
    });
  }
}
