import React from "react";
import NewsCard from "../../components/Shared/NewsCard";
import Trending from "../../components/Home/Trending";
import SideMenu from "../../components/Home/SideMenu";
import NewsCard2 from "../../components/Shared/NewsCard2";

const Home = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 w-7xl gap-4 h-[100vh]  mx-auto container">
      <div className="hidden border border-zinc-700 rounded-md md:block md:col-span-1 w-full h-full overflow-y-auto">
        <SideMenu />
      </div>
      {/* Main Content (w-3/4 on Desktop) */}
      <div className="md:col-span-2  w-full h-full   overflow-y-auto">
        <NewsCard2
          title="UPDATE: Eastbound I-10 reopens in Tucson following wrong way driver incident"
          description="Eastbound Interstate 10 is back open after several law enforcement agencies worked to stop a wrong-way driver."
          imageUrl="https://meebuddy.com/assets/img/meebuddy/slider/2.png"
          location="Tucson, AZ"
          time="1d"
          reactions={22}
          comments={21}
        />
        <NewsCard2
          title="UPDATE: Eastbound I-10 reopens in Tucson following wrong way driver incident"
          description="Eastbound Interstate 10 is back open after several law enforcement agencies worked to stop a wrong-way driver."
          imageUrl="https://meebuddy.com/assets/img/meebuddy/slider/2.png"
          location="Tucson, AZ"
          time="1d"
          reactions={22}
          comments={21}
        />
        <NewsCard2
          title="UPDATE: Eastbound I-10 reopens in Tucson following wrong way driver incident"
          description="Eastbound Interstate 10 is back open after several law enforcement agencies worked to stop a wrong-way driver."
          imageUrl="https://meebuddy.com/assets/img/meebuddy/slider/2.png"
          location="Tucson, AZ"
          time="1d"
          reactions={22}
          comments={21}
        />
        <NewsCard2
          title="UPDATE: Eastbound I-10 reopens in Tucson following wrong way driver incident"
          description="Eastbound Interstate 10 is back open after several law enforcement agencies worked to stop a wrong-way driver."
          imageUrl="https://meebuddy.com/assets/img/meebuddy/slider/2.png"
          location="Tucson, AZ"
          time="1d"
          reactions={22}
          comments={21}
        />
        <NewsCard2
          title="UPDATE: Eastbound I-10 reopens in Tucson following wrong way driver incident"
          description="Eastbound Interstate 10 is back open after several law enforcement agencies worked to stop a wrong-way driver."
          imageUrl="https://meebuddy.com/assets/img/meebuddy/slider/2.png"
          location="Tucson, AZ"
          time="1d"
          reactions={22}
          comments={21}
        />
        <NewsCard2
          title="UPDATE: Eastbound I-10 reopens in Tucson following wrong way driver incident"
          description="Eastbound Interstate 10 is back open after several law enforcement agencies worked to stop a wrong-way driver."
          imageUrl="https://meebuddy.com/assets/img/meebuddy/slider/2.png"
          location="Tucson, AZ"
          time="1d"
          reactions={22}
          comments={21}
        />
      </div>

      {/* Sidebar (w-1/4 on Desktop, Hidden on Small Screens) */}
      <div className="hidden border border-zinc-700 rounded-md md:block md:col-span-1 w-full h-full overflow-y-auto">
        <Trending />
      </div>
    </div>
  );
};

export default Home;
