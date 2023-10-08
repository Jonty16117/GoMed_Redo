import './Intro.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
function Intro()
{
        const navigate = useNavigate();

        const handleClick = () => {
            navigate('/Hello');  
        
      };

    return(
    <div className="wrapper">
        <div className="box">
          <div className="static-txt">GoMed</div>
        </div>
        <div className="box">
          <ul className="dynamic-txts">
            <li><span>Symptom Assessment and Triage</span></li>
            <li><span>Health Monitoring and Lifestyle Guidance</span></li>
            <li><span>Medical Information and Education</span></li>
            <li><span>Medication Management</span></li>
          </ul>
        </div>
        <div className="button">
            <button onClick={handleClick}>Click Me</button>
        </div>
     </div>
     )
}
export default Intro;