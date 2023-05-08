import { ArrayElementObject } from "../interfaces";

interface AnimationSelectionObject {
  element: ArrayElementObject;
  dir: string;
  numberOfMoves: number;
}

export function selectionSort(
  elementArray: ArrayElementObject[]
): AnimationSelectionObject[] {
  let animations: AnimationSelectionObject[] = [];
  let minimumIndex: number;
  for (let i = 0; i < elementArray.length; i++) {
    minimumIndex = i;
    animations.push({
      element: elementArray[i],
      dir: "red",
      numberOfMoves: 1,
    });
    for (let j = i + 1; j < elementArray.length; j++) {
      animations.push({
        element: elementArray[j],
        dir: "green",
        numberOfMoves: 1,
      });
      if (
        parseInt(elementArray[minimumIndex].htmlElement.innerText) >
        parseInt(elementArray[j].htmlElement.innerText)
      ) {
        minimumIndex = j;
        animations.push({
          element: elementArray[minimumIndex],
          dir: "red",
          numberOfMoves: 1,
        });
      }
    }
    animations.push({
      element: elementArray[minimumIndex],
      dir: "dolje",
      numberOfMoves: 1,
    });

    if (minimumIndex - i !== 0) {
      animations.push({
        element: elementArray[minimumIndex],
        dir: "lijevo",
        numberOfMoves: minimumIndex - i,
      });
    }

    animations.push({
      element: elementArray[i],
      dir: "dolje",
      numberOfMoves: 1,
    });

    if (minimumIndex - i !== 0) {
      animations.push({
        element: elementArray[i],
        dir: "desno",
        numberOfMoves: minimumIndex - i,
      });
    }

    animations.push({
      element: elementArray[minimumIndex],
      dir: "gore",
      numberOfMoves: 1,
    });

    animations.push({
      element: elementArray[i],
      dir: "gore",
      numberOfMoves: 1,
    });

    let temp = elementArray[i];
    elementArray[i] = elementArray[minimumIndex];
    elementArray[minimumIndex] = temp;
    animations.push({
      element: elementArray[i],
      dir: "yellow",
      numberOfMoves: 1,
    });
  }
  return animations;
}

export function animateSelection(
  animationArray: AnimationSelectionObject[]
): void {
  let rememberRed: HTMLDivElement;
  let posljednji: HTMLDivElement;
  let counter = 1000;
  animationArray.forEach((animacija) => {
    setTimeout(() => {
      if (
        posljednji !== undefined &&
        posljednji.style.backgroundColor !== "red" &&
        posljednji.style.backgroundColor !== "yellow"
      ) {
        posljednji.style.backgroundColor = "rgb(125, 238, 238)";
      }

      if (animacija.dir === "dolje") {
        animacija.element.htmlElement.style.top = getComputedStyle(
          document.documentElement
        ).getPropertyValue("--down_length");
      } else if (animacija.dir === "gore") {
        animacija.element.htmlElement.style.top = `0rem`;
      } else if (animacija.dir === "desno") {
        if (animacija.element.moved === false) {
          animacija.element.htmlElement.style.left = `${
            animacija.numberOfMoves *
            (animacija.element.htmlElement.getBoundingClientRect().width + 8)
          }px`;
          animacija.element.moved = true;
        } else {
          let numberInPixel = parseFloat(
            animacija.element.htmlElement.style.left
          );
          numberInPixel +=
            animacija.numberOfMoves *
            (animacija.element.htmlElement.getBoundingClientRect().width + 8);
          animacija.element.htmlElement.style.left = `${numberInPixel}px`;
        }
      } else if (animacija.dir === "lijevo") {
        if (animacija.element.moved === false) {
          animacija.element.htmlElement.style.left = `-${
            animacija.numberOfMoves *
            (animacija.element.htmlElement.getBoundingClientRect().width + 8)
          }px`;
          animacija.element.moved = true;
        } else {
          let numberInPixel = parseFloat(
            animacija.element.htmlElement.style.left
          );
          numberInPixel -=
            animacija.numberOfMoves *
            (animacija.element.htmlElement.getBoundingClientRect().width + 8);
          animacija.element.htmlElement.style.left = `${numberInPixel}px`;
        }
      } else if (animacija.dir === "green") {
        animacija.element.htmlElement.style.backgroundColor = "green";
        posljednji = animacija.element.htmlElement;
      } else if (animacija.dir === "red") {
        animacija.element.htmlElement.style.backgroundColor = "red";
        if (
          rememberRed !== undefined &&
          rememberRed !== animacija.element.htmlElement &&
          rememberRed.style.backgroundColor !== "yellow"
        ) {
          rememberRed.style.backgroundColor = "rgb(125, 238, 238)";
        }
        rememberRed = animacija.element.htmlElement;
      } else if (animacija.dir === "yellow") {
        animacija.element.htmlElement.style.backgroundColor = "yellow";
      }
    }, counter);
    counter += 450;
  });
}
