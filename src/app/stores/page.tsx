'use client'
import { Suspense, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useI18n } from '@/hooks/useI18n'
import { mockStores, filterStoresByLocation } from '@/lib/mockData'
import { StoreCard } from '@/components/StoreCard'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

function StoresContent() {
  const { t } = useI18n()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  // Get initial filters from URL params
  const province = searchParams?.get('province') || ''
  const city = searchParams?.get('city') || ''
  const suburb = searchParams?.get('suburb') || ''

  // Filter stores based on location and search
  const filteredStores = useMemo(() => {
    let stores = filterStoresByLocation(mockStores, province, city, suburb)
    
    // Apply search filter
    if (searchQuery) {
      stores = stores.filter(store => 
        store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.address.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      stores = stores.filter(store => 
        store.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    return stores.sort((a, b) => (a.distance || 0) - (b.distance || 0))
  }, [province, city, suburb, searchQuery, selectedCategory])

  const categories = Array.from(new Set(mockStores.map(store => store.category)))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {t('find_stores')}
              </h1>
              {(province || city || suburb) && (
                <p className="text-lg text-gray-600 mt-2">
                  Showing stores in {suburb && `${suburb}, `}{city && `${city}, `}{province}
                </p>
              )}
            </div>
            <Link 
              href="/"
              className="text-green-600 hover:text-green-700 font-medium"
            >
              ← Change Location
            </Link>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder={t('search_products')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 h-12">
                <SelectValue placeholder={t('all_categories')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('all_categories')}</SelectItem>
                {categories.map((category: string) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {t(category.toLowerCase())}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredStores.length} {t('stores_found')}
          </p>
        </div>

        {/* Store Grid */}
        {filteredStores.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredStores.map(store => (
              <StoreCard key={store._id} store={store} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-gray-400">🏪</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t('no_stores')}
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search criteria or exploring different areas.
            </p>
            <Link 
              href="/"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
            >
              Search Different Location
            </Link>
          </div>
        )}

        {/* Loading Skeleton - for future use */}
        {false && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm border animate-pulse">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function StoresPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading stores...</div>}>
      <StoresContent />
    </Suspense>
  )
}