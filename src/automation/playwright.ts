const { chromium } = require('playwright');
const _ = require('lodash');
const gotoWebsite = {
  action: 'goto',
  params: ['https://elines.coscoshipping.com/ebusiness/cargoTracking'],
};
const steps = [
  {
    action: 'click',
    params: ['button:has-text("OK")'],
  },
  {
    action: 'showBoundingBox',
    params: {
      top: '259px',
      left: '239px',
      width: '120px',
      height: '30px',
    },
  },
  {
    action: 'mouse.click',
    params: [239 + 10, 259 + 5],
  },
  {
    action: 'pause',
    params: [],
  },
];
const run = async (gotoWebsite, steps) => {
  const browser = await chromium.launchPersistentContext('', {
    headless: false,
    slowMo: 500,
    viewport: { width: 1440, height: 785 },
  });
  const page = await browser.newPage();
  await _.invoke(page, gotoWebsite.action, ...gotoWebsite.params);
  for await (const step of steps) {
    console.log(step);
    if (step.action === 'showBoundingBox') {
      const aHandle = await page.evaluateHandle(() => document);
      const element = await page.evaluateHandle(
        // Draw bounding box
        ([document, step]) => {
          const el = document.createElement('div');
          const { top, left, width, height } = step.params;
          el.style = `width:${width};height:${height};top:${top};left:${left};border:3px solid #d62828;position:fixed;pointer-events:none;`;
          document.body.appendChild(el);
          return el;
        },
        [aHandle, step],
      );
      // await page.pause();

      // Remove bounding box
      await page.evaluateHandle(
        ([document, element]) => {
          document.body.removeChild(element);
        },
        [aHandle, element],
      );
    } else {
      await _.invoke(page, step.action, ...step.params);
    }
  }
  // await handle.dispose();
  await browser.close();
};
run(gotoWebsite, steps);
const cosco = async () => {
  const browser = await chromium.launchPersistentContext('', {
    headless: false,
    slowMo: 1000,
    viewport: { width: 1440, height: 785 },
  });
  const page = await browser.newPage();
  await page.goto('https://elines.coscoshipping.com/ebusiness/cargoTracking');
  await page.click('button:has-text("OK")');
  // await page.pause();
  // await page.click("text=Bill Of Lading");
  // await page.click("text=Booking");
  // await page.mouse.move(239 + 10, 259 + 5);
  await page.mouse.click(239 + 10, 259 + 5);
  await page.pause();
  // await page.click(button);
  // await page.goto("http://whatsmyuseragent.org/");
  // await page.screenshot({ path: `example.png` });
  await browser.close();
};
// cosco();
const ss = async () => {
  const browser = await chromium.launchPersistentContext('', {
    headless: false,
    slowMo: 1000,
    viewport: { width: 1440, height: 785 },
  });
  const page = await browser.newPage();

  await page.goto('http://google.com');
  await page.click('button:has-text("I agree")');
  await page.screenshot({ path: `example.png` });
  await browser.close();
};
// ss();
