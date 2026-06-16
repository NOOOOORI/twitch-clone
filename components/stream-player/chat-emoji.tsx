"use client";

import { useRef, useState } from "react";
import { Smile } from "lucide-react";
import { useOnClickOutside } from "usehooks-ts";

import { Button } from "../ui/button";
import { Hint } from "../hint";

const EMOJIS = [
  "😀", "😂", "🤣", "😊", "😍", "😎", "🤔", "😴",
  "😭", "😡", "👍", "👎", "👏", "🙏", "🙌", "💪",
  "🔥", "✨", "🎉", "💯", "❤️", "💔", "😱", "🥳",
  "👀", "🤝", "🫡", "😇", "🤩", "😅", "🥺", "😆",
];

interface ChatEmojiProps {
  onSelect: (emoji: string) => void;
  disabled?: boolean;
}

export const ChatEmoji = ({ onSelect, disabled }: ChatEmojiProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(containerRef, () => setIsOpen(false));

  const handleSelect = (emoji: string) => {
    onSelect(emoji);
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative">
      <Hint label="絵文字" side="top" asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled}
          onClick={() => setIsOpen((current) => !current)}
        >
          <Smile className="h-5 w-5" />
        </Button>
      </Hint>
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 z-50 w-56 rounded-md border bg-card p-2 shadow-md">
          <div className="grid grid-cols-8 gap-1">
            {EMOJIS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => handleSelect(emoji)}
                className="flex items-center justify-center rounded-md p-1 text-lg hover:bg-white/10 transition"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
