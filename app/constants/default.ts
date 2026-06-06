  type VariantType = "lime" | "red" | "blue" | "white";
 
 interface ItemsType {
    category: string;
    rating: string;
    color: VariantType;
    source: string;
    title: string;
    score: string;
    deg?: string;
  }

  export const packedItems: ItemsType[] = [
    {
      category: "HEALTH DRINK",
      rating: "GOOD",
      color: "white",
      source: "Plant-Based",
      title: "Unsweetened Almond Milk",
      score: "86",
    },
    {
      category: "MUESLI",
      rating: "EXCELLENT",
      color: "red",
      source: "YogaBar",
      title: "Dark Chocolate Cranberry Muesli",
      score: "91",
    },

    {
      category: "PROTEIN BAR",
      rating: "GOOD",
      color: "blue",
      source: "Yoga Bar",
      title: "Daily Protein Bar",
      score: "88",
    },
    {
      category: "PLANT-BASED",
      rating: "EXCELLENT",
      color: "lime",
      source: "Oat-Based",
      title: "Organic Oat Milk",
      score: "94",
    },
  ];