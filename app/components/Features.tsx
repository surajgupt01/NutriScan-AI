import HearIcon from "../Icons/Heart";
import PulseIcon from "../Icons/Pulse";
import RecycleIcon from "../Icons/Recycle";


export default function Features() {
   const insightsCards = [
    {
      icon: HearIcon,
      title: "Hidden Sugars",
      description:
        "We identify 56+ alternative sugar names commonly hidden inside ingredient labels and processed foods.",
      tags: ["MALTODEXTRIN", "DEXTROSE"],
      variant: "light",
    },
    {
      icon: PulseIcon,
      title: "Additive Alert",
      description:
        "E-numbers, preservatives, and synthetic additives cross-checked with verified medical research databases.",
      tags: ["CARCINOGEN CHECK", "E-621"],
      variant: "accent",
    },
    {
      icon: RecycleIcon,
      title: "Micro-Plastics",
      description:
        "Detect packaging-linked contamination risks and identify potentially harmful container materials.",
      tags: ["BPA FREE", "PET-1"],
      variant: "light",
    },
  ];
  return <div className={` flex lg:flex-row flex-col items-center justify-center gap-6  `}>

    {insightsCards.map((e , idx)=>(
        <div key={idx} className={` text-sm p-6 w-70 h-70 rounded-xl ${e.variant=='light' ? 'bg-neutral-100 border-neutral-300 border' : 'bg-lime-300'}`}>
            <div className="w-10 h-10  rounded-xl my-2"><e.icon/></div>
            <div className="text-lg font-semibold">{e.title}</div>
            <div className="w-60">{e.description}</div>
            <div className="flex gap-1 my-2 items-center">
             {e.tags.map((x ,id)=>(
                <div key={id} className={`${e.variant=='light' ? 'bg-neutral-50 text-black' : 'bg-black text-white'} rounded-full text-[9px] tracking-wide px-3 py-1 text-center font-light `}>{x}</div>
             ))}
             </div>
        </div>
    ))}
    
  </div>;
}
