const puppeteer = require('puppeteer');

(async () => {
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  const routes = [
    '/app',
    '/app/ai-copilot',
    '/app/sales',
    '/app/marketing',
    '/app/crm',
    '/app/erp',
    '/app/finance',
    '/app/inventory',
    '/app/hr',
    '/app/support',
    '/app/analytics',
    '/app/automation',
    '/app/documents',
    '/app/settings',
    '/app/profile',
    '/app/notifications'
  ];

  page.on('pageerror', err => {
    console.log(`[PAGE_ERROR] ${err.toString()}`);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.log(`[CONSOLE_ERROR] ${msg.text()}`);
    }
  });

  const baseUrl = 'http://localhost:5173';

  console.log('Navigating routes...');
  for (const route of routes) {
    console.log(`\nTesting ${route}...`);
    try {
      await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle2' });
      // Wait a moment for React to render and potentially crash
      await new Promise(r => setTimeout(r, 1000));
      const bodyHTML = await page.evaluate(() => document.body.innerHTML);
      if (bodyHTML.includes('id="root"')) {
        const rootHTML = await page.evaluate(() => document.getElementById('root').innerHTML);
        if (rootHTML.trim() === '') {
          console.log(`[BLANK_PAGE] Route ${route} rendered a blank page!`);
        } else {
          console.log(`[OK] Route ${route} rendered successfully.`);
        }
      }
    } catch (e) {
      console.log(`[NAVIGATION_ERROR] Failed to navigate to ${route}: ${e.message}`);
    }
  }

  await browser.close();
  console.log('Done.');
})();
