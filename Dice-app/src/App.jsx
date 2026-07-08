import { useEffect, useState } from 'react';

import Header from './components/Header';
import Dice from './components/Dice';
import Controls from './components/Controls';

import './App.css'

function App() {


    const [diceNumber1, setDiceNumber1] = useState(1);
    const [diceNumber2, setDiceNumber2] = useState(1);
    const [numberChange, setNumberChnage] = useState(null);
    const [isRolling, setIsRolling] = useState(false);
    const [numberOdDice, SetNumberOfdice] = useState(1);

    // generate dice number
    const DiceRole = () => {
        setIsRolling(true);

        setTimeout(() => {
            let roll1 = Math.floor(Math.random() * 6) + 1;
            let roll2 = Math.floor(Math.random() * 6) + 1;
            setDiceNumber1(roll1);
            setDiceNumber2(roll2);
            console.log("Dice-1 : ", roll1);
            console.log("Dice-2 : ", roll2);
            setIsRolling(false);
        }, 1000);
    }

    // reset dice number
    const diceReset = () => {
        setDiceNumber1(1);
        setDiceNumber2(1);
        console.log("Dice Reset");

    }

    // rolling number animation
    let roll = setTimeout(() => {
        let roll = Math.floor(Math.random() * 6) + 1;
        setNumberChnage(roll);
    }, 100);

    // change dice number while reseting dice value
    const NoOfDice = () => {
        let N_dice = document.getElementById("N-dice").value;
        SetNumberOfdice(N_dice);
        console.log("number of dice changed");
        setDiceNumber1(1);
        setDiceNumber2(1);

    }

    return (
        <>
            {/* header */}
            <Header></Header>

            <main>

                {/* number of dice */}
                <div className='text-center'>
                    <label htmlFor="N-dice">Select the number of Dice : </label>
                    <select onChange={NoOfDice} className="form-select NumberOfdice w-25 d-inline-flex ms-3" id="N-dice">
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>

                {/* display dice component based on select */}
                {numberOdDice == 1 ?
                    <div className='d-flex justify-content-center'>
                        <Dice isRolling={isRolling} numberChange={numberChange} diceNumber={diceNumber1} />
                    </div>
                    : (
                        <div className='d-flex justify-content-center gap-3'>
                            <Dice isRolling={isRolling} numberChange={numberChange} diceNumber={diceNumber1} />
                            <Dice isRolling={isRolling} numberChange={numberChange} diceNumber={diceNumber2} />
                        </div>
                    )
                }


                {/* control btns */}
                <Controls isRolling={isRolling} DiceRole={DiceRole} diceReset={diceReset} />

            </main>
        </>
    )
}

export default App