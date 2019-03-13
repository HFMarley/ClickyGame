import React from "react";
import "./style.css";

function CharacterCard(props) {
  return (
    
      <div className="card img-container">
        <img src={props.image} alt={props.name} onClick={() => props.clickCharacter(props.name)} />
      </div>
    
  );
}

export default CharacterCard;
