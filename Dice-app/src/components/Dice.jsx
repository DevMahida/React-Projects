

const Dice = ({ isRolling, diceNumber, numberChange }) => {

    return (
        <>
            <div className="dice bg-info-subtle p-3 mt-5 rounded-3 border border-2 border-dark">
                <p className='display-4 fw-medium text-center'>{isRolling ? numberChange : diceNumber}</p>
            </div>
        </>
    );

}

export default Dice;