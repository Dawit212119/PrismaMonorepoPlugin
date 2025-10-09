# 🧩 PrismaMonorepoPlugin

**PrismaMonorepoPlugin** is a developer tool that integrates **Prisma ORM** capabilities into a **monorepo architecture**, enabling efficient management, building, and distribution of Prisma-related code across multiple packages.

It automates Prisma schema generation during the build process, ensuring your Prisma clients are always synchronized with the latest schemas — for **Next.js**, **Express.js**, and beyond.

---

## 🌟 Why PrismaMonorepoPlugin?

This project simplifies Prisma ORM integration within complex monorepo setups.

### 🧠 Core Features

- 🛠️ **Automated Schema Generation** – Integrates Prisma CLI commands into your build lifecycle to keep Prisma clients up to date automatically.  
- 📦 **Monorepo Management** – Facilitates seamless handling of Prisma code across multiple packages, maintaining consistency.  
- 🧩 **TypeScript Configuration** – Provides tailored `tsconfig` setup for reliable, type-safe builds aligned with modern standards.  
- ⚡ **Streamlined Builds** – Optimizes build processes for CommonJS and modern module outputs.  
- 🔍 **Module Resolution & Output Management** – Ensures smooth module resolution and organized outputs across the project.

---

## 📦 Installation

Install the package using npm or yarn:

```bash
npm i @prismanextjsmonorepo/monorepo-plugin
# or
yarn add @prismanextjsmonorepo/monorepo-plugin
# 📘 Usage Guide — PrismaMonorepoPlugin

This guide explains how to use **PrismaMonorepoPlugin** in your Next.js and Express.js applications.  
The plugin simplifies Prisma ORM integration by automating schema generation and output synchronization across your monorepo.

---

## 🧱 Using with Next.js

### 1️⃣ Install the Plugin

Install via npm or yarn:

```bash
npm i @prismanextjsmonorepo/monorepo-plugin
# or
yarn add @prismanextjsmonorepo/monorepo-plugin

### 2️⃣ Configure Webpack in next.config.js

In your next.config.js file, import and initialize the plugin inside the webpack configuration:

// next.config.js
const { PrismaPlugin } = require("@prismanextjsmonorepo/monorepo-plugin");

module.exports = {
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [
        ...config.plugins,
        new PrismaPlugin({
          schemaPath: "packages/prisma/schema.prisma",
          outputPath: "packages/prisma/generated",
        }),
      ];
    }
    return config;
  },
};

# ✅ This ensures Prisma schema generation is automatically handled during the Next.js build.
###      ⚙️ Using with Express / Node.js Backend
# 1️⃣ Import the Plugin Early

# Import and initialize PrismaPlugin at the top of your server entry file (server.js or index.ts):

import { PrismaPlugin } from "@prismanextjsmonorepo/monorepo-plugin";

new PrismaPlugin({
  schemaPath: "packages/prisma/schema.prisma",
  outputPath: "packages/prisma/generated",
});


### 2️⃣ Start Your Express Server

# After initializing the plugin, you can safely import your generated Prisma client:

    import express from "express";
import { PrismaClient } from "../packages/prisma/generated/client"; // shared Prisma client

const prisma = new PrismaClient();
const app = express();

app.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.listen(4000, () => console.log("✅ Server running on port 4000"));
### 🧩 Shared Prisma Client Example

# Once your plugin runs, both the frontend and backend can use the same Prisma client from the generated folder.

#  Example structure:
   apps/
  ├── web/               # Next.js frontend
  │    └── next.config.js
  ├── api/               # Express backend
  │    └── server.ts
  └── packages/
       └── prisma/
           ├── schema.prisma
           └── generated/
               └── client/
                   ├── index.js
                   ├── index.d.ts
                   └── ...

# Then in both projects:

## Frontend (Next.js API Route)
  import { PrismaClient } from "packages/prisma/generated/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const posts = await prisma.post.findMany();
  res.status(200).json(posts);
}
## Backend (Express.js)
    import { PrismaClient } from "packages/prisma/generated/client";

const prisma = new PrismaClient();
// use prisma normally here
# ✅ Both apps share a single, consistent Prisma client automatically managed by the plugin.

🧠 Troubleshooting

❌ Error: “Schema not found”
→ Ensure schemaPath is correctly set relative to your project root.

⚠️ Output directory missing
→ Make sure packages/prisma/generated exists or the parent folder has write permissions.

🔁 Client not regenerating after schema change
→ Run a new build for Next.js or restart your backend server.

# 💬 Feedback

If you encounter issues or have feature ideas, please open an issue on GitHub.


MIT © 2025 — Dawit Workye

