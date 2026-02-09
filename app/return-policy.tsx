import { CmsHtmlContent, isCmsHtml } from '@/components/cms-html-content';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { useSingleContent } from '@/hooks/useContent';
import { Stack, useRouter } from 'expo-router';
import { Image, ScrollView, Text, useWindowDimensions, View } from 'react-native';

type ReturnPolicySection = { title: string; content: string };
type ReturnPolicyData = { sections: ReturnPolicySection[] };

function parseContentBlocks(content: string): { type: 'para' | 'bullets'; lines: string[] }[] {
    if (!content || !content.trim()) return [];
    const blocks: { type: 'para' | 'bullets'; lines: string[] }[] = [];
    const rawBlocks = content.split(/\n\n+/);
    for (const block of rawBlocks) {
        const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
        if (lines.length === 0) continue;
        const allBullet = lines.every((l) => /^[•\-]\s*/.test(l) || l.startsWith('* '));
        blocks.push({
            type: allBullet ? 'bullets' : 'para',
            lines: allBullet ? lines.map((l) => l.replace(/^[•\-*]\s*/, '')) : lines,
        });
    }
    return blocks;
}

const FALLBACK_RETURN_POLICY: ReturnPolicyData = {
    sections: [
        { title: 'RETURN POLICY FOR PACKAGING SUPPLIES', content: '' },
        { title: '1. GENERAL TERMS', content: 'This Return Policy applies exclusively to the sale of packaging supplies (e.g., cardboard boxes, tape, void fill, mailers) sold by FULFIL.X ("we," "us," or "our") to the purchaser ("you" or "customer"). This policy does not apply to fulfilment services, storage fees, or shipping services, which are governed by the Master Services Agreement (MSA) between FULFIL.X and the purchaser. By purchasing packaging supplies from FULFIL.X, you acknowledge that you have read, understood, and agree to be bound by the terms of this Return Policy.' },
        { title: '2. RETURN ELIGIBILITY & TIME FRAME', content: 'a. Eligible Returns:\n\nWe accept returns of qualifying packaging supplies under the following conditions:\n\n• The return request is initiated within fourteen (14) calendar days from the documented delivery date.\n• All items are in new, unused, and resellable condition.\n• Items are in their original, sealed manufacturer packaging with all labels intact.\n• A valid proof of purchase (Order Number/Invoice) is provided.\n\nb. Non-Returnable Items:\n\nThe following items are FINAL SALE and not eligible for return, refund, or exchange under any circumstances:\n\n• Used, Opened, or Altered Goods: Any supplies that have been opened, partially used, cut, soiled, or otherwise removed from their original packaging.\n• Custom or Made-to-Order Products: Items manufactured to customer specifications, including but not limited to custom-printed boxes, branded tape, or bespoke packaging kits.\n• Products Damaged Post-Delivery: Items that sustained damage due to customer mishandling, improper storage, or accidents after delivery was completed.\n• Clearance or Final Sale Items: Any items explicitly marked as "Final Sale," "Non-Returnable," or sold on clearance at the time of purchase.' },
        { title: '3. DAMAGED OR DEFECTIVE SHIPMENTS', content: 'a. Carrier Insurance:\n\nAll orders are shipped with full carrier insurance to protect against loss or damage in transit.\n\nb. Claims Procedure:\n\nIf your order arrives with visible carrier damage or contains defective materials, you must:\n\n• Document: Take clear, timestamped photographs of the damaged/defective items and the external shipping carton.\n• Notify: Contact FULFIL.X Support at packaging@fulfilx.com within forty-eight (48) hours of delivery. The email subject must include "Damage Claim - [Your Order Number]".\n• Retain: Hold all damaged goods and original packaging for potential carrier inspection.\n\nc. Resolution:\n\nUpon verification and approval of the claim, we will, at our sole discretion:\n\n• Ship replacement items at no cost to you, or\n• Issue a full refund or account credit for the damaged/defective items.' },
        { title: '4. RETURN PROCESS & AUTHORIZATION', content: 'a. Initiation:\n\nTo initiate a return, contact our Support Team within the eligible period. An RMA (Return Merchandise Authorization) number is required for all returns. Returns shipped without an RMA will be refused and returned to sender at your expense.\n\nb. Return Shipping:\n\n• The customer is responsible for all costs associated with return shipping.\n• We strongly recommend using a trackable and insured shipping service. FULFIL.X is not liable for return shipments that are lost, damaged, or delayed in transit.\n• If the return is necessitated by our error (e.g., incorrect item shipped), we will provide a prepaid return label.\n\nc. Receipt & Inspection:\n\nAll returns are subject to inspection upon receipt at our warehouse. Refunds are issued only for items that pass our inspection and meet the criteria outlined in Section 2.' },
        { title: '5. REFUNDS', content: '1. Processing: Approved refunds will be issued to the original method of payment within five to ten (5-10) business days after we receive and approve the return.\n\n2. Refund Amount:\n\n• Refunds are issued for the product cost of the returned items only.\n• Original shipping and handling fees are non-refundable.\n• Any return shipping fees paid by the customer are non-refundable, except in cases of our error.' },
        { title: '6. EXCHANGES', content: 'We do not process direct exchanges. To receive a different item, you must follow the standard return process to obtain a refund and then place a new order for the desired product.' },
        { title: '7. CONTACT & SUPPORT', content: 'For all return-related inquiries:\nEmail: packaging@fulfilx.com\nSupport Hours: Monday–Friday, 9:00 AM – 5:00 PM Eastern Time\nPlease include your Order Number in all correspondence.' },
        { title: '8. POLICY MODIFICATIONS', content: 'FULFIL.X reserves the right to amend, modify, or update this Return Policy at any time without prior notice. The policy in effect at the time of your purchase will govern that transaction. It is your responsibility to review this policy periodically for changes.' },
    ],
};

