import React from "react";
import "./Footer.scss";

function Footer() {
    return (
        <div className="footer">
            <div className="footer-col">
                <a name="Contact"></a>
                <p>The one stop</p>
            </div>
            <div class="footer_col">
                <h1>Useful Links</h1>
                <ul>
                    <li>About</li>
                    <li> Featured</li>
                    <li>  Contact</li>
                </ul>
            </div>
            <div class="footer_col">
                <h1>Help?</h1>
                <ul>
                    <li>FAQ</li>
                    <li>Terms and Conditions</li>
                    <li>Policy</li>
                    <li>Privacy</li>
                </ul>
            </div>
        </div>

    );
}

export default Footer;