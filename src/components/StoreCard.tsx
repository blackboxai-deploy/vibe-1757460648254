'use client'
import Link from 'next/link'
import Image from 'next/image'
import { Store } from '@/lib/types'
import { useI18n } from '@/hooks/useI18n'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface StoreCardProps {
  store: Store
}

export function StoreCard({ store }: StoreCardProps) {
  const { t } = useI18n()

  const formatDistance = (distance?: number) => {
    if (!distance) return ''
    return `${distance.toFixed(1)}km away`
  }

  const formatDeliveryFee = (fee: number) => {
    return `R${(fee / 100).toFixed(2)}`
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
      {/* Store Header */}
      <div className="p-6 border-b">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 relative flex-shrink-0">
            <Image 
              src={store.logoUrl} 
              alt={`${store.name} logo`}
              width={64}
              height={64}
              className="rounded-lg object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg text-gray-900 truncate">
              {store.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <Badge variant="secondary" className="text-xs">
                {t(store.category.toLowerCase())}
              </Badge>
              {store.distance && (
                <span className="text-sm text-green-600 font-medium">
                  {formatDistance(store.distance)}
                </span>
              )}
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          📍 {store.address}
        </p>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="text-gray-500">
              <span className="font-medium">{t('delivery')}:</span>
              <span className="ml-1 text-green-600 font-semibold">
                {formatDeliveryFee(store.baseDeliveryFee)}
              </span>
            </div>
            <div className="text-gray-500">
              <span className="font-medium">{t('eta')}:</span>
              <span className="ml-1 text-orange-600 font-semibold">
                {store.etaMin}-{store.etaMax} {t('min')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Store Actions */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Serving: {store.suburbs.join(', ')}
          </div>
          <Button asChild className="bg-green-600 hover:bg-green-700">
            <Link href={`/stores/${store._id}`}>
              Shop Now
            </Link>
          </Button>
        </div>
      </div>

      {/* Banner Image */}
      {store.bannerUrl && (
        <div className="relative h-32 overflow-hidden rounded-b-xl">
          <Image
            src={store.bannerUrl}
            alt={`${store.name} banner`}
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  )
}