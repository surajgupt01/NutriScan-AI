import Image from "next/image";
import { GoogleIcon } from "../Icons/Google";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex flex-col items-start p-6 justify-between bg-white">
      <h2 className="lg:text-2xl text-xl font-bold tracking-tight text-neutral-700">
        Pulse<span className="text-lime-400">.</span>
      </h2>
      <div className="w-full h-full flex flex-col justify-center items-center gap-4 py-12  ">
        <div className="lg:w-[25%] w-[80%] h-auto py-2 px-6 flex flex-col gap-8 ">
          <div className="flex flex-col gap-2">
          <h2 className="font-semibold text-2xl">Welcome Back</h2>
          <p className="text-xs font-light text-neutral-500">{`Every ingredient tells a story. We help you understand it.`}</p>
          </div>

          <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 mt-8">
            <label className="text-sm font-semibold">Email</label>
            <input className="w-full h-10 py-2 px-4 rounded-full border text-neutral-700 text-sm border-neutral-300 outline-neutral-600"></input>
          </div>

          <div className="w-full flex justify-center">
            <button className="w-[90%] mt-2 py-2 text-center font-semibold cursor-pointer hover:bg-neutral-800 bg-black px-3 text-white rounded-full duration-300 ease-in-out text-md">{`Log In`}</button>
          </div>
          </div>
        </div>
        <div className="lg:w-[30%] w-[70%]  gap-2 flex items-center justify-center py-4 px-10">
          <div className="w-full border border-neutral-400"></div>
          <div className="w-auto text-sm font-semibold text-neutral-500">
            {"OR"}
          </div>
          <div className="w-full border border-neutral-400"></div>
        </div>
        <div className="lg:w-[20%] w-[50%] mt-2 py-2 text-center font-semibold cursor-pointer hover:bg-neutral-100 px-3 border border-neutral-200 duration-300 ease-in-out text-neutral-800  rounded-full text-md flex items-center justify-center gap-2">
          {`Continue with `} <GoogleIcon className="lg:size-5 " />
        </div>
        <div className="mt-4 flex justify-center">
          <p className="w-[60%] text-xs text-neutral-400 text-center hover:text-neutral-700 duration-300 ease-in-out cursor-pointer">{`By continuing, you agree to our Terms of Service and Privacy Policy.`}</p>
        </div>
      </div>
      {/* <div className="w-full h-full bg-linear-to-br from-lime-400 via-green-400 to-neutral-800 flex justify-center items-center">
        <Image src={'/bowl.jpg'} width={100} height={100} alt="image" className="bg-transparent"></Image>
      </div> */}
    </div>
  );
}
