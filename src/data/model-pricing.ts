export interface ModelPricing {
  id: string;
  name: string;
  provider: string;
  inputPrice: number;
  cachedInputPrice?: number;
  outputPrice: number;
  contextWindow: number;
  tokenizer: "openai" | "approximate";
}

export const models: ModelPricing[] = [
  // OpenAI
  { id: "gpt-4o", name: "GPT-4o", provider: "OpenAI", inputPrice: 2.5, cachedInputPrice: 1.25, outputPrice: 10, contextWindow: 128000, tokenizer: "openai" },
  { id: "gpt-4o-mini", name: "GPT-4o Mini", provider: "OpenAI", inputPrice: 0.15, cachedInputPrice: 0.075, outputPrice: 0.6, contextWindow: 128000, tokenizer: "openai" },
  { id: "gpt-4.1", name: "GPT-4.1", provider: "OpenAI", inputPrice: 2.0, cachedInputPrice: 0.5, outputPrice: 8.0, contextWindow: 1000000, tokenizer: "openai" },
  { id: "gpt-4.1-mini", name: "GPT-4.1 Mini", provider: "OpenAI", inputPrice: 0.4, cachedInputPrice: 0.1, outputPrice: 1.6, contextWindow: 1000000, tokenizer: "openai" },
  { id: "gpt-4.1-nano", name: "GPT-4.1 Nano", provider: "OpenAI", inputPrice: 0.1, cachedInputPrice: 0.025, outputPrice: 0.4, contextWindow: 1000000, tokenizer: "openai" },
  { id: "o3", name: "o3", provider: "OpenAI", inputPrice: 2.0, cachedInputPrice: 0.5, outputPrice: 8.0, contextWindow: 200000, tokenizer: "openai" },
  { id: "o4-mini", name: "o4-mini", provider: "OpenAI", inputPrice: 1.1, cachedInputPrice: 0.275, outputPrice: 4.4, contextWindow: 200000, tokenizer: "openai" },

  // Anthropic
  { id: "claude-opus-4", name: "Claude Opus 4", provider: "Anthropic", inputPrice: 15.0, cachedInputPrice: 1.5, outputPrice: 75.0, contextWindow: 200000, tokenizer: "approximate" },
  { id: "claude-sonnet-4", name: "Claude Sonnet 4", provider: "Anthropic", inputPrice: 3.0, cachedInputPrice: 0.3, outputPrice: 15.0, contextWindow: 200000, tokenizer: "approximate" },
  { id: "claude-haiku-3.5", name: "Claude Haiku 3.5", provider: "Anthropic", inputPrice: 0.8, cachedInputPrice: 0.08, outputPrice: 4.0, contextWindow: 200000, tokenizer: "approximate" },

  // Google
  { id: "gemini-2.5-pro", name: "Gemini 2.5 Pro", provider: "Google", inputPrice: 1.25, outputPrice: 10.0, contextWindow: 1000000, tokenizer: "approximate" },
  { id: "gemini-2.5-flash", name: "Gemini 2.5 Flash", provider: "Google", inputPrice: 0.15, outputPrice: 0.6, contextWindow: 1000000, tokenizer: "approximate" },
  { id: "gemini-2.0-flash", name: "Gemini 2.0 Flash", provider: "Google", inputPrice: 0.1, outputPrice: 0.4, contextWindow: 1000000, tokenizer: "approximate" },

  // Others
  { id: "grok-3", name: "Grok 3", provider: "xAI", inputPrice: 3.0, outputPrice: 15.0, contextWindow: 131000, tokenizer: "approximate" },
  { id: "grok-3-mini", name: "Grok 3 Mini", provider: "xAI", inputPrice: 0.3, outputPrice: 0.5, contextWindow: 131000, tokenizer: "approximate" },
  { id: "deepseek-v3", name: "DeepSeek V3", provider: "DeepSeek", inputPrice: 0.27, outputPrice: 1.1, contextWindow: 128000, tokenizer: "approximate" },
  { id: "deepseek-r1", name: "DeepSeek R1", provider: "DeepSeek", inputPrice: 0.55, outputPrice: 2.19, contextWindow: 128000, tokenizer: "approximate" },
  { id: "llama-4-maverick", name: "Llama 4 Maverick", provider: "Meta", inputPrice: 0.15, outputPrice: 0.6, contextWindow: 1000000, tokenizer: "approximate" },
  { id: "mistral-large", name: "Mistral Large", provider: "Mistral", inputPrice: 2.0, outputPrice: 6.0, contextWindow: 128000, tokenizer: "approximate" },
];

export const PRICING_UPDATED = "2026-05-27";

export const providers = [...new Set(models.map((m) => m.provider))];
