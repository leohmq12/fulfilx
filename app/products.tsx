import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import AwardsAccreditations from '@/components/layout/awards-accreditations';
import { useContent } from '@/hooks/useContent';
import { getMediaFullUrl } from '@/lib/cms-admin';
import { Stack, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Image, ScrollView, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';

type ViewMode = 'grid' | 'list';
type SortOption = 'default' | 'name-asc' | 'name-desc' | 'newest' | 'oldest';

// Product type from CMS
type Product = {
  _id: number;
  _slug: string;
  _sort_order: number;
  name: string;
  description?: string;
  image?: string;
  category: string;
  brand?: string;
  tags?: Array<{ tag: string }>;
  features?: Array<{ feature: string }>;
  detailed_description?: string;
  is_featured?: boolean;
};

// Fallback products for when CMS is unavailable
const FALLBACK_PRODUCTS: Product[] = [
  { _id: 1, _slug: 'packaging-box-1', _sort_order: 1, name: 'Premium Packaging Box', category: 'Packaging', description: 'High-quality packaging solution for your products' },
  { _id: 2, _slug: 'storage-container', _sort_order: 2, name: 'Storage Container', category: 'Storage', description: 'Durable storage containers for warehouse use' },
  { _id: 3, _slug: 'shipping-supplies', _sort_order: 3, name: 'Shipping Supplies Kit', category: 'Supplies', description: 'Complete kit for all your shipping needs' },
  { _id: 4, _slug: 'custom-branded-box', _sort_order: 4, name: 'Custom Branded Box', category: 'Custom Solutions', description: 'Fully customizable boxes with your branding' },
  { _id: 5, _slug: 'eco-packaging', _sort_order: 5, name: 'Eco-Friendly Packaging', category: 'Packaging', description: 'Sustainable packaging options' },
  { _id: 6, _slug: 'warehouse-shelving', _sort_order: 6, name: 'Warehouse Shelving', category: 'Equipment', description: 'Industrial-grade shelving systems' },
];

export default function ProductsScreen() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1024;
  const isTablet = width >= 768;
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setSortDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch products from CMS
  const { data: products, loading } = useContent<Product[]>('product', FALLBACK_PRODUCTS);

  // Filter products by category and search
  const filtered = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Sort products
  const filteredProducts = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc': return a.name.localeCompare(b.name);
      case 'name-desc': return b.name.localeCompare(a.name);
      case 'newest': return b._sort_order - a._sort_order;
      case 'oldest': return a._sort_order - b._sort_order;
      default: return a._sort_order - b._sort_order;
    }
  });

  // Get unique categories from products
  const productCategories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

  const SORT_OPTIONS: { value: SortOption; label: string }[] = [
    { value: 'default', label: 'Default' },
    { value: 'name-asc', label: 'Name: A to Z' },
    { value: 'name-desc', label: 'Name: Z to A' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
  ];

  // Calculate product card width based on screen size and view mode
  const getProductCardStyle = () => {
    if (viewMode === 'list') {
      return { width: '100%' as any };
    }
    if (isDesktop) {
      return { width: 'calc(33.333% - 16px)' as any };
    } else if (isTablet) {
      return { width: 'calc(50% - 12px)' as any };
    }
    return { width: '100%' as any };
  };

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
        <View className="relative min-h-[50vh] lg:min-h-[85vh]">
          {/* PNG Background */}
          <View className="absolute inset-0 z-0">
            <Image 
              source={require('../public/bg.webp')}
              className="w-full h-full object-cover"
              resizeMode="cover"
            />
          </View>

          {/* Hero Content */}
          <View className="relative z-10 min-h-[50vh] lg:min-h-[85vh] flex items-center justify-center pb-16">
            {/* Main Title */}
            <Text className="font-helvetica font-bold text-4xl lg:text-[84px] leading-tight lg:leading-[84px] text-black text-center mb-8">
              Our Products
            </Text>
            
            {/* Breadcrumb Navigation */}
            <View className="flex flex-row items-center justify-center mt-4">
              <TouchableOpacity onPress={() => router.push('/')}>
                <Text className="font-helvetica font-normal text-base lg:text-[20px] leading-[40px] text-black">
                  Home
                </Text>
              </TouchableOpacity>
              <View className="w-1 h-1 bg-[#C10016] rounded-full mx-4" />
              <Text className="font-helvetica font-medium text-base lg:text-[20px] leading-[40px] text-[#C10016]">
                Products
              </Text>
            </View>
          </View>
        </View>

        {/* Products Filter and Grid Section */}
        <View className="relative w-full py-8 lg:py-12 px-4 sm:px-6 lg:px-8" style={{ marginTop: isDesktop ? -220 : -60 }}>
          <div style={{ maxWidth: 1280, marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
            {/* Main Layout Container — CSS Grid on desktop so columns never shrink */}
            <div 
              style={isDesktop ? {
                display: 'grid',
                gridTemplateColumns: '300px 1fr',
                gap: 32,
                alignItems: 'start',
              } : {
                display: 'flex',
                flexDirection: 'column',
                gap: 24,
              }}
            >
              {/* Left Sidebar - Filters (Fixed width, doesn't change with filtering) */}
              <div 
                style={{ 
                  width: '100%',
                  position: isDesktop ? 'sticky' : 'relative',
                  top: isDesktop ? 16 : 0,
                  alignSelf: 'start',
                }}
              >
                <View className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                  {/* Categories */}
                  <View className="mb-6">
                    <Text className="font-helvetica font-bold text-xl text-black mb-4">Categories</Text>
                    <View style={{ gap: 12 }}>
                      {productCategories.map((category) => (
                        <TouchableOpacity 
                          key={category}
                          onPress={() => setSelectedCategory(category)}
                          style={{ paddingVertical: 4 }}
                        >
                          <Text 
                            className="font-helvetica text-base"
                            style={{ 
                              color: selectedCategory === category ? '#C10016' : '#000',
                              fontWeight: selectedCategory === category ? '700' : '400'
                            }}
                          >
                            {category}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  {/* Search */}
                  <View className="mb-6">
                    <Text className="font-helvetica font-bold text-xl text-black mb-4">Search</Text>
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery((e.target as HTMLInputElement).value)}
                      style={{
                        width: '100%',
                        border: '1px solid #e5e7eb',
                        borderRadius: 8,
                        padding: '12px 16px',
                        fontSize: 14,
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </View>

                  {/* Get Quote CTA */}
                  <View className="bg-[#C10016]/5 rounded-xl p-5">
                    <Text className="font-helvetica font-bold text-base text-black mb-2">
                      Need a Custom Quote?
                    </Text>
                    <Text className="font-helvetica text-sm text-gray-600 mb-4">
                      Contact us for bulk orders, custom solutions, and competitive pricing.
                    </Text>
                    <TouchableOpacity 
                      onPress={() => router.push('/contact')}
                      className="bg-[#C10016] rounded-lg py-3 px-5 flex-row items-center justify-center gap-2"
                    >
                      <Text className="font-helvetica font-bold text-sm text-white">Get Quote</Text>
                      <Image source={require('../public/arrow.svg')} style={{ width: 12, height: 12, tintColor: 'white' }} resizeMode="contain" />
                    </TouchableOpacity>
                  </View>
                </View>
              </div>

              {/* Right Content - Products Grid (always fills remaining space) */}
              <div style={{ minWidth: 0, width: '100%' }}>
                {/* Sort Bar */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, gap: 16 }}>
                  <Text className="font-helvetica text-base text-black">
                    {loading ? 'Loading products...' : `Showing ${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''}`}
                  </Text>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    {/* View Toggle Icons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <TouchableOpacity 
                        onPress={() => setViewMode('grid')}
                        style={{ width: 28, height: 24, opacity: viewMode === 'grid' ? 1 : 0.4, alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Image source={require('../public/viewas.webp')} style={{ width: 20, height: 16 }} resizeMode="contain" />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        onPress={() => setViewMode('list')}
                        style={{ width: 28, height: 24, opacity: viewMode === 'list' ? 1 : 0.4, alignItems: 'center', justifyContent: 'center' }}
                      >
                        <Image source={require('../public/listing.webp')} style={{ width: 20, height: 16 }} resizeMode="contain" />
                      </TouchableOpacity>
                    </div>
                    
                    {/* Sort Dropdown */}
                    <div ref={sortRef} style={{ position: 'relative' }}>
                      <button
                        onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 8,
                          backgroundColor: '#fff',
                          border: '1px solid rgba(0,0,0,0.1)',
                          borderRadius: 12,
                          padding: '8px 16px',
                          cursor: 'pointer',
                          fontFamily: 'Helvetica, Arial, sans-serif',
                          fontSize: 14,
                          color: '#000',
                        }}
                      >
                        {SORT_OPTIONS.find(o => o.value === sortBy)?.label || 'Sort by'}
                        <Image source={require('../public/downr.svg')} style={{ width: 14, height: 14, transform: [{ rotate: sortDropdownOpen ? '180deg' : '0deg' }] }} resizeMode="contain" />
                      </button>

                      {sortDropdownOpen && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '100%',
                            right: 0,
                            marginTop: 4,
                            backgroundColor: '#fff',
                            border: '1px solid rgba(0,0,0,0.1)',
                            borderRadius: 12,
                            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                            zIndex: 50,
                            overflow: 'hidden',
                            minWidth: 180,
                          }}
                        >
                          {SORT_OPTIONS.map((option) => (
                            <button
                              key={option.value}
                              onClick={() => { setSortBy(option.value); setSortDropdownOpen(false); }}
                              style={{
                                display: 'block',
                                width: '100%',
                                textAlign: 'left',
                                padding: '10px 16px',
                                border: 'none',
                                backgroundColor: sortBy === option.value ? '#fef2f2' : 'transparent',
                                color: sortBy === option.value ? '#C10016' : '#000',
                                fontWeight: sortBy === option.value ? 600 : 400,
                                fontFamily: 'Helvetica, Arial, sans-serif',
                                fontSize: 14,
                                cursor: 'pointer',
                              }}
                              onMouseEnter={(e) => { if (sortBy !== option.value) (e.target as HTMLElement).style.backgroundColor = '#f9fafb'; }}
                              onMouseLeave={(e) => { (e.target as HTMLElement).style.backgroundColor = sortBy === option.value ? '#fef2f2' : 'transparent'; }}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                  <View className="items-center justify-center py-20">
                    <Text className="font-helvetica text-gray-500">Loading products...</Text>
                  </View>
                ) : filteredProducts.length === 0 ? (
                  <View className="items-center justify-center py-20">
                    <Text className="font-helvetica text-xl text-gray-500 mb-2">No products found</Text>
                    <Text className="font-helvetica text-base text-gray-400">Try adjusting your search or filter criteria</Text>
                  </View>
                ) : (
                  <div 
                    style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: 24,
                      width: '100%'
                    }}
                  >
                    {filteredProducts.map((product) => (
                      viewMode === 'list' ? (
                        /* ── List View Card ── */
                        <div
                          key={product._id}
                          style={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: isTablet ? 'row' : 'column',
                            border: '1px solid #e5e7eb',
                            borderRadius: 16,
                            overflow: 'hidden',
                            backgroundColor: '#fff',
                          }}
                        >
                          {/* Image */}
                          <View style={{ width: isTablet ? 260 : '100%', height: isTablet ? 200 : 220, position: 'relative', flexShrink: 0 }}>
                            {product.image ? (
                              <Image
                                source={{ uri: getMediaFullUrl(product.image) }}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                              />
                            ) : (
                              <View style={{ width: '100%', height: '100%', backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 48 }}>📦</Text>
                              </View>
                            )}
                            {/* Category Badge */}
                            <View style={{ position: 'absolute', top: 12, left: 12 }}>
                              <View style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 }}>
                                <Text className="font-helvetica text-xs font-medium text-gray-700">{product.category}</Text>
                              </View>
                            </View>
                            {product.is_featured && (
                              <View style={{ position: 'absolute', top: 12, right: 12 }}>
                                <View style={{ backgroundColor: '#C10016', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 }}>
                                  <Text className="font-helvetica text-xs font-bold text-white">Featured</Text>
                                </View>
                              </View>
                            )}
                          </View>

                          {/* Info */}
                          <div style={{ flex: 1, padding: isTablet ? 24 : 16, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
                            <Text className="font-helvetica font-bold text-lg text-black">{product.name}</Text>
                            {product.description && (
                              <Text className="font-helvetica text-sm text-gray-600">{product.description}</Text>
                            )}
                            <TouchableOpacity
                              onPress={() => router.push('/contact')}
                              style={{
                                backgroundColor: '#C10016',
                                borderRadius: 8,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                alignSelf: 'flex-start',
                                marginTop: 4,
                              }}
                            >
                              <Text className="font-helvetica font-bold text-sm text-white">Get Quote</Text>
                              <Image source={require('../public/arrow.svg')} style={{ width: 10, height: 10, tintColor: 'white' }} resizeMode="contain" />
                            </TouchableOpacity>
                          </div>
                        </div>
                      ) : (
                        /* ── Grid View Card ── */
                        <div 
                          key={product._id} 
                          style={{
                            ...getProductCardStyle(),
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                        >
                          {/* Product Image Card */}
                          <View className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                            <View style={{ width: '100%', height: 280, position: 'relative' }}>
                              {product.image ? (
                                <Image 
                                  source={{ uri: getMediaFullUrl(product.image) }}
                                  style={{ width: '100%', height: '100%' }}
                                  resizeMode="cover"
                                />
                              ) : (
                                <View style={{ width: '100%', height: '100%', backgroundColor: '#f3f4f6', alignItems: 'center', justifyContent: 'center' }}>
                                  <Text style={{ fontSize: 48 }}>📦</Text>
                                </View>
                              )}
                              
                              {/* Category Badge */}
                              <View style={{ position: 'absolute', top: 12, left: 12 }}>
                                <View style={{ backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 }}>
                                  <Text className="font-helvetica text-xs font-medium text-gray-700">
                                    {product.category}
                                  </Text>
                                </View>
                              </View>

                              {/* Featured Badge */}
                              {product.is_featured && (
                                <View style={{ position: 'absolute', top: 12, right: 12 }}>
                                  <View style={{ backgroundColor: '#C10016', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 }}>
                                    <Text className="font-helvetica text-xs font-bold text-white">
                                      Featured
                                    </Text>
                                  </View>
                                </View>
                              )}
                            </View>
                          </View>
                          
                          {/* Product Info */}
                          <View style={{ marginTop: 16, flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <Text className="font-helvetica font-bold text-lg text-black" style={{ marginBottom: 4 }}>
                              {product.name}
                            </Text>
                            {product.description && (
                              <Text 
                                className="font-helvetica text-sm text-gray-600" 
                                numberOfLines={2}
                                style={{ marginBottom: 12, flex: 1 }}
                              >
                                {product.description}
                              </Text>
                            )}
                            
                            {/* Get Quote Button */}
                            <TouchableOpacity 
                              onPress={() => router.push('/contact')}
                              style={{
                                backgroundColor: '#C10016',
                                borderRadius: 8,
                                paddingVertical: 12,
                                paddingHorizontal: 16,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: 8,
                                marginTop: 'auto'
                              }}
                            >
                              <Text className="font-helvetica font-bold text-sm text-white">Get Quote</Text>
                              <Image source={require('../public/arrow.svg')} style={{ width: 10, height: 10, tintColor: 'white' }} resizeMode="contain" />
                            </TouchableOpacity>
                          </View>
                        </div>
                      )
                    ))}
                  </div>
                )}

                {/* Pagination Controls */}
                {filteredProducts.length > 0 && (
                  <View className="flex-row justify-center items-center gap-4 mt-12">
                    <TouchableOpacity 
                      style={{ 
                        width: 48, 
                        height: 48, 
                        backgroundColor: 'rgba(193, 0, 22, 0.1)', 
                        borderRadius: 24, 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      <View style={{ transform: [{ rotate: '180deg' }] }}>
                        <Image source={require('../public/next.svg')} style={{ width: 16, height: 16 }} resizeMode="contain" />
                      </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                      style={{ 
                        width: 48, 
                        height: 48, 
                        backgroundColor: 'rgba(193, 0, 22, 0.1)', 
                        borderRadius: 24, 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                      }}
                    >
                      <Image source={require('../public/next.svg')} style={{ width: 16, height: 16 }} resizeMode="contain" />
                    </TouchableOpacity>
                  </View>
                )}
              </div>
            </div>
          </div>
        </View>
        
        {/* Awards & Accreditations Section */}
        <AwardsAccreditations />
        
        <Footer />
      </ScrollView>
    </>
  );
}
