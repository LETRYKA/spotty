import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { getCategories } from "@/lib/api";
import { toast } from "react-toastify";

interface Category {
  id: string;
  name: string;
  emoji: string;
}

interface CategoryDropdownProps {
  categories: { id: string; name: string; emoji: string }[];
  selectedCategories: string[];
  onToggleCategory: (categoryId: string) => void;
  error?: string | string[];
}

const CategorySection = ({
  selectedCategories,
  onToggleCategory,
  error,
}: CategoryDropdownProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await getCategories();
        if (Array.isArray(data)) {
          const formattedCategories = data.map((cat) => ({
            id: cat.id || cat._id,
            name: cat.name,
            emoji: cat.emoji,
          }));
          setCategories(formattedCategories);
        } else {
          toast.error("error");
        }
      } catch (error) {
        toast.error("failed fetch");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
            variant="outline"
            className="w-full bg-[#0D0D0D]/70 border-[#2F2F2F] py-5 rounded-xl flex justify-between"
            disabled={isLoading}
            >
            {isLoading
                ? "Loading..."
                : selectedCategories.length === 0
                ? "Select Categories"
                : categories
                    .filter((cat) => selectedCategories.includes(cat.id))
                    .map((cat) => `${cat.emoji} ${cat.name}`)
                    .join(", ")
            }
            <ChevronDown className="text-white/50" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="bg-[#0D0D0D]/30 backdrop-blur-2xl border-[#2F2F2F] text-white w-56"
        >
          {categories.length > 0 ? (
            categories.map((cat) => (
              <DropdownMenuCheckboxItem
                key={cat.id}
                checked={selectedCategories.includes(cat.id)}
                onCheckedChange={() => onToggleCategory(cat.id)}
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

export default CategorySection;
