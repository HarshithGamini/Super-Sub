'use client';
import { TextArea, Button } from "@radix-ui/themes";
import { ChangeEvent, useState, useEffect } from "react";

// Expanded superscript mappings
const superscriptMap: { [key: string]: string } = {
  '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹',
  'a': 'ᵃ', 'b': 'ᵇ', 'c': 'ᶜ', 'd': 'ᵈ', 'e': 'ᵉ', 'f': 'ᶠ', 'g': 'ᶢ', 'h': 'ʰ', 'i': 'ⁱ', 'j': 'ʲ',
  'k': 'ᵏ', 'l': 'ˡ', 'm': 'ᵐ', 'n': 'ⁿ', 'o': 'ᵒ', 'p': 'ᵖ', 'q': 'ᑫ', 'r': 'ʳ', 's': 'ˢ', 't': 'ᵗ',
  'u': 'ᵘ', 'v': 'ᵛ', 'w': 'ʷ', 'x': 'ˣ', 'y': 'ʸ', 'z': 'ᶻ',
  'A': 'ᴬ', 'B': 'ᴮ', 'C': 'ᶜ', 'D': 'ᴰ', 'E': 'ᴱ', 'F': 'ᶠ', 'G': 'ᴳ', 'H': 'ᴴ', 'I': 'ᴵ', 'J': 'ᴶ',
  'K': 'ᴷ', 'L': 'ᴸ', 'M': 'ᴹ', 'N': 'ᴺ', 'O': 'ᴼ', 'P': 'ᴾ', 'Q': 'Q', 'R': 'ᴿ', 'S': 'ˢ', 'T': 'ᵀ',
  'U': 'ᵁ', 'V': 'ⱽ', 'W': 'ᵂ', 'X': 'ˣ', 'Y': 'ʸ', 'Z': 'ᶻ',
  '+': '⁺', '-': '⁻', '=': '⁼', '(': '⁽', ')': '⁾', '.': '˙', '/': '⸍', ',': '‚', ':': ':', '*': '∗',
  '!': 'ᵎ', '?': 'ˀ',
};

// Expanded subscript mappings
const subscriptMap: { [key: string]: string } = {
  '0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄', '5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
  'a': 'ₐ', 'b': 'ᵦ', 'c': '𝒸', 'd': '𝒹', 'e': 'ₑ', 'f': '𝒻', 'g': '𝓰', 'h': 'ₕ', 'i': 'ᵢ', 'j': 'ⱼ',
  'k': 'ₖ', 'l': 'ₗ', 'm': 'ₘ', 'n': 'ₙ', 'o': 'ₒ', 'p': 'ₚ', 'r': 'ᵣ', 's': 'ₛ', 't': 'ₜ', 'u': 'ᵤ',
  'v': 'ᵥ', 'x': 'ₓ', 'y': 'ᵧ', 'z': '𝓏',
  '+': '₊', '-': '₋', '=': '₌', '(': '₍', ')': '₎', '.': '․', '/': '⸍', ',': '‚', ':': ':', '*': '∗',
};

// Options for unmapped characters
type UnmappedOption = 'keep' | 'omit' | 'placeholder';

// Convert text based on the chosen map and unmapped option
const convertText = (
  text: string,
  map: { [key: string]: string },
  unmappedOption: UnmappedOption,
  placeholder: string = '�'
): string => {
  return text
    .split('')
    .map((char) => {
      if (map[char]) return map[char];
      if (unmappedOption === 'omit') return '';
      if (unmappedOption === 'placeholder') return placeholder;
      return char; // 'keep'
    })
    .join('');
};

export default function Home() {
  const [input, setInput] = useState("");
  const [superscript, setSuperscript] = useState("");
  const [subscript, setSubscript] = useState("");
  const [unmappedOption, setUnmappedOption] = useState<UnmappedOption>('keep');

  // Update outputs whenever input or unmappedOption changes
  useEffect(() => {
    setSuperscript(convertText(input, superscriptMap, unmappedOption));
    setSubscript(convertText(input, subscriptMap, unmappedOption));
  }, [input, unmappedOption]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setUnmappedOption(e.target.value as UnmappedOption);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Super-Sub</h1>
      <div className="w-full max-w-4xl">
        {/* Input Area */}
        <div className="mb-6">
          <TextArea
            className="w-full h-32 p-2 text-black"
            placeholder="Type or Paste your content here"
            value={input}
            onChange={handleChange}
            aria-label="Input text"
          />
        </div>

        {/* Unmapped Characters Option */}
        <div className="mb-6">
          <label htmlFor="unmapped-option" className="mr-2">
            Handle unmapped characters:
          </label>
          <select
            id="unmapped-option"
            value={unmappedOption}
            onChange={handleOptionChange}
            className="p-2 bg-gray-800 text-white"
          >
            <option value="keep">Keep as is</option>
            <option value="omit">Omit</option>
            <option value="placeholder">Replace with �</option>
          </select>
        </div>

        {/* Output Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Superscript Output */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Superscript Generator</h2>
            <TextArea
              className="w-full h-32 p-2 mb-2 text-black"
              value={superscript}
              readOnly
              aria-label="Superscript output"
            />
            <Button
              onClick={() => copyToClipboard(superscript)}
              className="mt-2 p-2 bg-blue-500 text-white"
            >
              Copy Superscript
            </Button>
          </div>

          {/* Subscript Output */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Subscript Generator</h2>
            <TextArea
              className="w-full h-32 p-2 mb-2 text-black"
              value={subscript}
              readOnly
              aria-label="Subscript output"
            />
            <Button
              onClick={() => copyToClipboard(subscript)}
              className="mt-2 p-2 bg-blue-500 text-white"
            >
              Copy Subscript
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}