"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaPlugin = void 0;
const child_process_1 = require("child_process");
// const prismaDirRegex =
//   /\\?"?output\\?"?:\s*{(?:\\n?|\s)*\\?"?value\\?"?:(?:\\n?|\s)*\\?"(.*?)\\?",(?:\\n?|\s)*\\?"?fromEnvVar\\?"?/g;
// async function getPrismaDir(from: string): Promise<string> {
//   const schemaExists = await fs
//     .stat(path.join(from, "schema.prisma"))
//     .catch(() => false);
//   if (schemaExists) return from;
//   return path.dirname(require.resolve(".prisma/client", { paths: [from] }));
// }
// async function getPrismaFiles(from: string): Promise<string[]> {
//   const prismaDir = await getPrismaDir(from);
//   const files = await fs.readdir(prismaDir);
//   const filterRegex = /schema\.prisma|engine/;
//   return files.filter((file) => filterRegex.test(file));
// }
// export class PrismaPlugin {
//   private options: Record<string, unknown>;
//   constructor(options: Record<string, unknown> = {}) {
//     this.options = options;
//   }
//   apply(compiler: Compiler): void {
//     const { webpack } = compiler;
//     const { Compilation, sources } = webpack;
//     const originAssetsToCopies: Record<string, string[]> = {};
//     const origins: string[] = [];
//     compiler.hooks.compilation.tap("PrismaPlugin", (compilation: any) => {
//       compilation.hooks.processAssets.tapPromise(
//         {
//           name: "PrismaPlugin",
//           stage: Compilation.PROCESS_ASSETS_STAGE_ANALYSE,
//         },
//         async (assets: any) => {
//           const jsAssetNames = Object.keys(assets).filter((k) =>
//             k.endsWith(".js")
//           );
//           const jsAsyncActions = jsAssetNames.map(async (assetName) => {
//             const outputDir = compiler.outputPath;
//             const assetPath = path.resolve(outputDir, assetName);
//             const assetDir = path.dirname(assetPath);
//             const oldSourceAsset = compilation.getAsset(assetName);
//             if (!oldSourceAsset) return;
//             const oldSourceContents = oldSourceAsset.source.source().toString();
//             for (const match of oldSourceContents.matchAll(prismaDirRegex)) {
//               const matchPath = match[1];
//               const prismaDir = await getPrismaDir(matchPath);
//               const prismaFiles = await getPrismaFiles(matchPath);
//               for (const file of prismaFiles) {
//                 const from = path.join(prismaDir, file);
//                 const originIndex =
//                   origins.indexOf(prismaDir) !== -1
//                     ? origins.indexOf(prismaDir)
//                     : origins.push(prismaDir) - 1;
//                 const assetCopies = (originAssetsToCopies[from] ||= []);
//                 const copyFilename =
//                   file === "schema.prisma" ? `${file}${originIndex}` : file;
//                 const copyPath = path.join(assetDir, copyFilename);
//                 if (!assetCopies.includes(copyPath)) {
//                   assetCopies.push(copyPath);
//                 }
//                 if (file === "schema.prisma") {
//                   const newSourceString = oldSourceContents.replace(
//                     /schema\.prisma/g,
//                     copyFilename
//                   );
//                   compilation.updateAsset(
//                     assetName,
//                     new sources.RawSource(newSourceString)
//                   );
//                 }
//               }
//             }
//           });
//           await Promise.all(jsAsyncActions);
//         }
//       );
//     });
//     compiler.hooks.compilation.tap("PrismaPlugin", (compilation: any) => {
//       compilation.hooks.processAssets.tapPromise(
//         {
//           name: "PrismaPlugin",
//           stage: Compilation.PROCESS_ASSETS_STAGE_ANALYSE,
//         },
//         async (assets: any) => {
//           const nftAssetNames = Object.keys(assets).filter((k) =>
//             k.endsWith(".nft.json")
//           );
//           for (const assetName of nftAssetNames) {
//             const outputDir = compiler.outputPath;
//             const assetPath = path.resolve(outputDir, assetName);
//             const assetDir = path.dirname(assetPath);
//             const oldSourceAsset = compilation.getAsset(assetName);
//             if (!oldSourceAsset) continue;
//             const oldSourceContents = oldSourceAsset.source.source().toString();
//             const nftJson = JSON.parse(oldSourceContents);
//             Object.values(originAssetsToCopies).forEach((copies) => {
//               const copyPaths = copies.map((c) => path.relative(assetDir, c));
//               nftJson.files.push(...copyPaths);
//             });
//             compilation.updateAsset(
//               assetName,
//               new sources.RawSource(JSON.stringify(nftJson))
//             );
//           }
//         }
//       );
//     });
//     compiler.hooks.done.tapPromise("PrismaPlugin", async () => {
//       const copyTasks = Object.entries(originAssetsToCopies).flatMap(
//         ([from, copies]) =>
//           copies.map(async (copy) => {
//             try {
//               await fs.access(copy);
//             } catch {
//               await fs.copyFile(from, copy);
//             }
//           })
//       );
//       await Promise.all(copyTasks);
//     });
//   }
// }
async function runPrismaGenerate(schemaPath, outputPath) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(`npx prisma generate --schema=${schemaPath}`, (error, stdout, stderr) => {
            if (error)
                return reject(error);
            console.log(stdout);
            resolve();
        });
    });
}
class PrismaPlugin {
    constructor(options = {}) {
        this.options = options;
    }
    async generatePrisma() {
        if (!this.options.schemaPath) {
            throw new Error("schemaPath option is required for Prisma generation");
        }
        if (!this.options.outputPath) {
            throw new Error("outputPath option is required for Prisma generation");
        }
        await runPrismaGenerate(this.options.schemaPath, this.options.outputPath);
    }
    apply(compiler) {
        compiler.hooks.beforeCompile.tapPromise("PrismaPlugin", async () => {
            await this.generatePrisma();
        });
    }
}
exports.PrismaPlugin = PrismaPlugin;
