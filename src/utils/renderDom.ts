import Block from "./Block";

export function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error("Root element not found");
  }

  console.log(block.getContent());

  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
}