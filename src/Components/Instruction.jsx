import React from 'react';
import './Instruction.css';
import Ill from '../images/ill.jpg';
import Econ from '../images/econ.jpg';
import Poor from '../images/poor.jpg';



const Instruction = () => {

    return (
        <div className="offer-full">
            <div className="offer-container">
               <div className="offer-row">
                    <div className="offer-card" >
                            <img src={Ill} alt="" />
                        <div className="offer-details">
                            <h1>Heat Related Illness</h1>
                            <p>Heat-related illness, also called hyperthermia, is a condition resulting 
                                from exposure to extreme heat where the body becomes unable to properly cool, resulting in a rapid rise in body temperature. The evaporation 
                                of sweat is the normal way to remove body heat, but, when the humidity 
                                is high, sweat does not evaporate as quickly.3
                                This, in turn, prevents
                                the body from releasing heat quickly. Prompt treatment of heat-related 
                                illnesses with aggressive fluid replacement and cooling of core body
                                temperature is critical to reducing illness and preventing death.</p>
                            <h1>What can we do ?</h1>
                            <p> During heat waves, frequently check on people
                                at risk for heat-related death, such as the elderly 
                                and disabled or homebound people
                                Never leave children alone in cars, and ensure that 
                                children cannot lock themselves in an enclosed 
                                space, such as a car trunk.
                                Limit sun exposure during midday hours and
                                in places of potential severe exposure, such
                                beaches
                                Provide plenty of fresh water for pets, and leave 
                                the water in a shady area.</p>
                        </div>
                        
                    </div>
                    <div className="offer-card" >
                            <img src={Econ} alt="" />
                        <div className="offer-details">
                            <h1>Heat Related Illness</h1>
                            <p>Heat-related illness, also called hyperthermia, is a condition resulting 
                                from exposure to extreme heat where the body becomes unable to properly cool, resulting in a rapid rise in body temperature. The evaporation 
                                of sweat is the normal way to remove body heat, but, when the humidity 
                                is high, sweat does not evaporate as quickly.3
                                This, in turn, prevents
                                the body from releasing heat quickly. Prompt treatment of heat-related 
                                illnesses with aggressive fluid replacement and cooling of core body
                                temperature is critical to reducing illness and preventing death.</p>
                            <h1>What can we do ?</h1>
                            <p> During heat waves, frequently check on people
                                at risk for heat-related death, such as the elderly 
                                and disabled or homebound people
                                Never leave children alone in cars, and ensure that 
                                children cannot lock themselves in an enclosed 
                                space, such as a car trunk.
                                Limit sun exposure during midday hours and
                                in places of potential severe exposure, such
                                beaches
                                Provide plenty of fresh water for pets, and leave 
                                the water in a shady area.</p>
                        </div>
                        
                    </div>
                    <div className="offer-card" >
                            <img src={Poor} alt="" />
                        <div className="offer-details">
                            <h1>Heat Related Illness</h1>
                            <p>Heat-related illness, also called hyperthermia, is a condition resulting 
                                from exposure to extreme heat where the body becomes unable to properly cool, resulting in a rapid rise in body temperature. The evaporation 
                                of sweat is the normal way to remove body heat, but, when the humidity 
                                is high, sweat does not evaporate as quickly.3
                                This, in turn, prevents
                                the body from releasing heat quickly. Prompt treatment of heat-related 
                                illnesses with aggressive fluid replacement and cooling of core body
                                temperature is critical to reducing illness and preventing death.</p>
                            <h1>What can we do ?</h1>
                            <p> During heat waves, frequently check on people
                                at risk for heat-related death, such as the elderly 
                                and disabled or homebound people
                                Never leave children alone in cars, and ensure that 
                                children cannot lock themselves in an enclosed 
                                space, such as a car trunk.
                                Limit sun exposure during midday hours and
                                in places of potential severe exposure, such
                                beaches
                                Provide plenty of fresh water for pets, and leave 
                                the water in a shady area.</p>
                        </div>
                        
                    </div>
               </div>
           </div>
        </div>
    )
}

export default Instruction
