import TabHeader from "../../components/TabHeader/TabHeader";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="p-8">
      <TabHeader title="Привіт! 👋" />
      <div className="flex flex-row flex-wrap p-8 gap-8">
        <div className="w-96 h-56 place" >
        </div>
        <div className="w-96 h-56 place" >
        </div>
        <div className="w-96 h-56 place" >
        </div>
        <div className="w-96 h-56 place" >
        </div>
        <div className="w-96 h-56 place" >
        </div>
        <div className="w-96 h-56 place" >
        </div>
        <div className="w-96 h-56 place" >
        </div>
        <div className="w-96 h-56 place" >
        </div>
      </div>
      <div className="fox">
        <img src="https://imgur.com/Zb6szo7.png" alt="hi-fox" draggable={false}/>
      </div>
    </div>
  );
}

export default MainPage;
