const { chromium } = require('playwright');
const _ = require('lodash');
const uuid = require('uuid');

const setupStepsOther = (imagePath: string) => [
  {
    action: 'goto',
    params: ['https://yahoo.com'],
  },
  {
    action: 'click',
    params: ['button:has-text("Ich stimme zu.")'],
  },
  {
    action: 'screenshot',
    params: [{ path: imagePath }],
  },
];
const setupStepsOney = (imagePath: string) => [
  {
    action: 'goto',
    params: ['https://ecomm.one-line.com/ecom/CUP_HOM_3301.do'],
  },
  {
    action: 'screenshot',
    params: [{ path: imagePath }],
  },
];
const setupStepsCosco = (imagePath: string) => [
  {
    action: 'goto',
    params: ['https://elines.coscoshipping.com/ebusiness/cargoTracking'],
  },
  {
    action: 'click',
    params: ['button:has-text("OK")'],
  },
  {
    action: 'screenshot',
    params: [{ path: imagePath }],
  },
];
const convertVecToPx = coordinates => {
  const top = coordinates[0];
  const left = coordinates[1];
  const width = coordinates[2];
  const height = coordinates[3];

  return {
    top: `${top}px`,
    left: `${left}px`,
    width: `${width}px`,
    height: `${height}px`,
  };
};
// label: 'search_input_box',
const generateInputSteps = (coordinates, text) => {
  const result = [
    {
      action: 'showBoundingBox',
      params: {
        top: '259px',
        left: '416px',
        width: '160px',
        height: '30px',
      },
    },
    {
      action: 'mouse.click',
      params: [416 + 10, 259 + 5],
    },
    {
      action: 'keyboard.insertText',
      params: [text],
    },
  ];
  return result;
};
const generateSearchButtonSteps = coordinates => {
  return [
    {
      action: 'showBoundingBox',
      params: {
        top: '259px',
        left: '1056px',
        width: '120px',
        height: '30px',
      },
    },
    {
      action: 'mouse.click',
      params: [1056 + 10, 259 + 5],
    },
  ];
};
const finalSteps = [
  {
    action: 'pause',
    params: [],
  },
];
const run = async (setupSteps, typeInSearch, finalSteps) => {
  const browser = await chromium.launchPersistentContext('', {
    headless: false,
    slowMo: 500,
    viewport: { width: 1440, height: 785 },
  });
  const page = await browser.newPage();
  const imagePath = `./images/${uuid.v4()}.png`;
  for await (const setupStep of setupSteps(imagePath)) {
    await _.invoke(page, setupStep.action, ...setupStep.params);
  }

  const inputSteps = generateInputSteps([], typeInSearch);
  const buttonSteps = generateSearchButtonSteps([]);
  const steps = [...inputSteps, ...buttonSteps, finalSteps];

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
// run(setupStepsCosco, 'cosco', finalSteps);
const oneyBlNo = 'NK0GF9561700';
// run(setupStepsOney, oneyBlNo, finalSteps);
run(setupStepsOther, 'a search term', finalSteps);
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
