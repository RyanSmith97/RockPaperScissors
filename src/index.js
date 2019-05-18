import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandRock } from '@fortawesome/free-solid-svg-icons'
import { faHandPaper } from '@fortawesome/free-solid-svg-icons'
import { faHandScissors} from '@fortawesome/free-solid-svg-icons'
import { faHandLizard } from '@fortawesome/free-solid-svg-icons'
import { faHandSpock } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'

/**
 * 
 * @author Ryan Smith
 * 
 * @description A simple web app for a game extension on the game
 * rock paper scissors. Allows user to pick an option, and compete 
 * against the computer for points.
 * 
 * submission for Arnold Clark Hack Day
 */

const choiceList = [faHandRock,faHandPaper,faHandScissors,faHandLizard,faHandSpock] 
class Game extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            win: "Make your choice!",
            madeChoice: false,
            playerScore: 0,
            pcScore: 0,
        };
      }


    reset(){
        this.setState({
            win: "Make your choice!",
            madeChoice: false,
        })
    }

    /**
     * @function determine if the player wins
     * 
     * checks player choice, then checks if the random choice 
     * is either of the options that the player can beat
     * 
     * @param player is players choice, cpuChoice is random number
     * @returns true if player wins, false otherwise
     */
    checkWinner(player, cpuChoice){
        if (player === 0){  //rock beats scissors and lizard
            return (cpuChoice ===  3 || cpuChoice === 2)
        }else if (player===1){ //paper beats rock and spock
            return (cpuChoice ===  0 || cpuChoice === 4)
        }else if (player===2){  // scissors beast paper and lizard
            return (cpuChoice ===  1 || cpuChoice === 3) 
        }else if (player===3){  //lizard beats spock and paper
            return (cpuChoice ===  4 || cpuChoice === 1)
        }else if (player===4){  //spock beats scissors and rock
            return (cpuChoice === 2 || cpuChoice === 0)
        }
    }

    /**
     * handles user choice and determines winner, assigning points
     * 
     * @param i is numeric value of players choice
     */
    btnClick(i){
        const cpuChoice = Math.floor(Math.random() * Math.floor(5))

        this.setState({madeChoice: true, 
            userIcon: choiceList[i], 
            cpuIcon: choiceList[cpuChoice]
        });
        
        if (cpuChoice === i){
            this.setState({win: "tie!"})
        }else{
            if (this.checkWinner(i, cpuChoice)){
                this.setState({win:"you win!",
                            playerScore: this.state.playerScore+1,
                })
            }else{
                this.setState({win:"you lose!",
                            pcScore: this.state.pcScore+1,
                })  
            }
        }
    }
  
    render(){
        const madeChoice = this.state.madeChoice;
        return(
            <div className="container">
                <h1>
                    Rock Paper Scissors Lizard Spock
                </h1>
                <div className="row">
                    <div className="column">
                        {/* toggle between showing options and showing selected option */}
                        {madeChoice ? (
                            <div className="choice">
                                <FontAwesomeIcon size="6x" className="icon" icon={this.state.userIcon}/>
                            </div>
                        ) : (
                            <div className="choice column" >
                            
                                <button className="btn" onClick={() => this.btnClick(0)}><FontAwesomeIcon icon={faHandRock}/></button>
                                <button className="btn" onClick={() => this.btnClick(1)}><FontAwesomeIcon icon={faHandPaper}/></button>
                                <button className="btn" onClick={() => this.btnClick(2)}><FontAwesomeIcon icon={faHandScissors}/></button>
                                <button className="btn" onClick={() => this.btnClick(3)}><FontAwesomeIcon icon={faHandLizard}/></button>
                                <button className="btn" onClick={() => this.btnClick(4)}><FontAwesomeIcon icon={faHandSpock}/></button>
                                
                            </div>
                        )}
                        <div className="center">
                            score: {this.state.playerScore}
                        </div>
                    </div>

                    <div className="vs">
                        vs
                    </div>

                    <div className="column">
                        <div className="choice ">
                            {/* toggles between question mark and random selection */}
                            {madeChoice ?
                            (
                                <FontAwesomeIcon size="6x" className="icon" icon={this.state.cpuIcon}/>
                            ):(
                                <FontAwesomeIcon size="6x" className="icon" icon={faQuestionCircle}/>
                            )}
                   
                        </div>
                        <div className="center">
                            score: {this.state.pcScore}
                        </div>
                    </div>
                </div>
  
                <div className="result">
                    <h3>{this.state.win}</h3>
                </div>
                {/* display 'try again' if user has made a choice */}
                {madeChoice &&
                <div className="center">
                    <button onClick={() => this.reset()}>Try again?</button>
                </div>
                }
            </div>
        );
    }
}

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);