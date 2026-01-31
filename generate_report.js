const fs = require('fs');

try {
    const raw = fs.readFileSync('test_results.json');
    const results = JSON.parse(raw);
    console.log('Keys:', Object.keys(results));
    if (results.suites) console.log('Suites length:', results.suites.length);

    let pass = 0;
    let fail = 0;
    let report = '# Test Execution Report\n\n';
    report += '| TC ID | Status | Duration (ms) | Error |\n';
    report += '|---|---|---|---|\n';

    // Helper to traverse suites
    function processSuite(suite) {
        if (suite.specs) {
            suite.specs.forEach(processSpec);
        }
        if (suite.suites) {
            suite.suites.forEach(processSuite);
        }
    }

    function processSpec(spec) {
        const title = spec.title;
        // distinct title extract TC ID
        // "Test Case Pos_Fun_0001 (#1)" -> "Pos_Fun_0001"
        const match = title.match(/Test Case (.*?) \(/);
        const tcId = match ? match[1] : title;

        const testResult = spec.tests[0].results[0];
        // Handle missing results (e.g. skipped)
        if (!testResult) return;

        const status = testResult.status;
        const duration = testResult.duration;
        let error = '';

        if (status === 'passed') {
            pass++;
            report += `| ${tcId} | ✅ PASS | ${duration} | |\n`;
        } else {
            fail++;
            if (testResult.error) {
                error = testResult.error.message.replace(/\n/g, ' ').substring(0, 100);
            }
            else if (testResult.errors && testResult.errors.length > 0) {
                error = testResult.errors[0].message.replace(/\n/g, ' ').substring(0, 100);
            }
            report += `| ${tcId} | ❌ FAIL | ${duration} | ${error} |\n`;
        }
    }

    results.suites.forEach(processSuite);

    report = `## Summary\n- **Total**: ${pass + fail}\n- **Passed**: ${pass}\n- **Failed**: ${fail}\n\n` + report;

    console.log(report);
    fs.writeFileSync('test_report.md', report);

} catch (e) {
    console.error('Error parsing results:', e);
}
