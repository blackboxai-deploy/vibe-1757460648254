'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useI18n } from '@/hooks/useI18n'
import { useAuth } from '@/hooks/useAuth'
import { mockUsers } from '@/lib/mockData'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function LoginPage() {
  const { t } = useI18n()
  const { login } = useAuth()
  const router = useRouter()
  
  const [isLoading, setIsLoading] = useState(false)
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  const [signupForm, setSignupForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer' as 'customer' | 'merchant' | 'courier'
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      // Find mock user by email
      const user = mockUsers.find(u => u.email === loginForm.email)
      
      if (user) {
        login(user, 'mock_token_' + user._id)
        router.push(user.role === 'customer' ? '/' : `/${user.role}/dashboard`)
      } else {
        alert('Invalid credentials. Try: john@example.com')
      }
      setIsLoading(false)
    }, 1000)
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup
    setTimeout(() => {
      const newUser = {
        _id: 'new_' + Date.now(),
        ...signupForm,
        phone: '',
        address: '',
        createdAt: new Date()
      }
      
      login(newUser, 'mock_token_' + newUser._id)
      router.push(newUser.role === 'customer' ? '/' : `/${newUser.role}/dashboard`)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to FreshFetch</h1>
          <p className="text-gray-600 mt-2">Sign in to your account or create a new one</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">{t('login')}</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      required
                      value={loginForm.email}
                      onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      required
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                      placeholder="••••••••"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing in...' : 'Sign In'}
                  </Button>

                  <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    <strong>Demo accounts:</strong><br/>
                    Customer: john@example.com<br/>
                    Merchant: soweto@freshfetch.co.za<br/>
                    Courier: sipho@courier.co.za
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      required
                      value={signupForm.name}
                      onChange={(e) => setSignupForm({...signupForm, name: e.target.value})}
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      required
                      value={signupForm.email}
                      onChange={(e) => setSignupForm({...signupForm, email: e.target.value})}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="signup-role">Account Type</Label>
                    <select 
                      id="signup-role"
                      value={signupForm.role}
                      onChange={(e) => setSignupForm({...signupForm, role: e.target.value as 'customer' | 'merchant' | 'courier'})}
                      className="w-full h-10 px-3 border border-gray-200 rounded-md"
                    >
                      <option value="customer">Customer</option>
                      <option value="merchant">Merchant/Store Owner</option>
                      <option value="courier">Courier/Driver</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      required
                      value={signupForm.password}
                      onChange={(e) => setSignupForm({...signupForm, password: e.target.value})}
                      placeholder="••••••••"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center">
              <Link 
                href="/"
                className="text-green-600 hover:text-green-700 text-sm font-medium"
              >
                ← Continue as guest
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}