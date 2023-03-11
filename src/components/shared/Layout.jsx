import React from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
    return (
        <div>
            <Header />
            <div className="bg-jiffy-light-grey">{children}</div>
            <Footer />
        </div>
    );
}
