import { ArrayElementObject } from "./interfaces";

export function createContainer(
  arrayLength: HTMLInputElement,
  arrayContainer: HTMLDivElement,
  arrayOfElements: ArrayElementObject[]
): void {
  for (let i = 0; i < parseInt(arrayLength.value); i++) {
    let div = document.createElement("div");
    div.innerText = generateRandom().toString();
    div.classList.add("broj");
    div.style.height = `${parseInt(div.innerText) * 2.2}px`;
    arrayContainer.appendChild(div);
    const arrayElement: ArrayElementObject = {
      htmlElement: div,
      moved: false,
      broj: parseInt(div.innerText),
    };
    arrayOfElements.push(arrayElement);
  }
}

function generateRandom(min = 10, max = 99): number {
  let difference = max - min;

  let rand = Math.random();

  rand = Math.floor(rand * difference);

  rand = rand + min;

  return rand;
}
