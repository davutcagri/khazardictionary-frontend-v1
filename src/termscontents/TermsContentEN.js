import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/KhazarDictionary_logo_transparent.png';

const TermsContentEN = () => {
    return (
        <div className='container'>

            <div className='text-center'>
                <Link to='/'>
                    <img className='pb-2 mt-5 border-bottom' src={logo} width='25%' alt='Khazar Dictionary Logo' />
                </Link>
            </div>

            <div className='mx-5'>

            <h3 className='text-center text-danger'>Terms of Use</h3>
                <p>
                    Please read these terms of use carefully. By visiting this website, using the information provided herein,
                    or adding any content to this website, you are deemed to have accepted the following terms of use.
                    If you do not accept these terms, do not access or use our website.
                </p>

                <h5>1. Site Content</h5>
                <p>
                    This website is a forum site prepared for Khazar University students.
                    The site is prepared for communication, sharing information, event announcements, lost property advertisements and
                    social connections among students. All information on the site is composed of the shares made between users.
                    Therefore, you must use the information on our website at your own responsibility.
                </p>

                <h5>2. Site Usage</h5>
                <p>
                    Usage of this website must comply with all local and international laws.
                    By using this website, you agree that you will not engage in illegal or harmful activities.
                </p>


                <h5>3. User Responsibility</h5>
                <p>
                    By using this website, you can share the information, posts, comments, and other content available on the site.
                    However, you are solely responsible for all the content you share.
                    Therefore, make sure that the content you share is legal, honest, accurate, and does not contain information such as insults, racism, sexism, pornography, derogatory, or harmful to other institutions.
                    In case of sharing such prohibited content, administrators have the right to remove and modify the content, and in case of necessity, administrators may even close the account of the user who shared the relevant content and ban the school email from the site.
                </p>

                <h5>4. User Cooperation</h5>
                <p>
                    This website aims to facilitate communication, information sharing, and social connections among students. 
                    Therefore, it is essential to communicate respectfully with other users and protect their rights and privacy. 
                    If you encounter any disputes, you are expected to collaborate with other users appropriately to resolve the issue.
                </p>

                <h5>5. Lost and Found Ads</h5>
                <p>
                    This website provides a platform for lost and found ads. 
                    However, we do not assume any responsibility for the accuracy and reliability of the ads posted on the website.
                </p>

                <h5>6. Use of Site Content</h5>
                <p>
                    All the content on this website consists of information shared by Khazar University students. 
                    Therefore, it is your responsibility to use the information on our website at your own risk. 
                    The information on our website is for general information purposes only and cannot be used for any specific purpose.
                </p>

                <h5>7. Site Security</h5>
                <p>
                    This website takes necessary measures to ensure security and protect your information. 
                    However, we do not guarantee the security and protection of our website.
                </p>

                <h5>8. User Data Collection</h5>
                <p>
                    This website collects various data of users, including their school email addresses, usernames, display names, passwords, and content shared by users.
                    This data is stored in a database managed by the site and is not shared with any third-party companies for payment.
                </p>

                <h5>9. Intellectual Property Rights</h5>
                <p>
                    This website may include materials subject to copyright, trademark, trade secret, and other intellectual property rights. 
                    These materials are protected by the owner or licensee of our website. No material on our website can be copied, distributed, 
                    reproduced, or used without permission. Sharing or broadcasting content on the website that belongs to another 
                    person's intellectual property rights or violating them is the responsibility of the sharer. Site administrators have the right to remove such content.
                </p>

                <h5>10. Links to Other Sites</h5>
                <p>
                    This website may contain links to other sites. 
                    These links are for informational purposes only, 
                    and our website owner is not responsible for the content or security of the sites containing the links.
                </p>

                <h5>11. Changes</h5>
                <p>
                    The terms of use for this website may change at any time. Therefore, it is recommended that you check this page regularly.
                </p>

                <h5>12. Contact</h5>
                <p>
                    If you have any questions, suggestions, or complaints regarding this website, 
                    please feel free to contact us. Our contact information is available on our website.
                </p>

                <p className='text-muted'>Last Updated: 21/04/2023</p>

            </div>


        </div>
    );
}

export default TermsContentEN;