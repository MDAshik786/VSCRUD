import React from 'react';
import './Contact.css';
import { BsFillTelephoneOutboundFill } from 'react-icons/bs';
import { FaLocationDot } from 'react-icons/fa6';
import { BsFillChatSquareTextFill } from 'react-icons/bs';

const Contact = () => {
  return (
    <div className='contact-'>
    <main className='main-contact'>
      <div className='div-main'>
        <div className='container-contact'>
          <div className='content'>
            <div className='contact-us'>
              <p className='heading-contact'>Contact Us</p>
              <div className='phone-details'>
                <div className='heading1'>
                  <span className='contact-img'>
                    <BsFillTelephoneOutboundFill className='cnt-img' />
                  </span>
                  <span className='name1'>Phone</span>
                </div>
                <p className='details-contact'>9629942274</p>
              </div>
              <div className='location-details'>
                <div className='heading1'>
                  <span className='contact-img'>
                    <FaLocationDot className='cnt-img' />
                  </span>
                  <span className='name1'>Location</span>
                </div>
                <p className='details-contact'>Divum Company</p>
                <p className='details-contact'>72,73, 3rd Floor, Krishna Reddy Colony, Domlur, Bengaluru, Karnataka 560071</p>
              </div>
              <div className='chat-details'>
                <div className='heading1'>
                  <span className='contact-img'>
                    <BsFillChatSquareTextFill className='cnt-img' />
                  </span>
                  <span className='name1'>Chat</span>
                </div>
                <div>
                <p className='details-contact'>Chat with us @..</p>
                <p className='details-contact'>rioashik786@gmail.com</p>
                </div>
              </div>
            </div>
            {/* <div className="building-img">
                <img src="/images/Three_Eras_-_Houston.jpg" alt="" width={400} height={570}/>
            </div> */}
          </div>
        </div>
      </div>
    </main>
    </div>
  );
};

export default Contact;
