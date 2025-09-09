'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/hooks/useI18n'
import { useCart } from '@/hooks/useCart'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function CartPage() {
  const { t } = useI18n()
  const router = useRouter()
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getTotalPrice, 
    getDeliveryFee, 
    getVAT, 
    getFinalTotal,
    clearCart
  } = useCart()

  const formatPrice = (price: number) => {
    return `R${(price / 100).toFixed(2)}`
  }

  const handleCheckout = () => {
    router.push('/checkout')
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            {t('cart')}
          </h1>

          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-gray-400">🛒</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {t('empty_cart')}
            </h3>
            <p className="text-gray-500 mb-6">
              Add some fresh products to get started!
            </p>
            <Button asChild className="bg-green-600 hover:bg-green-700">
              <Link href="/stores">
                {t('continue_shopping')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('cart')}
          </h1>
          <Button 
            variant="outline"
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <Card key={item.product._id}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 relative flex-shrink-0">
                      <Image
                        src={item.product.imageUrl}
                        alt={item.product.name}
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg text-gray-900">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.product.unit}
                      </p>
                      <p className="text-green-600 font-semibold">
                        {formatPrice(item.product.price)} each
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        className="w-8 h-8 p-0"
                      >
                        -
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product._id, parseInt(e.target.value) || 1)}
                        className="w-16 text-center"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        className="w-8 h-8 p-0"
                      >
                        +
                      </Button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <div className="font-bold text-lg">
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.product._id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 p-1 h-auto"
                      >
                        {t('remove')}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span>{formatPrice(getTotalPrice())}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{t('delivery_fee')}</span>
                  <span>{formatPrice(getDeliveryFee())}</span>
                </div>

                <div className="flex justify-between">
                  <span>{t('vat')}</span>
                  <span>{formatPrice(getVAT())}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>{t('total')}</span>
                  <span className="text-green-600">{formatPrice(getFinalTotal())}</span>
                </div>

                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 h-12 text-lg"
                >
                  {t('checkout')}
                </Button>

                <Button asChild variant="outline" className="w-full">
                  <Link href="/stores">
                    {t('continue_shopping')}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}