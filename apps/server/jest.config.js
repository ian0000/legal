/** @type {import('jest').Config} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  rootDir: "./src",
  testMatch: ["**/?(*.)+(spec|test).ts"],
  setupFilesAfterEnv: ["<rootDir>/test/setup.ts"],
  clearMocks: true,

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};
