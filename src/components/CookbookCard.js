import "../styles/CookbookCard.css";
import Button from "./Button";
import { useCookbook } from "../contexts/CookbookContext";

const CookbookCard = ({ cookbook }) => {
  const { deleteCookbook } = useCookbook();
  return (
    <div id="cookbook-card-top-level">
      <article>
        <div className="edit-remove-container">
          <Button
            to={`/cookbooks/${cookbook._id}/edit`}
            id="edit"
            icon="edit"
            size={32}
          />
          <Button
            id="remove"
            icon="trash"
            size={28}
            onClick={() => deleteCookbook(cookbook._id)}
          />
        </div>
        <div className="card-title-container">
          <p className="card-title">{cookbook.title}</p>
        </div>
        <p className="description"></p>
        <p className="detailed-description">{cookbook.description}</p>

        <div className="open-button-container">
          <Button
            key={cookbook._id}
            to={`/cookbooks/${cookbook._id}`}
            id="open"
            text="Open"
          />
        </div>
      </article>
    </div>
  );
};

export default CookbookCard;
