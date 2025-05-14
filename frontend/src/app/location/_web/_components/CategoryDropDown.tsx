import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface Category {
  id: string;
  name: string;
  emoji: string;
}

interface CategoryDropdownProps {
  categories: Category[];
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
  error?: string | string[];
}

const CategoryDropdown = ({
  categories,
  selectedCategories,
  onToggleCategory,
  error,
}: CategoryDropdownProps) => {
  const getDisplayValue = () => {
    if (!selectedCategories || selectedCategories.length === 0) {
      return "Select Categories";
    }

    const selectedCategoryObjects = selectedCategories
      .map((id) => categories.find((cat) => cat.id === id))
      .filter(Boolean) as Category[];

    const emojisToShow = selectedCategoryObjects
      .slice(0, 3)
      .map((cat) => cat.emoji);
    let displayString = emojisToShow.join(" ");

    if (selectedCategoryObjects.length > 3) {
      displayString += ` +${selectedCategoryObjects.length - 3}`;
    }
    return displayString;
  };

  return (
    <div className="w-2/4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full bg-[#0D0D0D]/70 border-[#2F2F2F] py-5 rounded-xl flex justify-between items-center text-white"
          >
            <span className="truncate">{getDisplayValue()}</span>
            <ChevronDown className="text-white/50 ml-2 flex-shrink-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="bg-[#0D0D0D]/30 backdrop-blur-2xl border-[#2F2F2F] text-white w-54 max-w-xs"
        >
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <DropdownMenuCheckboxItem
                key={cat.id}
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => onToggleCategory(cat.id)}
                className="hover:!bg-[var(--background)]/20 focus:!bg-[var(--background)]/30"
              >
                <span className="mr-2">{cat.emoji}</span>
                {cat.name}
              </DropdownMenuCheckboxItem>
            ))
          ) : (
            <div className="px-2 py-2 text-sm text-gray-400">
              No categories available
            </div>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default CategoryDropdown;
