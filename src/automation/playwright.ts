import { ObjectLocalization } from '../ObjectLocalization';

const { chromium } = require('playwright');
const _ = require('lodash');
const uuid = require('uuid');
const viewportWidth = 1440;
const viewportHeight = 785;

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
const convertVecToPx = normalizedVertices => {
  const top = normalizedVertices[0].y * viewportHeight;
  const left = normalizedVertices[0].x * viewportWidth;
  const width =
    normalizedVertices[1].x * viewportWidth -
    normalizedVertices[0].x * viewportWidth;
  const height =
    normalizedVertices[1].y * viewportHeight -
    normalizedVertices[0].y * viewportHeight;
  const centroid = {
    x: left + width / 2,
    y: top + height / 2,
  };
  return {
    top: `${top}px`,
    left: `${left}px`,
    width: `${width}px`,
    height: `${height}px`,
    centroid,
  };
};
// label: 'search_input_box',
const generateInputSteps = (coordinates, text) => {
  const coords = convertVecToPx(coordinates);

  const result = [
    {
      action: 'showBoundingBox',
      //   params: {
      //     top: '259px',
      //     left: '416px',
      //     width: '160px',
      //     height: '30px',
      //   },
      params: coords,
    },
    {
      action: 'mouse.click',
      //   params: [416 + 10, 259 + 5],
      params: [coords.centroid.x, coords.centroid.y],
    },
    {
      action: 'keyboard.insertText',
      params: [text],
    },
  ];
  return result;
};
const generateSearchButtonSteps = coordinates => {
  const coords = convertVecToPx(coordinates);
  return [
    {
      action: 'showBoundingBox',
      params: coords,
      //   params: {
      //     top: '259px',
      //     left: '1056px',
      //     width: '120px',
      //     height: '30px',
      //   },
    },
    {
      action: 'mouse.click',
      params: [coords.centroid.x, coords.centroid.y],
      //   params: [1056 + 10, 259 + 5],
    },
  ];
};
const finalSteps = [
  // {
  //   action: 'pause',
  //   params: [],
  // },
];
const run = async (setupSteps, typeInSearch, finalSteps) => {
  const objectLocalizer = new ObjectLocalization();
  const browser = await chromium.launchPersistentContext('', {
    headless: false,
    slowMo: 1500,
    viewport: { width: viewportWidth, height: viewportHeight },
  });
  const page = await browser.newPage();
  const imagePath = `./images/${uuid.v4()}.png`;
  for await (const setupStep of setupSteps(imagePath)) {
    await _.invoke(page, setupStep.action, ...setupStep.params);
  }

  const prediction = await objectLocalizer.predict(imagePath);
  const searchInputBox = prediction.find(
    result => result.displayName === 'search_input_box',
  );
  const searchButton = prediction.find(
    result => result.displayName === 'search_button',
  );

  const inputSteps = generateInputSteps(
    searchInputBox.imageObjectDetection.boundingBox.normalizedVertices,
    typeInSearch,
  );
  const buttonSteps = generateSearchButtonSteps(
    searchButton.imageObjectDetection.boundingBox.normalizedVertices,
  );
  const steps = [...inputSteps, ...buttonSteps, ...finalSteps];

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

const main = async () => {
  await run(setupStepsCosco, 'cosco', finalSteps);
  const oneyBlNo = 'NK0GF9561700';
  await run(setupStepsOney, oneyBlNo, finalSteps);
  await run(setupStepsOther, 'a search term', finalSteps);
}

main()

