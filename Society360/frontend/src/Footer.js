import React from 'react';

function Footer() {
    return ( 
        <footer style={{backgroundColor: "rgb(250,250,250)"}} className='border-top'>
            <div className='container mt-5'>
                <div className='row mt-5'>
                    <div className='col'>
                        <h4 className='mb-4'>Society360</h4>
                        <p className='mt-2'> Smart Residential Management System<br/> developed under the Civora Nexus<br/> Internship Program. Building better<br/> communities through technology.</p>
                    </div>
                    <div className='col footer-sec'>
                        <h5 className='mb-4'>Platform</h5>
                        <a href='' style={{textDecoration: "none"}}>Resident Login</a><br/>
                        <a href='' style={{textDecoration: "none"}}>Admin Portal</a><br/>
                        <a href='' style={{textDecoration: "none"}}>All Features</a><br/>
                        <a href='' style={{textDecoration: "none"}}>Referral programme</a><br/>
                        <a href='' style={{textDecoration: "none"}}>Security</a><br/>
                    </div>
                    <div className='col footer-sec mb-5'>
                        <h5 className='mb-4'>Company</h5>
                        <a href='' style={{textDecoration: "none"}}>About Civora Nexus</a><br/>
                        <a href='' style={{textDecoration: "none"}}>Internship Program</a><br/>
                        <a href='' style={{textDecoration: "none"}}>Contact Us</a><br/>
                        <a href='' style={{textDecoration: "none"}}>Privacy Policy</a><br/>
                    </div>
                </div>
                
            </div>
        </footer>
     );
}

export default Footer;