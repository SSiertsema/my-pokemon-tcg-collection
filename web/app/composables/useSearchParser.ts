export interface ParsedSearch {
  query: string;
  exactMatch: boolean;
  filters: {
    type?: string;
    rarity?: string;
    series?: string;
    supertype?: string;
    set?: string;
  };
}

const MODIFIER_MAP: Record<string, keyof ParsedSearch['filters']> = {
  'type:': 'type',
  'rarity:': 'rarity',
  'series:': 'series',
  'is:': 'supertype',
  'set:': 'set',
};

export function useSearchParser() {
  /**
   * Parse a search query with modifiers like "pikachu type:lightning rarity:rare"
   */
  function parseQuery(input: string): ParsedSearch {
    const result: ParsedSearch = {
      query: '',
      exactMatch: false,
      filters: {},
    };

    if (!input.trim()) {
      return result;
    }

    let remaining = input.trim();

    // Check for exact match (quoted string)
    const exactMatchRegex = /"([^"]+)"/;
    const exactMatch = remaining.match(exactMatchRegex);
    if (exactMatch) {
      result.query = exactMatch[1];
      result.exactMatch = true;
      remaining = remaining.replace(exactMatchRegex, '').trim();
    }

    // Extract modifiers
    for (const [modifier, filterKey] of Object.entries(MODIFIER_MAP)) {
      const regex = new RegExp(`${modifier}(\\S+)`, 'gi');
      const match = remaining.match(regex);
      if (match) {
        // Take the last match if multiple
        const value = match[match.length - 1].slice(modifier.length);
        result.filters[filterKey] = value;
        remaining = remaining.replace(regex, '').trim();
      }
    }

    // Remaining text is the name query (if no exact match was found)
    if (!result.exactMatch && remaining) {
      result.query = remaining;
    }

    return result;
  }

  /**
   * Build a search string from parsed components
   */
  function buildQuery(parsed: ParsedSearch): string {
    const parts: string[] = [];

    if (parsed.query) {
      if (parsed.exactMatch) {
        parts.push(`"${parsed.query}"`);
      } else {
        parts.push(parsed.query);
      }
    }

    for (const [modifier, filterKey] of Object.entries(MODIFIER_MAP)) {
      const value = parsed.filters[filterKey];
      if (value) {
        parts.push(`${modifier}${value}`);
      }
    }

    return parts.join(' ');
  }

  /**
   * Get available modifiers for help text
   */
  function getModifiers() {
    return [
      { key: 'type:', description: 'Filter by type', examples: ['type:fire', 'type:water', 'type:lightning'] },
      { key: 'rarity:', description: 'Filter by rarity', examples: ['rarity:rare', 'rarity:common', 'rarity:"Rare Holo"'] },
      { key: 'series:', description: 'Filter by series', examples: ['series:base', 'series:"Scarlet & Violet"'] },
      { key: 'is:', description: 'Filter by card type', examples: ['is:pokemon', 'is:trainer', 'is:energy'] },
      { key: 'set:', description: 'Filter by set ID', examples: ['set:base1', 'set:sv1'] },
    ];
  }

  return {
    parseQuery,
    buildQuery,
    getModifiers,
  };
}
