# SwiftTranslator Automation - ITPM Assignment 01

This project contains an automated testing suite for [SwiftTranslator.com](https://www.swifttranslator.com/) using **Playwright** and **Excel** data integration.

## 📂 Project Structure

- **`tests/swift_translator.spec.js`**: Main automation script that reads test cases from the Excel file and executes them.
- **`ITPM_A01 New.xlsx`**: Excel file containing the test cases (Input, Expected Output).
- **`generate_report.js`**: Utility script to parse the JSON test results and generate a Markdown report.
- **`test_report.md`**: Generated test execution report.

## 🚀 Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [NPM](https://www.npmjs.com/)

## 🛠️ Installation

1. Clone this repository (if you haven't already).
2. Install the dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## ▶️ Running Tests

### Run all tests (Headless mode)
```bash
npx playwright test
```

### Run tests with browser visible (Headed mode)
```bash
npx playwright test --headed
```

### Generate Test Report
First, run the tests and output the results to JSON:
```bash
npx playwright test --reporter=json > test_results.json
```
Then, generate the markdown report:
```bash
node generate_report.js
```

## 📊 Test Coverage

The suite automates 35 test cases defined in the `ITPM_A01 New.xlsx` file. It verifies:
- Input of Singlish text.
- Clicking the "Translate" button.
- Verifying the output against expected results.
