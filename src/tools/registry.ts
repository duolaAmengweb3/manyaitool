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
    explained?: string;
    useCases?: string[];
    tips?: string[];
    howToUse: string[];
    features: string[];
    faq: { question: string; answer: string }[];
    relatedSlugs: string[];
  };
}

export const toolMetas: ToolMeta[] = [
  {
    slug: "json-formatter",
    title: "JSON Formatter & Validator Online Free",
    shortTitle: "JSON Formatter",
    description: "Free online JSON formatter and validator. Beautify, minify, and validate JSON data instantly in your browser. No data sent to any server.",
    category: "developer",
    keywords: ["json formatter", "json validator", "format json online", "json beautifier", "json prettifier"],
    content: {
      whatIs: "A JSON Formatter is a tool that takes raw or minified JSON (JavaScript Object Notation) data and reformats it with proper indentation and line breaks, making it easy to read and debug. JSON is the most widely used data interchange format on the web, with over 70% of public REST APIs returning JSON responses according to ProgrammableWeb. When JSON is minified for production — stripped of all whitespace to save bandwidth — a 50KB payload becomes an unreadable wall of text.\n\nThis tool instantly formats your JSON with customizable indentation (2 or 4 spaces), validates its structure against the ECMA-404 standard, and pinpoints syntax errors with line-number references. It handles deeply nested objects, arrays with thousands of elements, and files up to several megabytes without breaking a sweat. Whether you are inspecting a webhook payload, editing a package.json, or debugging an API integration, the formatter presents your data in a clean, collapsible tree structure.\n\nAll processing happens entirely in your browser using JavaScript's built-in JSON.parse() and JSON.stringify() methods. Your data never leaves your device — there are no server calls, no logging, and no analytics on your input. This makes it safe for sensitive configuration files, API keys embedded in JSON, and proprietary data structures.",
      explained: "JSON (JavaScript Object Notation) is a text-based data format defined by the ECMA-404 standard and RFC 8259. Despite its name, JSON is language-independent and supported by virtually every programming language. A valid JSON document must follow strict syntax rules: strings must use double quotes (not single quotes), keys must be quoted strings, trailing commas are not allowed, and the root value must be an object, array, string, number, boolean, or null.\n\nWhen a browser or server parses JSON, it performs lexical analysis (tokenization) followed by syntax validation. The parser reads characters sequentially, building tokens like STRING, NUMBER, COLON, and COMMA, then verifies they follow the grammar rules. If a trailing comma appears before a closing bracket, or a single-quoted string is encountered, the parser throws a SyntaxError with the position of the offending character.\n\nCommon JSON errors include: trailing commas after the last element ({\"a\": 1,}), single-quoted strings ({'key': 'value'}), unquoted keys ({key: \"value\"}), comments (JSON does not support // or /* */), and special values like undefined, NaN, or Infinity (not valid in JSON). Understanding these rules helps developers write valid JSON the first time and quickly diagnose parsing failures.",
      useCases: [
        "Debugging API responses by formatting raw JSON payloads from tools like Postman, curl, or browser DevTools into readable, indented output.",
        "Editing configuration files such as package.json, tsconfig.json, or .eslintrc.json where a missing comma or bracket can break your entire project.",
        "Validating data exchange between microservices where malformed JSON causes silent failures in message queues like RabbitMQ or Kafka.",
        "Analyzing log files that store structured events as single-line JSON entries (NDJSON format), making them readable for incident investigation.",
        "Preparing JSON examples for API documentation, technical tutorials, and developer onboarding guides where clean formatting is essential.",
        "Inspecting database exports from MongoDB, CouchDB, or Firebase Realtime Database where large JSON documents need human review before import."
      ],
      tips: [
        "Trailing commas are the number one JSON syntax error. Always remove the comma after the last element in an object or array — unlike JavaScript, JSON does not allow them.",
        "If your JSON contains Unicode escape sequences like \\u00e9, the formatter will display the actual character. Check that your source encoding is UTF-8 to avoid garbled output.",
        "For JSON files larger than 10MB, consider using a streaming parser like jq on the command line. Browser-based formatters load the entire document into memory, which can slow down or crash tabs on low-memory devices.",
        "When nesting objects more than 4-5 levels deep, readability drops sharply even with formatting. Consider flattening your data structure or extracting nested objects into separate keys.",
        "Use 2-space indentation for configuration files you commit to version control — it keeps diffs smaller. Use 4-space indentation when reviewing or presenting JSON to non-developers for easier scanning."
      ],
      howToUse: ["Paste your JSON data into the input area on the left.", "Choose 'Format' to beautify with indentation, or 'Minify' to compress.", "Select your preferred indentation (2 or 4 spaces).", "The formatted result appears instantly on the right. Click 'Copy' to copy it."],
      features: ["Instant JSON formatting with customizable indentation", "One-click minification to compress JSON", "Real-time syntax validation with error messages", "100% client-side processing — your data stays in your browser", "Works with any valid JSON including nested objects and arrays", "Copy formatted output with one click"],
      faq: [
        { question: "Is my data safe when using this JSON formatter?", answer: "Yes, absolutely. All processing happens entirely in your browser using JavaScript. Your JSON data is never uploaded to any server, making this tool completely safe for sensitive data." },
        { question: "What is valid JSON?", answer: "Valid JSON must use double quotes for strings, cannot have trailing commas, and must start with an object {} or array []. Keys must be strings. Values can be strings, numbers, booleans, null, objects, or arrays." },
        { question: "What is the difference between formatting and minifying?", answer: "Formatting adds indentation and line breaks to make JSON human-readable. Minifying removes all unnecessary whitespace to reduce file size, which is useful for production APIs and data transfer." },
        { question: "Can this tool handle large JSON files?", answer: "Yes, this tool handles JSON files of any reasonable size. Since it runs in your browser, performance depends on your device. Files up to several megabytes process instantly on modern devices." },
      ],
      relatedSlugs: ["base64-encoder", "jwt-decoder", "markdown-to-html", "word-counter"],
    },
  },
  {
    slug: "word-counter",
    title: "Word Counter - Count Words & Characters Free",
    shortTitle: "Word Counter",
    description: "Free online word counter tool. Instantly count words, characters, sentences, paragraphs, and estimate reading time. No signup required.",
    category: "text",
    keywords: ["word counter", "character counter", "word count tool", "letter counter", "text counter"],
    content: {
      whatIs: "A Word Counter is a tool that instantly analyzes your text and provides detailed statistics including word count, character count (with and without spaces), sentence count, paragraph count, and estimated reading time. Whether you are writing an essay with a strict 500-word limit, crafting a tweet within 280 characters, or optimizing a blog post for SEO with a target of 1,500-2,500 words, this tool gives you the metrics you need in real time.\n\nThe counter tracks six key metrics simultaneously: total words, total characters, characters without spaces, sentences, paragraphs, and estimated reading time. Reading time is calculated at 225 words per minute, the average adult reading speed for online content according to research published in the Journal of Memory and Language. A typical 1,000-word article takes about 4.4 minutes to read.\n\nAll counting happens in your browser as you type — no data is uploaded anywhere. This makes it safe for confidential documents, academic papers, and business communications. The tool processes text in any language that uses space-separated words, including English, Spanish, French, German, and hundreds more. For CJK languages (Chinese, Japanese, Korean), character count is typically more relevant than word count since these languages do not use spaces between words.",
      explained: "Word counting algorithms work by splitting text on whitespace boundaries — spaces, tabs, and line breaks — and counting the resulting non-empty segments. This whitespace-tokenization approach is the standard used by Microsoft Word, Google Docs, and most publishing platforms. However, edge cases make counting less straightforward than it appears: hyphenated words like 'state-of-the-art' count as one word (no spaces), contractions like 'don't' count as one word, and em-dashes without spaces like 'word—word' may count as one or two depending on the tool.\n\nCharacter counting has two common modes: with spaces and without spaces. The 'with spaces' count matches what you see if you select all text and check the length. The 'without spaces' count is used in some academic and publishing contexts, particularly for translation pricing where a 'standard page' is defined as 1,800 characters without spaces in many European markets.\n\nReading time estimation is based on decades of eye-tracking research. The commonly cited average of 200-250 words per minute applies to non-fiction online content. Technical material with code or data drops to about 150 WPM, while light fiction can reach 300 WPM. Speaking time (for presentations) averages 130-150 WPM. These benchmarks help writers calibrate content length for their audience.",
      useCases: [
        "Meeting essay and assignment word limits for academic submissions — most universities enforce strict word counts with penalties for exceeding them by even 10%.",
        "Optimizing blog posts and articles for SEO, where studies show content between 1,500-2,500 words tends to rank higher in Google search results.",
        "Checking social media post length against platform limits: Twitter/X (280 characters), Instagram captions (2,200), LinkedIn posts (3,000), and YouTube descriptions (5,000).",
        "Estimating reading time for articles and newsletters so editors can set accurate '5 min read' labels that improve reader engagement.",
        "Calculating translation costs, where agencies typically charge per word (English) or per character (CJK languages), making accurate counts essential for budgeting.",
        "Keeping business emails concise — research from Boomerang shows emails between 50-125 words get the highest response rates."
      ],
      tips: [
        "Hyphenated compounds like 'well-known' and 'mother-in-law' count as one word in most word processors and this tool. If your publisher counts them differently, ask for their specific convention.",
        "For CJK languages (Chinese, Japanese, Korean), character count is more meaningful than word count since these languages do not use spaces between words. A Chinese document with 2,000 characters is roughly equivalent to a 1,200-word English document.",
        "Reading time estimates assume plain prose. If your text includes code blocks, tables, or data, actual reading time will be 30-50% longer. Presentations should target 130-150 words per minute of speaking time.",
        "When checking character limits for social media, remember that URLs count differently on some platforms — Twitter/X counts any URL as 23 characters regardless of actual length.",
        "Contractions like 'don't', 'it's', and 'they're' count as one word. Expanding them to 'do not', 'it is', and 'they are' adds to your word count — useful when you need to reach a minimum word limit."
      ],
      howToUse: ["Type or paste your text into the text area above.", "Statistics update instantly as you type — no need to click anything.", "Use the metrics to check word counts, character limits, and reading time."],
      features: ["Real-time word and character counting as you type", "Character count with and without spaces", "Sentence and paragraph detection", "Estimated reading time (based on 225 words per minute)", "Works with any language that uses space-separated words", "100% client-side — your text never leaves your browser"],
      faq: [
        { question: "How are words counted?", answer: "Words are counted by splitting text on whitespace (spaces, tabs, line breaks). Each continuous group of non-whitespace characters counts as one word." },
        { question: "What is the reading time based on?", answer: "Reading time is calculated at 225 words per minute, which is the average adult reading speed for online content." },
        { question: "What are common character limits for social media?", answer: "Twitter/X: 280 characters. Instagram captions: 2,200 characters. LinkedIn posts: 3,000 characters. Facebook posts: 63,206 characters. YouTube titles: 100 characters." },
        { question: "Does it count hyphenated words as one or two?", answer: "Hyphenated words like 'well-known' are counted as one word since there is no space between them." },
      ],
      relatedSlugs: ["lorem-ipsum-generator", "markdown-to-html", "json-formatter", "ai-token-calculator"],
    },
  },
  {
    slug: "base64-encoder",
    title: "Base64 Encoder & Decoder Online Free",
    shortTitle: "Base64 Encoder",
    description: "Free online Base64 encoder and decoder. Convert text to Base64 and back instantly in your browser. Supports Unicode characters. No data uploaded.",
    category: "developer",
    keywords: ["base64 encode", "base64 decode", "base64 encoder decoder", "encode base64 online", "decode base64"],
    content: {
      whatIs: "Base64 is a binary-to-text encoding scheme that converts binary data into a text format using 64 printable ASCII characters (A-Z, a-z, 0-9, +, and /). This Base64 Encoder & Decoder tool lets you instantly convert text to Base64 encoding and decode Base64 strings back to readable text. Base64 is used billions of times daily across the internet — every email with an attachment uses it, every Basic Auth header contains it, and millions of websites embed small images as Base64 data URIs.\n\nThe encoding process takes every 3 bytes (24 bits) of input and splits them into four 6-bit groups, mapping each group to one of the 64 characters in the Base64 alphabet. If the input length is not a multiple of 3, padding characters (=) are added to the output. This means a 100-byte input always produces exactly 136 characters of Base64 output — a predictable 33% size increase.\n\nThis tool processes everything in your browser using JavaScript's built-in btoa() and atob() functions with UTF-8 encoding support. No data is ever sent to a server, making it safe for encoding API keys, authentication tokens, and other sensitive strings. It handles full Unicode including emoji, Chinese characters, Arabic text, and any valid UTF-8 content.",
      explained: "Base64 encoding is defined in RFC 4648 and uses a 64-character alphabet: uppercase A-Z (values 0-25), lowercase a-z (26-51), digits 0-9 (52-61), plus (+, value 62), and slash (/, value 63). The equals sign (=) is used for padding. The encoding process works in three steps: first, the input bytes are concatenated into a continuous bit stream. Next, the stream is divided into 6-bit groups (since 2^6 = 64, each group maps to exactly one character). Finally, any remaining bits are zero-padded and a trailing = or == is added to signal the padding.\n\nFor example, the text 'Hi' has two bytes: 0x48 (72) and 0x69 (105). In binary that is 01001000 01101001. Grouped into 6-bit chunks: 010010 000110 1001xx. The third group is padded with two zero bits to become 100100. These map to characters S, G, and k, with one = padding character, producing 'SGk='.\n\nThere is also a URL-safe variant (Base64url) defined in the same RFC, which replaces + with - and / with _ to avoid conflicts with URL encoding. This variant is used in JWTs (JSON Web Tokens), OAuth tokens, and anywhere Base64 appears in URLs or filenames. The padding = can optionally be omitted in URL-safe contexts since the decoder can infer the original length.",
      useCases: [
        "Encoding email attachments using MIME — every email client uses Base64 to embed binary files like PDFs, images, and documents into the text-only SMTP protocol.",
        "Creating data URIs to embed small images directly in HTML or CSS (e.g., data:image/png;base64,...) to eliminate extra HTTP requests for icons and sprites.",
        "Encoding API authentication credentials for HTTP Basic Auth headers, which require the username:password string to be Base64-encoded.",
        "Embedding binary data in JSON or XML payloads where raw bytes would break the text-based format, commonly used in webhook integrations and API requests.",
        "Decoding JWTs (JSON Web Tokens) where the header and payload sections are Base64url-encoded strings that need decoding to inspect claims and expiration.",
        "Storing small binary blobs in configuration files, environment variables, or database text columns where binary storage is not available."
      ],
      tips: [
        "Base64 is encoding, not encryption. Anyone can decode Base64 without a key — never use it to protect passwords, API secrets, or sensitive data. Use AES encryption or similar for security.",
        "If your Base64 string will appear in a URL, query parameter, or filename, use the URL-safe variant: replace + with -, / with _, and optionally remove the = padding. Many languages have a built-in URL-safe Base64 option.",
        "Remember the 33% size overhead: a 1MB file becomes 1.33MB when Base64-encoded. For large files, this overhead makes Base64 impractical — use direct binary transfer instead.",
        "When encoding text (not binary), ensure your input is UTF-8 encoded. JavaScript's btoa() function only handles Latin-1 characters natively; this tool handles the UTF-8 conversion automatically, but custom implementations need explicit encoding.",
        "To quickly check if a string is Base64-encoded, look for the character set: only A-Z, a-z, 0-9, +, /, and trailing = characters. The length should be a multiple of 4. Any other characters indicate it is not standard Base64."
      ],
      howToUse: ["Select 'Encode' to convert text to Base64, or 'Decode' to convert Base64 back to text.", "Type or paste your input in the left area.", "The result appears instantly on the right. Click 'Copy' to copy it."],
      features: ["Instant encoding and decoding with real-time output", "Full Unicode support — handles emoji, Chinese, Arabic, and all UTF-8 text", "Switch between encode and decode modes with one click", "Copy output to clipboard instantly", "100% client-side — your data never leaves your browser", "No file size limits beyond your browser's memory"],
      faq: [
        { question: "Is Base64 the same as encryption?", answer: "No. Base64 is an encoding scheme, not encryption. Anyone can decode Base64 text without a key. It is designed for data transport, not security. Never use Base64 to protect sensitive data." },
        { question: "Why is the Base64 output larger than the input?", answer: "Base64 encoding increases data size by approximately 33%. Every 3 bytes of input become 4 characters of Base64 output. This overhead is the trade-off for representing binary data as text." },
        { question: "What is Base64 used for?", answer: "Common uses include email attachments (MIME encoding), embedding images in HTML/CSS (data URIs), encoding authentication tokens (Basic Auth headers), and storing binary data in JSON or XML formats." },
        { question: "Does this tool support URL-safe Base64?", answer: "This tool uses standard Base64 encoding. URL-safe Base64 replaces + with - and / with _ to avoid URL encoding issues. You can manually replace these characters in the output if needed." },
      ],
      relatedSlugs: ["json-formatter", "jwt-decoder", "image-to-base64", "ai-token-calculator"],
    },
  },
  {
    slug: "color-picker",
    title: "Color Picker & Converter - HEX RGB HSL Free",
    shortTitle: "Color Picker",
    description: "Free online color picker and converter. Pick any color and instantly get HEX, RGB, and HSL values. Copy color codes with one click.",
    category: "design",
    keywords: ["color picker", "hex to rgb", "rgb to hex", "color converter", "hex to hsl", "color code"],
    content: {
      whatIs: "A Color Picker & Converter is a tool that lets you visually select any color and instantly get its value in multiple formats: HEX (used in HTML/CSS), RGB (Red, Green, Blue), and HSL (Hue, Saturation, Lightness). With over 16.7 million possible colors in the standard RGB color space (256 x 256 x 256), precise color values are essential for consistent design across screens and platforms.\n\nDesigners and developers constantly need to convert between color formats when working with CSS, design tools like Figma and Sketch, and brand guidelines that may specify colors in different notations. A brand guideline might list Pantone and HEX values, while your CSS needs rgb() or hsl() syntax. This tool provides instant bidirectional conversion between all three formats — change any value and the others update in real time.\n\nPick a color visually using the interactive color picker, or enter a value in any format to see the equivalents. The CSS-ready output means you can copy rgb(255, 87, 51) or hsl(11, 100%, 60%) directly into your stylesheet. Everything runs in your browser with zero data sent anywhere, making it safe for proprietary brand colors and client work.",
      explained: "Colors on screens are produced using the RGB additive color model, where red, green, and blue light combine at varying intensities. Each channel ranges from 0 (off) to 255 (full brightness), creating 256^3 = 16,777,216 possible colors. When all three channels are at 255, you get white; all at 0 gives black. This is the opposite of print (CMYK), which uses subtractive mixing.\n\nHEX notation is simply a compact way to write RGB values using hexadecimal (base-16) numbers. The color #FF5733 means R=FF (255), G=57 (87), B=33 (51). Three-digit shorthand like #F00 expands to #FF0000. HEX became the standard in CSS because it is compact and was supported from the earliest HTML specifications.\n\nHSL (Hue, Saturation, Lightness) was designed to be more intuitive for humans. Hue is the color angle on a 360-degree color wheel (0/360 = red, 120 = green, 240 = blue). Saturation controls intensity (0% = gray, 100% = vivid). Lightness controls brightness (0% = black, 50% = pure color, 100% = white). HSL makes it easy to create color variations: keep the hue constant, adjust saturation for muted vs vivid variants, and adjust lightness for dark vs light shades — perfect for generating consistent color palettes from a single brand color.",
      useCases: [
        "Converting brand guideline colors between formats — design specs might list HEX values while your CSS framework uses HSL for theme variables.",
        "Building design systems and component libraries where consistent color tokens need to be defined in multiple formats across CSS, JavaScript, and design tools.",
        "Checking WCAG accessibility contrast ratios by picking foreground and background colors to ensure text meets the 4.5:1 minimum contrast ratio for normal text.",
        "Creating data visualization palettes where you need evenly spaced hues (using HSL's degree-based hue) for charts, graphs, and dashboards.",
        "Theming UI components by adjusting HSL lightness values to generate hover states, disabled states, and dark mode variants from a single base color.",
        "Matching colors from a screenshot or mockup by entering an approximate HEX value and fine-tuning it visually with the color picker."
      ],
      tips: [
        "Use HSL when you need color variations: keep the same hue and saturation, then adjust lightness to create hover states (5-10% darker), disabled states (higher lightness, lower saturation), and dark mode variants.",
        "For accessibility, ensure a minimum contrast ratio of 4.5:1 for normal text and 3:1 for large text (WCAG AA). Tools like this color picker help you find exact values that meet these requirements.",
        "Consider color blindness in your designs — roughly 8% of men and 0.5% of women have some form of color vision deficiency. Avoid relying solely on red/green differences to convey meaning.",
        "Use CSS custom properties (variables) with HSL values for maximum flexibility: --brand-h: 211; --brand-s: 100%; --brand-l: 50%; then compose colors with hsl(var(--brand-h), var(--brand-s), var(--brand-l)).",
        "When converting colors for print, remember that RGB/HEX cannot perfectly represent CMYK colors. Some vivid screen colors (especially bright greens and blues) fall outside the printable CMYK gamut."
      ],
      howToUse: ["Click the color picker to visually select a color.", "Or type a HEX value directly (e.g., #ff5733).", "RGB and HSL values update automatically.", "Click 'Copy' next to any format to copy the value."],
      features: ["Visual color picker with large preview swatch", "Instant conversion between HEX, RGB, and HSL formats", "One-click copy for any color format", "Direct HEX input with validation", "CSS-ready output values (rgb() and hsl() syntax)", "Works entirely in your browser"],
      faq: [
        { question: "What is the difference between HEX and RGB?", answer: "HEX and RGB represent the same colors. HEX uses hexadecimal notation (#ff5733) while RGB uses decimal values (rgb(255, 87, 51)). HEX is more compact and commonly used in CSS, while RGB is easier to read and manipulate programmatically." },
        { question: "What is HSL?", answer: "HSL stands for Hue, Saturation, Lightness. Hue is the color angle (0-360 degrees), Saturation is the color intensity (0-100%), and Lightness is how bright the color is (0-100%). HSL is often more intuitive for picking color variations." },
        { question: "How do I use these color values in CSS?", answer: "In CSS, you can use any format: color: #ff5733; or color: rgb(255, 87, 51); or color: hsl(11, 100%, 60%); All three produce the same color." },
      ],
      relatedSlugs: ["svg-to-png", "image-to-base64", "json-formatter", "lorem-ipsum-generator"],
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
      whatIs: "Lorem Ipsum is placeholder text used in the design, publishing, and web development industries to fill layouts before real content is available. This Lorem Ipsum Generator creates random dummy text in the classic Latin style — the same text that has served as the printing industry's standard filler since the 1500s, when an unknown typesetter scrambled passages from Cicero's 'De Finibus Bonorum et Malorum' (45 BC) to create a type specimen book.\n\nYou can generate text by paragraphs, sentences, or word count, with the option to start with the traditional 'Lorem ipsum dolor sit amet' opening. The output mimics natural language patterns — varying sentence lengths between 5 and 20 words, mixing short and long paragraphs — so your mockups look realistic. A standard Lorem Ipsum paragraph averages about 70 words, matching the typical paragraph length of English web content.\n\nIt is perfect for filling website mockups, testing responsive layouts, prototyping mobile app screens, and previewing typography choices. Graphic designers, web developers, UX designers, and content strategists use placeholder text daily. This tool runs entirely in your browser and works offline — generate as much text as you need without limits or signups.",
      explained: "The Lorem Ipsum text traces back to Marcus Tullius Cicero's philosophical treatise 'De Finibus Bonorum et Malorum' (On the Ends of Good and Evil), written in 45 BC. The famous passage beginning 'Lorem ipsum dolor sit amet' comes from sections 1.10.32 and 1.10.33, which discuss the pursuit of pleasure and pain. The word 'Lorem' itself is a truncated form of 'dolorem' (pain).\n\nIn the 1500s, an unknown printer scrambled this Latin text to create a type specimen book — a sample sheet showing how different typefaces looked when set in blocks of text. The genius of using scrambled Latin is that it has a natural distribution of letters and word lengths similar to English, creating realistic-looking text blocks without distracting readers with meaningful content. The letter frequency and word-length distribution of Lorem Ipsum closely match those of English prose, making it ideal for typography testing.\n\nPlaceholder text matters in design because readable content creates cognitive bias. When stakeholders review a mockup with real text, they instinctively focus on the words — editing copy, debating messaging — instead of evaluating layout, spacing, font choices, and visual hierarchy. Lorem Ipsum removes this distraction, keeping design reviews focused on design. However, designers should always test with real content before finalizing layouts, since actual content rarely matches the uniform length of placeholder text.",
      useCases: [
        "Filling website wireframes and high-fidelity mockups in Figma, Sketch, or Adobe XD to present realistic page layouts to clients before copywriting is complete.",
        "Testing responsive web layouts to see how text reflows across breakpoints — from 320px mobile screens to 2560px ultra-wide monitors.",
        "Prototyping mobile app screens where text fields, cards, and list items need realistic content to evaluate spacing, truncation, and scroll behavior.",
        "Creating presentation slide templates with placeholder text blocks to demonstrate typography, layout options, and content structures.",
        "Building email templates where body copy, headers, and preview text need to be filled to test rendering across Outlook, Gmail, and Apple Mail.",
        "Previewing font combinations and typographic scales — seeing how a heading font pairs with body text at different sizes and line heights."
      ],
      tips: [
        "Never ship a product with Lorem Ipsum still in it — accidental placeholder text in production is a common embarrassment. Search your codebase for 'Lorem' and 'dolor sit amet' before every release.",
        "Test your layouts with real content lengths before finalizing. Real blog posts may have 2,000-word articles or 3-word titles that break your carefully designed grid. Lorem Ipsum gives a false sense of consistent content length.",
        "For right-to-left (RTL) language layouts, Lorem Ipsum does not work — it flows left-to-right. Use Arabic or Hebrew placeholder text generators instead to properly test RTL text direction, alignment, and mirroring.",
        "If you are designing for CJK (Chinese, Japanese, Korean) content, Latin placeholder text misrepresents character width and line breaking behavior. Use language-specific dummy text like the Chinese '天地玄黄宇宙洪荒' patterns.",
        "For more realistic mockups, consider mixing placeholder text with real headings and navigation labels. This hybrid approach keeps stakeholders focused on layout while making the prototype feel closer to the final product."
      ],
      howToUse: ["Choose how many paragraphs, sentences, or words you want to generate.", "Optionally check 'Start with Lorem ipsum...' for the classic opening.", "Click 'Generate' to create the placeholder text.", "Click 'Copy' to copy the text to your clipboard."],
      features: ["Generate by paragraphs, sentences, or word count", "Optional classic 'Lorem ipsum dolor sit amet' opening", "Randomized text that looks natural", "Copy to clipboard with one click", "No limits on text generation amount", "100% client-side — works offline"],
      faq: [
        { question: "What does Lorem Ipsum mean?", answer: "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of 'De Finibus Bonorum et Malorum' by Cicero, written in 45 BC. The text is scrambled Latin and does not have a coherent meaning." },
        { question: "Is Lorem Ipsum real Latin?", answer: "It is based on real Latin from Cicero's philosophical work, but the words have been altered and scrambled so much that it no longer forms meaningful sentences." },
        { question: "Why use Lorem Ipsum instead of real content?", answer: "Using placeholder text prevents readers from being distracted by readable content when evaluating a design or layout. It lets designers focus on visual elements like typography, spacing, and layout without the bias of meaningful text." },
      ],
      relatedSlugs: ["word-counter", "markdown-to-html", "json-formatter", "base64-encoder"],
    },
  },
  {
    slug: "ai-token-calculator",
    title: "AI Token Calculator - LLM Cost Estimator Free",
    shortTitle: "AI Token Calculator",
    description: "Free AI token calculator. Count tokens and estimate costs for GPT-4, Claude, Gemini, and 20+ AI models. Compare pricing across providers instantly.",
    category: "calculator",
    keywords: ["ai token calculator", "llm cost calculator", "openai token counter", "chatgpt token calculator", "claude token counter", "gpt-4 pricing calculator", "ai api cost estimator"],
    content: {
      whatIs: "An AI Token Calculator helps you count the number of tokens in your text and estimate how much it will cost to process with different AI models like GPT-4, Claude, Gemini, and 20+ others. Tokens are the basic units that large language models use to read and generate text — roughly 4 characters or 0.75 words per token in English. A single API call can cost anywhere from $0.0001 to $0.50 depending on the model, making accurate cost estimation critical for any AI-powered application.\n\nThis tool lets you paste your actual prompt text and see the exact token count using OpenAI's official tiktoken tokenizer. It then calculates costs across every major model from OpenAI, Anthropic, Google, Meta, Mistral, DeepSeek, and Amazon — including both input and output token pricing. The side-by-side comparison table reveals dramatic price differences: processing 1,000 tokens might cost $0.01 with GPT-4o but only $0.0001 with GPT-4.1 Nano, a 100x difference for tasks where the cheaper model performs equally well.\n\nBeyond single-call pricing, the calculator includes scenario templates for common use cases — chatbots, content generation, RAG pipelines, and AI agents — with daily, monthly, and yearly cost projections. The prompt caching toggle shows how Anthropic's and OpenAI's caching features can cut input costs by 50-90%. All calculations happen entirely in your browser; your prompts and text are never sent to any server.",
      explained: "Tokenization is the process of breaking text into smaller units (tokens) that AI models can process. Most modern LLMs use Byte Pair Encoding (BPE), an algorithm that starts with individual bytes and iteratively merges the most frequent pairs into new tokens. Through training on massive text corpora, the tokenizer builds a vocabulary — typically 50,000 to 200,000 tokens — that efficiently represents common words, subwords, and characters. The word 'tokenization' might be split into 'token' + 'ization' (2 tokens), while common words like 'the' are a single token.\n\nAI providers charge per token because tokens directly correspond to the computational work required. Each token passes through every layer of the neural network — a model with 175 billion parameters (like GPT-3) performs 175 billion calculations per token. Input tokens (your prompt) and output tokens (the model's response) are priced separately because output generation is more computationally expensive: the model must run inference sequentially for each output token, while input tokens can be processed in parallel.\n\nContext windows define the maximum number of tokens a model can handle in a single request (input + output combined). GPT-4o supports 128K tokens (roughly 96,000 words), Claude 3.5 Sonnet supports 200K tokens, and Gemini 1.5 Pro handles up to 2 million tokens. Exceeding the context window causes the API to reject your request, so monitoring token usage is essential for applications that process long documents or maintain conversation history.",
      useCases: [
        "Estimating API costs before committing to a model — comparing whether GPT-4o at $2.50/$10.00 per million tokens or Claude Sonnet at $3.00/$15.00 makes more financial sense for your specific workload.",
        "Comparing model pricing across providers to find the cheapest option for simple tasks like classification, summarization, or data extraction where premium models are overkill.",
        "Budget planning for AI-powered products by projecting monthly costs based on expected user volume — a chatbot handling 10,000 conversations per day needs accurate per-conversation cost estimates.",
        "Optimizing prompt engineering to reduce token usage: measuring how shortening a system prompt from 2,000 tokens to 500 tokens saves 75% on input costs across millions of API calls.",
        "Managing context window limits by checking whether your document plus system prompt plus expected response fits within the model's maximum context (e.g., 128K for GPT-4o, 200K for Claude).",
        "Projecting batch processing costs for one-time jobs like processing 100,000 customer support tickets or analyzing a database of 50,000 product reviews."
      ],
      tips: [
        "Enable prompt caching for any system prompt or few-shot examples you reuse across calls — Anthropic's caching reduces input costs by 90% (from $3.00 to $0.30 per million tokens for Claude Sonnet), and OpenAI offers 50% cached input discounts.",
        "System prompts count toward your input tokens on every single API call. A 1,000-token system prompt sent 100,000 times per month costs 100 million input tokens — consider shortening it or using caching.",
        "CJK languages (Chinese, Japanese, Korean) use 2-3x more tokens per word-equivalent than English due to how BPE tokenizers handle non-Latin scripts. Factor this into cost estimates for multilingual applications.",
        "Output tokens are 3-5x more expensive than input tokens for most models. Setting a lower max_tokens limit and using concise output instructions ('respond in under 100 words') can significantly reduce costs.",
        "For cost-sensitive applications, use a cheaper model (GPT-4o Mini, Gemini Flash) for simple tasks and route only complex requests to premium models (GPT-4o, Claude Opus). This tiered approach can cut costs by 60-80%."
      ],
      howToUse: [
        "Select an AI model from the dropdown, or leave the default to compare all models.",
        "Paste your prompt or text into the input area, or switch to 'Token Count' mode and enter a number directly.",
        "View the token count, cost breakdown, and context window usage.",
        "Adjust the output token slider to estimate response costs.",
        "Check the comparison table to find the cheapest model for your use case.",
        "Use scenario templates to project daily, monthly, and yearly costs.",
      ],
      features: [
        "Accurate token counting for OpenAI models using the official tokenizer",
        "Cost estimation for 20+ AI models across 7 providers",
        "Side-by-side model cost comparison sorted by total price",
        "Prompt caching toggle showing real savings (up to 90% off)",
        "Output token slider with preset quick-select buttons",
        "Scenario templates: Chatbot, Content Generation, RAG, AI Agent",
        "Daily, monthly, and yearly cost projections",
        "Context window usage visualization",
        "100% client-side — your prompts never leave your browser",
      ],
      faq: [
        { question: "What is a token in AI?", answer: "A token is the basic unit of text that AI models process. In English, one token is roughly 4 characters or 0.75 words. The word 'hamburger' is split into 'ham', 'bur', and 'ger' — 3 tokens. Shorter common words like 'the' or 'is' are usually 1 token each." },
        { question: "How many tokens is 1,000 words?", answer: "In English, 1,000 words is approximately 1,300-1,400 tokens. The exact count depends on the specific words used and the model's tokenizer. Technical text with code tends to use more tokens per word than plain prose." },
        { question: "How much does it cost to use GPT-4o?", answer: "GPT-4o costs $2.50 per million input tokens and $10.00 per million output tokens. A typical conversation with 500 tokens in and 500 tokens out costs about $0.006 — roughly 160 conversations per dollar." },
        { question: "What is the cheapest AI model?", answer: "As of May 2026, the cheapest major models are GPT-4.1 Nano ($0.10/$0.40 per million tokens), Gemini 2.0 Flash ($0.10/$0.40), and GPT-4o Mini ($0.15/$0.60). DeepSeek V3 is also very affordable at $0.27/$1.10." },
        { question: "How does prompt caching reduce costs?", answer: "Prompt caching stores frequently used prompt prefixes (like system instructions) so you don't pay full price every time. With caching enabled, input costs can drop by 50-90%. For example, Claude Sonnet's cached input price is $0.30 vs $3.00 regular — a 90% saving." },
        { question: "Why do Chinese and Japanese texts use more tokens?", answer: "CJK (Chinese, Japanese, Korean) characters typically use 1-2 tokens per character, while English uses about 1 token per 4 characters. This means processing the same meaning in Chinese costs roughly 2-3x more than in English." },
        { question: "Are token counts exact for all models?", answer: "Token counts are exact for OpenAI models (using the official tokenizer). For Claude, Gemini, and other models, counts are estimated at approximately 4 characters per token, which is accurate within ±15%." },
        { question: "What is the difference between input and output tokens?", answer: "Input tokens are what you send to the model (your prompt, instructions, context). Output tokens are what the model generates in response. Most providers charge more for output tokens than input tokens — typically 3-5x higher." },
      ],
      relatedSlugs: ["json-formatter", "word-counter", "base64-encoder", "jwt-decoder", "timestamp-converter"],
    },
  },
  {
    slug: "jwt-decoder",
    title: "JWT Decoder - Decode JSON Web Tokens Free",
    shortTitle: "JWT Decoder",
    description: "Free online JWT decoder. Paste a JSON Web Token to instantly decode the header and payload, check expiration, and verify claims. No data sent to any server.",
    category: "developer",
    keywords: ["jwt decoder", "jwt decode online", "json web token decoder", "jwt parser", "jwt token viewer", "decode jwt token"],
    content: {
      whatIs: "A JWT (JSON Web Token) Decoder is a tool that takes an encoded JWT string — the long Base64-encoded text that looks like 'eyJhbGciOiJIUzI1NiIs...' — and splits it into its three readable parts: the header, the payload, and the signature. JWTs are the dominant authentication token format on the web, used by an estimated 80% of modern web APIs for stateless authentication, single sign-on (SSO), and API authorization.\n\nThe header contains the signing algorithm (typically HS256 or RS256) and token type. The payload carries the actual claims — user ID (sub), expiration time (exp), issued-at time (iat), issuer (iss), and any custom data like roles or permissions. The signature is a cryptographic hash that verifies the token has not been tampered with. When debugging login failures, 401 errors, or token refresh issues, the first step is always to decode the JWT and check its claims.\n\nThis tool decodes instantly in your browser, highlights expiration status with color-coded badges (green for valid, red for expired), converts Unix timestamps to human-readable dates with relative time ('expires in 2 hours'), and lets you copy individual sections. Your token never leaves your device — there are no server calls, no logging, and no analytics on your input.",
      explained: "JWT (JSON Web Token) is defined in RFC 7519 as a compact, URL-safe means of representing claims between two parties. The token consists of three Base64url-encoded sections separated by dots: header.payload.signature. The header is a JSON object specifying the signing algorithm ('alg') and token type ('typ'). The payload is a JSON object containing claims — registered claims like 'sub' (subject), 'exp' (expiration), 'iat' (issued at), 'iss' (issuer), and 'aud' (audience), plus any custom claims your application needs.\n\nTwo signing algorithms dominate JWT usage. HS256 (HMAC-SHA256) uses a single shared secret key for both signing and verification — fast and simple, but every service that verifies tokens needs the same secret, creating a security risk if any one service is compromised. RS256 (RSA-SHA256) uses asymmetric cryptography: the auth server signs with a private key, and any service can verify with the corresponding public key (often published at a JWKS endpoint). RS256 is the standard for production systems, especially with multiple microservices or third-party integrations.\n\nThe signature is computed over the encoded header and payload: HMACSHA256(base64url(header) + '.' + base64url(payload), secret) for HS256. This means changing even one character in the payload invalidates the signature. However, the header and payload are only Base64url-encoded, not encrypted — anyone can decode and read them. JWTs should never contain sensitive data like passwords or credit card numbers unless the entire token is additionally encrypted (JWE).",
      useCases: [
        "Debugging authentication failures by decoding a JWT from the Authorization header to check if it is expired (exp claim), issued to the wrong audience (aud), or missing required claims.",
        "Testing API endpoints in tools like Postman or curl by inspecting the JWT payload to verify the correct user ID, roles, and permissions are included before making requests.",
        "Performing security audits by reviewing JWT claims to ensure tokens do not contain sensitive data, use appropriate signing algorithms (RS256 over HS256 for public clients), and have reasonable expiration times.",
        "Debugging token refresh logic by comparing the 'iat' (issued at) and 'exp' (expiration) timestamps of access tokens and refresh tokens to verify the rotation cycle works correctly.",
        "Troubleshooting SSO (Single Sign-On) integrations with providers like Auth0, Okta, or Firebase Auth by inspecting the ID token to verify issuer, audience, and custom claims match your configuration.",
        "Verifying webhook payloads from services like Stripe, Twilio, or GitHub that include JWT-signed verification tokens to prove the request is authentic."
      ],
      tips: [
        "Never store sensitive data in JWT payloads — they are Base64-encoded, not encrypted. Anyone who intercepts a token can read the claims. Passwords, credit card numbers, and personal secrets should never appear in a JWT.",
        "Always check the 'exp' (expiration) claim before trusting a JWT. A common security mistake is decoding the token and using its claims without verifying that it has not expired. Short-lived access tokens (15-60 minutes) limit the damage window if a token is stolen.",
        "Use RS256 (asymmetric signing) instead of HS256 (symmetric) for any system where multiple services verify tokens. With HS256, every verifying service needs the shared secret, and a compromise of any one service exposes the signing key.",
        "Implement refresh token rotation: each time a refresh token is used, issue a new one and invalidate the old one. If a stolen refresh token is reused, the rotation detects the anomaly and can revoke the entire token family.",
        "Store JWTs in httpOnly, secure, SameSite=Strict cookies rather than localStorage. LocalStorage is vulnerable to XSS attacks — any JavaScript running on your page can steal the token. HttpOnly cookies are inaccessible to JavaScript."
      ],
      howToUse: ["Paste your JWT token into the input field.", "The header, payload, and signature are decoded instantly.", "Check the expiration status (green = valid, red = expired).", "Click 'Copy' to copy any decoded section."],
      features: ["Instant JWT decoding with header, payload, and signature display", "Expiration status indicator (valid/expired) with countdown timer", "Issued-at and expiry timestamps with relative time display", "Algorithm and token type badges", "Copy individual sections (header, payload) with one click", "100% client-side — your token never leaves your browser"],
      faq: [
        { question: "What is a JWT (JSON Web Token)?", answer: "A JWT is a compact, URL-safe token format used for securely transmitting information between parties. It consists of three base64-encoded parts separated by dots: a header (specifying the algorithm), a payload (containing claims/data), and a signature (for verification)." },
        { question: "Is it safe to decode JWTs in a browser?", answer: "Yes, decoding a JWT does not require a secret key. The header and payload are simply base64-encoded (not encrypted), so anyone can read them. The signature part requires the secret key to verify, but decoding does not expose secrets. This tool processes everything in your browser." },
        { question: "What does 'exp' mean in a JWT payload?", answer: "The 'exp' (expiration time) claim identifies the time after which the JWT must not be accepted. It is a Unix timestamp (seconds since January 1, 1970). This tool automatically converts it to a readable date and shows whether the token has expired." },
        { question: "Can this tool verify JWT signatures?", answer: "This tool decodes and displays JWT contents but does not verify signatures. Signature verification requires the secret key or public key used to sign the token, which should never be shared in a browser tool." },
      ],
      relatedSlugs: ["base64-encoder", "json-formatter", "timestamp-converter", "ai-token-calculator", "markdown-to-html"],
    },
  },
  {
    slug: "markdown-to-html",
    title: "Markdown to HTML Converter Online Free",
    shortTitle: "Markdown to HTML",
    description: "Free online Markdown to HTML converter. Convert Markdown syntax to clean HTML code with live preview. Supports headings, lists, code blocks, tables, and more.",
    category: "converter",
    keywords: ["markdown to html", "markdown converter", "markdown to html converter", "convert markdown online", "md to html", "markdown parser"],
    content: {
      whatIs: "A Markdown to HTML Converter transforms Markdown-formatted text into clean, semantic HTML code. Markdown is a lightweight markup language used by millions of developers and writers — GitHub alone hosts over 200 million repositories, most with Markdown README files. It uses intuitive syntax like # for headings, ** for bold, and - for lists, making it the most popular format for technical documentation, blog posts, and developer communication.\n\nThis converter gives you a side-by-side editing experience: type or paste Markdown on the left, and see both a rendered preview and the raw HTML output on the right. It supports all standard Markdown features including six levels of headings, bold, italic, strikethrough, links, images, fenced code blocks, tables, blockquotes, ordered and unordered lists, horizontal rules, and inline code. The generated HTML is clean and semantic — using proper tags like <h1>, <strong>, <ul>, <pre><code>, and <blockquote>.\n\nWhether you are writing a GitHub README, converting a blog post for a CMS, preparing documentation for a static site generator, or creating email template content, this tool provides instant, accurate conversion. Everything processes in your browser as you type — no server calls, no data collection, and no signup required.",
      explained: "Markdown was created by John Gruber in collaboration with Aaron Swartz in 2004. Gruber's goal was a plain-text format that was readable as-is (unlike HTML) but could be converted to valid HTML. The original Markdown.pl was a Perl script that used regular expressions for conversion. However, the original specification left many edge cases undefined — how nested lists behave, what happens with lazy continuation lines, and whether blank lines are required between blocks.\n\nIn 2014, a group of Markdown implementers created CommonMark, a strict specification that resolved these ambiguities. CommonMark defines exactly how every edge case should be parsed, with over 600 test examples. GitHub Flavored Markdown (GFM) extends CommonMark with additional features: tables using pipe syntax, task lists with [ ] checkboxes, strikethrough with ~~ tildes, and autolinked URLs. Most modern Markdown tools follow CommonMark or GFM.\n\nUnder the hood, Markdown parsers work in two phases. First, the parser reads the Markdown source and builds an Abstract Syntax Tree (AST) — a tree structure where each node represents a document element (heading, paragraph, list, code block). Second, the renderer walks the AST and outputs HTML. This two-phase approach allows the same parser to output different formats: HTML, PDF, DOCX, or even terminal-formatted text. Libraries like marked (JavaScript), markdown-it (JavaScript), and Python-Markdown follow this architecture.",
      useCases: [
        "Writing GitHub README files and converting them to HTML to preview exactly how they will render on the repository page, catching formatting issues before pushing.",
        "Creating blog posts in Markdown and converting to HTML for pasting into CMS platforms like WordPress, Ghost, or Contentful that accept raw HTML input.",
        "Generating documentation for APIs, libraries, and developer tools where Markdown source files need to be converted to HTML for static site generators like Docusaurus, MkDocs, or Hugo.",
        "Building email template content in Markdown for easier editing and version control, then converting to HTML for embedding in email sending platforms like SendGrid or Mailchimp.",
        "Converting technical writing and notes from Markdown (used in editors like Obsidian, Notion exports, and Typora) into clean HTML for web publishing.",
        "Creating HTML snippets from Markdown for embedding in static websites, documentation portals, or knowledge base articles where the full Markdown source needs to become web-ready HTML."
      ],
      tips: [
        "Be aware of CommonMark vs GFM differences: tables (pipe syntax), task lists (checkboxes), and strikethrough (~~text~~) are GFM extensions, not part of core CommonMark. If your target platform only supports CommonMark, these features will not render correctly.",
        "Escape special Markdown characters with a backslash when you want them displayed literally: \\* for an asterisk, \\# for a hash, \\[ for a bracket. This is especially important in technical content that discusses code syntax.",
        "Always preview your converted HTML before publishing, especially for complex structures like nested lists and tables. Different Markdown parsers handle edge cases differently, and what looks correct in one previewer may break in another.",
        "For tables, use colons in the separator row to control alignment: :--- for left-align, :---: for center, ---: for right-align. This is a GFM feature but widely supported across platforms.",
        "When pasting Markdown into a CMS, copy the raw HTML output (not the rendered preview) to preserve all formatting. Some CMS WYSIWYG editors strip or reformat pasted HTML, so use the 'paste as HTML' or 'code view' mode."
      ],
      howToUse: ["Type or paste Markdown text in the left panel.", "Switch between 'Preview' (rendered) and 'HTML' (raw code) tabs on the right.", "Click 'Copy HTML' to copy the generated HTML code.", "Use 'Load example' to see a sample with various Markdown features."],
      features: ["Real-time Markdown to HTML conversion as you type", "Live rendered preview and raw HTML output tabs", "Supports headings, bold, italic, links, images, code blocks, tables, blockquotes, and lists", "One-click copy of generated HTML", "Sample content with 'Load example' button", "100% client-side — your text never leaves your browser"],
      faq: [
        { question: "What is Markdown?", answer: "Markdown is a lightweight text formatting syntax created by John Gruber in 2004. It lets you write formatted text using plain text syntax: # for headings, ** for bold, * for italic, - for lists, and backticks for code. It is used in GitHub READMEs, documentation, blogs, and many writing platforms." },
        { question: "What Markdown features are supported?", answer: "This converter supports all standard Markdown features: headings (H1-H6), bold, italic, strikethrough, links, images, ordered and unordered lists, code blocks with syntax highlighting, tables, blockquotes, horizontal rules, and inline code." },
        { question: "Is the HTML output clean and semantic?", answer: "Yes, the converter produces clean, semantic HTML5 with proper tags: <h1>-<h6> for headings, <strong> for bold, <em> for italic, <ul>/<ol> for lists, <pre><code> for code blocks, and <blockquote> for quotes." },
      ],
      relatedSlugs: ["word-counter", "json-formatter", "lorem-ipsum-generator", "base64-encoder"],
    },
  },
  {
    slug: "timestamp-converter",
    title: "Unix Timestamp Converter - Epoch to Date Free",
    shortTitle: "Timestamp Converter",
    description: "Free online Unix timestamp converter. Convert between Unix epoch timestamps and human-readable dates. Live clock, relative time, UTC and local timezone support.",
    category: "converter",
    keywords: ["unix timestamp converter", "epoch converter", "timestamp to date", "epoch to date", "unix time converter", "date to timestamp"],
    content: {
      whatIs: "A Unix Timestamp Converter transforms Unix epoch timestamps (like 1748371200) into human-readable dates and times, and vice versa. Unix timestamps count the number of seconds since January 1, 1970, 00:00:00 UTC — the 'Unix epoch' — and are the standard time representation used by virtually every computer system, database, API, and log file in the world. Over 5 billion Unix timestamps are generated every second across the global internet infrastructure.\n\nWhen debugging server logs, working with API responses that return timestamps like 1716854400, analyzing database records, or setting up cron job schedules, developers constantly need to convert between machine-readable timestamps and human-readable dates. A raw timestamp like 1748371200 means nothing at a glance, but converting it reveals 'May 27, 2025, 12:00:00 AM UTC' — instantly useful for debugging and analysis.\n\nThis tool provides bidirectional conversion: enter a Unix timestamp to get the date, or pick a date to get the timestamp. It auto-detects seconds (10 digits) vs milliseconds (13 digits), displays UTC and your local timezone side by side, shows relative time ('3 days ago' or 'in 2 hours'), outputs ISO 8601 format for API use, and includes a live clock showing the current Unix timestamp updating every second. Everything runs in your browser with zero server communication.",
      explained: "The Unix epoch — January 1, 1970, 00:00:00 UTC — was chosen as the reference point for Unix time when the Unix operating system was being developed at Bell Labs in the late 1960s. The original Unix time used a 32-bit signed integer, starting from January 1, 1971, and counting in 1/60th of a second. In 1973, it was changed to count in whole seconds from January 1, 1970, which became the standard that persists today.\n\nThe choice of 1970 was pragmatic: it was recent enough to be useful and far enough in the past to not need negative numbers for contemporary dates. A signed 32-bit integer counting seconds from this epoch can represent dates from December 13, 1901 (minimum -2,147,483,648) to January 19, 2038, 03:14:07 UTC (maximum 2,147,483,647). This upper limit is the Y2K38 problem — on that date, 32-bit systems will overflow and wrap to negative values, interpreting the date as December 1901. Most modern systems have migrated to 64-bit timestamps, which extend the range to roughly 292 billion years in either direction.\n\nMilliseconds timestamps (13 digits, like JavaScript's Date.now()) provide sub-second precision needed for performance measurement, event ordering, and real-time systems. Some systems use microseconds (16 digits) or nanoseconds (19 digits). When working with timestamps from different sources, the most common mistake is confusing seconds and milliseconds — dividing a milliseconds timestamp by 1000 or multiplying a seconds timestamp by 1000 will silently produce wrong dates, often years or decades off.",
      useCases: [
        "Analyzing server logs and error reports where events are timestamped in Unix format — quickly converting 1716854400 to 'May 28, 2024' to understand when an incident occurred.",
        "Debugging API responses that include created_at, updated_at, or expires_at fields as Unix timestamps, verifying they match expected dates and checking token expiration logic.",
        "Writing and testing database queries that filter by time ranges — converting 'last 7 days' to the corresponding Unix timestamp for WHERE clauses in SQL or MongoDB queries.",
        "Setting up cron jobs and scheduled tasks where you need to verify that a specific date/time converts to the expected timestamp for scheduling logic.",
        "Building event tracking and analytics systems where user actions are logged with Unix timestamps and need to be displayed as human-readable dates in dashboards.",
        "Investigating time-related bugs by comparing timestamps from different services, checking if clock drift, timezone mismatches, or seconds-vs-milliseconds confusion is causing issues."
      ],
      tips: [
        "Always store and transmit timestamps in UTC. Converting to local timezones should only happen at the display layer (in the browser or client app). Storing local times in a database leads to ambiguity during daylight saving time transitions.",
        "The most common timestamp bug is confusing seconds (10 digits) and milliseconds (13 digits). If you multiply a seconds timestamp by 1000, you jump from 2024 to the year 56000. If you divide a milliseconds timestamp by 1000 and truncate, you lose sub-second precision.",
        "Be aware that Unix timestamps do not account for leap seconds — UTC has had 27 leap seconds added since 1972. For most applications this is irrelevant, but precision-critical systems (GPS, financial trading) must handle leap seconds explicitly.",
        "When comparing timestamps from different sources, check whether they use the same precision. JavaScript uses milliseconds (Date.now()), Python's time.time() returns seconds as a float, and Java's System.currentTimeMillis() returns milliseconds. Mixing them without conversion causes subtle bugs.",
        "For timestamps in the future (scheduling, expiration), consider using ISO 8601 strings (2025-05-27T00:00:00Z) in user-facing contexts and Unix timestamps internally. ISO 8601 is self-documenting and timezone-explicit, while Unix timestamps are compact and comparison-friendly."
      ],
      howToUse: ["Choose 'Timestamp → Date' or 'Date → Timestamp' mode.", "For Timestamp → Date: enter a Unix timestamp (seconds or milliseconds).", "For Date → Timestamp: pick a date and time from the date picker.", "Copy any output format (UTC, local, ISO 8601, or relative time)."],
      features: ["Bidirectional conversion: timestamp to date and date to timestamp", "Live clock showing current Unix timestamp (updates every second)", "Supports both seconds (10 digits) and milliseconds (13 digits)", "UTC, local timezone, ISO 8601, and relative time display", "One-click copy for any output format", "100% client-side — processes everything in your browser"],
      faq: [
        { question: "What is a Unix timestamp?", answer: "A Unix timestamp (also called epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC. For example, timestamp 1748371200 represents May 27, 2025. It is the standard way computers store and transmit time." },
        { question: "What is the difference between seconds and milliseconds timestamps?", answer: "A seconds timestamp has 10 digits (e.g., 1748371200). A milliseconds timestamp has 13 digits (e.g., 1748371200000) and is 1000x more precise. JavaScript's Date.now() returns milliseconds, while most Unix systems and APIs use seconds." },
        { question: "What is the Year 2038 problem?", answer: "32-bit systems store Unix timestamps as a signed 32-bit integer, which maxes out at 2,147,483,647 (January 19, 2038 03:14:07 UTC). After this, timestamps will overflow and wrap to negative numbers. Most modern systems use 64-bit timestamps to avoid this." },
        { question: "What timezone does Unix timestamp use?", answer: "Unix timestamps are always in UTC (Coordinated Universal Time). They do not contain timezone information. When converting to a local time, your device's timezone is applied. This tool shows both UTC and your local timezone." },
      ],
      relatedSlugs: ["jwt-decoder", "json-formatter", "base64-encoder", "ai-token-calculator"],
    },
  },
  {
    slug: "svg-to-png",
    title: "SVG to PNG Converter Online Free",
    shortTitle: "SVG to PNG",
    description: "Free online SVG to PNG converter. Upload or paste SVG code and download as PNG with custom scale (1x-4x) and background color. No upload to server.",
    category: "converter",
    keywords: ["svg to png", "svg to png converter", "convert svg to png", "svg converter online", "svg to png online", "svg to image"],
    content: {
      whatIs: "An SVG to PNG Converter transforms SVG (Scalable Vector Graphics) files into PNG (Portable Network Graphics) bitmap images. SVG files are XML-based vector graphics that scale to any size without losing quality — perfect for logos, icons, and illustrations on the web. However, many platforms do not support SVG: email clients like Outlook and Gmail block SVG rendering, social media platforms require raster image uploads, and presentation tools like PowerPoint have limited SVG support.\n\nThis tool bridges that gap by letting you upload an SVG file or paste SVG code directly, choose your output scale (1x, 2x, 3x, or 4x for high-DPI displays), and select a background color (transparent, white, or black). The output dimensions are displayed before download, so you know exactly what you are getting — a 200x200 SVG at 2x scale produces a crisp 400x400 PNG suitable for Retina displays. The 4x option outputs print-quality resolution.\n\nAll conversion happens in your browser using the HTML5 Canvas API. The SVG is rendered onto an off-screen canvas element at the specified scale, then exported as a PNG blob for download. Your files are never uploaded anywhere — there are no server calls, no file storage, and no size limits beyond your browser's memory capacity. Complex SVGs with hundreds of paths and gradients convert in milliseconds on modern devices.",
      explained: "SVG and PNG represent fundamentally different approaches to storing images. SVG (Scalable Vector Graphics) is an XML-based format that describes images using mathematical shapes — lines, curves, rectangles, circles, and paths defined by coordinates. Because the image is described as geometry rather than pixels, it can be scaled to any size without quality loss: a 1KB SVG icon looks equally sharp at 16x16 and 1600x1600 pixels. SVG files are also editable with text editors and styleable with CSS.\n\nPNG (Portable Network Graphics) is a raster format that stores images as a grid of colored pixels at a fixed resolution. A 200x200 PNG contains exactly 40,000 pixels, and scaling it up to 400x400 produces blurriness because the new pixels must be interpolated from existing ones. However, PNG has universal support: every email client, social media platform, image editor, and operating system can display PNG files. PNG also supports full alpha transparency (256 levels of opacity per pixel), making it ideal for logos and icons with transparent backgrounds.\n\nThe conversion process renders the SVG onto an HTML5 Canvas element at the target resolution, then reads the pixel data to create a PNG. The scale multiplier determines the canvas dimensions: a viewBox of '0 0 100 100' at 2x creates a 200x200 canvas. This is why the viewBox attribute matters — SVGs without a viewBox may render at an unexpected size, producing tiny or oversized PNGs. Always ensure your SVG has explicit width/height attributes or a viewBox before converting.",
      useCases: [
        "Converting logos and icons to PNG for email signatures and HTML newsletters, since major email clients (Outlook, Gmail, Yahoo Mail) do not render inline SVG.",
        "Exporting SVG graphics as PNG for social media uploads on platforms like Instagram, Twitter/X, and LinkedIn that require raster image formats.",
        "Creating presentation assets by converting SVG illustrations and diagrams to high-resolution PNG for embedding in PowerPoint, Keynote, or Google Slides.",
        "Generating print-ready materials from SVG source files — using 3x or 4x scale to produce 300+ DPI images suitable for business cards, posters, and brochures.",
        "Creating app icon sets at multiple sizes from a single SVG source: 1x for standard displays, 2x for Retina, and 3x for Super Retina (iPhone) from one master SVG.",
        "Generating favicon.png files from SVG logos for older browsers that do not support SVG favicons, ensuring consistent branding across all browser tabs."
      ],
      tips: [
        "Always use 2x scale for images that will appear on Retina or HiDPI displays (most modern phones, MacBooks, and 4K monitors). A 1x image looks blurry on these screens because the display has twice the pixel density.",
        "Keep your source SVG as simple as possible for the best conversion quality. SVGs with embedded fonts, external references, or complex filter effects may not render correctly in the Canvas API. Convert text to outlines and flatten effects before converting.",
        "Check that your SVG has a viewBox attribute (e.g., viewBox='0 0 200 200') before converting. Without a viewBox, the converter may produce unexpected dimensions — either a tiny image or one that clips the content.",
        "Choose transparent background for logos and icons that will be placed on colored backgrounds. Choose white background when the PNG will be used in documents or platforms that display a checkered pattern for transparency.",
        "For the sharpest results with simple icons, ensure your SVG uses pixel-aligned coordinates (whole numbers instead of decimals). Sub-pixel coordinates can cause anti-aliasing artifacts that look slightly blurry in the PNG output."
      ],
      howToUse: ["Upload an SVG file (drag & drop or click to browse) or paste SVG code in the text area.", "Choose output scale: 1x for original size, 2x for Retina, 3x or 4x for extra high-DPI.", "Select background color: transparent, white, or black.", "Preview the result and click 'Download PNG'."],
      features: ["Upload SVG files or paste SVG code directly", "Drag-and-drop file upload", "Customizable output scale (1x, 2x, 3x, 4x)", "Background color options: transparent, white, black", "Output dimensions display", "Instant preview before download", "100% client-side — files never leave your browser"],
      faq: [
        { question: "Why convert SVG to PNG?", answer: "SVG is great for web use, but PNG is needed for email clients (which don't render SVG), social media uploads, presentation slides, print materials, and any context that requires a bitmap image. PNG also supports transparency." },
        { question: "What does the scale option do?", answer: "Scale multiplies the SVG dimensions. A 100x100 SVG at 2x scale produces a 200x200 PNG. Use 2x for Retina/HiDPI displays, 3x for mobile app assets, and 4x for print-quality output." },
        { question: "Is there a file size limit?", answer: "There is no fixed limit since all processing happens in your browser. Very complex SVGs with thousands of paths may take a moment to render, but most SVG files convert instantly." },
      ],
      relatedSlugs: ["image-to-base64", "color-picker", "markdown-to-html", "json-formatter"],
    },
  },
  {
    slug: "image-to-base64",
    title: "Image to Base64 Converter Online Free",
    shortTitle: "Image to Base64",
    description: "Free online image to Base64 converter. Upload any image and get Base64 string, data URI, HTML img tag, and CSS background code. No server upload.",
    category: "converter",
    keywords: ["image to base64", "image to base64 converter", "convert image to base64", "base64 image encoder", "image to data uri", "image to base64 online"],
    content: {
      whatIs: "An Image to Base64 Converter transforms image files (JPG, PNG, GIF, SVG, WebP) into Base64-encoded text strings that can be embedded directly in HTML, CSS, and JSON. Base64 encoding represents binary image data as ASCII text, eliminating the need for separate image files and HTTP requests. This technique is used on millions of websites for small icons, favicons, and UI elements.\n\nThe tool accepts any common image format and provides four ready-to-use output formats: the raw Base64 string, a complete data URI (data:image/png;base64,...), a ready-to-paste HTML <img> tag, and a CSS background-image property. It also displays a file size comparison showing exactly how much larger the Base64 version is — typically a 33% increase, so a 10KB icon becomes about 13.3KB in Base64.\n\nBase64 images are particularly valuable in email templates (where external images are blocked by default), single-file HTML exports, API payloads that need embedded image data, and CSS where small icons are inlined to reduce HTTP requests. However, the technique should only be used for small images — anything over 10-20KB is better served as a regular file with CDN caching. All processing happens in your browser using the FileReader API; your images are never uploaded to any server.",
      explained: "When you convert an image to Base64, the binary file data (sequences of bytes representing pixel colors, compression data, and metadata) is re-encoded into a text string using the 64-character Base64 alphabet (A-Z, a-z, 0-9, +, /). Every 3 bytes of binary image data become 4 characters of Base64 text. The result is a long string of ASCII characters that can safely be embedded anywhere text is allowed — inside HTML attributes, CSS values, JSON strings, or XML elements.\n\nThe data URI format wraps this Base64 string with metadata: 'data:[MIME type];base64,[encoded data]'. For a PNG image, the complete data URI looks like 'data:image/png;base64,iVBORw0KGgo...'. When a browser encounters this in an <img> src attribute or CSS url(), it decodes the Base64 string back to binary and renders the image — all without making an HTTP request. This inline decoding happens in microseconds for small images.\n\nThe 33% size overhead comes from the encoding math: 3 bytes become 4 characters, so the output is always 4/3 the input size (33.3% larger). Additionally, Base64-encoded images embedded in HTML or CSS cannot be cached separately by the browser — they are re-downloaded every time the parent document loads. This is why the technique is only recommended for images under 10KB: the savings from eliminating one HTTP request outweigh the 33% size increase and lost cacheability for very small files, but the math reverses quickly for larger images.",
      useCases: [
        "Embedding small icons and UI elements directly in CSS to eliminate HTTP requests — replacing traditional CSS sprite sheets with inline data URIs for buttons, arrows, and status indicators.",
        "Creating HTML email templates where external images are blocked by default. Inline Base64 images display immediately without requiring the recipient to click 'load images'.",
        "Building single-file HTML documents for reports, invoices, or documentation where all assets need to be self-contained in one downloadable file.",
        "Reducing HTTP requests for above-the-fold content by inlining critical small images (logo, hero icon) directly in the HTML, eliminating render-blocking resource fetches.",
        "Including image data in API requests and webhook payloads where the receiving system expects a JSON body with embedded image content rather than a multipart file upload.",
        "Creating offline-capable web applications where small images are embedded directly in the JavaScript bundle or HTML, ensuring they are available without network access."
      ],
      tips: [
        "Only use Base64 encoding for images under 10KB (small icons, logos, simple graphics). For anything larger, the 33% size overhead and loss of browser caching make regular image files with CDN delivery more efficient.",
        "Remember that Base64 images embedded in HTML or CSS cannot be cached independently by the browser. Every page load re-downloads the encoded image data as part of the parent file, unlike separate image files that the browser caches.",
        "SVG files are already text-based (XML), so you can embed them directly in HTML without Base64 encoding. Using data:image/svg+xml;charset=utf-8,<svg>...</svg> is more efficient than Base64-encoding the SVG, since it avoids the 33% size overhead.",
        "When using Base64 images in CSS, place them in a separate stylesheet that changes infrequently. This way, the browser caches the stylesheet (including the embedded images), partially mitigating the caching disadvantage.",
        "For responsive images that need to serve different sizes at different breakpoints, Base64 is the wrong approach. Use <picture> elements or srcset attributes with regular image files optimized for each resolution."
      ],
      howToUse: ["Upload an image (drag & drop or click to browse). Supports JPG, PNG, GIF, SVG, WebP.", "View the file size comparison: original vs Base64 encoded.", "Copy the output you need: Base64 string, Data URI, HTML tag, or CSS background.", "Click 'Clear' to remove and upload a different image."],
      features: ["Support for JPG, PNG, GIF, SVG, and WebP images", "Four output formats: Base64 string, Data URI, HTML img tag, CSS background", "File size comparison showing Base64 overhead percentage", "Drag-and-drop and click-to-upload file input", "Image preview display", "One-click copy for each output format", "100% client-side — images never leave your browser"],
      faq: [
        { question: "Why convert images to Base64?", answer: "Base64 encoding lets you embed images directly in HTML, CSS, or JSON without hosting a separate file. This reduces HTTP requests (improving load time for small images), works in email templates (which block external images), and simplifies API payloads that need to include image data." },
        { question: "How much larger is Base64 than the original?", answer: "Base64 encoding increases file size by approximately 33%. A 30KB image becomes about 40KB in Base64. This trade-off is acceptable for small images (icons, logos under 10KB) but not recommended for large photos." },
        { question: "When should I NOT use Base64 images?", answer: "Avoid Base64 for images larger than 10-20KB. Large Base64 strings bloat your HTML/CSS, increase page weight, bypass browser caching (the image is re-downloaded with every page load), and slow down rendering. Use regular image files with proper CDN caching instead." },
        { question: "What is a data URI?", answer: "A data URI is a Base64-encoded image prefixed with metadata like 'data:image/png;base64,...'. You can use it directly in HTML src attributes or CSS url() properties. The browser decodes it inline without making a separate HTTP request." },
      ],
      relatedSlugs: ["base64-encoder", "svg-to-png", "color-picker", "json-formatter"],
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
