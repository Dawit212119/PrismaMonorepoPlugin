🧩 PrismaMonorepoPlugin

PrismaMonorepoPlugin is a developer tool that integrates Prisma ORM capabilities into a monorepo architecture, enabling efficient management, building, and distribution of Prisma-related code across multiple packages.

It automates Prisma schema generation during the build process, ensuring your Prisma clients are always synchronized with the latest schemas — for Next.js, Express.js, and beyond.

🚀 Why PrismaMonorepoPlugin?

This project simplifies Prisma ORM integration within complex monorepo setups.
The core features include:

🛠️ Automated Schema Generation – Integrates Prisma CLI commands into your build lifecycle to keep Prisma clients up to date automatically.

📦 Monorepo Management – Facilitates seamless handling of Prisma code across multiple packages, maintaining consistency.

🧠 TypeScript Configuration – Provides tailored tsconfig setup for reliable, type-safe builds aligned with modern standards.

⚡ Streamlined Builds – Optimizes build processes for CommonJS and modern module outputs.

🔍 Module Resolution & Output Management – Ensures smooth module resolution and organized outputs across the project.

📦 Installation

Install the package using npm:

npm i @prismanextjsmonorepo/monorepo-plugin


or using yarn:

yarn add @prismanextjsmonorepo/monorepo-plugin

💡 Usage
🧱 Next.js Configuration

In your next.config.js file, add the plugin inside the Webpack configuration:

// next.config.js
const { PrismaPlugin } = require("@prismanextjsmonorepo/monorepo-plugin");

module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [
        ...config.plugins,
        new PrismaPlugin({
          schemaPath: "your schema path",
          outputPath: "your output path",
        }),
      ];
    }
    return config;
  },
};


This ensures Prisma schema generation is automatically handled during the Next.js build.

⚙️ Express / Backend Server Configuration

In your server entry file (e.g., server.js or index.ts), import and initialize the plugin before any other imports:

import { PrismaPlugin } from "@prismanextjsmonorepo/monorepo-plugin";

new PrismaPlugin({
  schemaPath: "your schema path",
  outputPath: "your output path",
});


This setup ensures your Prisma client is generated and synced before your backend starts handling requests.

🧪 Example Structure
apps/
  ├── web/ (Next.js)
  ├── api/ (Express.js)
  └── packages/
        └── prisma/
            ├── schema.prisma
            └── generated/


With PrismaMonorepoPlugin, both your frontend and backend can access a synchronized Prisma client from the shared package.

🖼️ Overview

🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you would like to change.

📜 License

MIT © 2025 Dawit Workye
