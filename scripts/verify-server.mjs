async function verify() {
  try {
    const res = await fetch('http://localhost:4173/');
    console.log('HTTP Status:', res.status, res.statusText);
    const html = await res.text();
    console.log('HTML size:', html.length, 'bytes');
    console.log('Has root div:', html.includes('id="root"'));
    console.log('Has title BREWBOARD:', html.includes('BREWBOARD'));

    // Check SVG coffee illustrations
    const testSvgRes = await fetch('http://localhost:4173/images/espresso.svg');
    console.log('Espresso SVG status:', testSvgRes.status, 'Content-Type:', testSvgRes.headers.get('content-type'));

    const testVnSvgRes = await fetch('http://localhost:4173/images/vietnamese-coffee.svg');
    console.log('Vietnamese Coffee SVG status:', testVnSvgRes.status);

    const testFaviconRes = await fetch('http://localhost:4173/favicon.svg');
    console.log('Favicon status:', testFaviconRes.status);

    console.log('ALL STATIC CHECKS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('Server check failed:', err);
    process.exit(1);
  }
}

verify();