export default function ReturnPolicyScreen() {
    const { width } = useWindowDimensions();
    const isMobile = width < 1024;
    const router = useRouter();
    const { data } = useSingleContent<ReturnPolicyData>('return_policy', FALLBACK_RETURN_POLICY);
    const sections = data?.sections ?? [];

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

                <View className="relative z-20 bg-white pt-10 lg:pt-32 px-4 pb-10">
                    <View className="w-full lg:max-w-[1296px] mx-auto">
                        {sections.map((section, idx) => (
                            <View key={idx}>
                                {section.title ? (
                                    <Text
                                        className={
                                            idx === 0
                                                ? 'font-helvetica font-bold text-2xl lg:text-[32px] lg:leading-[42px] text-black text-left mb-8'
                                                : 'font-helvetica font-bold text-xl lg:text-[24px] lg:leading-[32px] text-black text-left mb-4 mt-6'
                                        }
                                    >
                                        {section.title}
                                    </Text>
                                ) : null}
                                {section.content
                                    ? isCmsHtml(section.content)
                                        ? (
                                            <CmsHtmlContent html={section.content} className="mb-4" />
                                        )
                                        : parseContentBlocks(section.content).map((block, bi) =>
                                            block.type === 'bullets' ? (
                                                <View key={bi} className="mb-4 pl-4">
                                                    {block.lines.map((line, li) => (
                                                        <Text
                                                            key={li}
                                                            className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-2"
                                                        >
                                                            • {line}
                                                        </Text>
                                                    ))}
                                                </View>
                                            ) : (
                                                <Text
                                                    key={bi}
                                                    className="font-helvetica font-normal text-base lg:text-[22px] lg:leading-[44px] text-black text-left mb-4"
                                                >
                                                    {block.lines.join('\n')}
                                                </Text>
                                            )
                                        )
                                    : null}
                            </View>
                        ))}

                    </View>
                </View>

                <Footer />
            </ScrollView>
        </>
    );
};
