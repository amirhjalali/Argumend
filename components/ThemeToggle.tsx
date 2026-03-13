"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a placeholder with the same dimensions to avoid layout shift
    return (
      <div className="flex items-center gap-0.5 p-1 rounded-lg bg-stone-100 dark:bg-[#252420]">
        <div className="h-8 w-8 rounded-md" />
        <div className="h-8 w-8 rounded-md" />
        <div className="h-8 w-8 rounded-md" />
      </div>
    );
  }

  const options = [
    { id: "light", icon: Sun, label: "Light mode" },
    { id: "dark", icon: Moon, label: "Dark mode" },
    { id: "system", icon: Monitor, label: "System preference" },
  ] as const;

  return (
    <div
      className="flex items-center gap-0.5 p-1 rounded-lg bg-stone-100 dark:bg-[#252420]"
      role="radiogroup"
      aria-label="Color theme"
    >
      {options.map(({ id, icon: Icon, label }) => {
        const isActive = theme === id;
        return (
          <button
            key={id}
            onClick={() => setTheme(id)}
            role="radio"
            aria-checked={isActive}
            aria-label={label}
            title={label}
            className={`
              relative flex items-center justify-center h-8 w-8 rounded-md
              transition-all duration-200
              ${
                isActive
                  ? "bg-white dark:bg-[#3d3a36] text-primary shadow-sm"
                  : "text-stone-400 dark:text-stone-500 hover:text-stone-600 dark:hover:text-stone-300"
              }
            `}
          >
            <Icon
              className={`h-4 w-4 transition-transform duration-200 ${
                isActive ? "scale-110" : "scale-100"
              }`}
              strokeWidth={1.8}
            />
          </button>
        );
      })}
    </div>
  );
}
