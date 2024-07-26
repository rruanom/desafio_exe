import React from 'react';

const LoginGoogle = () => {
    return (
        <div>
            <a href="http://localhost:5000/api/auth/google" className="google-button">
                <img
                    src="https://banner2.cleanpng.com/20180416/xlq/kisspng-g-suite-pearl-river-middle-school-google-software-sign-up-button-5ad4e1a9d11d62.1599053415239008418566.jpg"
                    alt="Google logo"
                />
            </a>
        </div>
    );
};

export default LoginGoogle;
