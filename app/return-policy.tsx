import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native';

export default function ReturnPolicyScreen() {
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
            >
                {/* Hero Section */}
                <View className="relative">
                    {/* PNG Background */}
                    <View className="absolute inset-0 z-0 h-[calc(100%-100px)]">
                        <Image 
                            source={{ uri: "/bg.webp" }}
                            alt="Background pattern"
                            className="w-full h-full lg:h-[600px]"
                            resizeMode="cover"
                        />
                    </View>

                    {/* Hero Content */}
                    <View className="relative z-10 flex items-center justify-center pt-20 lg:pt-60 px-4">
                        {/* Main Title */}
                        <Text className="font-helvetica font-bold text-3xl lg:text-[84px] lg:leading-[84px] text-black text-center mb-6">
                            Returns Policy
                        </Text>
                        
                        {/* Breadcrumb Navigation */}
                        <View className="flex flex-row items-center justify-center mt-2 flex-wrap">
                            <Text className="font-helvetica font-normal text-sm lg:text-[20px] lg:leading-[40px] text-black">
                                Home
                            </Text>
                            <View className="w-1 h-1 bg-black rounded-full mx-2 lg:mx-4" />
                            <Text className="font-helvetica font-medium text-sm lg:text-[20px] lg:leading-[40px] text-[#C10016]">
                                Returns Policy
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Text Content Section */}
                <View className="relative z-20 bg-white pt-10 lg:pt-32 px-4 pb-10">
                    <View className="w-full lg:max-w-[1296px] mx-auto">
                        <Text className="font-helvetica font-bold text-2xl lg:text-[32px] lg:leading-[42px] text-black text-left mb-8">
                            RETURN POLICY FOR PACKAGING SUPPLIES
                        </Text>

                        {/* 1. GENERAL TERMS */}
                        <Text className="font-helvetica font-bold text-xl lg:text-[24px] lg:leading-[32px] text-black text-left mb-4 mt-6">
                            1. GENERAL TERMS
                        </Text>
                        <Text className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-6">
                            This Return Policy applies exclusively to the sale of packaging supplies (e.g., cardboard boxes, tape, void fill, mailers) sold by FULFIL.X (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) to the purchaser (&quot;you&quot; or &quot;customer&quot;). This policy does not apply to fulfilment services, storage fees, or shipping services, which are governed by the Master Services Agreement (MSA) between FULFIL.X and the purchaser. By purchasing packaging supplies from FULFIL.X, you acknowledge that you have read, understood, and agree to be bound by the terms of this Return Policy.
                        </Text>

                        {/* 2. RETURN ELIGIBILITY & TIME FRAME */}
                        <Text className="font-helvetica font-bold text-xl lg:text-[28px] lg:leading-[36px] text-black text-left mb-4 mt-6">
                            2. RETURN ELIGIBILITY & TIME FRAME
                        </Text>
                        
                        <Text className="font-helvetica font-bold text-lg lg:text-[24px] lg:leading-[32px] text-black text-left mb-2">
                            a. Eligible Returns:
                        </Text>
                        <Text className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-4">
                            We accept returns of qualifying packaging supplies under the following conditions:
                        </Text>
                        <View className="mb-4 pl-4">
                            {[
                                "The return request is initiated within fourteen (14) calendar days from the documented delivery date.",
                                "All items are in new, unused, and resellable condition.",
                                "Items are in their original, sealed manufacturer packaging with all labels intact.",
                                "A valid proof of purchase (Order Number/Invoice) is provided."
                            ].map((item, index) => (
                                <Text key={index} className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-2">
                                    • {item}
                                </Text>
                            ))}
                        </View>

                        <Text className="font-helvetica font-bold text-lg lg:text-[24px] lg:leading-[32px] text-black text-left mb-2 mt-4">
                            b. Non-Returnable Items:
                        </Text>
                        <Text className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-4">
                            The following items are FINAL SALE and not eligible for return, refund, or exchange under any circumstances:
                        </Text>
                        <View className="mb-6 pl-4">
                            {[
                                "Used, Opened, or Altered Goods: Any supplies that have been opened, partially used, cut, soiled, or otherwise removed from their original packaging.",
                                "Custom or Made-to-Order Products: Items manufactured to customer specifications, including but not limited to custom-printed boxes, branded tape, or bespoke packaging kits.",
                                "Products Damaged Post-Delivery: Items that sustained damage due to customer mishandling, improper storage, or accidents after delivery was completed.",
                                "Clearance or Final Sale Items: Any items explicitly marked as \"Final Sale,\" \"Non-Returnable,\" or sold on clearance at the time of purchase."
                            ].map((item, index) => (
                                <Text key={index} className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-2">
                                    • {item}
                                </Text>
                            ))}
                        </View>

                        {/* 3. DAMAGED OR DEFECTIVE SHIPMENTS */}
                        <Text className="font-helvetica font-bold text-xl lg:text-[24px] lg:leading-[32px] text-black text-left mb-4 mt-6">
                            3. DAMAGED OR DEFECTIVE SHIPMENTS
                        </Text>

                        <Text className="font-helvetica font-bold text-lg lg:text-[22px] lg:leading-[32px] text-black text-left mb-2">
                            a. Carrier Insurance:
                        </Text>
                        <Text className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-4">
                            All orders are shipped with full carrier insurance to protect against loss or damage in transit.
                        </Text>

                        <Text className="font-helvetica font-bold text-lg lg:text-[22px] lg:leading-[32px] text-black text-left mb-2">
                            b. Claims Procedure:
                        </Text>
                        <Text className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-4">
                            If your order arrives with visible carrier damage or contains defective materials, you must:
                        </Text>
                        <View className="mb-4 pl-4">
                            {[
                                "Document: Take clear, timestamped photographs of the damaged/defective items and the external shipping carton.",
                                "Notify: Contact FULFIL.X Support at packaging@fulfilx.com within forty-eight (48) hours of delivery. The email subject must include \"Damage Claim - [Your Order Number]\".",
                                "Retain: Hold all damaged goods and original packaging for potential carrier inspection."
                            ].map((item, index) => (
                                <Text key={index} className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-2">
                                    • {item}
                                </Text>
                            ))}
                        </View>

                        <Text className="font-helvetica font-bold text-lg lg:text-[24px] lg:leading-[32px] text-black text-left mb-2">
                            c. Resolution:
                        </Text>
                        <Text className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-4">
                            Upon verification and approval of the claim, we will, at our sole discretion:
                        </Text>
                        <View className="mb-6 pl-4">
                            {[
                                "Ship replacement items at no cost to you, or",
                                "Issue a full refund or account credit for the damaged/defective items."
                            ].map((item, index) => (
                                <Text key={index} className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-2">
                                    • {item}
                                </Text>
                            ))}
                        </View>

                        {/* 4. RETURN PROCESS & AUTHORIZATION */}
                        <Text className="font-helvetica font-bold text-xl lg:text-[28px] lg:leading-[36px] text-black text-left mb-4 mt-6">
                            4. RETURN PROCESS & AUTHORIZATION
                        </Text>

                        <Text className="font-helvetica font-bold text-lg lg:text-[24px] lg:leading-[32px] text-black text-left mb-2">
                            a. Initiation:
                        </Text>
                        <Text className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-4">
                            To initiate a return, contact our Support Team within the eligible period. An RMA (Return Merchandise Authorization) number is required for all returns. Returns shipped without an RMA will be refused and returned to sender at your expense.
                        </Text>

                        <Text className="font-helvetica font-bold text-lg lg:text-[22px] lg:leading-[32px] text-black text-left mb-2">
                            b. Return Shipping:
                        </Text>
                        <View className="mb-4 pl-4">
                            {[
                                "The customer is responsible for all costs associated with return shipping.",
                                "We strongly recommend using a trackable and insured shipping service. FULFIL.X is not liable for return shipments that are lost, damaged, or delayed in transit.",
                                "If the return is necessitated by our error (e.g., incorrect item shipped), we will provide a prepaid return label."
                            ].map((item, index) => (
                                <Text key={index} className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-2">
                                    • {item}
                                </Text>
                            ))}
                        </View>

                        <Text className="font-helvetica font-bold text-lg lg:text-[22px] lg:leading-[32px] text-black text-left mb-2">
                            c. Receipt & Inspection:
                        </Text>
                        <Text className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-6">
                            All returns are subject to inspection upon receipt at our warehouse. Refunds are issued only for items that pass our inspection and meet the criteria outlined in Section 2.
                        </Text>

                        {/* 5. REFUNDS */}
                        <Text className="font-helvetica font-bold text-xl lg:text-[28px] lg:leading-[36px] text-black text-left mb-4 mt-6">
                            5. REFUNDS
                        </Text>
                        <Text className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-4">
                            1. Processing: Approved refunds will be issued to the original method of payment within five to ten (5-10) business days after we receive and approve the return.
                        </Text>
                        <Text className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-2">
                            2. Refund Amount:
                        </Text>
                        <View className="mb-6 pl-4">
                            {[
                                "Refunds are issued for the product cost of the returned items only.",
                                "Original shipping and handling fees are non-refundable.",
                                "Any return shipping fees paid by the customer are non-refundable, except in cases of our error."
                            ].map((item, index) => (
                                <Text key={index} className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-2">
                                    • {item}
                                </Text>
                            ))}
                        </View>

                        {/* 6. EXCHANGES */}
                        <Text className="font-helvetica font-bold text-xl lg:text-[28px] lg:leading-[36px] text-black text-left mb-4 mt-6">
                            6. EXCHANGES
                        </Text>
                        <Text className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-6">
                            We do not process direct exchanges. To receive a different item, you must follow the standard return process to obtain a refund and then place a new order for the desired product.
                        </Text>

                        {/* 7. CONTACT & SUPPORT */}
                        <Text className="font-helvetica font-bold text-xl lg:text-[24px] lg:leading-[32px] text-black text-left mb-4 mt-6">
                            7. CONTACT & SUPPORT
                        </Text>
                        <Text className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-6">
                            For all return-related inquiries:{'\n'}
                            Email: packaging@fulfilx.com{'\n'}
                            Support Hours: Monday–Friday, 9:00 AM – 5:00 PM Eastern Time{'\n'}
                            Please include your Order Number in all correspondence.
                        </Text>

                        {/* 8. POLICY MODIFICATIONS */}
                        <Text className="font-helvetica font-bold text-xl lg:text-[28px] lg:leading-[36px] text-black text-left mb-4 mt-6">
                            8. POLICY MODIFICATIONS
                        </Text>
                        <Text className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-6">
                            FULFIL.X reserves the right to amend, modify, or update this Return Policy at any time without prior notice. The policy in effect at the time of your purchase will govern that transaction. It is your responsibility to review this policy periodically for changes.
                        </Text>

                    </View>
                </View>

                <Footer />
            </ScrollView>
        </>
    );
};
