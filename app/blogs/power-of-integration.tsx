import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { ScrollView, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

export default function LuxuryScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 1024;
    const router = useRouter();

    return (
        <>
            <Stack.Screen 
                options={{ 
                    headerShown: false,
                    header: () => null
                }} 
            />
      
            <Navbar />
      
            {/* Main Scrollable Content */}
            <ScrollView 
                className="flex-1 bg-white"
                showsVerticalScrollIndicator={false}
            >
                {/* Hero Section */}
                <View className="relative">
                    {/* PNG Background */}
                    <View className="absolute inset-0 z-0 h-[calc(100%-100px)]">
                        <img 
                            src="/bg.png"
                            alt="Background pattern"
                            className="w-full h-full lg:w-[1920px] lg:h-[600px] object-cover"
                        />
                    </View>

                    {/* Hero Content */}
                    <View className="relative z-10 flex items-center justify-center pt-32 lg:pt-60 px-4">
                        {/* Main Title */}
                        <Text className="font-helvetica font-bold text-4xl lg:text-[84px] lg:leading-[84px] text-black text-center mb-8">
                            The Power of Integration
                        </Text>
            
                        {/* Breadcrumb Navigation */}
                        <View className="flex flex-row flex-wrap items-center justify-center mt-4">
                            <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                                Home
                            </Text>
                            <View className="w-1 h-1 bg-black rounded-full mx-4" />
                            <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px]">
                                Blogs
                            </Text>
                            <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
                            <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                                The Power of Integration
                            </Text>
                        </View>

                        {/* LuxBanner Image - Embedded in Hero Section */}
                        <View className="w-full flex items-center justify-center mt-8 lg:mt-16">
                            <View 
                                className="w-full h-[250px] lg:w-[1296px] lg:h-[650px] rounded-[24px] lg:rounded-[34px] bg-cover bg-center"
                                style={{ 
                                    backgroundImage: 'url(/poi.png)',
                                    backdropFilter: 'blur(12.5px)'
                                }}
                            />
                        </View>
                    </View>
                </View>

                {/* Text Content Section - Align with image left edge */}
                <View className="relative z-20 bg-white pt-16 lg:pt-32 px-4">
                    {/* Heading */}
                    <View className="w-full max-w-[1296px] mx-auto mb-8">
                        <Text className="font-helvetica font-bold text-3xl lg:text-[60px] lg:leading-[80px] text-black text-left">
                            The Power of Integration: Streamlining Your Online Business with <Text className="text-[#C10016]">FULFIL.X.</Text>
                        </Text>
                    </View>

                    {/* Paragraph */}
                    <View className="w-full max-w-[1296px] mx-auto">
                        <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black text-left">
                            In today’s digital age, the success of an online business hinges not just on the quality of its products but also on the efficiency of its operations. FULFIL.X, a leading third-party logistics (3PL) provider, offers powerful integration capabilities with online stores, bridging the gap between e-commerce platforms and logistics services. This blog explores the transformative impact of FULFIL.X’s seamless integration on inventory management, order processing, and ultimately, customer satisfaction.
                        </Text>
                    </View>
                </View>

                {/* Bespoke Solutions Section - Two Columns */}
                <View className="relative z-20 bg-white py-12 lg:py-20">
                    <View className="max-w-[1393px] mx-auto px-4">
    
                        {/* Badge */}
                        <View className="flex flex-row justify-center items-center px-8 lg:px-11 py-2 lg:py-4 bg-[#C10016] bg-opacity-10 rounded-[120px] w-full max-w-[320px] mb-6 lg:ml-[648px] mx-auto lg:mx-0">
                            <Text className="font-helvetica font-medium text-sm lg:text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
                                Bespoke Solutions
                            </Text>
                        </View>

                        <View className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
      
                            {/* Left Column - Image */}
                            <View className="w-full lg:w-[600px] flex-shrink-0">
                                <View 
                                    className="w-full h-[400px] lg:w-[600px] lg:h-[760px] rounded-[30px] bg-cover bg-center"
                                    style={{ 
                                        backgroundImage: 'url(/heels.png)',
                                        backdropFilter: 'blur(12.5px)'
                                    }}
                                />
                            </View>

                            {/* Right Column - Content */}
                            <View className="flex-1 w-full lg:max-w-[709px]">
        
                                {/* Main Title */}
                                <Text className="font-helvetica font-bold text-3xl lg:text-[54px] lg:leading-[68px] tracking-tight text-black mb-6">
                                    Bespoke Fulfillment Solutions for <Text className="text-[#C10016]">Luxury Brands</Text>
                                </Text>

                                {/* Description */}
                                <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-12">
                                    FULFILX offers tailored fulfillment services designed to meet the unique requirements of luxury brands. We recognize that high-value items require white-glove handling, secure storage, and premium packaging to maintain their integrity and allure.
                                </Text>

                                {/* Features List */}
                                <View className="">
          
                                    {/* Feature 1 */}
                                    <View className="flex flex-row items-start gap-4 mb-12">
                                        {/* Check Icon */}
                                        <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
                                            <img src="/check.svg" alt="check" className="w-[19px] h-[16px]"/>
                                        </View>
                                        {/* Feature Text */}
                                        <View className="flex-1">
                                            <Text className="font-helvetica font-bold text-lg lg:text-[20px] leading-[38px] text-black">
                                                Secure, Climate-Controlled Storage:
                                            </Text>
                                            <Text className="font-helvetica font-normal text-lg lg:text-[20px] leading-[40px] text-black">
                                                Luxury items often demand specific storage conditions to preserve their quality and craftsmanship. FULFILX&apos;s secure, climate-controlled warehousing ensures that your products are protected from environmental factors, maintaining their pristine condition until they reach your clients.
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Feature 2 */}
                                    <View className="flex flex-row items-start gap-4">
                                        {/* Check Icon */}
                                        <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
                                            <img src="/check.svg" alt="check" className="w-[19px] h-[16px]"/>
                                        </View>
                                        {/* Feature Text */}
                                        <View className="flex-1">
                                            <Text className="font-helvetica font-bold text-lg lg:text-[20px] leading-[38px] text-black">
                                                White-Glove Handling & Packaging:
                                            </Text>
                                            <Text className="font-helvetica font-normal text-lg lg:text-[20px] leading-[40px] text-black">
                                                Every aspect of our order fulfillment process is handled with the utmost care and attention to detail. FULFILX provides white-glove handling and utilizes premium packaging materials that reflect the high standards of your luxury brand, ensuring that the unboxing experience is as luxurious as the product itself.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Global Reach Section - Two Columns */}
                <View className="relative z-20 bg-white py-12 lg:py-20">
                    {/* Background */}
                    <View className="absolute inset-0 z-0">
                        <img 
                            src="/bg.png"
                            alt="Background pattern"
                            className="w-full h-full object-cover"
                        />
                    </View>
                    <View className="max-w-[1393px] mx-auto px-4">
    
                        {/* Badge */}
                        <View className="flex flex-row justify-center items-center px-8 lg:px-11 py-2 lg:py-4 bg-[#C10016] bg-opacity-10 rounded-[120px] w-full max-w-[320px] mb-6 ml-0">
                            <Text className="font-helvetica font-medium text-sm lg:text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
                                Global Reach
                            </Text>
                        </View>

                        <View className="flex flex-col-reverse lg:flex-row items-start gap-8 lg:gap-16">
      
                            {/* Left Column - Content */}
                            <View className="flex-1 w-full lg:max-w-[709px]">
        
                                {/* Main Title */}
                                <Text className="font-helvetica font-bold text-3xl lg:text-[54px] lg:leading-[68px] tracking-tight text-black mb-6">
                                    Global Reach with <Text className="text-[#C10016]">Precision</Text> and <Text className="text-[#C10016]">Care</Text>
                                </Text>

                                {/* Description */}
                                <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-12">
                                    To cater to a discerning global clientele, FULFILX utilizes an extensive network of courier services, chosen for their reliability and ability to deliver high-value items with care. Our logistics strategies are crafted to offer flexible, secure delivery options for both international and domestic clients.
                                </Text>

                                {/* Features List */}
                                <View className="">
          
                                    {/* Feature 1 */}
                                    <View className="flex flex-row items-start gap-4 mb-12">
                                        {/* Check Icon */}
                                        <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
                                            <img src="/check.svg" alt="check" className="w-[19px] h-[16px]"/>
                                        </View>
                                        {/* Feature Text */}
                                        <View className="flex-1">
                                            <Text className="font-helvetica font-bold text-lg lg:text-[20px] leading-[38px] text-black">
                                                Tailored Delivery Experiences:
                                            </Text>
                                            <Text className="font-helvetica font-normal text-lg lg:text-[20px] leading-[40px] text-black">
                                                Recognizing the importance of personalization in luxury service, FULFILX offers customizable delivery options, including scheduled deliveries and personal hand-offs, to create an exclusive experience for your clients. This attention to detail reinforces the premium nature of your brand and fosters lasting customer loyalty.
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Feature 2 */}
                                    <View className="flex flex-row items-start gap-4">
                                        {/* Check Icon */}
                                        <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
                                            <img src="/check.svg" alt="check" className="w-[19px] h-[16px]"/>
                                        </View>
                                        {/* Feature Text */}
                                        <View className="flex-1">
                                            <Text className="font-helvetica font-bold text-lg lg:text-[20px] leading-[38px] text-black">
                                                Competitive, Transparent Shipping Solutions:
                                            </Text>
                                            <Text className="font-helvetica font-normal text-lg lg:text-[20px] leading-[40px] text-black">
                                                Despite the premium service, FULFILX ensures that shipping costs remain competitive and transparent, allowing luxury brands to offer their clients clear, upfront pricing without hidden fees. This transparency is crucial in maintaining the trust and confidence of luxury shoppers.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                            {/* Right Column - Image */}
                            <View className="w-full lg:w-[600px] flex-shrink-0">
                                <View 
                                    className="w-full h-[400px] lg:w-[600px] lg:h-[760px] rounded-[30px] bg-cover bg-center"
                                    style={{ 
                                        backgroundImage: 'url(/shipper.png)',
                                        backdropFilter: 'blur(12.5px)'
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </View>

                {/* Seamless Integration Section - Image left, Content right */}
                <View className="relative z-20 bg-white py-12 lg:py-20">
                    <View className="max-w-[1393px] mx-auto px-4">
    
                        {/* Badge */}
                        <View className="flex flex-row justify-center items-center px-8 lg:px-11 py-2 lg:py-4 bg-[#C10016] bg-opacity-10 rounded-[120px] w-full max-w-[320px] mb-6 lg:ml-[648px] mx-auto lg:mx-0">
                            <Text className="font-helvetica font-medium text-sm lg:text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
                                Bespoke Solutions
                            </Text>
                        </View>

                        <View className="flex flex-col lg:flex-row items-start gap-8 lg:gap-16">
      
                            {/* Image - LEFT side */}
                            <View className="w-full lg:w-[600px] flex-shrink-0">
                                <View 
                                    className="w-full h-[400px] lg:w-[600px] lg:h-[760px] rounded-[30px] bg-cover bg-center"
                                    style={{ 
                                        backgroundImage: 'url(/laptop.png)',
                                        backdropFilter: 'blur(12.5px)'
                                    }}
                                />
                            </View>

                            {/* Content - RIGHT side */}
                            <View className="flex-1 w-full lg:max-w-[709px]">
        
                                {/* Main Title */}
                                <Text className="font-helvetica font-bold text-3xl lg:text-[54px] lg:leading-[68px] tracking-tight text-black mb-6">
                                    Seamless E-commerce Platform <Text className="text-[#C10016]">Integrations</Text>
                                </Text>

                                {/* Description */}
                                <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black mb-12">
                                    In the digital age, a seamless online shopping experience is paramount. FULFILX integrates effortlessly with leading e-commerce platforms, automating the fulfillment process and ensuring that your luxury goods are managed with the same level of sophistication and precision that defines your brand.
                                </Text>

                                {/* Features List */}
                                <View className="">
          
                                    {/* Feature 1 */}
                                    <View className="flex flex-row items-start gap-4 mb-12">
                                        {/* Check Icon */}
                                        <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
                                            <img src="/check.svg" alt="check" className="w-[19px] h-[16px]"/>
                                        </View>
                                        {/* Feature Text */}
                                        <View className="flex-1">
                                            <Text className="font-helvetica font-bold text-lg lg:text-[20px] leading-[38px] text-black">
                                                Real Time Inventory & Order Management:
                                            </Text>
                                            <Text className="font-helvetica font-normal text-lg lg:text-[20px] leading-[40px] text-black">
                                                Our integrations provide luxury brands with real-time insights into inventory levels and order statuses, enabling effective management of your online presence. This system ensures that your stock is accurately reflected on your website, avoiding over-selling and under-stocking scenarios.
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Feature 2 */}
                                    <View className="flex flex-row items-start gap-4">
                                        {/* Check Icon */}
                                        <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
                                            <img src="/check.svg" alt="check" className="w-[19px] h-[16px]"/>
                                        </View>
                                        {/* Feature Text */}
                                        <View className="flex-1">
                                            <Text className="font-helvetica font-bold text-lg lg:text-[20px] leading-[38px] text-black">
                                                Enhancing the Luxury Experience Online:
                                            </Text>
                                            <Text className="font-helvetica font-normal text-lg lg:text-[20px] leading-[40px] text-black">
                                                By streamlining the logistics behind your e-commerce operations, FULFILX not only enhances operational efficiency but also elevates the overall customer experience. From personalized shopping journeys to impeccable delivery, we ensure that every interaction with your brand online is an extension of its luxury identity.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Conclusion Section */}
                <View className="relative z-20 bg-white py-12 lg:py-20">
                    {/* Background */}
                    <View className="absolute inset-0 z-0">
                        <img 
                            src="/bg.png"
                            alt="Background pattern"
                            className="w-full h-full object-cover"
                        />
                    </View>
                    <View className="w-full max-w-[1296px] mx-auto px-4">
                        {/* Elevating Customer Experience Section */}
                        <View className="relative z-20 py-12 lg:py-20">
                            <View className="max-w-[1381px] mx-auto">
    
                                {/* Main Title */}
                                <View className="w-full max-w-[660px] mb-8">
                                    <Text className="font-helvetica font-bold text-3xl lg:text-[40px] lg:leading-[54px] tracking-tight text-black text-left">
                                        Elevating the Customer <Text className="text-[#C10016]">Experience</Text>
                                    </Text>
                                </View>

                                {/* Description */}
                                <View className="w-full max-w-[1391px] mb-12">
                                    <Text className="font-helvetica font-normal text-lg lg:text-[20px] lg:leading-[44px] text-black text-left">
                                        At the heart of FULFILX&apos;s integration capabilities is the commitment to enhancing the customer experience. By ensuring that inventory management and order processing are efficient and error-free, FULFILX helps businesses deliver on their promises to customers.
                                    </Text>
                                </View>

                                {/* Features List */}
                                <View className="space-y-6">
      
                                    {/* Feature 1 */}
                                    <View className="flex flex-row items-start gap-4">
                                        {/* Check Icon */}
                                        <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
                                            <img src="/check.svg" alt="check" className="w-[19px] h-[16px]"/>
                                        </View>
                                        {/* Feature Text */}
                                        <View className="flex-1">
                                            <Text className="font-helvetica font-bold text-lg lg:text-[20px] leading-[38px] text-black">
                                                Transparency and Tracking:
                                            </Text>
                                            <Text className="font-helvetica font-normal text-lg lg:text-[20px] leading-[38px] text-black">
                                                Customers receive timely updates and tracking information for their orders, fostering transparency and trust.
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Feature 2 */}
                                    <View className="flex flex-row items-start gap-4">
                                        {/* Check Icon */}
                                        <View className="w-5 h-5 flex items-center justify-center mt-2 flex-shrink-0">
                                            <img src="/check.svg" alt="check" className="w-[19px] h-[16px]"/>
                                        </View>
                                        {/* Feature Text */}
                                        <View className="flex-1">
                                            <Text className="font-helvetica font-bold text-lg lg:text-[20px] leading-[38px] text-black">
                                                Reduced Errors and Returns:
                                            </Text>
                                            <Text className="font-helvetica font-normal text-lg lg:text-[20px] leading-[38px] text-black">
                                                The accuracy of the FULFILX system means fewer errors in shipments, leading to fewer returns and higher customer satisfaction.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        {/* Heading */}
                        <View className="w-full max-w-[1296px] mx-auto mb-8">
                            <Text className="font-helvetica font-bold text-3xl lg:text-[60px] lg:leading-[80px] text-black text-left">
                                Conclusion
                            </Text>
                        </View>

                        {/* Paragraph */}
                        <View className="w-full max-w-[1296px] mx-auto">
                            <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black text-left">
                                In the luxury fulfillment domain, where expectations are unparalleled, FULFILX offers a service that goes beyond mere logistics. We provide an elegant, efficient, and exclusive fulfillment solution that mirrors the exceptional quality of your luxury goods. Partnering with FULFILX means entrusting your brand’s reputation to a team that understands the intricacies of luxury service, ensuring that your products are not just delivered but presented in a manner befitting their stature.      
                            </Text>
                        </View>
                        <View className="w-full max-w-[1296px] mx-auto pt-10">
                            <Text className="font-helvetica font-normal text-lg lg:text-[22px] lg:leading-[44px] text-black text-left">
                                Elevate your luxury brand with FULFILX’s fulfillment services and offer your clients an unrivaled experience that begins the moment they place an order.      
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Rest of your content sections below */}
                <View className="relative w-full">
                    {/* Two Column Layout */}
                    <View className="flex flex-col lg:flex-row">
            
                        {/* Left Section - White Background */}
                        <View className="w-full lg:w-1/2 bg-white relative min-h-[520px] flex items-center justify-center py-12 lg:py-0">
                            <img src="/bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
                            {/* Left Section Content - Centered */}
                            <View className="max-w-[740px] w-full text-center px-8 relative z-10">
                
                                {/* Heading */}
                                <Text className="font-helvetica font-bold text-3xl lg:text-[42px] lg:leading-[54px] tracking-tight text-black mb-8">
                                    Our Accomplishments
                                </Text>

                                {/* Red Line - Centered */}
                                <View className="w-[100px] h-[1px] bg-[#C10016] mx-auto mb-12" />

                                {/* Image Grid - Centered */}
                                <View className="flex flex-row flex-wrap justify-center gap-8 lg:gap-16 mb-12">
                                    <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award1.png)'}} />
                                    <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award2.png)'}} />
                                    <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award3.png)'}} />
                                    <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award4.png)'}} />
                                    <View className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px] bg-cover bg-center" style={{backgroundImage: 'url(/award5.png)'}} />
                                </View>
                            </View>
                        </View>

                        {/* Right Section - Red Background */}
                        <View className="w-full lg:w-1/2 bg-[#DA192F] relative min-h-[520px] flex items-center justify-center py-12 lg:py-0">
                            {/* Right Section Content - Centered */}
                            <View className="max-w-[650px] w-full text-center px-8">
                
                                {/* Heading */}
                                <Text className="font-helvetica font-bold text-3xl lg:text-[42px] lg:leading-[54px] tracking-tight text-white mb-8">
                                    Advanced Tech Solutions
                                </Text>

                                {/* White Line - Centered */}
                                <View className="w-[100px] h-[1px] bg-white mx-auto mb-12" />

                                {/* Subtitle - Centered */}
                                <Text className="font-helvetica font-normal text-xl lg:text-[24px] lg:leading-[44px] text-white mb-12">
                                    Exceptional Quality Service
                                </Text>

                                {/* CTA Button - Centered */}
                                <TouchableOpacity 
                                    onPress={() => router.push('/contact')}
                                    className="border border-white rounded-[6px] flex flex-row items-center justify-center gap-[10px] px-8 py-4 mx-auto"
                                >
                                    <Text className="text-white font-bold text-[18px] leading-[36px]">Let&apos;s Talk</Text>
                                    <img src="/arrow.svg" alt="arrow" className="w-4 h-4 object-contain" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
        
                <Footer/>
            </ScrollView>
        </>
    );
}
