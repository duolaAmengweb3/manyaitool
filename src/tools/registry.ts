import { ToolCategory } from "@/lib/types";

export interface ToolMeta {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: ToolCategory;
  keywords: string[];
  content: {
    whatIs: string;
    howToUse: string[];
    features: string[];
    faq: { question: string; answer: string }[];
    relatedSlugs: string[];
  };
}

export const toolMetas: ToolMeta[] = [
  {
    slug: "json-formatter",
    title: "JSON Formatter & Validator - Format JSON Online Free",
    shortTitle: "JSON Formatter",
    description: "Free online JSON formatter and validator. Beautify, minify, and validate JSON data instantly in your browser. No data sent to any server.",
    category: "developer",
    keywords: ["json formatter", "json validator", "format json online", "json beautifier", "json prettifier"],
    content: {
      whatIs: "A JSON Formatter is a tool that takes raw or minified JSON (JavaScript Object Notation) data and reformats it with proper indentation and line breaks, making it easy to read and debug. JSON is the most widely used data format for APIs, configuration files, and data exchange between applications. When JSON is minified or poorly formatted, it becomes nearly impossible to read. This tool instantly formats your JSON with customizable indentation, validates its structure, and highlights any syntax errors. All processing happens entirely in your browser — your data never leaves your device.",
      howToUse: ["Paste your JSON data into the input area on the left.", "Choose 'Format' to beautify with indentation, or 'Minify' to compress.", "Select your preferred indentation (2 or 4 spaces).", "The formatted result appears instantly on the right. Click 'Copy' to copy it."],
      features: ["Instant JSON formatting with customizable indentation", "One-click minification to compress JSON", "Real-time syntax validation with error messages", "100% client-side processing — your data stays in your browser", "Works with any valid JSON including nested objects and arrays", "Copy formatted output with one click"],
      faq: [
        { question: "Is my data safe when using this JSON formatter?", answer: "Yes, absolutely. All processing happens entirely in your browser using JavaScript. Your JSON data is never uploaded to any server, making this tool completely safe for sensitive data." },
        { question: "What is valid JSON?", answer: "Valid JSON must use double quotes for strings, cannot have trailing commas, and must start with an object {} or array []. Keys must be strings. Values can be strings, numbers, booleans, null, objects, or arrays." },
        { question: "What is the difference between formatting and minifying?", answer: "Formatting adds indentation and line breaks to make JSON human-readable. Minifying removes all unnecessary whitespace to reduce file size, which is useful for production APIs and data transfer." },
        { question: "Can this tool handle large JSON files?", answer: "Yes, this tool handles JSON files of any reasonable size. Since it runs in your browser, performance depends on your device. Files up to several megabytes process instantly on modern devices." },
      ],
      relatedSlugs: ["base64-encoder"],
    },
  },
  {
    slug: "word-counter",
    title: "Word Counter - Count Words & Characters Online Free",
    shortTitle: "Word Counter",
    description: "Free online word counter tool. Instantly count words, characters, sentences, paragraphs, and estimate reading time. No signup required.",
    category: "text",
    keywords: ["word counter", "character counter", "word count tool", "letter counter", "text counter"],
    content: {
      whatIs: "A Word Counter is a tool that instantly analyzes your text and provides detailed statistics including word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time. Whether you are writing an essay with a word limit, crafting a tweet within the character limit, or optimizing content for SEO, this tool gives you the metrics you need in real time. All counting happens in your browser as you type — no data is uploaded anywhere.",
      howToUse: ["Type or paste your text into the text area above.", "Statistics update instantly as you type — no need to click anything.", "Use the metrics to check word counts, character limits, and reading time."],
      features: ["Real-time word and character counting as you type", "Character count with and without spaces", "Sentence and paragraph detection", "Estimated reading time (based on 225 words per minute)", "Works with any language that uses space-separated words", "100% client-side — your text never leaves your browser"],
      faq: [
        { question: "How are words counted?", answer: "Words are counted by splitting text on whitespace (spaces, tabs, line breaks). Each continuous group of non-whitespace characters counts as one word." },
        { question: "What is the reading time based on?", answer: "Reading time is calculated at 225 words per minute, which is the average adult reading speed for online content." },
        { question: "What are common character limits for social media?", answer: "Twitter/X: 280 characters. Instagram captions: 2,200 characters. LinkedIn posts: 3,000 characters. Facebook posts: 63,206 characters. YouTube titles: 100 characters." },
        { question: "Does it count hyphenated words as one or two?", answer: "Hyphenated words like 'well-known' are counted as one word since there is no space between them." },
      ],
      relatedSlugs: ["lorem-ipsum-generator"],
    },
  },
  {
    slug: "base64-encoder",
    title: "Base64 Encoder & Decoder - Encode/Decode Base64 Online Free",
    shortTitle: "Base64 Encoder",
    description: "Free online Base64 encoder and decoder. Convert text to Base64 and back instantly in your browser. Supports Unicode characters. No data uploaded.",
    category: "developer",
    keywords: ["base64 encode", "base64 decode", "base64 encoder decoder", "encode base64 online", "decode base64"],
    content: {
      whatIs: "Base64 is a binary-to-text encoding scheme that converts binary data into a text format using 64 printable ASCII characters (A-Z, a-z, 0-9, +, and /). This Base64 Encoder & Decoder tool lets you instantly convert text to Base64 encoding and decode Base64 strings back to readable text. Base64 is commonly used in email attachments (MIME), embedding images in HTML/CSS as data URIs, encoding API authentication tokens, and storing binary data in JSON or XML. This tool processes everything in your browser — no data is ever sent to a server.",
      howToUse: ["Select 'Encode' to convert text to Base64, or 'Decode' to convert Base64 back to text.", "Type or paste your input in the left area.", "The result appears instantly on the right. Click 'Copy' to copy it."],
      features: ["Instant encoding and decoding with real-time output", "Full Unicode support — handles emoji, Chinese, Arabic, and all UTF-8 text", "Switch between encode and decode modes with one click", "Copy output to clipboard instantly", "100% client-side — your data never leaves your browser", "No file size limits beyond your browser's memory"],
      faq: [
        { question: "Is Base64 the same as encryption?", answer: "No. Base64 is an encoding scheme, not encryption. Anyone can decode Base64 text without a key. It is designed for data transport, not security. Never use Base64 to protect sensitive data." },
        { question: "Why is the Base64 output larger than the input?", answer: "Base64 encoding increases data size by approximately 33%. Every 3 bytes of input become 4 characters of Base64 output. This overhead is the trade-off for representing binary data as text." },
        { question: "What is Base64 used for?", answer: "Common uses include email attachments (MIME encoding), embedding images in HTML/CSS (data URIs), encoding authentication tokens (Basic Auth headers), and storing binary data in JSON or XML formats." },
        { question: "Does this tool support URL-safe Base64?", answer: "This tool uses standard Base64 encoding. URL-safe Base64 replaces + with - and / with _ to avoid URL encoding issues. You can manually replace these characters in the output if needed." },
      ],
      relatedSlugs: ["json-formatter"],
    },
  },
  {
    slug: "color-picker",
    title: "Color Picker & Converter - HEX RGB HSL Online Free",
    shortTitle: "Color Picker",
    description: "Free online color picker and converter. Pick any color and instantly get HEX, RGB, and HSL values. Copy color codes with one click.",
    category: "design",
    keywords: ["color picker", "hex to rgb", "rgb to hex", "color converter", "hex to hsl", "color code"],
    content: {
      whatIs: "A Color Picker & Converter is a tool that lets you visually select any color and instantly get its value in multiple formats: HEX (used in HTML/CSS), RGB (Red, Green, Blue), and HSL (Hue, Saturation, Lightness). Designers and developers constantly need to convert between color formats when working with CSS, design tools, and brand guidelines. This tool provides instant bidirectional conversion between all three formats. Pick a color visually or enter a value in any format to see the equivalents. Everything runs in your browser with no data sent anywhere.",
      howToUse: ["Click the color picker to visually select a color.", "Or type a HEX value directly (e.g., #ff5733).", "RGB and HSL values update automatically.", "Click 'Copy' next to any format to copy the value."],
      features: ["Visual color picker with large preview swatch", "Instant conversion between HEX, RGB, and HSL formats", "One-click copy for any color format", "Direct HEX input with validation", "CSS-ready output values (rgb() and hsl() syntax)", "Works entirely in your browser"],
      faq: [
        { question: "What is the difference between HEX and RGB?", answer: "HEX and RGB represent the same colors. HEX uses hexadecimal notation (#ff5733) while RGB uses decimal values (rgb(255, 87, 51)). HEX is more compact and commonly used in CSS, while RGB is easier to read and manipulate programmatically." },
        { question: "What is HSL?", answer: "HSL stands for Hue, Saturation, Lightness. Hue is the color angle (0-360 degrees), Saturation is the color intensity (0-100%), and Lightness is how bright the color is (0-100%). HSL is often more intuitive for picking color variations." },
        { question: "How do I use these color values in CSS?", answer: "In CSS, you can use any format: color: #ff5733; or color: rgb(255, 87, 51); or color: hsl(11, 100%, 60%); All three produce the same color." },
      ],
      relatedSlugs: ["json-formatter"],
    },
  },
  {
    slug: "lorem-ipsum-generator",
    title: "Lorem Ipsum Generator - Generate Placeholder Text Free",
    shortTitle: "Lorem Ipsum Generator",
    description: "Free Lorem Ipsum generator. Generate placeholder text by paragraphs, sentences, or words. Classic Latin dummy text for design and development.",
    category: "generator",
    keywords: ["lorem ipsum generator", "lorem ipsum", "dummy text generator", "placeholder text", "random text generator"],
    content: {
      whatIs: "Lorem Ipsum is placeholder text used in the design, publishing, and web development industries. It has been the industry's standard dummy text since the 1500s, when an unknown printer scrambled parts of Cicero's philosophical work 'De Finibus Bonorum et Malorum' to create a type specimen book. This Lorem Ipsum Generator creates random placeholder text in the classic Latin style. You can generate text by paragraphs, sentences, or word count, with the option to start with the traditional 'Lorem ipsum dolor sit amet' opening. It is perfect for filling mockups, testing layouts, and prototyping designs when real content is not yet available.",
      howToUse: ["Choose how many paragraphs, sentences, or words you want to generate.", "Optionally check 'Start with Lorem ipsum...' for the classic opening.", "Click 'Generate' to create the placeholder text.", "Click 'Copy' to copy the text to your clipboard."],
      features: ["Generate by paragraphs, sentences, or word count", "Optional classic 'Lorem ipsum dolor sit amet' opening", "Randomized text that looks natural", "Copy to clipboard with one click", "No limits on text generation amount", "100% client-side — works offline"],
      faq: [
        { question: "What does Lorem Ipsum mean?", answer: "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'De Finibus Bonorum et Malorum' by Cicero, written in 45 BC. The text is scrambled Latin and does not have a coherent meaning." },
        { question: "Is Lorem Ipsum real Latin?", answer: "It is based on real Latin from Cicero's philosophical work, but the words have been altered and scrambled so much that it no longer forms meaningful sentences." },
        { question: "Why use Lorem Ipsum instead of real content?", answer: "Using placeholder text prevents readers from being distracted by readable content when evaluating a design or layout. It lets designers focus on visual elements like typography, spacing, and layout without the bias of meaningful text." },
      ],
      relatedSlugs: ["word-counter"],
    },
  },
];

export function getAllMetas(): ToolMeta[] {
  return toolMetas;
}

export function getMetaBySlug(slug: string): ToolMeta | undefined {
  return toolMetas.find((t) => t.slug === slug);
}

export function getAllSlugs(): string[] {
  return toolMetas.map((t) => t.slug);
}

export function getMetasByCategory(): { category: ToolCategory; label: string; tools: ToolMeta[] }[] {
  const categories = new Map<ToolCategory, ToolMeta[]>();
  for (const tool of toolMetas) {
    const list = categories.get(tool.category) || [];
    list.push(tool);
    categories.set(tool.category, list);
  }
  const labels: Record<string, string> = {
    developer: "Developer Tools",
    text: "Text Tools",
    design: "Design Tools",
    converter: "Converters",
    generator: "Generators",
    calculator: "Calculators",
  };
  return Array.from(categories.entries()).map(([cat, tools]) => ({
    category: cat,
    label: labels[cat] || cat,
    tools,
  }));
}
