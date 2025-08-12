import type { Compiler } from "webpack";
export declare class PrismaPlugin {
    private options;
    constructor(options?: {
        schemaPath?: string;
        outputPath?: string;
    });
    generatePrisma(): Promise<void>;
    apply(compiler: Compiler): void;
}
//# sourceMappingURL=index.d.ts.map