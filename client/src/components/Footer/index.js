import React from 'react';

const Footer = () => {

    return (
        <>
            <footer className= "footer">
                <div style={{marginTop: '30px'}}>
                    <a href="https://www.instagram.com/kifediora/" target="_blank" rel="noreferrer" ><i className = "bi bi-instagram"></i></a>
                    <a href="https://linkedin.com/in/kanayochi-ifediora-43422b20a" target="_blank" rel="noreferrer"><i className = "bi bi-linkedin"></i></a>
                    <a href="https://www.facebook.com/kanayo.ifediora" target="_blank" rel="noreferrer"><i className = "bi bi-facebook"></i></a>
                    <a href="https://github.com/anayoifediora" target="_blank" rel="noreferrer"><i className = "bi bi-github"></i></a>
                </div>
                <div style={{margin: '10px', fontSize: '20px'}}>
                    Copyright&copy; 2023
                </div>
            </footer>
        </>
    )
}

export default Footer;