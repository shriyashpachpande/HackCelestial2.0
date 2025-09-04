// const NavLinks = () => {
//     return (
//         <div className="nav-links p-2 flex gap-8 text-lg font-medium text-gray-700">
//             <a href="#features">Features</a>
//             <a href="#pricing">Pricing</a>
//             <a href="#services">Services</a>
//             <a href="#contact">Contact</a>
//             <a href="#login">Login</a>
//         </div>
//     )
// }

// export default NavLinks



import { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";

const NavLinks = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* MENU ICON */}
            <MenuIcon
                className="md:hidden w-8 h-8 cursor-pointer"
                onClick={() => setIsOpen(true)}
            />

            {/* MOBILE MENU */}
            <div
                className={`fixed top-0 left-0 z-50 flex flex-col items-center text-lg justify-center gap-8 w-full h-screen 
                    bg-white/70 backdrop-blur transition-transform duration-300 
                    md:static md:flex md:flex-row md:bg-transparent md:h-auto md:w-auto
                    ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
            >
                <XIcon
                    className="md:hidden absolute top-6 right-6 w-6 h-6 cursor-pointer"
                    onClick={() => setIsOpen(false)}
                />

                {["Features", "Pricing", "Services", "Contact", "Login"].map((item, index) => (
                    <Link
                        key={index}
                        to="/"
                        onClick={() => {
                            scrollTo(0, 0);
                            setIsOpen(false);
                        }}
                        className="relative px-4 py-2 transition duration-300 rounded-md"
                        style={{
                            transition: "box-shadow 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) =>
                        (e.currentTarget.style.boxShadow =
                            "rgba(0, 0, 0, 0.35) 0px -20px 36px -28px inset")
                        }
                        onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                    >
                        {item}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NavLinks;
