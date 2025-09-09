'use client'
import Image from 'next/image'
import { useState } from 'react'
import { Product } from '@/lib/types'
import { useI18n } from '@/hooks/useI18n'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useI18n()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const formatPrice = (price: number) => {
    return `R${(price / 100).toFixed(2)}`
  }

  const handleAddToCart = () => {
    setIsAdding(true)
    addItem(product, quantity)
    
    // Reset quantity and show feedback
    setTimeout(() => {
      setIsAdding(false)
      setQuantity(1)
    }, 500)
  }

  const priceWithVat = product.price * (1 + product.vatRate)

  return (
    <div className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-xl">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
            <Badge variant="destructive" className="text-sm">
              {t('out_of_stock')}
            </Badge>
          </div>
        )}
        {product.vatRate > 0 && (
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-white text-xs">
              +VAT
            </Badge>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {product.unit}
          </p>
        </div>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline space-x-2">
            <span className="text-xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.vatRate > 0 && (
              <span className="text-sm text-gray-500">
                ({formatPrice(priceWithVat)} incl. VAT)
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Controls */}
        {product.inStock ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 p-0"
                >
                  -
                </Button>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 h-8 text-center text-sm"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 p-0"
                >
                  +
                </Button>
              </div>
              <div className="text-sm text-gray-600">
                = {formatPrice(product.price * quantity)}
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isAdding}
            >
              {isAdding ? 'Added!' : t('add_to_cart')}
            </Button>
          </div>
        ) : (
          <Button disabled className="w-full" variant="outline">
            {t('out_of_stock')}
          </Button>
        )}
      </div>
    </div>
  )
}