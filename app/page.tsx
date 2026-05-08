import Features from "./components/Features";
import HealthCard from "./components/HealthCards";
import SearchIcon from "./Icons/Search";

export default function Home() {
  type VariantType = "lime" | "red" | "blue" | "white";

  interface ItemsType {
    category: string;
    rating: string;
    color: VariantType;
    source: string;
    title: string;
    score: string;
  }

  const packedItems: ItemsType[] = [
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
  return (
    <div className="flex flex-col flex-1 items-center gap-4  bg-zinc-100 px-4">
      <div className="flex items-center justify-between  p-1 w-full px-6 py-4">
        <h1 className="text-2xl font-bold tracking-wide">Pulse</h1>

        <div className="flex items-center gap-2 justify-between">
          <div className="cursor-pointer  text-xs hover:bg-neutral-200 hover:text-neutral-800 rounded-full border border-white duration-300 ease-in-out py-3 px-6  font-semibold">
            {"Features"}
          </div>
          <div className="bg-black text-white cursor-pointer font-semibold duration-300 ease-in-out hover:bg-neutral-800 rounded-full px-6 py-3 text-xs">
            {"LogIn"}
          </div>
        </div>
      </div>

      {/* Hero section */}

      <div className="w-full lg:h-120 h-160   flex lg:flex-row flex-col lg:items-start  items-center lg:py-6  lg:justify-center">
        <div className="flex-col flex items-start justify-start gap-4   ">
          <h1 className="lg:text-7xl text-5xl font-extrabold whitespace-pre-line">
            Just for {"\n"} your body
          </h1>
          <p className="lg:w-70 w-60 text-md">
            AI-powered scan for FMCG products. Reveal the truth behind the label
            in milliseconds.
          </p>
          <div className="border-neutral-200  bg-white  flex items-center  gap-1 rounded-full">
            <div className="p-3 flex items-center gap-2">
              <SearchIcon />

              <p className="text-sm text-neutral-600">
                {"search your product..."}
              </p>
            </div>
            <div className="bg-black px-3 py-3 text-white font-semibold text-xs  rounded-full">
              {"Scan Now"}
            </div>
          </div>
        </div>

        <div className=" lg:w-[40%] w-full h-full flex justify-center lg:items-start items-center relative">
          {packedItems.map((e, idx) => (
            <HealthCard
              key={idx}
              category={e.category}
              rating={e.rating}
              color={e.color}
              source={e.source}
              title={e.title}
              score={e.score}
            ></HealthCard>
          ))}
        </div>
      </div>

      {/* Feature Section */}


      <div className="py-6 flex flex-col items-center gap-10">

        <h1 className="text-4xl font-bold w-full text-left">{'Inside the Box'}</h1>

        <Features/>
      </div>







    </div>
  );
}
