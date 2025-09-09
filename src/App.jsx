import { CloudSunIcon } from "@phosphor-icons/react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const searchInput = useRef();
  let [datas, setDatas] = useState(null);
  const handleSearch = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      event.preventDefault();
      if (searchInput.current.value === "") {
        toast.error("This field can’t be empty 🙂");
      } else {
        const city = searchInput.current.value.trim();
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API}&units=metric`;
        fetch(url).then((res) => {
          if (!res.ok) {
            console.log(res.json());
          }
          return res.json().then((data) => {
            console.log(data);
            setDatas(data);
            console.log("🚀 ~ handleSearch ~ setDatas:", setDatas);
          });
        });
        searchInput.current.value = "";
      }
    }
  };

  return (
    <>
      <div className="w-screen h-screen justify-center flex bg-[#0b111d]">
        <div className=" w-[340px] h-4/5 rounded-xl p-5  flex flex-col gap-4  self-center bg-[#202c3c]">
          <h1 className="text-3xl font-bold  shadow-lg text-white self-start ">Weather App</h1>
          <div className="flex flex-row gap-4 items-center w-full mb-5">
            <input type="text" className="px-4 py-2 w-full shadow-lg rounded-full text-white bg-[#0b111d]" placeholder="type the cities.." ref={searchInput} onKeyDown={handleSearch} />
            <div onClick={handleSearch} className="flex p-2 bg-[#0b111d] hover:bg-gray-700 duration-200 transition-all cursor-pointer rounded-full">
              <MagnifyingGlassIcon size={22} className="text-white" />
            </div>
          </div>
          <div className="flex flex-col  p-1">
            <h2 className="text-2xl font-bold text-[#d1d5e0] self-start ">{datas ? datas?.name : "Jawa"}</h2>
            <div className="flex flex-col relative mb-16">
              {datas ? <img src={`https://openweathermap.org/img/wn/${datas?.weather?.[0]?.icon}@2x.png`} alt="weather icon" className="self-center size-36" /> : <CloudSunIcon size={120} className="self-center text-white" />}
              <div className="flex flex-col absolute right-28 top-32">
                <p className="text-xl font-bold text-slate-400 self-center">{datas?.weather?.[0]?.main || "Berkabut"}</p>
                <p className="text-2xl font-semibold text-slate-400 self-center"> {datas ? Math.floor(datas?.main?.temp) : "20"}°C</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col  gap-2 px-3 py-2 bg-[#0b111d] rounded-lg text-white">
            <p className="flex flex-row gap-3 font-semibold text-lg items-center">
              Country : <span className="font-medium text-md text-slate-400">{datas ? datas.sys.country : "ID"}</span>
            </p>
            <p className="flex flex-row gap-3 font-semibold text-lg items-center">
              Humidity : <span className="font-medium text-md text-slate-400"> {datas ? datas.main.humidity : "100"}%</span>
            </p>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </>
  );
}

export default App;
