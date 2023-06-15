import topGrass from "../../assets/game/Grass.png";
import topPavement from "../../assets/game/Pavement.png";
import bottomPavement from "../../assets/game/BottomPavement.png";
import Dustbins from "./Dustbins";
// import BackButton from "../global/BackButton";
// eslint-disable-next-line react/prop-types
const DustbinSetup = ({ user }) => {
  // eslint-disable-next-line no-unused-vars
  return (
    <div>
      {/* <BackButton /> */}
      <Dustbins user={user} />
      <div className="relative min-h-screen">
        <div className="absolute top-[14vh] left-0 w-full bg-repeat md:top-[30vh] md:h-[40vh] lg:top-[20vh] lg:h-[40vh] xl:top-[10vh] xl:h-[70vh]">
          <img src={topGrass} alt="Top Grass" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-[30vh] left-0 w-full bg-repeat md:h-[10vh] lg:h-[20vh] xl:h-[25vh]">
          <img src={topPavement} alt="Top Pavement" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-[7vh] left-0 w-full bg-repeat md:h-[10vh] lg:h-[20vh] xl:h-[25vh]">
          <img src={bottomPavement} alt="Bottom Pavement" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-[7.5vh] bg-greenPrimary"></div>
      </div>
    </div>
  );
};

export default DustbinSetup;
