'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useI18n } from '@/hooks/useI18n'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navigation() {
  const { t, language, setLanguage } = useI18n()
  const { getTotalItems } = useCart()
  const { user, isAuthenticated, logout } = useAuth()
  const totalItems = getTotalItems()

  const languageOptions = [
    { code: 'en', name: t('english') },
    { code: 'af', name: t('afrikaans') },
    { code: 'xh', name: t('xhosa') },
    { code: 'zu', name: t('zulu') },
  ]

  return (
    <nav className="bg-white border-b shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/logo.svg" alt="FreshFetch" width={36} height={36} />
            <div>
              <h1 className="font-bold text-xl text-green-600">{t('freshfetch')}</h1>
              <p className="text-xs text-gray-500 hidden sm:block">{t('tagline')}</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/stores" className="text-gray-700 hover:text-green-600 font-medium">
              {t('find_stores')}
            </Link>
            {isAuthenticated() && user?.role === 'merchant' && (
              <Link href="/merchant/dashboard" className="text-gray-700 hover:text-green-600 font-medium">
                {t('merchant_dashboard')}
              </Link>
            )}
            {isAuthenticated() && user?.role === 'courier' && (
              <Link href="/courier/dashboard" className="text-gray-700 hover:text-green-600 font-medium">
                {t('courier_dashboard')}
              </Link>
            )}
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-sm">
                  {language.toUpperCase()}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languageOptions.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as 'en' | 'af' | 'xh' | 'zu')}
                    className={language === lang.code ? 'bg-green-50' : ''}
                  >
                    {lang.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm" className="relative">
                🛒 {t('cart')}
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center text-xs bg-green-600">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Auth */}
            {isAuthenticated() ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    👤 {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/profile">{t('profile')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">{t('orders')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    {t('logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild size="sm" className="bg-green-600 hover:bg-green-700">
                <Link href="/login">{t('login')}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}