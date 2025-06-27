import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { products as initialProducts } from '@/data/products';
import { categories as initialCategories } from '@/data/categories';
import { Product, Order, ContactMessage, Category } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Shield, 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  Users, 
  MessageSquare,
  TrendingUp 
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Navigate } from 'react-router-dom';

const Admin = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newCategory, setNewCategory] = useState('');
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({
    name: '',
    description: '',
    price: 0,
    images: [''],
    category: '',
    stock: 0,
  });

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }

    const savedMessages = localStorage.getItem('contactMessages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }
  }, []);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  const handleAddProduct = () => {
    const product: Product = {
      ...newProduct,
      id: Math.random().toString(36).substr(2, 9),
      images: newProduct.images.filter(img => img.trim() !== ''),
    };
    setProducts([...products, product]);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      images: [''],
      category: '',
      stock: 0,
    });
    setIsAddProductOpen(false);
    toast({
      title: "Product added",
      description: "New product has been added successfully.",
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({
      ...product,
      images: [...product.images, ''].slice(0, 2),
    });
    setIsAddProductOpen(true);
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;
    const updatedProduct = {
      ...newProduct,
      id: editingProduct.id,
      images: newProduct.images.filter(img => img.trim() !== ''),
    };
    setProducts(products.map(p => p.id === editingProduct.id ? updatedProduct : p));
    setEditingProduct(null);
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      images: [''],
      category: '',
      stock: 0,
    });
    setIsAddProductOpen(false);
    toast({
      title: "Product updated",
      description: "Product has been updated successfully.",
    });
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Product deleted",
      description: "Product has been removed successfully.",
    });
  };

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    
    const category: Category = {
      id: Math.random().toString(36).substr(2, 9),
      name: newCategory.trim()
    };
    
    const updatedCategories = [...categories, category];
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
    
    setNewCategory('');
    setIsAddCategoryOpen(false);
    
    toast({
      title: "Category added",
      description: "New category has been added successfully.",
    });
  };

  const updateImageUrl = (index: number, value: string) => {
    const updatedImages = [...newProduct.images];
    updatedImages[index] = value;
    setNewProduct({ ...newProduct, images: updatedImages });
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const pendingOrders = orders.filter(order => order.status === 'pending').length;
  const totalCustomers = new Set(orders.map(order => order.userId)).size;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center mb-2">
            <Shield className="h-8 w-8 text-blue-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage products, orders, and customer interactions</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-green-600">${totalRevenue.toFixed(2)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold text-blue-600">{orders.length}</p>
                </div>
                <Package className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Customers</p>
                  <p className="text-2xl font-bold text-purple-600">{totalCustomers}</p>
                </div>
                <Users className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Messages</p>
                  <p className="text-2xl font-bold text-orange-600">{messages.length}</p>
                </div>
                <MessageSquare className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Product Management</CardTitle>
                  <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white max-w-md">
                      <DialogHeader>
                        <DialogTitle>
                          {editingProduct ? 'Edit Product' : 'Add New Product'}
                        </DialogTitle>
                        <DialogDescription>
                          {editingProduct ? 'Update product information' : 'Create a new product for your store'}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Product Name</Label>
                          <Input
                            id="name"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              value={newProduct.price}
                              onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                              id="stock"
                              type="number"
                              value={newProduct.stock}
                              onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <div className="flex space-x-2">
                            <Select 
                              value={newProduct.category} 
                              onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                            >
                              <SelectTrigger className="flex-1">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.name}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="icon">
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-white max-w-sm">
                                <DialogHeader>
                                  <DialogTitle>Add New Category</DialogTitle>
                                  <DialogDescription>
                                    Create a new category for your products
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="categoryName">Category Name</Label>
                                    <Input
                                      id="categoryName"
                                      value={newCategory}
                                      onChange={(e) => setNewCategory(e.target.value)}
                                      placeholder="Enter category name"
                                    />
                                  </div>
                                  <Button onClick={handleAddCategory} className="w-full">
                                    Add Category
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image1">Image 1 URL</Label>
                          <Input
                            id="image1"
                            value={newProduct.images[0] || ''}
                            onChange={(e) => updateImageUrl(0, e.target.value)}
                            placeholder="First image URL"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="image2">Image 2 URL (Optional)</Label>
                          <Input
                            id="image2"
                            value={newProduct.images[1] || ''}
                            onChange={(e) => updateImageUrl(1, e.target.value)}
                            placeholder="Second image URL (optional)"
                          />
                        </div>
                        <Button 
                          onClick={editingProduct ? handleUpdateProduct : handleAddProduct}
                          className="w-full"
                        >
                          {editingProduct ? 'Update Product' : 'Add Product'}
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-gray-600">${product.price.toFixed(2)}</p>
                          <Badge variant="secondary">{product.category}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Stock: {product.stock}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Order Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-semibold">Order #{order.id}</h3>
                          <p className="text-gray-600">{order.customerInfo.name}</p>
                          <p className="text-sm text-gray-500">{order.customerInfo.email}</p>
                        </div>
                        <div className="text-right">
                          <Badge className={
                            order.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }>
                            {order.status}
                          </Badge>
                          <p className="font-semibold mt-1">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.productId} className="flex justify-between text-sm">
                            <span>{item.product.name} x{item.quantity}</span>
                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Customer Messages</CardTitle>
              </CardHeader>
              <CardContent>
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No messages yet</p>
                ) : (
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div key={message.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{message.name}</h3>
                            <p className="text-sm text-gray-600">{message.email}</p>
                          </div>
                          <Badge variant={message.status === 'new' ? 'default' : 'secondary'}>
                            {message.status}
                          </Badge>
                        </div>
                        <h4 className="font-medium mb-2">{message.subject}</h4>
                        <p className="text-gray-700">{message.message}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(message.createdAt).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
