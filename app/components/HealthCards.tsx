const cardVariants = {
  lime: {
    card: "bg-lime-400 rotate-[-5deg] absolute",
    text: "text-lime-950",
    muted: "text-lime-800",
    badge: "bg-lime-500",
    dot: "bg-lime-800",
  },

  red: {
    card: "bg-red-400 rotate-[10deg] absolute",
    text: "text-red-950",
    muted: "text-red-800",
    badge: "bg-red-500",
    dot: "bg-red-800",
  },

  blue: {
    card: "bg-blue-400 rotate-[5deg] absolute",
    text: "text-blue-950",
    muted: "text-blue-800",
    badge: "bg-blue-500",
    dot: "bg-blue-800",
  },

  white: {
    card: "bg-zinc-100 border border-zinc-200 rotate-[15deg] absolute",
    text: "text-zinc-900",
    muted: "text-zinc-600",
    badge: "bg-white border border-zinc-200",
    dot: "bg-zinc-500",
  },
};

type VariantType =  "lime" | "red" | "blue" | "white" ;

export default function HealthCard({
  color,
  title,
  score,
  category,
  rating,
  source,
  deg
}: {
  color: VariantType ;
  score: string;
  title: string;
  category: string;
  rating: string;
  source: string;
  deg ?: string
}) {
  const styles = cardVariants[color];

  return (
    <div
      className={`${deg ? deg : `${styles.card } w-50 h-70 lg:h-95 lg:w-65`}  rounded-3xl  flex flex-col justify-between  origin-bottom-left `}
    >
      <div>
        <div className="flex items-center px-4 mt-4 gap-1">
          <span className={`${styles.muted} text-xs font-semibold`}>
            {category}
          </span>

          <span className={`w-1 h-1 rounded-full ${styles.dot}`}></span>

          <span className={`${styles.muted} text-xs font-semibold`}>
            {rating}
          </span>
        </div>

        <div className={`${styles.text} text-lg font-bold px-4 my-2`}>
          {title}
        </div>

        <div
          className={`${styles.text} text-6xl flex flex-col font-bold px-4 my-2`}
        >
          <span>{score}</span>

          <span className={`${styles.muted} text-sm`}>
            Health Score
          </span>
        </div>
      </div>

      <div
        className={`${styles.badge} m-2 px-3 py-1 rounded-full text-sm w-fit ${styles.muted}`}
      >
        {source}
      </div>
    </div>
  );
}