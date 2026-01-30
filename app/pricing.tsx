import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import Slider from '@react-native-community/slider';
import { Stack, useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

const DEFAULT_WEIGHT_STEPS = [
  0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9,
  9.5, 10,
];

type RatesFile = {
  sheets?: {
    International?: {
      rows?: (string | number | null)[][];
    };
  };
};

type DestinationOption = {
  name: string;
  code: string;
};

const normalizeDestinationKey = (value: string) => value.trim().toLowerCase();

const getWeightBracket = (value: number, steps: number[]) => {
  if (!Number.isFinite(value) || steps.length === 0) return value;
  for (const step of steps) {
    if (value <= step) return step;
  }
  return steps[steps.length - 1];
};

export default function LuxuryScreen() {
  const { width } = useWindowDimensions();
  const isMobile = width < 1024;
  const isDesktop = width >= 1024;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<DestinationOption | null>(null);
  const [shippingCost, setShippingCost] = useState(0);
  const [weight, setWeight] = useState(0.75);
  const [destinations, setDestinations] = useState<DestinationOption[]>([]);
  const [countryQuery, setCountryQuery] = useState('');
  const [availableWeights, setAvailableWeights] = useState<number[]>(DEFAULT_WEIGHT_STEPS);
  const [ratesLoadError, setRatesLoadError] = useState<string | null>(null);
  const [isRatesLoading, setIsRatesLoading] = useState(true);
  
  // Dynamic slider width based on screen width
  const sliderMaxWidth = 600;
  const padding = 64; // Approx padding
  const sliderWidth = isMobile ? Math.min(width - padding, sliderMaxWidth) : sliderMaxWidth;

  const rowByDestinationKeyRef = useRef(new Map<string, (string | number | null)[]>());
  const columnIndexByWeightRef = useRef(new Map<number, number>());
  const availableWeightsRef = useRef<number[]>(availableWeights);
  useEffect(() => {
    availableWeightsRef.current = availableWeights;
  }, [availableWeights]);

  useEffect(() => {
    if (!isDropdownOpen) setCountryQuery('');
  }, [isDropdownOpen]);

  const selectedDestinationName = selectedDestination?.name ?? '';
  const selectedDestinationLabel = selectedDestination
    ? `${selectedDestination.name}${selectedDestination.code ? ` (${selectedDestination.code})` : ''}`
    : '';
  const normalizedCountryQuery = countryQuery.trim().toLowerCase();
  const filteredDestinations = normalizedCountryQuery
    ? destinations.filter((d) => {
        const name = d.name.toLowerCase();
        const code = d.code.toLowerCase();
        return name.includes(normalizedCountryQuery) || code.includes(normalizedCountryQuery);
      })
    : destinations;

  const lookupRate = useCallback((destination: string, packageWeight: number) => {
    if (!destination) return null;
    const steps = availableWeightsRef.current.length ? availableWeightsRef.current : DEFAULT_WEIGHT_STEPS;
    const bracketWeight = getWeightBracket(packageWeight, steps);
    const row = rowByDestinationKeyRef.current.get(normalizeDestinationKey(destination));
    if (!row) return null;
    const columnIndex = columnIndexByWeightRef.current.get(bracketWeight);
    if (typeof columnIndex !== 'number') return null;
    const cell = row[columnIndex];
    if (typeof cell === 'number' && Number.isFinite(cell)) return cell;
    if (typeof cell === 'string') {
      const parsed = Number(cell);
      if (Number.isFinite(parsed)) return parsed;
    }
    return null;
  }, []);

  useEffect(() => {
    let isActive = true;

    (async () => {
      try {
        setIsRatesLoading(true);
        setRatesLoadError(null);

        const response = await fetch('/Rates.json');
        if (!response.ok) {
          throw new Error(`Failed to load rates (HTTP ${response.status})`);
        }

        const json = (await response.json()) as RatesFile;
        const rows = json.sheets?.International?.rows;
        if (!rows || !Array.isArray(rows) || rows.length < 2) {
          throw new Error('Rates file is missing expected rows');
        }

        const header = rows[0] ?? [];
        const headerWeights = header.slice(2).map((value) => {
          if (typeof value === 'number') return value;
          if (typeof value === 'string') {
            const parsed = Number(value);
            return Number.isFinite(parsed) ? parsed : null;
          }
          return null;
        });

        const cleanedWeights = headerWeights.filter((v): v is number => typeof v === 'number' && Number.isFinite(v));
        const uniqueWeights = Array.from(new Set(cleanedWeights)).sort((a, b) => a - b);
        const weightsToUse = uniqueWeights.length ? uniqueWeights : DEFAULT_WEIGHT_STEPS;

        const columnIndexByWeight = new Map<number, number>();
        for (let i = 0; i < headerWeights.length; i += 1) {
          const w = headerWeights[i];
          if (typeof w === 'number' && Number.isFinite(w)) columnIndexByWeight.set(w, i + 2);
        }

        const rowByDestinationKey = new Map<string, (string | number | null)[]>();
        const destinationOptions: DestinationOption[] = [];
        for (const row of rows.slice(1)) {
          const destination = typeof row?.[0] === 'string' ? row[0].trim() : '';
          if (!destination) continue;
          const code = typeof row?.[1] === 'string' ? row[1].trim() : '';
          const key = normalizeDestinationKey(destination);
          rowByDestinationKey.set(key, row);
          destinationOptions.push({ name: destination, code });
        }
        destinationOptions.sort((a, b) => a.name.localeCompare(b.name));

        if (!isActive) return;
        rowByDestinationKeyRef.current = rowByDestinationKey;
        columnIndexByWeightRef.current = columnIndexByWeight;
        setAvailableWeights(weightsToUse);
        setDestinations(destinationOptions);
      } catch (e) {
        if (!isActive) return;
        const message = e instanceof Error ? e.message : 'Failed to load rates';
        setRatesLoadError(message);
        rowByDestinationKeyRef.current = new Map();
        columnIndexByWeightRef.current = new Map();
        setDestinations([]);
        setAvailableWeights(DEFAULT_WEIGHT_STEPS);
      } finally {
        if (isActive) setIsRatesLoading(false);
      }
    })();

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    const rate = lookupRate(selectedDestinationName, weight);
    setShippingCost(typeof rate === 'number' ? rate : 0);
  }, [lookupRate, selectedDestinationName, weight]);

  const formatPrice = (price: number) => {
    return `£${price.toFixed(2)}`;
  };

  const sliderMinWeight = availableWeights.length ? availableWeights[0] : 0.25;
  const sliderMaxWeight = availableWeights.length ? availableWeights[availableWeights.length - 1] : 10;
  const sliderRange = Math.max(0.000001, sliderMaxWeight - sliderMinWeight);

  const weightRatio = useMemo(() => {
    const ratio = (weight - sliderMinWeight) / sliderRange;
    if (!Number.isFinite(ratio)) return 0;
    return Math.min(1, Math.max(0, ratio));
  }, [sliderMinWeight, sliderRange, weight]);

  const rafIdRef = useRef<number | null>(null);
  const pendingWeightRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, []);

  const setWeightThrottled = useCallback((nextWeight: number) => {
    pendingWeightRef.current = nextWeight;
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      if (pendingWeightRef.current === null) return;
      setWeight(pendingWeightRef.current);
    });
  }, []);

  const weightFontSize = useMemo(() => 18 + weightRatio * 10, [weightRatio]);
  const weightLineHeight = useMemo(() => Math.round((18 + weightRatio * 10) * 1.4), [weightRatio]);

  const router = useRouter();

  const pricingItems = [
    {
      title: ['Pick', '& Pack'],
      img: '/shiphappens1.jpg',
      logo: '/d2c.svg',
      description: 'Lets start with basics.',
      price: '£1.27',
      priceUnit: '/package',
      pricePrefix: '*from',
      features: [
        'Includes Packaging',
        'Includes Labelling',
        'Includes Picking',
        'Includes Packing',
        'Shipping (additional cost)'
      ]
    },
    {
      title: ['Next Day', 'Shipping'],
      img: '/shiphappens3.webp',
      logo: '/amf.svg',
      badge: 'Most Popular',
      description: 'We offer next day shipping for all orders placed before 3pm.',
      price: '£3.00',
      priceUnit: '/shipment',
      pricePrefix: '*from',
      features: [
        'Fully Tracked',
        'Next Day Delivery',
        'Small to Large Parcels',
        'International Shipping Available',
        'Insured Parcels'
      ]
    },
    {
      title: ['Storage', ''],
      img: '/qc.webp',
      logo: '/b2b.svg',
      description: 'Affordable storage scalable for your needs.',
      price: '£0.28',
      pricePrefix: '*from',
      features: [
        'Secure Warehousing',
        'Flexible Storage Options',
        'Short & Long Term Storage',
        'Pallet Storage',
        'Inventory Management'
      ]
    }
  ];



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
        onScrollBeginDrag={() => setIsDropdownOpen(false)}
      >
        {/* Hero Section */}
        <View className="relative min-h-[60vh] lg:min-h-screen">
          {/* PNG Background */}
          <View className="absolute inset-0 z-0">
            <Image 
              source={require('../public/bg.webp')}
              className="w-full h-full object-cover"
              resizeMode="cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-[60vh] lg:min-h-screen flex items-center justify-center py-20 px-4">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              Pricing Plans
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center mt-8">
              <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                Home
              </Text>
              <View className="w-2 h-2 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Pricing Plans
              </Text>
            </View>
          </View>
        </View>

         {/* Pricing Section */}
        <View className="w-full bg-white px-4" style={{ marginTop: isDesktop ? -192 : -60 }}>
          {/* Pricing Badge */}
          <View className="flex flex-row justify-center items-center mx-auto w-[180px] h-[40px] sm:w-[200px] sm:h-[48px] bg-[#C10016]/10 rounded-[120px] mb-6 sm:mb-8">
            <Text className="font-helvetica font-medium text-[14px] sm:text-[16px] leading-[32px] sm:leading-[40px] tracking-[0.2em] uppercase text-[#C10016]">
              pricing plans
            </Text>
          </View>

          {/* Pricing Plans */}
          <Text className="text-center font-helvetica font-bold text-2xl sm:text-3xl lg:text-[64px] leading-snug sm:leading-tight lg:leading-[74px] tracking-[-0.01em] text-black mb-6 sm:mb-8 lg:mb-16">
            Pricing <Text className='text-[#C10016]'>plans</Text> for companies{'\n'}of all <Text className='text-[#C10016]'>sizes</Text>
          </Text>
          <Text className="text-center font-helvetica font-normal text-base sm:text-lg lg:text-[22px] leading-relaxed lg:leading-[36px] tracking-[-0.01em] text-black mb-6 sm:mb-8 max-w-[800px] mx-auto">
            We offer competitive pricing plans to fit your organisation&apos;s needs as well as your budget. For custom pricing, please <Text 
            className='font-bold text-[#C10016]'
            onPress={() => router.push('/contact')}
        >contact us.
        </Text>
          </Text>
        </View>

    {/* Pricing Cards Section */}
    <View className="relative w-full">
      {/* Content Container */}
      <View className="max-w-[1400px] mx-auto px-4">
      {/* Card Stack Container */}
      <View className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-0 justify-center items-stretch lg:items-end">
        {pricingItems.map((item, i) => {
          const isMiddle = i === 1;
          const isFirst = i === 0;
          const isLast = i === pricingItems.length - 1;

          return (
            <View 
              key={i} 
              className={`flex-1 bg-white border border-[#D9D9D9] flex flex-col overflow-hidden ${
                isMiddle ? 'rounded-t-2xl z-20' : 'lg:mt-4'
              } ${isFirst ? 'lg:rounded-tl-2xl lg:rounded-bl-2xl' : ''} ${
                isLast ? 'lg:rounded-tr-2xl lg:rounded-br-2xl' : ''
              } ${!isDesktop ? 'rounded-2xl w-full' : ''}`}
              style={{
                 // Handle borders to avoid double borders
                 borderRightWidth: isLast || !isDesktop || isMiddle ? 1 : 0,
              }}
            >
              <View
                className={`flex-1 flex flex-col ${
                  isMiddle ? 'px-5 sm:px-8 pt-10 sm:pt-14 lg:pt-16 pb-6 sm:pb-8' : 'p-5 sm:p-6 lg:p-8'
                }`}
              >
                 {/* Header */}
                 <View className="flex-row items-center justify-between mb-4 sm:mb-6">
                   <View className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 rounded-full items-center justify-center">
                     <Image source={{ uri: item.logo }} className="w-6 h-6 sm:w-8 sm:h-8" resizeMode="contain" />
                   </View>
                 </View>

                 <Text className="font-helvetica font-bold text-xl sm:text-2xl text-black mb-2">
                   {item.title.join(' ')}
                 </Text>
                 <Text className="font-helvetica text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 min-h-0 sm:min-h-[40px]">
                   {item.description}
                 </Text>

                 {/* Price */}
                 <View className="flex-row items-baseline gap-1 mb-6 sm:mb-8">
                    <Text className="text-gray-400 font-helvetica text-xs">{item.pricePrefix}</Text>
                    <Text className="text-[#C10016] font-helvetica font-bold text-3xl sm:text-4xl leading-none">{item.price}</Text>
                    <Text className="text-gray-400 font-helvetica text-xs">{item.priceUnit}</Text>
                 </View>

                 {/* Divider */}
                 <View className="h-[1px] bg-gray-100 w-full mb-6 sm:mb-8" />

                 {/* Features */}
                 <View className="flex-col gap-3 sm:gap-4 mb-6 sm:mb-8 flex-1">
                    {item.features.map((feature, idx) => (
                      <View key={idx} className="flex-row items-start gap-3">
                        <View className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5">
                           <Image source={require('../public/check.svg')} className="w-full h-full" resizeMode="contain" />
                        </View>
                        <Text className="font-helvetica text-gray-700 text-[13px] sm:text-sm leading-5 flex-1">{feature}</Text>
                      </View>
                    ))}
                 </View>

              </View>
            </View>
          );
        })}
      </View>

      {/* Contact Sales Button */}
      <View className="w-full flex items-center justify-center mt-10 sm:mt-12">
        <TouchableOpacity 
          onPress={() => router.push('/contact')}
          className="w-[220px] sm:w-[250px] max-w-[400px] py-3 sm:py-4 rounded-xl flex-row items-center justify-center gap-2 bg-[#C10016]"
        >
          <Text className="text-white font-helvetica font-bold text-sm sm:text-base">Contact Sales</Text>
          <Image source={require('../public/arrow.svg')} className="w-4 h-4" resizeMode="contain" />
        </TouchableOpacity>
      </View>
      </View>

      {/* Key Benefits */}
      <View className="mt-14 sm:mt-20 mb-10 sm:mb-12">
        <Text className="font-helvetica font-bold text-3xl sm:text-4xl lg:text-[64px] leading-tight lg:leading-[84px] text-black text-center mb-8 sm:mb-12">
          Key <Text className="text-[#C10016]">Benefits</Text>
        </Text>

        <View className="flex flex-col lg:flex-row justify-center items-center gap-6 sm:gap-8 lg:gap-16 px-4">
          {['No Minimum Orders', 'No Setup Fees', 'Dedicated Account Manager'].map((benefit, i) => (
            <View key={i} className="flex flex-row items-center gap-4">
              <View className="w-5 h-5 sm:w-6 sm:h-6">
                <Image source={require('../public/check.svg')} className="w-full h-full" resizeMode="contain" />
              </View>
              <Text className="font-helvetica font-normal text-lg sm:text-xl lg:text-[24px] leading-7 sm:leading-[32px] text-black">
                {benefit}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>

        {/* Shipping Calculator Section */}
        <View 
          className="relative w-full py-20 lg:py-32"
          style={{ zIndex: isDropdownOpen ? 50 : 1 }}
        >
          {/* Background Gradient */}
          <View className="absolute inset-0">
             <Image 
                source={require('../public/job.webp')} 
                className="w-full h-full" 
                resizeMode="cover" 
             />
          </View>
          
          {/* Content Container */}
          <View className="relative z-10 max-w-[1400px] mx-auto px-4 lg:px-8 h-full flex items-center justify-center">
            <View className="flex flex-col lg:flex-row gap-12 lg:gap-16 w-full items-center lg:items-start justify-center">

              {/* LEFT COLUMN */}
              <View
                className="flex-1 w-full max-w-[600px] lg:max-w-none items-center lg:items-start"
                style={{
                  zIndex: isDropdownOpen ? 50 : 20,
                }}
              >
                <Text className="font-helvetica font-bold text-4xl lg:text-[60px] leading-tight lg:leading-[74px] text-white mb-8 text-center lg:text-left">
                  Shipping <Text className="text-[#C10016]">Calculator</Text>
                </Text>
                
                {/* Package Weight Section */}
                <View className="mb-6 mt-6 lg:mt-12 w-full max-w-[600px]">
                  <View className="flex flex-row items-center justify-between w-full mb-4">
                    <Text className="font-helvetica font-bold text-[20px] lg:text-[22px] leading-[44px] text-white">
                      Package Weight
                    </Text>
                    
                    <View className="border border-white/30 rounded-[8px] w-[120px] h-[54px] items-center justify-center">
                      <Text
                        className="font-helvetica font-bold text-white"
                        style={{ fontSize: weightFontSize, lineHeight: weightLineHeight }}
                      >
                        {weight.toFixed(2)} kg
                      </Text>
                    </View>
                  </View>
                  
                  <View className="w-full" style={{ width: '100%' }}>
                    <View className="justify-center" style={{ height: 40 }}>
                      <Slider
                        style={{ width: '100%', height: 40 }}
                        minimumValue={sliderMinWeight}
                        maximumValue={sliderMaxWeight}
                        value={weight}
                        onSlidingComplete={(value) => {
                          setWeight(Number(value.toFixed(2)));
                        }}
                        onValueChange={(value) => {
                          setWeightThrottled(value);
                        }}
                        minimumTrackTintColor="#C10016"
                        maximumTrackTintColor="rgba(255,255,255,0.3)"
                        thumbTintColor="#C10016"
                      />
                    </View>
                    
                    <View className="flex flex-row justify-between mt-4">
                      <Text className="font-helvetica font-normal text-[16px] lg:text-[18px] leading-[44px] text-white">
                        {sliderMinWeight} kg
                      </Text>
                      <Text className="font-helvetica font-normal text-[16px] lg:text-[18px] leading-[44px] text-white">
                        {sliderMaxWeight} kg
                      </Text>
                    </View>
                  </View>
                  
                  <Text className="font-helvetica font-normal text-[16px] lg:text-[18px] leading-[32px] lg:leading-[44px] text-white/50">
                    Select the weight of the package in kilograms.
                  </Text>
                </View>

                {/* Destination Country Section */}
                <View className="mt-2 lg:mt-4 w-full max-w-[600px]">
                  <Text className="font-helvetica font-bold text-[20px] lg:text-[22px] leading-[44px] text-white mb-4">
                    Destination Country
                  </Text>
                  
                  {/* Country Selector Dropdown */}
                  <View className="relative z-10" style={{ zIndex: 1000, elevation: 20 }}>
                    <TouchableOpacity 
                      className="border border-white/30 rounded-[8px] w-full h-[54px] flex flex-row items-center justify-between px-4 py-1 mb-4"
                      onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                      activeOpacity={0.7}
                    >
                      <Text className="font-helvetica font-normal text-[16px] leading-[44px] text-white/70">
                        {selectedDestinationLabel || (isRatesLoading ? 'Loading rates...' : 'Select your country')}
                      </Text>
                      <View className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}>
                        <Image source={require('../public/downw.svg')} className="w-full h-full" resizeMode="contain" />
                      </View>
                    </TouchableOpacity>
                    
                    {/* Dropdown Options */}
                    {isDropdownOpen && (
                      <View
                        className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-[8px] mt-1 shadow-lg max-h-[320px] overflow-hidden"
                        style={{ zIndex: 9999, elevation: 40 }}
                      >
                        <View className="px-3 py-2 border-b border-gray-100">
                          <TextInput
                            value={countryQuery}
                            onChangeText={setCountryQuery}
                            placeholder="Search country or code"
                            placeholderTextColor="rgba(0,0,0,0.4)"
                            autoCorrect={false}
                            autoCapitalize="none"
                            className="w-full h-10 px-3 rounded-[8px] border border-gray-200 font-helvetica text-[14px] text-black"
                          />
                        </View>
                        <FlatList
                          keyboardShouldPersistTaps="handled"
                          className="max-h-[240px]"
                          data={
                            filteredDestinations.length
                              ? filteredDestinations
                              : destinations.length
                                ? []
                                : [{ name: 'No destinations available', code: '' }]
                          }
                          keyExtractor={(item, index) => `${item.name}-${item.code}-${index}`}
                          renderItem={({ item }) => {
                            const isPlaceholder = item.code === '' && item.name === 'No destinations available';
                            const isSelected = !!selectedDestination && selectedDestination.name === item.name && selectedDestination.code === item.code;
                            return (
                              <TouchableOpacity
                                className={`px-4 py-3 border-b border-gray-100 last:border-b-0 active:bg-gray-50 ${
                                  isSelected ? 'bg-red-50' : ''
                                }`}
                                onPress={() => {
                                  if (isPlaceholder) return;
                                  setSelectedDestination(item);
                                  setIsDropdownOpen(false);
                                }}
                                activeOpacity={0.6}
                              >
                                <Text
                                  className={`font-helvetica font-normal text-[16px] leading-[24px] ${
                                    isSelected ? 'text-[#C10016]' : 'text-black'
                                  }`}
                                >
                                  {item.name}
                                  {item.code ? ` (${item.code})` : ''}
                                </Text>
                              </TouchableOpacity>
                            );
                          }}
                          ListEmptyComponent={
                            <View className="px-4 py-3">
                              <Text className="font-helvetica font-normal text-[14px] leading-[20px] text-black/60">
                                No matches
                              </Text>
                            </View>
                          }
                        />
                      </View>
                    )}
                  </View>
                  
                  {!!ratesLoadError && (
                    <Text className="font-helvetica font-normal text-[16px] leading-[24px] text-white/70">
                      Rates unavailable: {ratesLoadError}
                    </Text>
                  )}
                  {!ratesLoadError && (
                    <Text className="font-helvetica font-normal text-[16px] lg:text-[18px] leading-[32px] lg:leading-[44px] text-white/50">
                      Select the country to which you want to ship the package
                    </Text>
                  )}
                </View>
              </View>

              {/* RIGHT COLUMN */}
              <View
                className="flex-none w-full lg:w-1/2 lg:max-w-[600px] flex justify-center items-center"
                style={{ zIndex: 10 }}
              >
                <View className="w-full bg-white rounded-[24px] shadow-lg p-6 lg:p-12">
                  <Text className="font-helvetica font-bold text-[20px] lg:text-[24px] leading-[32px] lg:leading-[44px] text-black justify-start mb-4 lg:mb-6">
                    Shipping Cost
                  </Text>
                  
                  <Text className="font-helvetica font-bold text-[48px] lg:text-[64px] leading-[1.2] text-[#C10016] justify-start mb-4">
                    {formatPrice(shippingCost)}
                  </Text>
                  
                  <Text className="font-helvetica font-normal text-[16px] lg:text-[18px] leading-[28px] lg:leading-[44px] text-black opacity-50 justify-start mb-8 lg:mb-10">
                    Estimated shipping cost based on weight and destination country.
                  </Text>
                  
                  <Text className="font-helvetica font-bold text-[20px] lg:text-[24px] leading-[32px] lg:leading-[44px] text-black justify-start mb-2">
                    Get your Package on its Way!
                  </Text>
                  
                  <Text className="font-helvetica font-normal text-[16px] lg:text-[18px] leading-[28px] lg:leading-[44px] text-black opacity-50 justify-start mb-8 lg:mb-10">
                    Ready to ship?
                  </Text>
                  
                  <TouchableOpacity 
                    className="w-full sm:w-[260px] h-[54px] lg:h-[60px] bg-[#C10016] rounded-[6px] flex flex-row items-center justify-center gap-[10px] mx-auto"
                    activeOpacity={0.8}
                  >
                    <Text className="font-helvetica font-bold text-[16px] lg:text-[18px] leading-[36px] text-white">
                      Get in Touch
                    </Text>
                    <View className="w-3 h-3">
                      <Image source={require('../public/arrow.svg')} className="w-full h-full" resizeMode="contain" />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>

            </View>
          </View>
        </View>

        {/* Accomplishments Section */}
        <View className="w-full flex-col lg:flex-row">
          
          {/* Left Section - White Background */}
          <View className="w-full lg:w-1/2 bg-white relative min-h-[400px] lg:min-h-[520px] items-center justify-center py-12 lg:py-0">
             <View className="absolute inset-0">
                <Image source={require('../public/bg.webp')} className="w-full h-full" resizeMode="cover" />
             </View>
            {/* Left Section Content */}
            <View className="max-w-[740px] w-full items-center px-8 z-10">
              <Text className="font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] text-black mb-8 text-center">
                Our Awards
              </Text>

              <View className="w-[100px] h-[1px] bg-[#C10016] mb-12" />

              <View className="flex-row flex-wrap justify-center gap-4 lg:gap-16 mb-12">
                 {[1, 2, 3, 4, 5].map((i) => (
                    <View key={i} className="w-[60px] h-[60px] lg:w-[84px] lg:h-[84px]">
                       <Image source={{ uri: `/award${i}.webp` }} className="w-full h-full" resizeMode="contain" />
                    </View>
                 ))}
              </View>
            </View>
          </View>

          {/* Right Section - Red Background */}
          <View className="w-full lg:w-1/2 bg-[#DA192F] relative min-h-[400px] lg:min-h-[520px] items-center justify-center py-12 lg:py-0">
            <View className="max-w-[650px] w-full items-center px-8">
              <Text className="font-bold text-3xl lg:text-[42px] leading-tight lg:leading-[54px] text-white mb-8 text-center">
                Accreditations
              </Text>

              <View className="w-[100px] h-[1px] bg-white mb-12" />

              <Text className="font-normal text-xl lg:text-[24px] leading-relaxed lg:leading-[44px] text-white mb-12 text-center">
                Exceptional Quality Service
              </Text>

              <TouchableOpacity className="border border-white rounded-[6px] flex-row items-center justify-center gap-[10px] px-8 py-4">
                <Text className="text-white font-bold text-[18px] leading-[36px]">Let&apos;s Talk</Text>
                <Image source={require('../public/arrow.svg')} className="w-4 h-4" resizeMode="contain" style={{ tintColor: 'white' }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Footer />
      </ScrollView>
    </>
    );
}
