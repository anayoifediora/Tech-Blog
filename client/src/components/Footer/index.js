import React from 'react';

const Footer = () => {

    return (
        <>
            <footer className= "footer">
                <div style={{marginTop: '30px'}}>
                    <i className = "bi bi-instagram"></i>
                    <i className = "bi bi-linkedin"></i>
                    <i className = "bi bi-facebook"></i>
                    <i className = "bi bi-github"></i>
                </div>
                <div style={{margin: '10px', fontSize: '20px'}}>
                    Copyright&copy; 2023
                </div>
            </footer>
        </>
    )
}

export default Footer;