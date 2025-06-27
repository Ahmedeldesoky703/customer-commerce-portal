
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail, Lock, ShoppingBag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@gmail.com')) {
      toast({
        title: "Invalid email",
        description: "Please use a Gmail account to sign in.",
        variant: "destructive",
      });
      return;
    }
    login(email);
    toast({
      title: "Welcome!",
      description: `Signed in as ${email}`,
    });
  };

  const handleDemoLogin = (role: 'admin' | 'user') => {
    const demoEmail = role === 'admin' ? 'admin@gmail.com' : 'user@gmail.com';
    setEmail(demoEmail);
    login(demoEmail);
    toast({
      title: "Demo Login",
      description: `Signed in as ${role}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <ShoppingBag className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome to ShopHub</h1>
          <p className="mt-2 text-gray-600">Sign in with your Gmail account</p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your Gmail address to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Gmail Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg">
                <Lock className="mr-2 h-4 w-4" />
                Sign In with Gmail
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or try demo accounts</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleDemoLogin('user')}
                className="w-full"
              >
                Demo User
              </Button>
              <Button
                variant="outline"
                onClick={() => handleDemoLogin('admin')}
                className="w-full"
              >
                Demo Admin
              </Button>
            </div>

            <div className="text-xs text-center text-gray-500">
              <p>Use admin@gmail.com for admin access</p>
              <p>Any other @gmail.com address for user access</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
