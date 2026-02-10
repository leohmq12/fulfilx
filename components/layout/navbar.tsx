// components/layout/Navbar.tsx
import { useSingleContent } from '@/hooks/useContent';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

type SiteSettingsData = { nav_items?: Array<{ label?: string; href?: string }> };
const FALLBACK_NAV: SiteSettingsData = {
  nav_items: [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Locations', href: '/locations' },
    { label: 'Sectors', href: '/sectors' },
  ],
};

interface NavItemProps {
    children: React.ReactNode;
    isActive?: boolean;
    onPress?: () => void;
    mobile?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ children, isActive = false, onPress, mobile = false }) => {
    const primaryTextColor = 'text-black';
    const activeTextColor = 'text-[#C10016]';
    
    return (
        <TouchableOpacity 
            onPress={onPress}
            className={`
                group flex items-center p-2 transition duration-150 ease-in-out 
                hover:opacity-75 focus:outline-none 
                ${isActive ? activeTextColor : primaryTextColor}
                ${mobile ? 'w-full justify-center py-4 border-b border-gray-100' : ''}
            `}
        >
            {isActive && !mobile && (
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
    const { data: siteSettings } = useSingleContent<SiteSettingsData>('site_settings', FALLBACK_NAV);
    const navItems = siteSettings?.nav_items?.length ? siteSettings.nav_items : FALLBACK_NAV.nav_items!;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollbarGutter, setScrollbarGutter] = useState(0);
    const primaryRed = 'bg-[#C10016]';

    // Handle Scroll Background Color
    useEffect(() => {
        const onScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
            setIsScrolled(scrollTop > 20);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    // Handle Scrollbar Gutter Calculation
    useEffect(() => {
        const updateScrollbar = () => {
            // Calculates the difference between the window width and the content width
            const widthWithScrollbar = window.innerWidth;
            const widthWithoutScrollbar = document.documentElement.clientWidth;
            const gutter = widthWithScrollbar - widthWithoutScrollbar;
            setScrollbarGutter(Math.max(0, gutter));
        };

        updateScrollbar();

        window.addEventListener('resize', updateScrollbar, { passive: true });
        
        const resizeObserver = typeof ResizeObserver !== 'undefined'
            ? new ResizeObserver(() => updateScrollbar())
            : null;

        resizeObserver?.observe(document.documentElement);

        // Initial "pump" to ensure calculation is correct after hydration
        const raf = requestAnimationFrame(updateScrollbar);

        return () => {
            window.removeEventListener('resize', updateScrollbar);
            resizeObserver?.disconnect();
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 z-[100] transition-colors duration-300 pointer-events-none ${
                isScrolled ? 'bg-white shadow-sm' : 'bg-white/90'
            }`}
            style={{ 
                left: 0,
                width: `calc(99.2vw - ${scrollbarGutter}px)`
            }}
        >
            <div className="w-full px-2 sm:px-4 md:px-6 lg:px-8 2xl:px-16 py-4 md:py-6 lg:py-8 pointer-events-auto">
                <div className="relative flex items-center justify-between">
                
                {/* Logo */}
                <TouchableOpacity
                    onPress={() => {
                        setIsMenuOpen(false);
                        router.push('/');
                    }}
                    className="flex-shrink-0 flex items-center cursor-pointer"
                    accessibilityRole="link"
                >
                    <img
                        src="/logo.webp"
                        alt="FULFILX Logo"
                        className="w-32 h-8 md:w-40 md:h-10 lg:w-48 lg:h-12 object-contain"
                    />
                </TouchableOpacity>

                {/* Centered Navigation - from CMS site_settings.nav_items */}
                <div className="flex-1 flex justify-center">
                    <nav className="hidden lg:flex space-x-6 xl:space-x-8 2xl:space-x-12">
                        {navItems.map((item, i) => (
                          <NavItem
                            key={item.href ?? i}
                            isActive={false}
                            onPress={() => router.push((item.href || '/') as any)}
                          >
                            {item.label ?? 'Link'}
                          </NavItem>
                        ))}
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
                            text-sm md:text-base lg:text-[18px]
                            transition duration-300 hover:brightness-110 
                            whitespace-nowrap font-helvetica
                        `}
                    >
                        <span>Let&apos;s Talk</span>
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
                        className="p-2 rounded-md text-black hover:bg-gray-100 font-sans pointer-events-auto"
                        aria-label="Toggle menu"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay - from CMS site_settings.nav_items */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg border-t border-gray-100 flex flex-col items-center py-4 px-4 h-screen overflow-y-auto pb-20 pointer-events-auto">
                     {navItems.map((item, i) => (
                       <NavItem key={item.href ?? i} mobile onPress={() => { router.push((item.href || '/') as any); setIsMenuOpen(false); }}>{item.label ?? 'Link'}</NavItem>
                     ))}
                     <div className="mt-6 w-full flex justify-center">
                        <TouchableOpacity 
                            onPress={() => { router.push('/contact'); setIsMenuOpen(false); }}
                            className={`
                                flex flex-row items-center justify-center gap-2 
                                px-6 py-3 w-full max-w-xs
                                rounded-lg ${primaryRed} text-white 
                                text-base
                                transition duration-300 hover:brightness-110 
                                whitespace-nowrap font-helvetica
                            `}
                        >
                            <span>Let&apos;s Talk</span>
                            <img 
                                src="/arrow.svg"
                                alt="Arrow icon"
                                className="w-2 h-2 object-contain"
                            />
                        </TouchableOpacity>
                     </div>
                </div>
            )}
            </div>
        </header>
    );
};

export default Navbar;
