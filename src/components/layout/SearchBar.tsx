"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2, ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "@/components/common/Image";
import { motion, AnimatePresence } from "framer-motion";

interface SearchResultItem {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  category: "product" | "blog" | "page";
  thumbnailUrl?: string | null;
}

interface SearchBarProps {
  locale: string;
  isDark?: boolean;
  scrolled?: boolean;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export function SearchBar({
  locale,
  isDark = false,
  scrolled = true,
  isMobile = false,
  onCloseMobile,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isMn = locale === "mn";

  // Debounced search query
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query.trim())}&locale=${locale}`
        );
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("Search fetch error:", err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query, locale]);

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (isMobile) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  const handleSelect = () => {
    setIsOpen(false);
    setQuery("");
    if (onCloseMobile) onCloseMobile();
  };

  // Mobile mode inside drawer
  if (isMobile) {
    return (
      <div className="relative w-full">
        <div className="flex h-11 items-center border border-white/20 bg-white/5 px-3 backdrop-blur-md">
          <Search size={16} className="text-white/60 shrink-0 mr-2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isMn ? "Бүтээгдэхүүн, мэдээ хайх..." : "Search products, news..."}
            className="h-full w-full bg-transparent text-xs text-white placeholder:text-white/50 outline-none"
          />
          {isLoading && <Loader2 size={15} className="animate-spin text-white shrink-0 ml-2" />}
          {query && !isLoading && (
            <button
              onClick={() => setQuery("")}
              className="text-white/60 hover:text-white shrink-0 ml-2"
              aria-label="Clear"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {query.trim().length > 0 && (
          <div className="mt-2 max-h-[260px] overflow-y-auto border border-white/15 bg-[#050a1c] p-2 space-y-1.5">
            {results.length > 0 ? (
              results.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={handleSelect}
                  className="flex items-center justify-between p-2 border border-white/10 bg-white/5 hover:bg-white/15 text-white"
                >
                  <div className="flex-1 min-w-0 pr-2">
                    <h5 className="truncate text-xs font-bold">{item.title}</h5>
                    {item.excerpt && <p className="truncate text-[11px] text-slate-300">{item.excerpt}</p>}
                  </div>
                  <ArrowUpRight size={13} className="opacity-70 shrink-0" />
                </Link>
              ))
            ) : (
              <p className="p-3 text-center text-xs text-slate-400">
                {isMn ? "Илэрц олдсонгүй" : "No results found"}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative">
      {/* Search Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group relative flex h-[42px] w-[42px] shrink-0 items-center justify-center border backdrop-blur-md transition-all duration-300 [clip-path:polygon(8px_0,100%_0,100%_100%,0_100%,0_8px)] ${
          isDark
            ? "border-white/20 bg-white/10 text-white shadow-none hover:border-white/40 hover:bg-white/20"
            : scrolled
            ? "border-[#0d1a46]/20 bg-white/60 text-[#0d1a46] shadow-[0_4px_24px_0_rgba(13,26,70,0.08),inset_0_1px_2px_0_rgba(255,255,255,0.7)] hover:border-[#0d1a46]/40 hover:bg-white/80"
            : "border-white/30 bg-black/30 text-white shadow-none hover:border-white/60 hover:bg-white/15"
        }`}
        aria-label={isMn ? "Хайх" : "Search"}
        title={isMn ? "Хайх" : "Search"}
      >
        <span
          className={`pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 [clip-path:polygon(0_0,100%_0,0_100%)] transition-colors ${
            isDark ? "bg-white" : scrolled ? "bg-[#0d1a46]" : "bg-white"
          }`}
        />
        <Search size={17} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
      </button>

      {/* Simple Clean Search Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 top-[calc(100%+8px)] z-50 w-80 sm:w-96 border p-3 shadow-2xl backdrop-blur-xl ${
              isDark
                ? "border-white/20 bg-[#070e24]/98 text-white"
                : "border-slate-200 bg-white/98 text-[#0d1a46] shadow-[0_15px_40px_rgba(13,26,70,0.15)]"
            }`}
          >
            {/* Input Box */}
            <div className={`flex h-10 items-center border px-3 ${
              isDark ? "border-white/15 bg-white/5" : "border-slate-200 bg-slate-50"
            }`}>
              <Search size={15} className="opacity-60 shrink-0 mr-2" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={isMn ? "Хайх үгээ бичнэ үү..." : "Type to search..."}
                className="h-full w-full bg-transparent text-xs font-medium outline-none"
              />
              {isLoading && <Loader2 size={14} className="animate-spin shrink-0 ml-1.5 opacity-70" />}
              {query && !isLoading && (
                <button
                  onClick={() => setQuery("")}
                  className="opacity-60 hover:opacity-100 shrink-0 ml-1.5 p-0.5"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Results List */}
            {query.trim().length > 0 && (
              <div className="mt-2.5 max-h-[300px] overflow-y-auto space-y-1.5 pt-1">
                {results.length > 0 ? (
                  results.map((item) => (
                    <Link
                      key={item.id}
                      href={item.url}
                      onClick={handleSelect}
                      className={`group flex items-center gap-3 p-2.5 transition-colors ${
                        isDark
                          ? "hover:bg-white/10 text-white"
                          : "hover:bg-slate-100 text-[#0d1a46]"
                      }`}
                    >
                      {item.thumbnailUrl && (
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden bg-slate-200">
                          <Image
                            src={item.thumbnailUrl}
                            alt={item.title}
                            fill
                            sizes="36px"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h5 className="truncate text-xs font-bold leading-snug">{item.title}</h5>
                        {item.excerpt && (
                          <p className="truncate text-[11px] opacity-70 mt-0.5">{item.excerpt}</p>
                        )}
                      </div>
                      <ArrowUpRight size={13} className="opacity-50 group-hover:opacity-100 shrink-0" />
                    </Link>
                  ))
                ) : (
                  <p className="py-6 text-center text-xs opacity-60">
                    {isMn ? "Илэрц олдсонгүй" : "No results found"}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
