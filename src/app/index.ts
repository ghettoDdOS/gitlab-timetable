import { createRoot } from "react-dom/client";
import { Application } from "./application";
import { createElement } from "react";
import config from "@/shared/config";
import "./index.css";

const rootElement = document.getElementById(config.VITE_ROOT_ELEMENT_ID)!;
const root = createRoot(rootElement);
const rootNode = createElement(Application);

root.render(rootNode);
