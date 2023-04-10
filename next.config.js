// https://github.com/vercel/next.js/discussions/35969
import * as tsImport from "ts-import";
tsImport.loadSync("./src/env/index.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig
