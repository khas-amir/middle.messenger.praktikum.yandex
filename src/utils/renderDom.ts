import Block from "../modules/Block";

export function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (!root) {
    throw new Error("Root element not found");
  }

  root.appendChild(block.getContent());
  block.dispatchComponentDidMount();

  return root;
}