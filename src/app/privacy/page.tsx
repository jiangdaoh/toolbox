export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <div className="prose prose-sm dark:prose-invert max-w-none space-y-4">
        <p><strong>Last updated:</strong> {new Date().toLocaleDateString()}</p>
        <h2>Data Collection</h2>
        <p>FreeBox does not collect, store, or transmit any personal data. All tool processing happens entirely in your browser. No data is sent to our servers.</p>
        <h2>Cookies</h2>
        <p>We do not use cookies for tracking purposes. Any cookies used are strictly functional and necessary for the website to operate.</p>
        <h2>Third-Party Services</h2>
        <p>We may use third-party advertising services (such as Google AdSense) which may collect anonymous usage data. Please refer to their respective privacy policies for more information.</p>
        <h2>Analytics</h2>
        <p>We may use privacy-focused analytics to understand general usage patterns. This data is anonymized and cannot be used to identify individual users.</p>
        <h2>Contact</h2>
        <p>If you have questions about this privacy policy, please contact us.</p>
      </div>
    </div>
  );
}
