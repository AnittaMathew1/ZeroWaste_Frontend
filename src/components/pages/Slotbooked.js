import './Slotbooked.css';
const Slotbooked = () => {
    return(
        <div className="slotbooked">
         <h1>Slot Booked Successfully</h1>
         <div className='details'>
            <h3>Details</h3>
            <div className='detailsmore'></div>
            <p>Name            :Anitta Mathew</p>
            <p>Address         :Thayankery(H)
                                Kizhakkambalam P.O
                                Attingal</p>
            <p>Ward            :40</p>
            <p>Types of waste  :Plastic,FoodWaste,Glass</p>
            <p>Wate Pickup Date: 28/11/2022</p>
            <p>Message          : Waste will be kept near the gate</p>
         </div>
         <div className='print'>
          {/* <button onclick="window.print()" >
            Print
          </button> */}
        
            <button onClick="window.print()">Print this page</button>
        </div>
        </div>
    );
    
};

export default Slotbooked;