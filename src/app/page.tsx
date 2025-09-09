'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useI18n } from '@/hooks/useI18n'
import { provinces } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Home() {
  const { t } = useI18n()
  const [province, setProvince] = useState('')
  const [city, setCity] = useState('')
  const [suburb, setSuburb] = useState('')
  const router = useRouter()

  const handleFindStores = () => {
    const params = new URLSearchParams()
    if (province) params.set('province', province)
    if (city) params.set('city', city)
    if (suburb) params.set('suburb', suburb)
    
    router.push(`/stores?${params.toString()}`)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-2 items-center gap-12">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            {t('hero_title')}
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            {t('nationwide')}
          </p>

          {/* Location Selector */}
          <div className="mt-8 p-6 bg-white rounded-2xl shadow-lg border">
            <h3 className="font-semibold text-lg mb-4 text-gray-900">Find stores near you</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Select value={province} onValueChange={setProvince}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder={t('select_province')} />
                </SelectTrigger>
                <SelectContent>
                  {provinces.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Input 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder={t('city_placeholder')} 
                className="h-12"
              />
              
              <Input 
                value={suburb} 
                onChange={(e) => setSuburb(e.target.value)} 
                placeholder={t('suburb_placeholder')} 
                className="h-12"
              />
            </div>

            <Button
              onClick={handleFindStores}
              className="w-full mt-4 h-12 bg-green-600 hover:bg-green-700 text-white font-semibold"
              disabled={!province && !city && !suburb}
            >
              {t('find_stores')}
            </Button>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative">
          <div className="bg-gradient-to-br from-green-100 to-orange-100 p-8 rounded-3xl">
            <img 
              src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6feccedc-99ed-4531-a59d-7bf49cf2815d.png" 
              alt="Fresh groceries and delivery bags" 
              className="rounded-xl w-full h-auto object-cover shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose FreshFetch?</h2>
            <p className="text-lg text-gray-600">Supporting local communities across South Africa</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🥬</span>
              </div>
              <h3 className="font-semibold text-xl mb-3">Fresh Local Produce</h3>
              <p className="text-gray-600">Direct from local farms and trusted suppliers across all 9 provinces</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-xl mb-3">Lightning Fast Delivery</h3>
              <p className="text-gray-600">Get your groceries delivered in 20-45 minutes nationwide</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-semibold text-xl mb-3">Support Local Economy</h3>
              <p className="text-gray-600">Every order supports local stores and creates local jobs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Nationwide</h2>
            <p className="text-lg text-gray-600">Serving communities across all South African provinces</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {provinces.map(province => (
              <div key={province} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <h4 className="font-semibold text-lg text-gray-900 mb-2">{province}</h4>
                <p className="text-sm text-gray-600">Fresh delivery available</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 py-16 text-white">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get fresh groceries delivered?</h2>
          <p className="text-xl mb-8 text-green-100">Join thousands of South Africans who trust FreshFetch for their grocery needs</p>
          <Button 
            onClick={handleFindStores}
            className="bg-white text-green-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
          >
            Start Shopping Now
          </Button>
        </div>
      </section>
    </div>
  )
}