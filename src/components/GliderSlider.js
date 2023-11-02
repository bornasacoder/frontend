import React, { useEffect } from 'react'
import Glider from 'glider-js';
import 'glider-js/glider.min.css'; 

function GliderSlider() {

    useEffect(() => {
        const glider = document.getElementById('glider1');
    
        if (glider) {
          new Glider(glider, {
            slidesToShow: 4,
            slidesToScroll: 1,
            draggable: true,
            rewind: true,
            duration: 0.5,
            responsive: [
              {
                breakpoint: 600,
                settings: {
                  slidesToShow: 4,
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
    <section style={{ background: '#000',overflowX:"hidden" }} className="company_icon section1 glider-section1">
        <div className=" m-marketing__asFeaturedIn container1 glider-column1">

            <ul className="m-grid__column-10 glider-inner1" id='glider1' style={{gap:"10px"}}>
                <li className='liDiv'>
                    <a href="javascript:;" rel="noopener noreferrer">
                        <img alt="The Wall Street Journal" src="icon/free_speech.jpg"  className='imgDiv'/>
                        <p>Free Speech</p>
                    </a>
                </li>
                                    <li className='liDiv'><a href="javascript:;" rel="noopener noreferrer"><img alt="Reuters" className="imgDiv" src="icon/decentralisation.png" /><p>Decentralisation</p></a></li>
                                    <li className='liDiv'><a href="javascript:;" rel="noopener noreferrer"><img alt="TechCrunch" src="icon/crowdfunding.jpg" className='imgDiv' /><p>Crowdfunding</p></a></li>
                                    <li className='liDiv'><a href="javascript:;" rel="noopener noreferrer"><img alt="Fox News" src="icon/blockchain.png" className='imgDiv'/><p>Blockchain</p></a></li>
                                    <li className='liDiv'><a href="javascript:;" rel="noopener noreferrer"><img alt="Independent" src="icon/transformation.jpg" className='imgDiv' /><p>Transformation</p></a></li>
                                    <li className='liDiv'><a href="javascript:;" rel="noopener noreferrer"><img alt="The Joe Rogan Experience" src="icon/power2.jpg" className='imgDiv' /><p>Collective Power</p></a></li>
                                    {/* <li className='col-lg-2 col-md-3 col-sm-6 col-12'><a href="javascript:;" rel="noopener noreferrer"><img alt="The Joe Rogan Experience" src="icon/vote3.png" /><p>Voting</p></a></li> */} 
                                    {/* <li><a href="javascript:;" rel="noopener noreferrer"><img alt="Reuters" className="img_blck" src="icon/Cryptocurrency_decentralization-23-512.png" /><p>transformation</p></a></li> */}
                                    {/* <li><a href="javascript:;" rel="noopener noreferrer"><img alt="npr" src="icon/Projects_icon.png" /><p>Projects</p></a></li> */}
                                </ul>
                            </div>
                        </section>
  )
}

export default GliderSlider
