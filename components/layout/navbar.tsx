// components/layout/Navbar.tsx
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';

interface NavItemProps {
    children: React.ReactNode;
    isActive?: boolean;
    onPress?: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ children, isActive = false, onPress }) => {
    const primaryTextColor = 'text-black';
    const activeTextColor = 'text-[#C10016]';
    
    return (
        <TouchableOpacity 
            onPress={onPress}
            className={`
                group flex items-center p-2 transition duration-150 ease-in-out 
                hover:opacity-75 focus:outline-none 
                ${isActive ? activeTextColor : primaryTextColor}
            `}
        >
            {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#C10016] mr-2"></div>
            )}
            <span className={`
                text-sm md:text-base lg:text-lg font-sans
                ${isActive ? 'font-medium' : 'font-normal'} 
                whitespace-nowrap
            `}>
                {children}
            </span>
        </TouchableOpacity>
    );
};

const Navbar: React.FC = () => {
    const router = useRouter();
    const primaryRed = 'bg-[#C10016]';

    return (
        <header className="fixed top-0 left-0 right-0 w-full py-4 md:py-6 lg:py-8 px-4 md:px-6 lg:px-8 z-50 backdrop-blur-sm bg-white/10">
            <div className="relative flex items-center justify-between">
                
                {/* Logo */}
                <div className="flex-shrink-0 flex items-center">
                    <img 
                        src="/logo.png"
                        alt="FULFILX Logo"
                        className="w-32 h-8 md:w-40 md:h-10 lg:w-48 lg:h-12 object-contain"
                    />
                </div>

                {/* Centered Navigation */}
                <div className="flex-1 flex justify-center">
                    <nav className="hidden lg:flex space-x-6 xl:space-x-8 2xl:space-x-12">
                        <NavItem 
                            isActive={false} 
                            onPress={() => router.push('/')}
                        >
                            Home
                        </NavItem>
                        <NavItem onPress={() => router.push('/about-us')}>About Us</NavItem>
                        <NavItem>Services</NavItem>
                        <NavItem onPress={() => router.push ('/team')}>Team</NavItem>
                    </nav>
                </div>

                {/* CTA Button */}
                <div className="flex-shrink-0">
                    <TouchableOpacity 
                        onPress={() => router.push('/contact')}
                        className={`
                            flex flex-row items-center justify-center gap-2 
                            px-4 py-2 md:px-5 md:py-3 lg:px-6 lg:py-3
                            rounded-lg ${primaryRed} text-white 
                            text-sm md:text-base lg:text[18px]
                            transition duration-300 hover:brightness-110 
                            whitespace-nowrap font-helvetica
                        `}
                    >
                        <span>Let's Talk</span>
                        <img 
                            src="/arrow.svg"
                            alt="Arrow icon"
                            className="w-2 h-2 md:w-2 md:h-2 lg:w-3 lg:h-3 object-contain"
                        />
                    </TouchableOpacity>
                </div>

                {/* Mobile Menu Button */}
                <div className="lg:hidden ml-4">
                    <button 
                        type="button" 
                        className="p-2 rounded-md text-black hover:bg-gray-100 font-sans"
                        aria-label="Toggle menu"
                    >
                        <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;