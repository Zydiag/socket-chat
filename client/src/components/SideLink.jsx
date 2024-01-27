import { useState } from "react";

const SideLink = (props) => {
  // console.log(`/${icon}.png`);
  const { name, icon } = props;
  const [showModel, setShowModel] = useState(false);

  const handleClick = () => {
    setShowModel(!showModel);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="sideBarButton" onClick={handleClick}>
        <img width={20} src={`/${icon}.png`} alt="" />
        <p className="sideBarText">{name}</p>
      </div>
      {showModel && (
        <div className="model">
          <form className="model" action="" onSubmit={handleSubmit}>
            <input type="text" />
          </form>
        </div>
      )}
    </>
  );
};

export default SideLink;
