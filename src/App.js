import React, { Component } from "react";
import CharacterCard from "./components/CharacterCard";
import Navbar from "./components/Navbar";
import characters from "./characters.json";
import MyModal from "./components/Modal";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    characters,
    currentScore: 0,
    topScore: 0,
    modalShow: false,
    message: ""
  };

  clickCharacter = (name) => {
    let thisCharacter = this.state.characters.filter(character => character.name === name)[0],
      currentScore = this.state.currentScore + 1;

    if (thisCharacter.clicked) {
      this.gameOver(false, name);
    }
    else {
      if (!thisCharacter.clicked && currentScore === 15) return this.gameOver(true);

      thisCharacter.clicked = true;
      this.setState(
        {
          currentScore: currentScore,
          topScore: (currentScore > this.state.topScore) ? currentScore : this.state.topScore,
          characters: this.shuffle(this.state.characters)
        }
      );
    }

  };

  gameOver = (win, name) => {
    const msg = (win) ? "Congratulations! You successfully only clicked on each character one time!" : `Oops! You already clicked on ${name}. Start game over.`;

    this.state.characters.filter(character => character.clicked === true).map(character => character.clicked = false);

    this.setState(
      {
        currentScore: 0,
        characters: this.shuffle(this.state.characters),
        message: msg,
        modalShow: true,
      }
    )
  }

  // Fisher-Yates Shuffle from https://www.frankmitchell.org/2015/01/fisher-yates/
  shuffle = (array) => {
    let i = 0
      , j = 0
      , temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
    return array;
  };


  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {

    let modalClose = () => this.setState({ modalShow: false });

    return (

      <div>
        <Navbar
          currentScore={this.state.currentScore}
          topScore={this.state.topScore}
        />
        <div className="container">
        
          
          <div className="cardHolder justify-content-center row">
            {this.state.characters.map(character => (
              <CharacterCard
                key={character.name}
                name={character.name}
                image={character.image}
                clickCharacter={this.clickCharacter}
              />
            ))}
          </div>
          <MyModal
            show={this.state.modalShow}
            onHide={modalClose}
            message={this.state.message}
            // title="Game Over!"
          />
          
        </div>
      </div>

    );
  }
}

export default App;
