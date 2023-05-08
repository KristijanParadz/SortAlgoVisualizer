import { ArrayElementObject } from "../interfaces";

interface AnimationBubbleObject {
  element: ArrayElementObject;
  dir: string;
  elements?: ArrayElementObject[];
}

export function bubbleSort(
  elementArray: ArrayElementObject[]
): AnimationBubbleObject[] {
  let animations: AnimationBubbleObject[] = [];
  const n = elementArray.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (
        parseInt(elementArray[j].htmlElement.innerText) >
        parseInt(elementArray[j + 1].htmlElement.innerText)
      ) {
        animations.push({
          element: elementArray[j + 1],
          dir: "dolje",
        });
        animations.push({
          element: elementArray[j],
          dir: "desno",
        });
        animations.push({
          element: elementArray[j + 1],
          dir: "lijevo",
        });
        animations.push({
          element: elementArray[j + 1],
          dir: "gore",
        });

        let temp = elementArray[j];
        elementArray[j] = elementArray[j + 1];
        elementArray[j + 1] = temp;
      } else {
        animations.push({
          element: elementArray[j],
          elements: [elementArray[j + 1], elementArray[j]],
          dir: "no",
        });
      }
    }
    animations.push({
      element: elementArray[n - i - 1],
      dir: "zuto",
    });
  }
  return animations;
}

export function animateBubble(animationArray: AnimationBubbleObject[]): void {
  let counter = 1000;
  let rememberRight: HTMLDivElement;
  let rememberLeft: ArrayElementObject[] = [];
  animationArray.forEach((animacija) => {
    setTimeout(() => {
      if (rememberLeft.length > 0) {
        rememberLeft.forEach((e) => {
          if (e.htmlElement.style.backgroundColor !== "yellow") {
            e.htmlElement.style.backgroundColor = "rgb(125, 238, 238)";
          }
        });
      }

      if (
        rememberRight != undefined &&
        rememberRight.style.backgroundColor !== "yellow"
      ) {
        rememberRight.style.backgroundColor = "rgb(125, 238, 238)";
      }
      if (animacija.dir === "dolje") {
        animacija.element.htmlElement.style.top = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--down_length");
        animacija.element.htmlElement.style.backgroundColor = "rgb(229,98,98)"; //rgb(229,98,98)
      } else if (animacija.dir === "gore") {
        animacija.element.htmlElement.style.top = `0rem`;
        animacija.element.htmlElement.style.backgroundColor =
          "rgb(125, 238, 238)";
      } else if (animacija.dir === "desno") {
        animacija.element.htmlElement.style.backgroundColor = "green";
        rememberRight = animacija.element.htmlElement;
        if (animacija.element.moved === false) {
          animacija.element.htmlElement.style.left = `${
            animacija.element.htmlElement.getBoundingClientRect().width + 8
          }px`;
          animacija.element.moved = true;
        } else {
          let numberInPixel = parseFloat(
            animacija.element.htmlElement.style.left
          );
          numberInPixel +=
            animacija.element.htmlElement.getBoundingClientRect().width + 8;
          animacija.element.htmlElement.style.left = `${numberInPixel}px`;
        }
      } else if (animacija.dir === "lijevo") {
        if (animacija.element.moved === false) {
          animacija.element.htmlElement.style.left = `-${
            animacija.element.htmlElement.getBoundingClientRect().width + 8
          }px`;
          animacija.element.moved = true;
        } else {
          let numberInPixel = parseFloat(
            animacija.element.htmlElement.style.left
          );
          numberInPixel -=
            animacija.element.htmlElement.getBoundingClientRect().width + 8;
          animacija.element.htmlElement.style.left = `${numberInPixel}px`;
        }
      } else if (animacija.dir === "zuto") {
        animacija.element.htmlElement.style.backgroundColor = "yellow";
      } else {
        rememberLeft = [];
        animacija.elements?.forEach((e) => {
          e.htmlElement.style.backgroundColor = "green";
          rememberLeft.push(e);
        });
      }
    }, counter);
    counter += 450;
  });
}
