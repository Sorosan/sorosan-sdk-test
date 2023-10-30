# Sorosan UI Test 

Welcome to the Sorosan UI Test project! This repository serves as a public testing ground for the Sorosan UI. It's designed to help developers explore and understand the methods and interactions provided by the Sorosan SDK when used in a browser environment with Freighter.

## Purpose

This project is primarily intended for testing the SDK's behavior in a browser and Freighter environment. Developers can experiment with various method calls and get a preview of what to expect when using the Sorosan SDK in their own projects. For more comprehensive and in-depth tests, we recommend referring to the test folder in the SDK repository.

## Getting Started

1. Install sorosan-sdk/core via github
```bash
git clone https://github.com/Sorosan/sorosan-sdk
cd sorosan-sdk/
```

2. Build and link package
```bash
npm build
npm link
```

3. Goto sorosan-ui-test and link package to this folder
```bash
cd ../sorosan-ui-test
npm i
npm link @sorosan-sdk/core
```

4. Run the project
```bash
npm run dev
```

## Contribution

If you have insights, improvements, or suggestions to enhance this testing project, feel free to contribute. You can submit issues, create pull requests, or provide feedback to help us make the Sorosan UI Test even more valuable for the developer community.