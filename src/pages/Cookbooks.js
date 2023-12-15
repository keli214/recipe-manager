import Button from "../components/Button";
import "../styles/Cookbook.css";
import CookbookCard from "../components/CookbookCard";
import { useCookbook } from "../CookbookContext";

const Cookbooks = () => {
  const { cookbooks } = useCookbook();

  return (
    <div className="cook-book">
      <div className="title-container">
        <h1 className="title">My Cookbooks</h1>
      </div>
      <div className="cookbook-card-container" id="cards">
        {cookbooks.length > 0 ? (
          cookbooks.map((cookbook, index) => (
            <CookbookCard key={index} cookbook={cookbook} />
          ))
        ) : (
          <h1>No Cookbook to show</h1>
        )}
      </div>
      <div className="add-button">
        <Button id="Add" text="Add New Cookbook" to="/cookbooks/addcookbook" />
      </div>
    </div>
  );
};

export default Cookbooks;
