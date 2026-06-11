export default function Logo({textSize} : {textSize : string}) {
  return (
    <span className={`bg-linear-to-r ${textSize} from-lime-400 to-emerald-500 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(132,204,22,0.4)]`}>
      Pulse AI
    </span>
  );
}
