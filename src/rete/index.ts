import { createEditor as createDefaultEditor } from "./default";

const factory = {
  default: createDefaultEditor,
};
const query =
  typeof window.location !== "undefined" &&
  new URLSearchParams(window.location.search);
const name = ((query && query.get("template")) ||
  "default") as keyof typeof factory;

const createEditor = factory[name];

if (!createEditor) {
  throw new Error(`template with name ${name} not found`);
}

export default createEditor;
