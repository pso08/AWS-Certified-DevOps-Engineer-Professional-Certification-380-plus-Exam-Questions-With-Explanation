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
  FileUp,
  Link as LinkIcon,
  Eye,
  BookOpen,
  File
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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

// Mock study materials data
const mockStudyMaterials = [
  { id: '1', title: 'AWS EC2 Deep Dive', type: 'pdf', category: 'EC2 & Compute', size: '2.4 MB', downloads: 345, createdAt: '2025-03-15', updatedAt: '2025-04-01' },
  { id: '2', title: 'S3 Storage Best Practices', type: 'pdf', category: 'S3 & Storage', size: '1.8 MB', downloads: 289, createdAt: '2025-03-18', updatedAt: '2025-03-18' },
  { id: '3', title: 'VPC Networking Guide', type: 'pdf', category: 'VPC & Networking', size: '3.2 MB', downloads: 256, createdAt: '2025-03-20', updatedAt: '2025-04-02' },
  { id: '4', title: 'IAM Security Fundamentals', type: 'pdf', category: 'IAM & Security', size: '2.1 MB', downloads: 312, createdAt: '2025-03-22', updatedAt: '2025-03-22' },
  { id: '5', title: 'Lambda Functions Tutorial', type: 'pdf', category: 'Lambda & Serverless', size: '1.5 MB', downloads: 278, createdAt: '2025-03-25', updatedAt: '2025-03-25' },
  { id: '6', title: 'RDS Database Administration', type: 'pdf', category: 'RDS & Databases', size: '2.7 MB', downloads: 234, createdAt: '2025-03-28', updatedAt: '2025-04-05' },
  { id: '7', title: 'CloudFormation Templates', type: 'zip', category: 'CloudFormation & IaC', size: '4.3 MB', downloads: 198, createdAt: '2025-04-01', updatedAt: '2025-04-01' },
  { id: '8', title: 'CloudWatch Monitoring Guide', type: 'pdf', category: 'CloudWatch & Monitoring', size: '1.9 MB', downloads: 176, createdAt: '2025-04-03', updatedAt: '2025-04-03' },
];

// Mock external resources data
const mockExternalResources = [
  { id: '1', title: 'AWS Documentation - EC2', url: 'https://docs.aws.amazon.com/ec2/', category: 'EC2 & Compute', clicks: 423, createdAt: '2025-03-15' },
  { id: '2', title: 'AWS Documentation - S3', url: 'https://docs.aws.amazon.com/s3/', category: 'S3 & Storage', clicks: 387, createdAt: '2025-03-18' },
  { id: '3', title: 'AWS Documentation - VPC', url: 'https://docs.aws.amazon.com/vpc/', category: 'VPC & Networking', clicks: 342, createdAt: '2025-03-20' },
  { id: '4', title: 'AWS Documentation - IAM', url: 'https://docs.aws.amazon.com/iam/', category: 'IAM & Security', clicks: 398, createdAt: '2025-03-22' },
  { id: '5', title: 'AWS Documentation - Lambda', url: 'https://docs.aws.amazon.com/lambda/', category: 'Lambda & Serverless', clicks: 356, createdAt: '2025-03-25' },
  { id: '6', title: 'AWS Documentation - RDS', url: 'https://docs.aws.amazon.com/rds/', category: 'RDS & Databases', clicks: 312, createdAt: '2025-03-28' },
];

// Mock categories data
const mockCategories = [
  { id: '1', name: 'EC2 & Compute' },
  { id: '2', name: 'S3 & Storage' },
  { id: '3', name: 'VPC & Networking' },
  { id: '4', name: 'IAM & Security' },
  { id: '5', name: 'Lambda & Serverless' },
  { id: '6', name: 'RDS & Databases' },
  { id: '7', name: 'CloudFormation & IaC' },
  { id: '8', name: 'CloudWatch & Monitoring' },
  { id: '9', name: 'Route 53 & DNS' },
  { id: '10', name: 'ECS & Containers' },
];

