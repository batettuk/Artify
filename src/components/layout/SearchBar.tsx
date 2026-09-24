"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  Search,
  X,
  Loader2,
  ArrowUpRight,
  Package,
  FileText,
  Compass,
  CornerDownLeft,
  Sparkles,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import Image from "@/components/common/Image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeProvider";

export interface SearchResultItem {
  id: string;
  title: string;
  slug?: string;
  category: "products" | "blog" | "projects" | "pages";
  categoryLabel: string;
  url: string;
  excerpt?: string | null;
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
  scrolled = true,
  isMobile = false,
  onCloseMobile,
}: SearchBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;
  const isMn = locale === "mn";

  // Quick popular search chips
  const popularSearches = isMn
    ? ["Zehnder", "Мастеркласс", "Бүтээгдэхүүн", "Зөвлөх үйлчилгээ", "Тогтвортой барилга"]
    : ["Zehnder", "Masterclass", "Consulting", "Clean Air", "Fabrication"];

  // Category filter definitions
  const categories = useMemo(
    () => [
      { id: "all", label: isMn ? "Бүгд" : "All" },
      { id: "products", label: isMn ? "Бүтээгдэхүүн" : "Products" },
      { id: "blog", label: isMn ? "Нийтлэл" : "Articles" },
      { id: "pages", label: isMn ? "Хуудас" : "Pages" },
    ],
    [isMn]
  );

  // Debounced search query with request aborting
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query.trim())}&locale=${locale}`,
          { signal: controller.signal }
        );
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
          setSelectedIndex(0);
        } else {
          setResults([]);
        }
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        console.error("Search fetch error:", err);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 180);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query, locale]);


  // Filtered results based on active tab
  const filteredResults = useMemo(() => {
    if (activeCategory === "all") return results;
    return results.filter((item) => {
      if (activeCategory === "products") return item.category === "products" || item.category === "projects";
      if (activeCategory === "blog") return item.category === "blog";
      if (activeCategory === "pages") return item.category === "pages";
      return true;
    });
  }, [results, activeCategory]);

  // Focus input and lock scroll on open
  useEffect(() => {
    if (isOpen && !isMobile) {
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 80);
    } else if (!isMobile) {
      document.body.style.overflow = "";
    }
    return () => {
      if (!isMobile) document.body.style.overflow = "";
    };
  }, [isOpen, isMobile]);

  // Global keyboard shortcuts (Cmd+K / Ctrl+K to open, Escape to close, arrows to navigate)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle search on Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (!isOpen) return;

      if (e.key === "Escape") {
        e.preventDefault();
        setIsOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults.length]);

  const handleSelect = () => {
    setIsOpen(false);
    setQuery("");
    if (onCloseMobile) onCloseMobile();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "products":
      case "projects":
        return <Package size={14} className="shrink-0" />;
      case "blog":
        return <FileText size={14} className="shrink-0" />;
      case "pages":
      default:
        return <Compass size={14} className="shrink-0" />;
    }
  };

  const getCategoryBadgeClass = (category: string) => {
    if (isDark) {
      switch (category) {
        case "products":
        case "projects":
          return "bg-sky-500/15 text-sky-300 border-sky-500/30";
        case "blog":
          return "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
        case "pages":
        default:
          return "bg-amber-500/15 text-amber-300 border-amber-500/30";
      }
    } else {
      switch (category) {
        case "products":
        case "projects":
          return "bg-sky-50 text-sky-700 border-sky-200";
        case "blog":
          return "bg-emerald-50 text-emerald-700 border-emerald-200";
        case "pages":
        default:
          return "bg-amber-50 text-amber-800 border-amber-200";
      }
    }
  };

  // Mobile Drawer Embedded Search
  if (isMobile) {
    return (
      <div className="relative w-full space-y-2">
        <div
          className={`flex h-12 items-center border px-3.5 transition-colors ${
            isDark
              ? "border-white/15 bg-white/5 focus-within:border-white/40 focus-within:bg-white/10"
              : "border-slate-200 bg-white/80 focus-within:border-[#0d1a46]/50 focus-within:bg-white"
          }`}
        >
          <Search
            size={17}
            className={`shrink-0 mr-2.5 ${isDark ? "text-white/60" : "text-[#0d1a46]/60"}`}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isMn ? "Бүтээгдэхүүн, мэдээ хайх..." : "Search products, news..."}
            className={`h-full w-full bg-transparent text-xs font-medium outline-none ${
              isDark ? "text-white placeholder:text-white/40" : "text-[#0d1a46] placeholder:text-slate-400"
            }`}
          />
          {isLoading && (
            <Loader2
              size={15}
              className={`animate-spin shrink-0 ml-2 ${isDark ? "text-white" : "text-[#0d1a46]"}`}
            />
          )}
          {query && !isLoading && (
            <button
              onClick={() => setQuery("")}
              className={`p-1 shrink-0 ml-1.5 transition-opacity hover:opacity-100 ${
                isDark ? "text-white/60" : "text-slate-500"
              }`}
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

        {/* Mobile Quick Chips */}
        {!query && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <span
              className={`text-[10px] font-bold uppercase tracking-wider ${
                isDark ? "text-white/40" : "text-slate-400"
              }`}
            >
              {isMn ? "Хайх:" : "Try:"}
            </span>
            {popularSearches.slice(0, 3).map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className={`border px-2 py-0.5 text-[10px] font-medium transition-colors ${
                  isDark
                    ? "border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                    : "border-slate-200 bg-white text-[#0d1a46] hover:bg-slate-100"
                }`}
              >
                {term}
              </button>
            ))}
          </div>
        )}

        {/* Mobile Results */}
        {query.trim().length > 0 && (
          <div
            className={`max-h-[300px] overflow-y-auto border p-2 space-y-1.5 shadow-lg ${
              isDark ? "border-white/15 bg-[#050a1c]" : "border-slate-200 bg-white"
            }`}
          >
            {results.length > 0 ? (
              results.map((item) => (
                <Link
                  key={item.id}
                  href={item.url}
                  onClick={handleSelect}
                  className={`flex items-center justify-between p-2.5 border transition-all ${
                    isDark
                      ? "border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10 text-white"
                      : "border-slate-100 bg-slate-50/80 hover:border-slate-300 hover:bg-slate-100 text-[#0d1a46]"
                  }`}
                >
                  <div className="flex-1 min-w-0 pr-2.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`inline-flex items-center gap-1 border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getCategoryBadgeClass(
                          item.category
                        )}`}
                      >
                        {getCategoryIcon(item.category)}
                        <span>{item.categoryLabel}</span>
                      </span>
                    </div>
                    <h5 className="truncate text-xs font-bold">{item.title}</h5>
                    {item.excerpt && (
                      <p
                        className={`truncate text-[11px] mt-0.5 ${
                          isDark ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {item.excerpt}
                      </p>
                    )}
                  </div>
                  <ArrowUpRight size={14} className="opacity-60 shrink-0" />
                </Link>
              ))
            ) : (
              <p
                className={`py-4 text-center text-xs ${
                  isDark ? "text-slate-400" : "text-slate-500"
                }`}
              >
                {isMn ? "Илэрц олдсонгүй" : "No results found"}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  // Desktop Header Trigger Button + Spotlight Command Palette Modal
  return (
    <div ref={containerRef} className="relative">
      {/* Search Header Trigger Button */}
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
        aria-label={isMn ? "Хайх (Cmd+K)" : "Search (Cmd+K)"}
        title={isMn ? "Хайх (Cmd+K)" : "Search (Cmd+K)"}
      >
        <span
          className={`pointer-events-none absolute left-0 top-0 h-2.5 w-2.5 [clip-path:polygon(0_0,100%_0,0_100%)] transition-colors ${
            isDark ? "bg-white" : scrolled ? "bg-[#0d1a46]" : "bg-white"
          }`}
        />
        <Search
          size={17}
          className="relative z-10 transition-transform duration-300 group-hover:scale-110"
        />
      </button>

      {/* Luxury Spotlight Command Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Ambient Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-[10000] bg-black/55 backdrop-blur-md"
              aria-hidden="true"
            />

            {/* Floating Command Panel */}
            <div className="fixed inset-x-4 top-16 z-[10001] mx-auto w-full max-w-2xl sm:inset-x-auto sm:left-1/2 sm:-translate-x-1/2 sm:top-24">
              <motion.div
                initial={{ opacity: 0, scale: 0.96, y: -16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -12 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className={`overflow-hidden border shadow-2xl backdrop-blur-2xl transition-colors duration-200 ${
                  isDark
                    ? "border-white/20 bg-[#070e24]/96 text-white shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_1px_1px_rgba(255,255,255,0.12)]"
                    : "border-slate-200/90 bg-white/98 text-[#0d1a46] shadow-[0_30px_70px_rgba(13,26,70,0.22),0_0_1px_1px_rgba(13,26,70,0.06)]"
                }`}
              >
                {/* Search Bar Input Row */}
                <div
                  className={`flex h-16 items-center border-b px-5 transition-colors ${
                    isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200/80 bg-slate-50/70"
                  }`}
                >
                  <Search
                    size={20}
                    className={`shrink-0 mr-3.5 transition-colors ${
                      isDark ? "text-sky-300" : "text-[#0d1a46]"
                    }`}
                  />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={
                      isMn
                        ? "Бүтээгдэхүүн, нийтлэл, үйлчилгээ хайх..."
                        : "Search products, articles, services..."
                    }
                    className={`h-full w-full bg-transparent text-sm sm:text-base font-semibold outline-none ${
                      isDark
                        ? "text-white placeholder:text-white/40"
                        : "text-[#0d1a46] placeholder:text-slate-400"
                    }`}
                  />

                  {isLoading && (
                    <Loader2
                      size={18}
                      className={`animate-spin shrink-0 ml-2 ${
                        isDark ? "text-sky-400" : "text-[#0d1a46]"
                      }`}
                    />
                  )}

                  {query && !isLoading && (
                    <button
                      onClick={() => setQuery("")}
                      className={`p-1.5 shrink-0 ml-1.5 transition-all hover:scale-110 ${
                        isDark
                          ? "text-white/60 hover:text-white"
                          : "text-slate-400 hover:text-[#0d1a46]"
                      }`}
                      aria-label="Clear input"
                    >
                      <X size={16} />
                    </button>
                  )}

                  {/* ESC Keycap */}
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`ml-2 hidden sm:inline-flex items-center gap-1 border px-2 py-1 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                      isDark
                        ? "border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white"
                        : "border-slate-200 bg-white text-slate-500 hover:border-slate-400 hover:text-[#0d1a46]"
                    }`}
                  >
                    <span>ESC</span>
                  </button>
                </div>

                {/* Filter Tabs Bar */}
                <div
                  className={`flex items-center justify-between border-b px-5 py-2.5 text-xs font-semibold ${
                    isDark ? "border-white/10 bg-white/[0.01]" : "border-slate-200/60 bg-slate-50/40"
                  }`}
                >
                  <div className="flex items-center gap-1 sm:gap-2">
                    {categories.map((cat) => {
                      const isActive = activeCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setActiveCategory(cat.id)}
                          className={`px-3 py-1 text-xs font-bold transition-all ${
                            isActive
                              ? isDark
                                ? "bg-white text-[#070e24] shadow-sm"
                                : "bg-[#0d1a46] text-white shadow-sm"
                              : isDark
                              ? "text-white/70 hover:bg-white/10 hover:text-white"
                              : "text-slate-600 hover:bg-slate-200/70 hover:text-[#0d1a46]"
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>

                  {query.trim().length > 0 && (
                    <span
                      className={`hidden sm:inline-block text-[11px] font-medium ${
                        isDark ? "text-white/50" : "text-slate-500"
                      }`}
                    >
                      {filteredResults.length}{" "}
                      {isMn ? "илэрц олдлоо" : "results"}
                    </span>
                  )}
                </div>

                {/* Body Area: Suggestions or Results */}
                <div
                  ref={listRef}
                  className="max-h-[380px] overflow-y-auto overscroll-contain p-3 sm:p-4 space-y-2"
                >
                  {/* Empty Query State -> Popular Suggestions */}
                  {!query.trim() && (
                    <div className="py-4 px-2">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles
                          size={14}
                          className={isDark ? "text-amber-400" : "text-amber-600"}
                        />
                        <span
                          className={`text-xs font-bold uppercase tracking-wider ${
                            isDark ? "text-white/70" : "text-slate-600"
                          }`}
                        >
                          {isMn ? "Түгээмэл хайлтууд" : "Popular Searches"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {popularSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className={`group flex items-center gap-1.5 border px-3 py-1.5 text-xs font-semibold transition-all ${
                              isDark
                                ? "border-white/15 bg-white/5 text-white/80 hover:border-white/40 hover:bg-white/15 hover:text-white"
                                : "border-slate-200 bg-slate-50 text-[#0d1a46] hover:border-[#0d1a46]/30 hover:bg-white hover:shadow-sm"
                            }`}
                          >
                            <Search
                              size={12}
                              className="opacity-50 transition-transform group-hover:scale-110"
                            />
                            <span>{term}</span>
                          </button>
                        ))}
                      </div>

                      <div
                        className={`mt-6 border-t pt-4 ${
                          isDark ? "border-white/10" : "border-slate-200/60"
                        }`}
                      >
                        <p
                          className={`text-xs leading-relaxed ${
                            isDark ? "text-white/50" : "text-slate-500"
                          }`}
                        >
                          {isMn
                            ? "Та бүтээгдэхүүн, нийтлэл, компанийн танилцуулга эсвэл хаяг мэдээллийг хялбархан хайж олох боломжтой."
                            : "Easily search through our products, engineering solutions, news articles, and consultation pages."}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Results List */}
                  {query.trim().length > 0 && filteredResults.length > 0 && (
                    <div className="space-y-1.5">
                      {filteredResults.map((item, idx) => {
                        const isSelected = idx === selectedIndex;
                        return (
                          <Link
                            key={item.id}
                            href={item.url}
                            onClick={handleSelect}
                            onMouseEnter={() => setSelectedIndex(idx)}
                            className={`group flex items-center gap-3.5 border p-3 transition-all ${
                              isSelected
                                ? isDark
                                  ? "border-white/30 bg-white/10 text-white shadow-sm"
                                  : "border-[#0d1a46]/30 bg-slate-100/90 text-[#0d1a46] shadow-sm"
                                : isDark
                                ? "border-white/5 bg-white/[0.02] text-white hover:border-white/20 hover:bg-white/[0.06]"
                                : "border-slate-100 bg-white text-[#0d1a46] hover:border-slate-300 hover:bg-slate-50"
                            }`}
                          >
                            {/* Thumbnail or Fallback Icon */}
                            <div
                              className={`relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden border ${
                                isDark
                                  ? "border-white/10 bg-white/5 text-white/70"
                                  : "border-slate-200 bg-slate-100 text-slate-600"
                              }`}
                            >
                              {item.thumbnailUrl ? (
                                <Image
                                  src={item.thumbnailUrl}
                                  alt={item.title}
                                  fill
                                  sizes="48px"
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                getCategoryIcon(item.category)
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span
                                  className={`inline-flex items-center gap-1 border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${getCategoryBadgeClass(
                                    item.category
                                  )}`}
                                >
                                  {getCategoryIcon(item.category)}
                                  <span>{item.categoryLabel}</span>
                                </span>
                              </div>

                              <h4 className="truncate text-sm font-bold leading-tight">
                                {item.title}
                              </h4>

                              {item.excerpt && (
                                <p
                                  className={`truncate text-xs mt-1 leading-normal ${
                                    isDark ? "text-slate-300" : "text-slate-600"
                                  }`}
                                >
                                  {item.excerpt}
                                </p>
                              )}
                            </div>

                            {/* Right Arrow / Action */}
                            <div
                              className={`flex h-8 w-8 shrink-0 items-center justify-center border transition-all ${
                                isSelected
                                  ? isDark
                                    ? "border-white/40 bg-white text-[#070e24]"
                                    : "border-[#0d1a46] bg-[#0d1a46] text-white"
                                  : isDark
                                  ? "border-transparent text-white/40 group-hover:text-white"
                                  : "border-transparent text-slate-400 group-hover:text-[#0d1a46]"
                              }`}
                            >
                              <ArrowUpRight size={15} />
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  )}

                  {/* No Results State */}
                  {query.trim().length > 0 && filteredResults.length === 0 && (
                    <div className="py-12 text-center">
                      <div
                        className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center border ${
                          isDark
                            ? "border-white/10 bg-white/5 text-white/50"
                            : "border-slate-200 bg-slate-100 text-slate-500"
                        }`}
                      >
                        <Search size={20} />
                      </div>
                      <h4 className="text-sm font-bold">
                        {isMn ? "Илэрц олдсонгүй" : "No results found"}
                      </h4>
                      <p
                        className={`mt-1 text-xs ${
                          isDark ? "text-slate-400" : "text-slate-500"
                        }`}
                      >
                        {isMn
                          ? `“${query}” гэсэн хайлтаар илэрц олдсонгүй. Үгийн үсгийн дүрмийг шалгах эсвэл өөр үгээр хайна уу.`
                          : `No results matching “${query}”. Please check your spelling or try different keywords.`}
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer Bar */}
                <div
                  className={`flex items-center justify-between border-t px-5 py-2.5 text-[11px] font-semibold transition-colors ${
                    isDark
                      ? "border-white/10 bg-white/[0.02] text-white/50"
                      : "border-slate-200/80 bg-slate-50 text-slate-500"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <CornerDownLeft size={11} />
                      <span>{isMn ? "Сонгох" : "Select"}</span>
                    </span>
                    <span className="hidden sm:inline-block">•</span>
                    <span className="hidden sm:inline-block">
                      {isMn ? "↑↓ Навигаци" : "↑↓ Navigate"}
                    </span>
                    <span className="hidden sm:inline-block">•</span>
                    <span className="hidden sm:inline-block">
                      {isMn ? "ESC Хаах" : "ESC Close"}
                    </span>
                  </div>

                  <span className="font-mono text-[10px] tracking-wider opacity-75">
                    ARTIFY SEARCH
                  </span>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
