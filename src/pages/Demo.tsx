import { Link } from "react-router-dom";

// type Props = {}{}: Props

function Demo() {
  // const [fileName, setFileName] = useState("No selected file")
  return (
    <div className="flex justify-center p-7 xl:p-10 2xl:p-10 xl:justify-start 2xl:justify-start">
        <div className="">
          <p className="text-4xl pb-10">
            Welcome to Refonte Prototype! Chose your exercise!
          </p>
          <div className="flex justify-center xl:justify-start">
            <div className=" grid gap-20 grid-rows-2 xl:grid-cols-2 2xl:grid-cols-2">
              <div className="">
                <Link
                  className="bg-slate-600 xl:p-10 p-2 w-80 h-80 flex flex-col justify-center items-center border rounded-xl"
                  to="/summary"
                >
                  <img
                    className="w-[140px]"
                    src="/assets/magical_codex.png"
                    alt=""
                  />
                  <p className="text-white text-3xl p-5">Magical codex</p>
                </Link>
              </div>
              <div>
                <Link
                  className="bg-slate-600 xl:p-10 p-2 border rounded-xl w-80 h-80 flex flex-col justify-center items-center"
                  to="/kernel"
                >
                  <img className="w-[140px]" src="/assets/kernel.png" alt="" />
                  <p className=" text-white text-3xl p-5">Kernel</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}

export default Demo;
