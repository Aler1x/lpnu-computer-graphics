import TabHeader from "../../components/TabHeader/TabHeader";
import "./MainPage.css";

const MainPage = () => {
  const handle1Click = () => {
    window.location.href =
      "https://drive.google.com/file/d/1kw1nXLotvIY-_mmSPFG-7P54q05UHCQB/view?usp=drive_link";
  };

  return (
    <div className="p-8">
      <TabHeader title="Привіт! 👋" />
      <div className="flex flex-row flex-wrap p-8 gap-8">
        <div className="w-96 h-56 place">
          <iframe
            width="384"
            height="224"
            src="https://www.youtube.com/embed/GiAj9WW1OfQ?si=b9tiReveIZjWbNE1&amp;controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
        <div
          className="w-96 h-56 place flex justify-center align-center"
          onClick={handle1Click}
        >
          <div className="w-80 h-48 bg-gray-200 rounded-[12px] flex flex-col justify-center align-center text-[25px]">
            <p className="text-md">Афінні перетворення</p>
            <p className="text-sm">(Лекція)</p>
          </div>
        </div>
        <div className="w-96 h-56 place">
          <iframe
            width="384"
            height="224"
            src="https://www.youtube.com/embed/YGrAxYPMIxU?si=jNaGD4n3x6Ymc3l5"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="rounded-lg"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-96 h-56 place">
          <iframe
            width="384"
            height="224"
            src="https://www.youtube.com/embed/tC87TaqE4LA?si=6vL4TIGGGuMKZRbY"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            className="rounded-lg"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-96 h-56 place">
          <iframe
            width="384"
            height="224"
            src="https://www.youtube.com/embed/GiAj9WW1OfQ?si=b9tiReveIZjWbNE1&amp;controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
        <div className="w-96 h-56 place">
          <iframe
            width="384"
            height="224"
            src="https://www.youtube.com/embed/GiAj9WW1OfQ?si=b9tiReveIZjWbNE1&amp;controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
        <div className="w-96 h-56 place">
          <iframe
            width="384"
            height="224"
            src="https://www.youtube.com/embed/GiAj9WW1OfQ?si=b9tiReveIZjWbNE1&amp;controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
        <div className="w-96 h-56 place">
          <iframe
            width="384"
            height="224"
            src="https://www.youtube.com/embed/GiAj9WW1OfQ?si=b9tiReveIZjWbNE1&amp;controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
      <div className="fox">
        <img
          src="https://imgur.com/Zb6szo7.png"
          alt="hi-fox"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default MainPage;
