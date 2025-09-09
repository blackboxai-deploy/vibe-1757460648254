'use client'
import Link from 'next/link'
import { useI18n } from '@/hooks/useI18n'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function CheckoutSuccessPage() {
  const { t } = useI18n()

  // Generate a random order number for demo
  const orderNumber = `FF${Date.now().toString().slice(-6)}`
  const estimatedDelivery = new Date(Date.now() + 30 * 60 * 1000).toLocaleTimeString('en-ZA', {
    hour: '2-digit',
    minute: '2-digit'
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {t('payment_successful')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('order_confirmed')}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-center">Order Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 bg-green-50 rounded-lg">
              <div className="text-sm text-gray-600 mb-1">{t('order_number')}</div>
              <div className="text-2xl font-bold text-green-600 mb-4">{orderNumber}</div>
              
              <div className="text-sm text-gray-600 mb-1">{t('estimated_delivery')}</div>
              <div className="text-lg font-semibold text-gray-900">{estimatedDelivery}</div>
            </div>

            <div className="text-center text-sm text-gray-600 p-4">
              <p className="mb-2">🚚 Your order is being prepared</p>
              <p className="mb-2">📱 You&apos;ll receive SMS updates</p>
              <p>📧 Order confirmation sent to your email</p>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Button asChild className="w-full bg-green-600 hover:bg-green-700">
            <Link href={`/orders/${orderNumber}`}>
              {t('track_order')}
            </Link>
          </Button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button asChild variant="outline">
              <Link href="/stores">
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="font-semibold text-lg mb-4">Need Help?</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">{t('contact_store')}</h4>
              <p className="text-sm text-gray-600">+27 11 123 4567</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">FreshFetch Support</h4>
              <p className="text-sm text-gray-600">support@freshfetch.co.za</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}