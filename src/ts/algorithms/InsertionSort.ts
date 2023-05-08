import { ArrayElementObject } from "../interfaces";

interface AnimationInsertionObject {
  element: ArrayElementObject;
  dir: string;
}

export function insertionSort(
  elementArray: ArrayElementObject[]
): AnimationInsertionObject[] {
  let animations: AnimationInsertionObject[] = [];
  elementArray[0].htmlElement.style.backgroundColor = "yellow";
  for (let i = 1; i < elementArray.length; i++) {
    let key = elementArray[i];
    animations.push({
      element: key,
      dir: "dolje",
    });
    let j = i - 1;

    while (
      j >= 0 &&
      parseInt(key.htmlElement.innerText) <
        parseInt(elementArray[j].htmlElement.innerText)
    ) {
      animations.push({
        element: elementArray[j],
        dir: "desno",
      });

      animations.push({
        element: key,
        dir: "lijevo",
      });
      elementArray[j + 1] = elementArray[j];
      j -= 1;
    }
    animations.push({
      element: key,
      dir: "gore",
    });
    elementArray[j + 1] = key;
  }

  return animations;
}

export function animateInsertion(
  animationArray: AnimationInsertionObject[]
): void {
  let counter = 1000;
  let rememberRight: HTMLDivElement;
  let rememberYellowRight: HTMLDivElement;
  animationArray.forEach((animacija: AnimationInsertionObject) => {
    setTimeout(() => {
      if (rememberRight) {
        rememberRight.style.backgroundColor = "rgb(125, 238, 238)";
      }
      if (rememberYellowRight) {
        rememberYellowRight.style.backgroundColor = "yellow";
      }
      if (animacija.dir === "dolje") {
        animacija.element.htmlElement.style.top = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--down_length");
        animacija.element.htmlElement.style.backgroundColor = "rgb(229,98,98)";
      } else if (animacija.dir === "gore") {
        animacija.element.htmlElement.style.top = `0rem`;
        animacija.element.htmlElement.style.backgroundColor = "yellow";
      } else if (animacija.dir === "desno") {
        if (animacija.element.htmlElement.style.backgroundColor === "yellow")
          rememberYellowRight = animacija.element.htmlElement;
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
      } else {
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
      }
    }, counter);
    counter += 450;
  });
}
