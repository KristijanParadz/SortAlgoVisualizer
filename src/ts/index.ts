import { checkAlgorithm } from "./CheckAlgorithm";
import { createContainer } from "./CreateContainer";
import "../styles.scss";
import { ArrayElementObject } from "./interfaces";

const algorithmSelect = document.querySelector(
  ".select-algo"
) as HTMLSelectElement;
const arrayLength = document.querySelector(".array-length") as HTMLInputElement;
const startButton = document.querySelector(".start") as Element;
const arrayContainer = document.querySelector(".array") as HTMLDivElement;
let arrayOfElements: ArrayElementObject[];

startButton.addEventListener("click", () => {
  arrayContainer.replaceChildren();
  arrayOfElements = [];
  createContainer(arrayLength, arrayContainer, arrayOfElements);
  checkAlgorithm(algorithmSelect, arrayOfElements);
});
