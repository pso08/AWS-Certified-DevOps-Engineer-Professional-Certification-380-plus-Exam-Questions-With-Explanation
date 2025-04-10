'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  BarChart, 
  Users, 
  FileText, 
  Settings, 
  Shield, 
  Search,
  Tag,
  Percent,
  Plus,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Filter,
  BarChart2
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

// Mock categories data
const mockCategories = [
  { id: '1', name: 'EC2 & Compute', description: 'Amazon EC2 and related compute services', questionCount: 75, avgScore: 72, difficulty: 'Medium' },
  { id: '2', name: 'S3 & Storage', description: 'Amazon S3 and other storage services', questionCount: 68, avgScore: 68, difficulty: 'Easy' },
  { id: '3', name: 'VPC & Networking', description: 'Amazon VPC and networking concepts', questionCount: 62, avgScore: 65, difficulty: 'Hard' },
  { id: '4', name: 'IAM & Security', description: 'Identity and Access Management and security best practices', questionCount: 70, avgScore: 75, difficulty: 'Medium' },
  { id: '5', name: 'Lambda & Serverless', description: 'AWS Lambda and serverless architecture', questionCount: 55, avgScore: 70, difficulty: 'Medium' },
  { id: '6', name: 'RDS & Databases', description: 'Amazon RDS and database services', questionCount: 60, avgScore: 67, difficulty: 'Medium' },
  { id: '7', name: 'CloudFormation & IaC', description: 'CloudFormation and Infrastructure as Code', questionCount: 50, avgScore: 62, difficulty: 'Hard' },
  { id: '8', name: 'CloudWatch & Monitoring', description: 'CloudWatch and monitoring solutions', questionCount: 45, avgScore: 73, difficulty: 'Easy' },
  { id: '9', name: 'Route 53 & DNS', description: 'Amazon Route 53 and DNS concepts', questionCount: 40, avgScore: 78, difficulty: 'Easy' },
  { id: '10', name: 'ECS & Containers', description: 'Amazon ECS and container services', questionCount: 48, avgScore: 64, difficulty: 'Hard' },
];

