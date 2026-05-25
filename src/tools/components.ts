"use client";

import { ComponentType, lazy } from "react";

const componentMap: Record<string, ComponentType> = {};

function register(slug: string, mod: { default: ComponentType }) {
  componentMap[slug] = mod.default;
}

import JsonFormatter from "./json-formatter";
import WordCounter from "./word-counter";
import Base64Encoder from "./base64-encoder";
import ColorPicker from "./color-picker";
import LoremIpsumGenerator from "./lorem-ipsum-generator";

register("json-formatter", { default: JsonFormatter });
register("word-counter", { default: WordCounter });
register("base64-encoder", { default: Base64Encoder });
register("color-picker", { default: ColorPicker });
register("lorem-ipsum-generator", { default: LoremIpsumGenerator });

export function getToolComponent(slug: string): ComponentType | undefined {
  return componentMap[slug];
}
