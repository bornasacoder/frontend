import React, { useEffect } from 'react'
import Glider from 'glider-js';
import 'glider-js/glider.min.css'; 
import { BsPlusCircleFill } from "react-icons/bs";

function StorySlider() {

    useEffect(() => {
        const glider = document.getElementById('glider1');
    
        if (glider) {
          new Glider(glider, {
            slidesToShow: 4,
            slidesToScroll: 1,
            draggable: true,
            arrows:true,
            rewind: true,
            duration: 0.5,
            responsive: [
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 2.2,
                  draggable: true,
                  rewind: true,
                  duration: 0.5,
                },
              },
              {
                breakpoint: 960,
                settings: {
                  slidesToShow: 4,
                  scrollLock: false,
                  rewind: true,
                },
              },
              {
                breakpoint: 1200,
                settings: {
                  slidesToShow: 4,
                  scrollLock: false,
                  rewind: true,
                },
              },
            ],
          });
        }
      }, []);
  return (
    <section style={{ background: 'transparent',overflowX:"hidden",border:'none' }} className="company_icon2 section1 glider-section1">
        <div className=" m-marketing__asFeaturedIn2 container1 glider-column1">

            <ul  id='glider1' style={{display:'flex',gap:"10px",flexDirection:'row'}}>
                <li className='liDiv2'>
                    <a href="javascript:;" rel="noopener noreferrer">
                        <img alt="The Wall Street Journal" src="https://img.freepik.com/free-photo/portrait-smiling-blonde-woman_23-2148316635.jpg?size=626&ext=jpg&ga=GA1.1.681071774.1670583833&semt=ais"  className='imgDiv2'style={{position:'relative'}}/>
                        <div style={{position:'absolute',display:'flex',justifyContent:'center',width:'180px',bottom:'30px',left:'-10px'}}>
                             <BsPlusCircleFill style={{fontSize:'45px',border:'5px solid white',borderRadius:'50px',background:'white'}}/>
                        </div>
                        <p style={{color:'black',marginTop:'20px'}}>Create story</p>
                    </a>
                </li>
                                    <li className='liDiv2'><a href="javascript:;" rel="noopener noreferrer"><img alt="Reuters" className="imgDiv2" src="icon/decentralisation.png" /><p>Decentralisation</p></a></li>
                                    <li className='liDiv2'><a href="javascript:;" rel="noopener noreferrer"><img alt="TechCrunch" src="icon/crowdfunding.jpg" className='imgDiv2' /><p>Crowdfunding</p></a></li>
                                    <li className='liDiv2'><a href="javascript:;" rel="noopener noreferrer"><img alt="Fox News" src="icon/blockchain.png" className='imgDiv2'/><p>Blockchain</p></a></li>
                                    <li className='liDiv2'><a href="javascript:;" rel="noopener noreferrer"><img alt="Independent" src="icon/transformation.jpg" className='imgDiv2' /><p>Transformation</p></a></li>
                                    <li className='liDiv2'><a href="javascript:;" rel="noopener noreferrer"><img alt="The Joe Rogan Experience" src="icon/power2.jpg" className='imgDiv2' /><p>Collective Power</p></a></li>
                                 
                                </ul>
                            </div>
                        </section>
  )
}

export default StorySlider;
