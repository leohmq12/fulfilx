// app/contact.tsx
import AwardsAccreditations from '@/components/layout/awards-accreditations';
import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, useWindowDimensions, View } from 'react-native';
  
const CONTACT_ENDPOINT =
  process.env.NODE_ENV === 'development' ? '/api/contact' : '/api/contact.php';


function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function ContactScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);
  const primaryRed = 'bg-[#C10016]';
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [brandName, setBrandName] = useState('');
  const [phone, setPhone] = useState('');
  const [idealTime, setIdealTime] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');

  const submitContact = async () => {
    if (submitStatus === 'loading') return;

    const trimmedFirstName = firstName.trim();
    const trimmedBrandName = brandName.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedFirstName) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter your name.');
      return;
    }
    if (!trimmedBrandName) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter your brand name.');
      return;
    }
    if (!trimmedPhone) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter your contact number.');
      return;
    }
    if (!idealTime) {
      setSubmitStatus('error');
      setSubmitMessage('Please select an ideal time for call back.');
      return;
    }
    if (!trimmedEmail) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter your email address.');
      return;
    }
    if (!isValidEmail(trimmedEmail)) {
      setSubmitStatus('error');
      setSubmitMessage('Please enter a valid email address.');
      return;
    }
    if (!agreedToPolicy) {
      setSubmitStatus('error');
      setSubmitMessage('Please agree to the privacy policy.');
      return;
    }

    setSubmitStatus('loading');
    setSubmitMessage('');
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: trimmedEmail,
          firstName: trimmedFirstName,
          lastName: lastName.trim(),
          phone: trimmedPhone,
          company: trimmedBrandName,
          comments: `Ideal time for call back: ${idealTime}`,
          message: trimmedMessage,
          source: 'contact-page',
        }),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(text || `Request failed (${res.status})`);
      }

      const json = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string };
      if (!json?.ok) {
        throw new Error(json?.error || 'Request failed');
      }

      setSubmitStatus('success');
      setSubmitMessage('Your message has been sent successfully.');
      setFirstName('');
      setLastName('');
      setBrandName('');
      setPhone('');
      setIdealTime('');
      setEmail('');
      setMessage('');
      setAgreedToPolicy(false);
    } catch {
      setSubmitStatus('error');
      setSubmitMessage('Something went wrong. Please try again.');
    }
  };
  
  return (
    <>
      <Stack.Screen 
        options={{ 
          title: 'Contact Us',
          headerShown: false,
        }} 
      />
      
      <Navbar />
      
      {/* Main Scrollable Content */}
      <ScrollView 
        className="flex-1 bg-white"
      >
        {/* Hero Section */}
        <View className="relative min-h-[50vh] lg:min-h-[85vh]">
          {/* PNG Background */}
          <View className="absolute inset-0 z-0">
            <img 
              src="/bg.webp"
              alt="Background pattern"
              className="w-full h-full object-cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-[50vh] lg:min-h-[85vh] flex items-center justify-center pb-16">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              Contact Us
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Contact Us
              </Text>
            </View>
          </View>
        </View>

        {/* Get in Touch Section */}
        <View className="w-full bg-white transform -translate-y-20 lg:-translate-y-48 -mb-20 lg:-mb-48">
          {/* Contact Us Badge */}
          <View className="flex flex-row justify-center items-center mx-auto w-[200px] h-[48px] bg-[rgba(193,0,22,0.1)] rounded-[120px] mb-8">
            <Text className="font-helvetica font-medium text-[16px] leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
              contact us
            </Text>
          </View>

          {/* Get in Touch Heading */}
          <Text className="text-center font-helvetica font-bold text-3xl lg:text-[64px] leading-tight lg:leading-[74px] tracking-[-0.01em] text-black mb-16">
            Get in Touch
          </Text>

          {/* Contact Cards Grid */}
          <View className="flex flex-row flex-wrap justify-center items-start gap-8 px-4 sm:px-8">
            {/* Phone Card */}
            <View className="relative w-full max-w-[350px] h-[227px]">
              {/* Background Card */}
              <View className="absolute w-full h-[180px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
              
              {/* Outer Circle */}
              <View className="absolute w-[124px] h-[124px] left-1/2 -ml-[62px] top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
              
              {/* Inner Red Circle */}
              <View className="absolute w-[94px] h-[94px] left-1/2 -ml-[47px] top-[15px] bg-[#C10016] rounded-full flex items-center justify-center">
                <img 
                  src="/phone.svg" 
                  alt="Phone" 
                  className="w-8 h-8 object-contain"
                />
              </View>

              {/* Call Us Text */}
              <Text className="absolute left-6 top-[129px] font-helvetica font-normal text-[16px] leading-[44px] text-black">
                Call Us
              </Text>

              {/* Phone Number */}
              <Text className="absolute left-6 top-[160px] font-helvetica font-bold text-[18px] leading-[74px] tracking-[-0.01em] text-black">
                +44 161 399 2348
              </Text>
            </View>

            {/* Email Card */}
            <View className="relative w-full max-w-[350px] h-[227px]">
              {/* Background Card */}
              <View className="absolute w-full h-[180px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
              
              {/* Outer Circle */}
              <View className="absolute w-[124px] h-[124px] left-1/2 -ml-[62px] top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
              
              {/* Inner Red Circle */}
              <View className="absolute w-[94px] h-[94px] left-1/2 -ml-[47px] top-[15px] bg-[#C10016] rounded-full flex items-center justify-center">
                <img 
                  src="/mail.svg" 
                  alt="Email" 
                  className="w-8 h-8 object-contain"
                />
              </View>

              {/* Email Us Text */}
              <Text className="absolute left-6 top-[129px] font-helvetica font-normal text-[16px] leading-[44px] text-black">
                Email Us
              </Text>

              {/* Email Address */}
              <Text className="absolute left-6 top-[160px] font-helvetica font-bold text-[18px] leading-[74px] tracking-[-0.01em] text-black">
                info@fulfilx.co.uk
              </Text>
            </View>
            {/* WhatsApp Card */}
            <View className="relative w-full max-w-[350px] h-[227px]">
              {/* Background Card */}
              <View className="absolute w-full h-[180px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
              
              {/* Outer Circle */}
              <View className="absolute w-[124px] h-[124px] left-1/2 -ml-[62px] top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
              
              {/* Inner Red Circle */}
              <View className="absolute w-[94px] h-[94px] left-1/2 -ml-[47px] top-[15px] bg-[#C10016] rounded-full flex items-center justify-center">
                <img 
                  src="/whatsapp.svg" 
                  alt="WhatsApp" 
                  className="w-8 h-8 object-contain"
                />
              </View>

              {/* Email Us Text */}
              <Text className="absolute left-6 top-[129px] font-helvetica font-normal text-[16px] leading-[44px] text-black">
                WhatsApp Us
              </Text>

              {/* Email Address */}
              <Text className="absolute left-6 top-[160px] font-helvetica font-bold text-[18px] leading-[74px] tracking-[-0.01em] text-black">
                +44 745 742 8760
              </Text>
            </View>
            
            {/* Visit Card */}
            <View className="relative w-full max-w-[350px] h-[227px]">
              {/* Background Card */}
              <View className="absolute w-full h-[180px] top-[47px] bg-white border border-[rgba(0,0,0,0.1)] backdrop-blur-[12.5px] rounded-[20px]" />
              
              {/* Outer Circle */}
              <View className="absolute w-[124px] h-[124px] left-1/2 -ml-[62px] top-0 bg-white border border-[rgba(0,0,0,0.1)] rounded-full" />
              
              {/* Inner Red Circle */}
              <View className="absolute w-[94px] h-[94px] left-1/2 -ml-[47px] top-[15px] bg-[#C10016] rounded-full flex items-center justify-center">
                <img 
                  src="/map.svg" 
                  alt="Location" 
                  className="w-8 h-8 object-contain"
                />
              </View>

              {/* Visit Us Text */}
              <Text className="absolute left-6 top-[129px] font-helvetica font-normal text-[16px] leading-[44px] text-black">
                Visit Us
              </Text>

              {/* Email Address */}
              <Text className="absolute left-6 top-[165px] font-helvetica font-bold text-[16px] leading-tight tracking-[-0.01em] text-black pr-2">
                Nile Mill, Oldham, Greater Manchester, OL9 8NT
              </Text>
            </View>
          </View>
        </View>

        {/* Contact Form Section */}
        <div className="relative w-full bg-white py-12">
          {/* Two Column Layout */}
          <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10 lg:gap-16 px-4 lg:px-8">
            
            {/* Left Column - Map */}
            <div className="w-full lg:flex-1 h-[300px] sm:h-[420px] lg:h-auto rounded-[30px] overflow-hidden relative">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://maps.google.com/maps?q=FULFIL.X+-+Storage+and+3pl+For+E-commerce+Brands&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>

            {/* Right Column - Contact Form */}
            <div className="w-full lg:flex-1 h-auto bg-white border border-black/10 rounded-[30px] flex flex-col">
              
              {/* Form Content with proper padding */}
              <div className="flex-1 px-6 sm:px-8 lg:px-12 pt-10 lg:pt-12 pb-6">
                {/* Section Title */}
                <h2 className="font-bold text-3xl lg:text-[40px] leading-[1.2] tracking-[-0.01em] text-black mb-8">
                  Contact For <span className='text-[#C10016]'>Queries?</span>
                </h2>

                {/* Form */}
                <div className="space-y-6">
                  
                  {/* Name Row - Two Columns */}
                  <div className="flex flex-col sm:flex-row gap-6">
                    {/* First Name */}
                    <div className="flex-1">
                      <label className="block font-medium text-[18px] text-black mb-2">
                        Name <span className='text-[#C10016]'>*</span>
                      </label>
                      <input 
                        type="text"
                        placeholder="First Name"
                        className="w-full h-[50px] bg-white border border-black/10 rounded-[8px] px-4 text-[16px] text-black placeholder:text-black/25 focus:outline-none focus:border-[#C10016]"
                      value={firstName}
                      onChange={(e) => setFirstName((e.target as HTMLInputElement).value)}
                      disabled={submitStatus === 'loading'}
                      />
                    </div>

                    {/* Last Name */}
                    <div className="flex-1">
                      <label className="block font-medium text-[18px] text-black mb-2 lg:invisible">
                        Last Name
                      </label>
                      <input 
                        type="text"
                        placeholder="Last Name"
                        className="w-full h-[50px] bg-white border border-black/10 rounded-[8px] px-4 text-[16px] text-black placeholder:text-black/25 focus:outline-none focus:border-[#C10016]"
                      value={lastName}
                      onChange={(e) => setLastName((e.target as HTMLInputElement).value)}
                      disabled={submitStatus === 'loading'}
                      />
                    </div>
                  </div>

                  {/* Brand Name */}
                  <div>
                    <label className="block font-medium text-[18px] text-black mb-2">
                      Brand Name <span className='text-[#C10016]'>*</span>
                    </label>
                    <input 
                      type="text"
                      placeholder="Enter your brand name"
                      className="w-full h-[50px] bg-white border border-black/10 rounded-[8px] px-4 text-[16px] text-black placeholder:text-black/25 focus:outline-none focus:border-[#C10016]"
                      value={brandName}
                      onChange={(e) => setBrandName((e.target as HTMLInputElement).value)}
                      disabled={submitStatus === 'loading'}
                    />
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block font-medium text-[18px] text-black mb-2">
                      Contact Number for Call Back <span className='text-[#C10016]'>*</span>
                    </label>
                    <input 
                      type="tel"
                      placeholder="e.g. 000 000 0000"
                      className="w-full h-[50px] bg-white border border-black/10 rounded-[8px] px-4 text-[16px] text-black placeholder:text-black/25 focus:outline-none focus:border-[#C10016]"
                      value={phone}
                      onChange={(e) => setPhone((e.target as HTMLInputElement).value)}
                      disabled={submitStatus === 'loading'}
                    />
                  </div>

                  {/* Ideal Time for Call Back */}
                  <div className="w-full">
                    <label className="block font-medium text-[18px] text-black mb-2">
                      Ideal Time for Call Back <span className="text-[#C10016]">*</span>
                    </label>

                    <div className="relative">
                      <select
                        className="w-full h-[50px] bg-white border border-black/10 rounded-[8px] px-4 pr-10 text-[16px] text-black focus:outline-none focus:border-[#C10016] appearance-none disabled:opacity-70"
                        value={idealTime}
                        onChange={(e) => setIdealTime((e.target as HTMLSelectElement).value)}
                        disabled={submitStatus === 'loading'}
                      >
                        <option value="">Select your time</option>
                        <option value="morning">Morning (9AM - 12PM)</option>
                        <option value="afternoon">Afternoon (12PM - 5PM)</option>
                      </select>

                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <img src="/down.svg" alt="" className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block font-medium text-[18px] text-black mb-2">
                      Email Address <span className='text-[#C10016]'>*</span>
                    </label>
                    <input 
                      type="email"
                      placeholder="e.g. john@domain.com"
                      className="w-full h-[50px] bg-white border border-black/10 rounded-[8px] px-4 text-[16px] text-black placeholder:text-black/25 focus:outline-none focus:border-[#C10016]"
                      value={email}
                      onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
                      disabled={submitStatus === 'loading'}
                    />
                  </div>

                  {/* Comment or Message */}
                  <div>
                    <label className="block font-medium text-[18px] text-black mb-2">
                      Comment or Message
                    </label>
                    <textarea 
                      placeholder="Type your comment or message here..."
                      rows={3}
                      className="w-full min-h-[104px] bg-white border border-black/10 rounded-[8px] px-4 py-3 text-[16px] text-black placeholder:text-black/25 focus:outline-none focus:border-[#C10016] resize-vertical"
                      value={message}
                      onChange={(e) => setMessage((e.target as HTMLTextAreaElement).value)}
                      disabled={submitStatus === 'loading'}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button at the bottom */}
              <div className="px-6 sm:px-8 lg:px-12 pb-10 lg:pb-12">
                {submitMessage ? (
                  <p className={`mb-4 text-sm ${submitStatus === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                    {submitMessage}
                  </p>
                ) : null}
                <label
                  className="flex items-center gap-3 mb-6 cursor-pointer select-none"
                  onClick={() => setAgreedToPolicy(!agreedToPolicy)}
                >
                  <div
                    className={`h-5 w-5 rounded ${
                      agreedToPolicy ? 'bg-[#C10016]' : 'bg-transparent border-2 border-black/30'
                    } flex items-center justify-center`}
                  >
                    {agreedToPolicy ? (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : null}
                  </div>
                  <span className="text-black/80 font-normal text-base">
                    I agree to the privacy policy
                  </span>
                </label>

                <button
                  type="button"
                  onClick={submitContact}
                  disabled={submitStatus === 'loading'}
                  className="bg-[#C10016] rounded-[6px] px-8 py-4 flex flex-row items-center justify-center gap-3 w-full sm:w-[200px] hover:bg-[#a00012] transition-colors mx-auto lg:mx-0 disabled:opacity-60"
                >
                  <span className="font-bold text-[18px] text-white">
                    {submitStatus === 'loading' ? 'Submitting...' : 'Submit Now'}
                  </span>
                  <img 
                    src="/arrow.svg" 
                    alt="Arrow" 
                    className="w-4 h-4 object-contain filter brightness-0 invert"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <AwardsAccreditations/>
        <Footer/>
      </ScrollView>
    </>
  );
}
