import { Search, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface FilterPanelProps {
  onSearch?: (query: string) => void;
  onFilterChange?: (filters: Record<string, any>) => void;
  filters?: Array<{
    id: string;
    label: string;
    type: 'select' | 'range' | 'checkbox';
    options?: string[];
  }>;
}

export function FilterPanel({ onSearch, onFilterChange, filters = [] }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    onSearch?.(query);
  };

  const handleFilterChange = (filterId: string, value: any) => {
    const updated = { ...activeFilters, [filterId]: value };
    setActiveFilters(updated);
    onFilterChange?.(updated);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
    onSearch?.('');
    onFilterChange?.({});
  };

  const activeFilterCount = Object.keys(activeFilters).filter(
    (key) => activeFilters[key] !== undefined && activeFilters[key] !== ''
  ).length;

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-300/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full bg-slate-800/50 border border-emerald-500/20 rounded-lg pl-10 pr-4 py-2 text-emerald-300 placeholder-emerald-300/30 focus:outline-none focus:border-emerald-400/50 transition-colors"
          />
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            isOpen || activeFilterCount > 0
              ? 'bg-emerald-400/20 text-emerald-400 border border-emerald-400/30'
              : 'bg-slate-800/50 text-emerald-300/70 border border-emerald-500/20 hover:bg-slate-700/50'
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="px-1.5 py-0.5 bg-emerald-400 text-slate-900 rounded text-xs font-medium">
              {activeFilterCount}
            </span>
          )}
        </button>

        {(searchQuery || activeFilterCount > 0) && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-slate-800/50 text-emerald-300/70 border border-emerald-500/20 rounded-lg hover:bg-slate-700/50 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="bg-slate-800/50 border border-emerald-500/20 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filters.map((filter) => (
                  <div key={filter.id}>
                    <label className="text-emerald-300/70 text-sm mb-2 block">{filter.label}</label>
                    {filter.type === 'select' && (
                      <select
                        value={activeFilters[filter.id] || ''}
                        onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                        className="w-full bg-slate-900/50 border border-emerald-500/20 rounded px-3 py-2 text-emerald-300 focus:outline-none focus:border-emerald-400/50"
                      >
                        <option value="">All</option>
                        {filter.options?.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    {filter.type === 'checkbox' && (
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activeFilters[filter.id] || false}
                          onChange={(e) => handleFilterChange(filter.id, e.target.checked)}
                          className="w-4 h-4 bg-slate-900/50 border border-emerald-500/20 rounded text-emerald-400 focus:ring-emerald-400/50"
                        />
                        <span className="text-emerald-300 text-sm">Enable</span>
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
