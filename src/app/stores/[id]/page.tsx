'use client'
import { useState, useMemo } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useI18n } from '@/hooks/useI18n'
import { mockStores, mockProducts } from '@/lib/mockData'
import { ProductCard } from '@/components/ProductCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function StorePage() {
  const { t } = useI18n()
  const params = useParams()
  const storeId = params?.id as string
  const [searchQuery, setSearchQuery] = useState('')

  const store = mockStores.find(s => s._id === storeId)
  
  const storeProducts = useMemo(() => {
    let products = mockProducts.filter(product => product.store === storeId)
    
    if (searchQuery) {
      products = products.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.unit.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return products
  }, [storeId, searchQuery])

  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Store not found</h1>
          <Link 
            href="/stores"
            className="text-green-600 hover:text-green-700 font-medium"
          >
            ← Back to stores
          </Link>
        </div>
      </div>
    )
  }

  const formatDeliveryFee = (fee: number) => {
    return `R${(fee / 100).toFixed(2)}`
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Store Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-start justify-between mb-6">
            <Link 
              href="/stores"
              className="text-green-600 hover:text-green-700 font-medium mb-4 inline-block"
            >
              ← Back to stores
            </Link>
          </div>

          <div className="flex items-start space-x-6">
            <div className="w-24 h-24 relative flex-shrink-0">
              <Image
                src={store.logoUrl}
                alt={`${store.name} logo`}
                width={96}
                height={96}
                className="rounded-xl object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {store.name}
                </h1>
                <Badge variant="secondary">
                  {t(store.category.toLowerCase())}
                </Badge>
              </div>

              <p className="text-gray-600 mb-4">
                📍 {store.address}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <span className="text-sm text-gray-500 block">{t('delivery')} Fee</span>
                  <span className="font-semibold text-green-600">
                    {formatDeliveryFee(store.baseDeliveryFee)}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block">{t('eta')}</span>
                  <span className="font-semibold text-orange-600">
                    {store.etaMin}-{store.etaMax} {t('min')}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-500 block">Service Areas</span>
                  <span className="font-semibold text-gray-900">
                    {store.suburbs.join(', ')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Store Banner */}
      {store.bannerUrl && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={store.bannerUrl}
            alt={`${store.name} banner`}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        </div>
      )}

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Products</h2>
            <p className="text-gray-600">
              {storeProducts.length} items available
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Input
              placeholder={t('search_products')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64"
            />
          </div>
        </div>

        {/* Products Grid */}
        {storeProducts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {storeProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-gray-400">📦</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {searchQuery ? 'No products match your search' : 'No products available'}
            </h3>
            {searchQuery ? (
              <div>
                <p className="text-gray-500 mb-4">
                  Try searching for something else or clear your search.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </Button>
              </div>
            ) : (
              <p className="text-gray-500">
                This store hasn&apos;t added any products yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}