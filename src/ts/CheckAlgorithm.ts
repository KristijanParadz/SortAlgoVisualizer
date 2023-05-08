import { animateBubble, bubbleSort } from "./algorithms/BubbleSort";
import { animateInsertion, insertionSort } from "./algorithms/InsertionSort";
import { animateSelection, selectionSort } from "./algorithms/SelectionSort";
import { ArrayElementObject } from "./interfaces";

export function checkAlgorithm(
  algorithmSelect: HTMLSelectElement,
  arrayOfElements: ArrayElementObject[]
): void {
  if (
    algorithmSelect.options[algorithmSelect.selectedIndex].innerText ===
    "Insertion Sort"
  ) {
    animateInsertion(insertionSort(arrayOfElements));
  } else if (
    algorithmSelect.options[algorithmSelect.selectedIndex].innerText ===
    "Selection Sort"
  ) {
    animateSelection(selectionSort(arrayOfElements));
  } else if (
    algorithmSelect.options[algorithmSelect.selectedIndex].innerText ===
    "Bubble Sort"
  ) {
    animateBubble(bubbleSort(arrayOfElements));
  }
}