export default function ContentManagementPage() {
  const router = useRouter();
  
  // Admin user state
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Content state
  const [activeTab, setActiveTab] = useState('study-materials');
  const [studyMaterials, setStudyMaterials] = useState(mockStudyMaterials);
  const [externalResources, setExternalResources] = useState(mockExternalResources);
  const [categories, setCategories] = useState(mockCategories);
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [filteredStudyMaterials, setFilteredStudyMaterials] = useState(mockStudyMaterials);
  const [filteredExternalResources, setFilteredExternalResources] = useState(mockExternalResources);
  
  // New study material state
  const [isNewStudyMaterialDialogOpen, setIsNewStudyMaterialDialogOpen] = useState(false);
  const [newStudyMaterialTitle, setNewStudyMaterialTitle] = useState('');
  const [newStudyMaterialCategory, setNewStudyMaterialCategory] = useState('');
  const [newStudyMaterialFile, setNewStudyMaterialFile] = useState<File | null>(null);
  
  // New external resource state
  const [isNewExternalResourceDialogOpen, setIsNewExternalResourceDialogOpen] = useState(false);
  const [newExternalResourceTitle, setNewExternalResourceTitle] = useState('');
  const [newExternalResourceUrl, setNewExternalResourceUrl] = useState('');
  const [newExternalResourceCategory, setNewExternalResourceCategory] = useState('');
  
  // Edit study material state
  const [isEditStudyMaterialDialogOpen, setIsEditStudyMaterialDialogOpen] = useState(false);
  const [editStudyMaterialId, setEditStudyMaterialId] = useState('');
  const [editStudyMaterialTitle, setEditStudyMaterialTitle] = useState('');
  const [editStudyMaterialCategory, setEditStudyMaterialCategory] = useState('');
  
  // Edit external resource state
  const [isEditExternalResourceDialogOpen, setIsEditExternalResourceDialogOpen] = useState(false);
  const [editExternalResourceId, setEditExternalResourceId] = useState('');
  const [editExternalResourceTitle, setEditExternalResourceTitle] = useState('');
  const [editExternalResourceUrl, setEditExternalResourceUrl] = useState('');
  const [editExternalResourceCategory, setEditExternalResourceCategory] = useState('');
  
  // Delete content state
  const [isDeleteContentDialogOpen, setIsDeleteContentDialogOpen] = useState(false);
  const [deleteContentId, setDeleteContentId] = useState('');
  const [deleteContentTitle, setDeleteContentTitle] = useState('');
  const [deleteContentType, setDeleteContentType] = useState('');
  
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
  
  // Filter study materials based on search term and filters
  useEffect(() => {
    let result = studyMaterials;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(material => 
        material.title.toLowerCase().includes(term) || 
        material.category.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(material => material.category === categoryFilter);
    }
    
    setFilteredStudyMaterials(result);
  }, [studyMaterials, searchTerm, categoryFilter]);
  
  // Filter external resources based on search term and filters
  useEffect(() => {
    let result = externalResources;
    
    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(resource => 
        resource.title.toLowerCase().includes(term) || 
        resource.category.toLowerCase().includes(term) ||
        resource.url.toLowerCase().includes(term)
      );
    }
    
    // Apply category filter
    if (categoryFilter !== 'all') {
      result = result.filter(resource => resource.category === categoryFilter);
    }
    
    setFilteredExternalResources(result);
  }, [externalResources, searchTerm, categoryFilter]);
  
  // Handle new study material creation
  const handleCreateStudyMaterial = () => {
    // Validate inputs
    if (!newStudyMaterialTitle || !newStudyMaterialCategory) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    if (!newStudyMaterialFile) {
      setErrorMessage('Please select a file to upload');
      return;
    }
    
    // Create new study material
    const newStudyMaterial = {
      id: `${studyMaterials.length + 1}`,
      title: newStudyMaterialTitle,
      type: newStudyMaterialFile.name.split('.').pop()?.toLowerCase() || 'pdf',
      category: newStudyMaterialCategory,
      size: `${(newStudyMaterialFile.size / (1024 * 1024)).toFixed(1)} MB`,
      downloads: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    };
    
    // Add to study materials list
    setStudyMaterials([...studyMaterials, newStudyMaterial]);
    
    // Reset form and close dialog
    setNewStudyMaterialTitle('');
    setNewStudyMaterialCategory('');
    setNewStudyMaterialFile(null);
    setIsNewStudyMaterialDialogOpen(false);
    
    // Show success message
    setSuccessMessage('Study material uploaded successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle new external resource creation
  const handleCreateExternalResource = () => {
    // Validate inputs
    if (!newExternalResourceTitle || !newExternalResourceUrl || !newExternalResourceCategory) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    // Validate URL
    try {
      new URL(newExternalResourceUrl);
    } catch (e) {
      setErrorMessage('Please enter a valid URL');
      return;
    }
    
    // Create new external resource
    const newExternalResource = {
      id: `${externalResources.length + 1}`,
      title: newExternalResourceTitle,
      url: newExternalResourceUrl,
      category: newExternalResourceCategory,
      clicks: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    // Add to external resources list
    setExternalResources([...externalResources, newExternalResource]);
    
    // Reset form and close dialog
    setNewExternalResourceTitle('');
    setNewExternalResourceUrl('');
    setNewExternalResourceCategory('');
    setIsNewExternalResourceDialogOpen(false);
    
    // Show success message
    setSuccessMessage('External resource added successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle edit study material
  const handleEditStudyMaterial = (materialId: string) => {
    const materialToEdit = studyMaterials.find(m => m.id === materialId);
    if (materialToEdit) {
      setEditStudyMaterialId(materialToEdit.id);
      setEditStudyMaterialTitle(materialToEdit.title);
      setEditStudyMaterialCategory(materialToEdit.category);
      setIsEditStudyMaterialDialogOpen(true);
    }
  };
  
  // Handle update study material
  const handleUpdateStudyMaterial = () => {
    // Validate inputs
    if (!editStudyMaterialTitle || !editStudyMaterialCategory) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    // Update study material
    const updatedStudyMaterials = studyMaterials.map(material => {
      if (material.id === editStudyMaterialId) {
        return {
          ...material,
          title: editStudyMaterialTitle,
          category: editStudyMaterialCategory,
          updatedAt: new Date().toISOString().split('T')[0]
        };
      }
      return material;
    });
    
    // Update study materials list
    setStudyMaterials(updatedStudyMaterials);
    
    // Reset form and close dialog
    setIsEditStudyMaterialDialogOpen(false);
    
    // Show success message
    setSuccessMessage('Study material updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle edit external resource
  const handleEditExternalResource = (resourceId: string) => {
    const resourceToEdit = externalResources.find(r => r.id === resourceId);
    if (resourceToEdit) {
      setEditExternalResourceId(resourceToEdit.id);
      setEditExternalResourceTitle(resourceToEdit.title);
      setEditExternalResourceUrl(resourceToEdit.url);
      setEditExternalResourceCategory(resourceToEdit.category);
      setIsEditExternalResourceDialogOpen(true);
    }
  };
  
  // Handle update external resource
  const handleUpdateExternalResource = () => {
    // Validate inputs
    if (!editExternalResourceTitle || !editExternalResourceUrl || !editExternalResourceCategory) {
      setErrorMessage('Please fill in all required fields');
      return;
    }
    
    // Validate URL
    try {
      new URL(editExternalResourceUrl);
    } catch (e) {
      setErrorMessage('Please enter a valid URL');
      return;
    }
    
    // Update external resource
    const updatedExternalResources = externalResources.map(resource => {
      if (resource.id === editExternalResourceId) {
        return {
          ...resource,
          title: editExternalResourceTitle,
          url: editExternalResourceUrl,
          category: editExternalResourceCategory
        };
      }
      return resource;
    });
    
    // Update external resources list
    setExternalResources(updatedExternalResources);
    
    // Reset form and close dialog
    setIsEditExternalResourceDialogOpen(false);
    
    // Show success message
    setSuccessMessage('External resource updated successfully');
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Handle delete content dialog
  const handleDeleteContentDialog = (contentId: string, contentTitle: string, contentType: string) => {
    setDeleteContentId(contentId);
    setDeleteContentTitle(contentTitle);
    setDeleteContentType(contentType);
    setIsDeleteContentDialogOpen(true);
  };
  
  // Handle delete content
  const handleDeleteContent = () => {
    if (deleteContentType === 'study-material') {
      // Delete study material
      const updatedStudyMaterials = studyMaterials.filter(material => material.id !== deleteContentId);
      setStudyMaterials(updatedStudyMaterials);
    } else if (deleteContentType === 'external-resource') {
      // Delete external resource
      const updatedExternalResources = externalResources.filter(resource => resource.id !== deleteContentId);
      setExternalResources(updatedExternalResources);
    }
    
    // Reset form and close dialog
    setIsDeleteContentDialogOpen(false);
    
    // Show success message
    setSuccessMessage(`${deleteContentType === 'study-material' ? 'Study material' : 'External resource'} deleted successfully`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  // Get file icon based on type
  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-4 w-4 text-red-400" />;
      case 'zip':
        return <File className="h-4 w-4 text-blue-400" />;
      case 'doc':
      case 'docx':
        return <File className="h-4 w-4 text-blue-400" />;
      case 'xls':
      case 'xlsx':
        return <File className="h-4 w-4 text-green-400" />;
      case 'ppt':
      case 'pptx':
        return <File className="h-4 w-4 text-orange-400" />;
      default:
        return <File className="h-4 w-4 text-slate-400" />;
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
              <Link href="/admin/categories" className="block p-2 hover:bg-slate-700 rounded-lg">
                <Tag className="h-4 w-4 inline-block mr-2" />
                Categories
              </Link>
              <Link href="/admin/content" className="block p-2 bg-slate-700 rounded-lg">
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
              <h1 className="text-3xl font-bold">Content Management</h1>
              <div className="flex gap-2">
                {activeTab === 'study-materials' ? (
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => setIsNewStudyMaterialDialogOpen(true)}
                  >
                    <FileUp className="h-4 w-4 mr-2" />
                    Upload Material
                  </Button>
                ) : (
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => setIsNewExternalResourceDialogOpen(true)}
                  >
                    <LinkIcon className="h-4 w-4 mr-2" />
                    Add Resource
                  </Button>
                )}
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
                      placeholder="Search content..."
                      className="bg-slate-700 border-slate-600 text-white pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-4">
                    <div className="w-40">
                      <select
                        className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                      >
                        <option value="all">All Categories</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button 
                      variant="outline" 
                      className="border-slate-600 text-white hover:bg-slate-700"
                      onClick={() => {
                        setSearchTerm('');
                        setCategoryFilter('all');
                      }}
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Content Tabs */}
            <Tabs defaultValue="study-materials" className="mb-6" onValueChange={setActiveTab}>
              <TabsList className="bg-slate-800 border-slate-700">
                <TabsTrigger value="study-materials" className="data-[state=active]:bg-slate-700">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Study Materials
                </TabsTrigger>
                <TabsTrigger value="external-resources" className="data-[state=active]:bg-slate-700">
                  <LinkIcon className="h-4 w-4 mr-2" />
                  External Resources
                </TabsTrigger>
              </TabsList>
              
              {/* Study Materials Tab */}
              <TabsContent value="study-materials">
                <Card className="bg-slate-800 border-slate-700 text-white">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-slate-700">
                          <TableRow>
                            <TableHead className="text-white">Title</TableHead>
                            <TableHead className="text-white">Category</TableHead>
                            <TableHead className="text-white">Type</TableHead>
                            <TableHead className="text-white">Size</TableHead>
                            <TableHead className="text-white">Downloads</TableHead>
                            <TableHead className="text-white">Updated</TableHead>
                            <TableHead className="text-white text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredStudyMaterials.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={7} className="text-center py-8 text-slate-400">
                                No study materials found
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredStudyMaterials.map((material) => (
                              <TableRow key={material.id} className="border-slate-700">
                                <TableCell className="font-medium">
                                  <div className="flex items-center">
                                    {getFileIcon(material.type)}
                                    <span className="ml-2">{material.title}</span>
                                  </div>
                                </TableCell>
                                <TableCell>{material.category}</TableCell>
                                <TableCell className="uppercase">{material.type}</TableCell>
                                <TableCell>{material.size}</TableCell>
                                <TableCell>{material.downloads}</TableCell>
                                <TableCell>{material.updatedAt}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      title="Preview"
                                    >
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      title="Edit"
                                      onClick={() => handleEditStudyMaterial(material.id)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      title="Delete"
                                      onClick={() => handleDeleteContentDialog(material.id, material.title, 'study-material')}
                                    >
                                      <Trash2 className="h-4 w-4 text-red-400" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* External Resources Tab */}
              <TabsContent value="external-resources">
                <Card className="bg-slate-800 border-slate-700 text-white">
                  <CardContent className="p-0">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader className="bg-slate-700">
                          <TableRow>
                            <TableHead className="text-white">Title</TableHead>
                            <TableHead className="text-white">URL</TableHead>
                            <TableHead className="text-white">Category</TableHead>
                            <TableHead className="text-white">Clicks</TableHead>
                            <TableHead className="text-white">Added</TableHead>
                            <TableHead className="text-white text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredExternalResources.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                                No external resources found
                              </TableCell>
                            </TableRow>
                          ) : (
                            filteredExternalResources.map((resource) => (
                              <TableRow key={resource.id} className="border-slate-700">
                                <TableCell className="font-medium">
                                  <div className="flex items-center">
                                    <LinkIcon className="h-4 w-4 text-blue-400 mr-2" />
                                    {resource.title}
                                  </div>
                                </TableCell>
                                <TableCell className="max-w-[200px] truncate">
                                  <a 
                                    href={resource.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline"
                                  >
                                    {resource.url}
                                  </a>
                                </TableCell>
                                <TableCell>{resource.category}</TableCell>
                                <TableCell>{resource.clicks}</TableCell>
                                <TableCell>{resource.createdAt}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      title="Edit"
                                      onClick={() => handleEditExternalResource(resource.id)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button 
                                      variant="ghost" 
                                      size="icon"
                                      title="Delete"
                                      onClick={() => handleDeleteContentDialog(resource.id, resource.title, 'external-resource')}
                                    >
                                      <Trash2 className="h-4 w-4 text-red-400" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
      
      {/* New Study Material Dialog */}
      <Dialog open={isNewStudyMaterialDialogOpen} onOpenChange={setIsNewStudyMaterialDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Upload Study Material</DialogTitle>
            <DialogDescription className="text-slate-400">
              Add a new study material to the platform
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="AWS EC2 Deep Dive"
                className="bg-slate-700 border-slate-600 text-white"
                value={newStudyMaterialTitle}
                onChange={(e) => setNewStudyMaterialTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white"
                value={newStudyMaterialCategory}
                onChange={(e) => setNewStudyMaterialCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="file">File</Label>
              <div className="border border-dashed border-slate-600 rounded-md p-6 text-center">
                <input
                  type="file"
                  id="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setNewStudyMaterialFile(e.target.files[0]);
                    }
                  }}
                />
                <label htmlFor="file" className="cursor-pointer">
                  <FileUp className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-sm text-slate-400">
                    {newStudyMaterialFile ? (
                      <>
                        <span className="font-medium text-white">{newStudyMaterialFile.name}</span>
                        <br />
                        <span>
                          {(newStudyMaterialFile.size / (1024 * 1024)).toFixed(2)} MB
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="font-medium">Click to upload</span> or drag and drop
                        <br />
                        <span>PDF, DOC, XLS, PPT, ZIP (max 10MB)</span>
                      </>
                    )}
                  </p>
                </label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => setIsNewStudyMaterialDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleCreateStudyMaterial}
            >
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* New External Resource Dialog */}
      <Dialog open={isNewExternalResourceDialogOpen} onOpenChange={setIsNewExternalResourceDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Add External Resource</DialogTitle>
            <DialogDescription className="text-slate-400">
              Add a new external resource link to the platform
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="resource-title">Title</Label>
              <Input
                id="resource-title"
                placeholder="AWS Documentation - EC2"
                className="bg-slate-700 border-slate-600 text-white"
                value={newExternalResourceTitle}
                onChange={(e) => setNewExternalResourceTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-url">URL</Label>
              <Input
                id="resource-url"
                placeholder="https://docs.aws.amazon.com/ec2/"
                className="bg-slate-700 border-slate-600 text-white"
                value={newExternalResourceUrl}
                onChange={(e) => setNewExternalResourceUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resource-category">Category</Label>
              <select
                id="resource-category"
                className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white"
                value={newExternalResourceCategory}
                onChange={(e) => setNewExternalResourceCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => setIsNewExternalResourceDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleCreateExternalResource}
            >
              Add Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Study Material Dialog */}
      <Dialog open={isEditStudyMaterialDialogOpen} onOpenChange={setIsEditStudyMaterialDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Edit Study Material</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update study material information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                placeholder="AWS EC2 Deep Dive"
                className="bg-slate-700 border-slate-600 text-white"
                value={editStudyMaterialTitle}
                onChange={(e) => setEditStudyMaterialTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-category">Category</Label>
              <select
                id="edit-category"
                className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white"
                value={editStudyMaterialCategory}
                onChange={(e) => setEditStudyMaterialCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => setIsEditStudyMaterialDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleUpdateStudyMaterial}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit External Resource Dialog */}
      <Dialog open={isEditExternalResourceDialogOpen} onOpenChange={setIsEditExternalResourceDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Edit External Resource</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update external resource information
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-resource-title">Title</Label>
              <Input
                id="edit-resource-title"
                placeholder="AWS Documentation - EC2"
                className="bg-slate-700 border-slate-600 text-white"
                value={editExternalResourceTitle}
                onChange={(e) => setEditExternalResourceTitle(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-resource-url">URL</Label>
              <Input
                id="edit-resource-url"
                placeholder="https://docs.aws.amazon.com/ec2/"
                className="bg-slate-700 border-slate-600 text-white"
                value={editExternalResourceUrl}
                onChange={(e) => setEditExternalResourceUrl(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-resource-category">Category</Label>
              <select
                id="edit-resource-category"
                className="w-full h-10 rounded-md border border-slate-600 bg-slate-700 px-3 py-2 text-sm text-white"
                value={editExternalResourceCategory}
                onChange={(e) => setEditExternalResourceCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => setIsEditExternalResourceDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              onClick={handleUpdateExternalResource}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Content Dialog */}
      <Dialog open={isDeleteContentDialogOpen} onOpenChange={setIsDeleteContentDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Delete Content</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to delete this content? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p className="text-white">
              You are about to delete: <span className="font-bold">{deleteContentTitle}</span>
            </p>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              className="border-slate-600 text-white hover:bg-slate-700"
              onClick={() => setIsDeleteContentDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDeleteContent}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
