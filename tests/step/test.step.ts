async function attachAccessibilityReport(testInfo, results) {
    await testInfo.attach('accessibility report', {
        body: JSON.stringify(results, null, 2),
        contentType: 'application/json'
    });
}