export default function CategoriesPage() {
  const router = useRouter();
  
  // Admin user state
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Categories state
  const [categories, setCategories] = useState(mockCategories);
  const [filteredCategories, setFilteredCategories] = useState(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  
  // New category state
  const [isNewCategoryDialogOpen, setIsNewCategoryDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryDescription, setNewCategoryDescription] = useState('');
  const [newCategoryDifficulty, setNewCategoryDifficulty] = useState('Medium');
  
  // Edit category state
  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState('');
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryDescription, setEditCategoryDescription] = useState('');
  const [editCategoryDifficulty, setEditCategoryDifficulty] = useState('');
  
  // Delete category state
  const [isDeleteCategoryDialogOpen, setIsDeleteCategoryDialogOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState('');
  const [deleteCategoryName, setDeleteCategoryName] = useState('');
  
  // Success/error state
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Load admin user data
  useEffect(() => {
    const loadUserData = () => {
      // In a real application, this would be a fetch request to get user data
      // For this mock implementation, we'll use localStorage
      if (typeof window !== 'undefined') {
        const session = JSON.parse(localStorage.getItem('user_session') || '{}');
        if (!session.isLoggedIn) {
          router.push('/auth/login');
          return;
        }
        
        if (!session.isAdmin) {
          router.push('/protected');
          return;
        }
        
        setUser({
          id: session.userId || '1',
          name: session.name || 'Admin',
          email: session.email || 'admin@example.com',
          isAdmin: true,
        });
        
        setIsLoading(false);
      }
    };
    
    loadUserData();
  }, [router]);
  
  // Filter categories based on search term and filters
  useEffect(() => {
    let result = categories;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(category => 
        category.name.toLowerCase().includes(term) || 
        category.description.toLowerCase().includes(term)
      );
    }
    
    // Apply difficulty filter
    if (difficultyFilter !== 'all') {
      result = result.filter(category => category.difficulty === difficultyFilter);
    }
    
    setFilteredCategories(result);
  }, [categories, searchTerm, difficultyFilter]);
  
  // Handle new category creation
  const handleCreateCategory = () => {
    // Validate inputs
    if (!newCategoryName || !newCategoryDescription) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    // Create new category
    const newCategory = {
      id: `${categories.length + 1}`,
      name: newCategoryName,
      description: newCategoryDescription,
      questionCount: 0,
      avgScore: 0,
      difficulty: newCategoryDifficulty
    };
    
    // Add to categories list
    setCategories([...categories, newCategory]);
    
    // Reset form and close dialog
    setNewCategoryName('');
    setNewCategoryDescription('');
    setNewCategoryDifficulty('Medium');
    setIsNewCategoryDialogOpen(false);
    
    // Show success message
    setSuccessMessage('Category created successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle edit category
  const handleEditCategory = (categoryId: string) => {
    const categoryToEdit = categories.find(c => c.id === categoryId);
    if (categoryToEdit) {
      setEditCategoryId(categoryToEdit.id);
      setEditCategoryName(categoryToEdit.name);
      setEditCategoryDescription(categoryToEdit.description);
      setEditCategoryDifficulty(categoryToEdit.difficulty);
      setIsEditCategoryDialogOpen(true);
    }
  };
  
  // Handle update category
  const handleUpdateCategory = () => {
    // Validate inputs
    if (!editCategoryName || !editCategoryDescription) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    // Update category
    const updatedCategories = categories.map(category => {
      if (category.id === editCategoryId) {
        return {
          ...category,
          name: editCategoryName,
          description: editCategoryDescription,
          difficulty: editCategoryDifficulty
        };
      }
      return category;
    });
    
    // Update categories list
    setCategories(updatedCategories);
    
    // Reset form and close dialog
    setIsEditCategoryDialogOpen(false);
    
    // Show success message
    setSuccessMessage('Category updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle delete category dialog
  const handleDeleteCategoryDialog = (categoryId: string) => {
    const categoryToDelete = categories.find(c => c.id === categoryId);
    if (categoryToDelete) {
      setDeleteCategoryId(categoryToDelete.id);
      setDeleteCategoryName(categoryToDelete.name);
      setIsDeleteCategoryDialogOpen(true);
    }
  };
  
  // Handle delete category
  const handleDeleteCategory = () => {
    // Delete category
    const updatedCategories = categories.filter(category => category.id !== deleteCategoryId);
    
    // Update categories list
    setCategories(updatedCategories);
    
    // Reset form and close dialog
    setIsDeleteCategoryDialogOpen(false);
    
    // Show success message
    setSuccessMessage('Category deleted successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-900/30 text-green-400';
      case 'Medium':
        return 'bg-amber-900/30 text-amber-400';
      case 'Hard':
        return 'bg-red-900/30 text-red-400';
      default:
        return 'bg-slate-700 text-slate-400';
    }
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-4">
            <div className="bg-slate-800 rounded-lg p-6 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.name}`} alt={user?.name} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{user?.name}</h2>
              <p className="text-slate-400 text-sm">{user?.email}</p>
              <div className="mt-2 bg-amber-900/30 text-amber-400 px-2 py-1 rounded text-xs flex items-center">
                <Shield className="h-3 w-3 mr-1" />
                Admin
              </div>
            </div>
            
            <div className="bg-slate-800 rounded-lg p-4 space-y-2">
              <Link href="/admin/dashboard" className="block p-2 hover:bg-slate-700 rounded-lg">
                <BarChart className="h-4 w-4 inline-block mr-2" />
                Dashboard
              </Link>
              <Link href="/admin/users" className="block p-2 hover:bg-slate-700 rounded-lg">
                <Users className="h-4 w-4 inline-block mr-2" />
                User Management
              </Link>
              <Link href="/admin/categories" className="block p-2 bg-slate-700 rounded-lg">
                <Tag className="h-4 w-4 inline-block mr-2" />
                Categories
              </Link>
              <Link href="/admin/content" className="block p-2 hover:bg-slate-700 rounded-lg">
                <FileText className="h-4 w-4 inline-block mr-2" />
                Content Management
              </Link>
              <Link href="/admin/coupons" className="block p-2 hover:bg-slate-700 rounded-lg">
                <Percent className="h-4 w-4 inline-block mr-2" />
                Coupon Management
              </Link>
              <Link href="/admin/settings" className="block p-2 hover:bg-slate-700 rounded-lg">
                <Settings className="h-4 w-4 inline-block mr-2" />
                Settings
              </Link>
              <Link href="/protected" className="block p-2 hover:bg-slate-700 rounded-lg">
                Back to App
              </Link>
            </div>
          </div>
          
          {/* Main content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">Category Management</h1>
              <div className="flex gap-2">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsNewCategoryDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  New Category
                </Button>
              </div>
            </div>
            
            {/* Success/Error Messages */}
            {successMessage && (
              <Alert className="mb-4 bg-green-900/30 border-green-800 text-green-200">
                <CheckCircle className="h-4 w-4 mr-2" />
                <AlertDescription>{successMessage}</AlertDescription>
              </Alert>
            )}
            
            {errorMessage && (
              <Alert className="mb-4 bg-red-900/30 border-red-800 text-red-200">
                <XCircle className="h-4 w-4 mr-2" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            {/* Filters */}
            <Card className="bg-slate-800 border-slate-700 text-white mb-6">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      placeholder="Search categories..."
                      className="bg-slate-700 border-slate-600 text-white pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-40">
                      <select
                        className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white"
                        value={difficultyFilter}
                        onChange={(e) => setDifficultyFilter(e.target.value)}
                      >
                        <option value="all">All Difficulties</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                      </select>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-slate-600 text-white hover:bg-slate-700"
                      onClick={() => {
                        setSearchTerm('');
                        setDifficultyFilter('all');
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {filteredCategories.length === 0 ? (
                <div className="col-span-3 text-center py-8 text-slate-400">
                  No categories found
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <Card key={category.id} className="bg-slate-800 border-slate-700 text-white">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-xl">{category.name}</CardTitle>
                        <div className={`px-2 py-1 rounded text-xs ${getDifficultyColor(category.difficulty)}`}>
                          {category.difficulty}
                        </div>
                      </div>
                      <CardDescription className="text-slate-400 line-clamp-2">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Questions</span>
                            <span>{category.questionCount}</span>
                          </div>
                          <Progress value={Math.min(100, (category.questionCount / 100) * 100)} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Avg. Score</span>
                            <span>{category.avgScore}%</span>
                          </div>
                          <Progress value={category.avgScore} className="h-2" />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <div className="flex justify-between w-full">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-slate-600 text-white hover:bg-slate-700"
                          onClick={() => handleEditCategory(category.id)}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-800 text-red-400 hover:bg-red-900/30"
                          onClick={() => handleDeleteCategoryDialog(category.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
            
            {/* Category Performance */}
            <Card className="bg-slate-800 border-slate-700 text-white">
              <CardHeader>
                <CardTitle>Category Performance</CardTitle>
                <CardDescription className="text-slate-300">
                  Average scores across all categories
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories
                    .sort((a, b) => b.avgScore - a.avgScore)
                    .map((category) => (
                      <div key={category.id}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium text-white">{category.name}</span>
                          <span className="text-sm font-medium text-white">{category.avgScore}%</span>
                        </div>
                        <div className="flex items-center">
                          <Progress value={category.avgScore} className="h-2 flex-1" />
                          <span className={`ml-2 px-2 py-1 rounded text-xs ${getDifficultyColor(category.difficulty)}`}>
                            {category.difficulty}
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* New Category Dialog */}
      <Dialog open={isNewCategoryDialogOpen} onOpenChange={setIsNewCategoryDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription className="text-slate-400">
              Add a new question category to the platform
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="EC2 & Compute"
                className="bg-slate-700 border-slate-600 text-white"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Amazon EC2 and related compute services"
                className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                value={newCategoryDescription}
                onChange={(e) => setNewCategoryDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <select
                id="difficulty"
                className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white"
                value={newCategoryDifficulty}
                onChange={(e) => setNewCategoryDifficulty(e.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => setIsNewCategoryDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleCreateCategory}
            >
              Create Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Category Dialog */}
      <Dialog open={isEditCategoryDialogOpen} onOpenChange={setIsEditCategoryDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update category information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Category Name</Label>
              <Input
                id="edit-name"
                placeholder="EC2 & Compute"
                className="bg-slate-700 border-slate-600 text-white"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Amazon EC2 and related compute services"
                className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                value={editCategoryDescription}
                onChange={(e) => setEditCategoryDescription(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-difficulty">Difficulty</Label>
              <select
                id="edit-difficulty"
                className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white"
                value={editCategoryDifficulty}
                onChange={(e) => setEditCategoryDifficulty(e.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => setIsEditCategoryDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleUpdateCategory}
            >
              Update Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Category Dialog */}
      <Dialog open={isDeleteCategoryDialogOpen} onOpenChange={setIsDeleteCategoryDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Delete Category</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete this category? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-white">
              You are about to delete category: <span className="font-bold">{deleteCategoryName}</span>
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => setIsDeleteCategoryDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteCategory}
            >
              Delete Category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
