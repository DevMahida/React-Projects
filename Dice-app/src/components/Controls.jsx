

const Controls = ({isRolling,DiceRole,diceReset}) => {

    return (
        <>
            <div className='text-center mt-4'>
                <button id='rollbtn' className='btn btn-info me-3' onClick={DiceRole} disabled={isRolling}>Roll</button>
                <button className='btn btn-danger' onClick={diceReset}>Reset</button>
            </div>
        </>
    )

}
export default Controls;