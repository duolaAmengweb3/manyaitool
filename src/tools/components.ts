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
import AiTokenCalculator from "./ai-token-calculator";
import JwtDecoder from "./jwt-decoder";
import MarkdownToHtml from "./markdown-to-html";
import TimestampConverter from "./timestamp-converter";
import SvgToPng from "./svg-to-png";
import ImageToBase64 from "./image-to-base64";

register("json-formatter", { default: JsonFormatter });
register("word-counter", { default: WordCounter });
register("base64-encoder", { default: Base64Encoder });
register("color-picker", { default: ColorPicker });
register("lorem-ipsum-generator", { default: LoremIpsumGenerator });
register("ai-token-calculator", { default: AiTokenCalculator });
register("jwt-decoder", { default: JwtDecoder });
register("markdown-to-html", { default: MarkdownToHtml });
register("timestamp-converter", { default: TimestampConverter });
register("svg-to-png", { default: SvgToPng });
register("image-to-base64", { default: ImageToBase64 });

export function getToolComponent(slug: string): ComponentType | undefined {
  return componentMap[slug];
}
