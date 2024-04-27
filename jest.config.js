const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  type: "module",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"], // <= setup file here 
  testEnvironment: "jsdom",
};

module.exports = createJestConfig(customJestConfig);