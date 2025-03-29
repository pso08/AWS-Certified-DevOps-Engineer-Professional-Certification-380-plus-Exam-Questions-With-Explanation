'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import Link from 'next/link';
import questionsData from '../../questions.json';
import { Domain } from '@/lib/types';

// Define the structure for search results
interface SearchResult {
  id: string;
  question: string;
  answer: string;
  domain?: Domain;
  matchScore: number;
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recent_searches');
      if (saved) {
        setRecentSearches(JSON.parse(saved));
      }
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (query: string) => {
    if (!query.trim()) return;
    
    const updatedSearches = [
      query,
      ...recentSearches.filter(s => s !== query)
    ].slice(0, 5);
    
    setRecentSearches(updatedSearches);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('recent_searches', JSON.stringify(updatedSearches));
    }
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('recent_searches');
    }
  };

  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    saveRecentSearch(searchQuery);
    
    // Simulate search delay
    setTimeout(() => {
      const results = performSearch(searchQuery, selectedDomain);
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  // Perform search on questions data
  const performSearch = (query: string, domain: string): SearchResult[] => {
    const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 2);
    
    if (searchTerms.length === 0) return [];
    
    return questionsData.questions
      .filter(q => {
        // Filter by domain if selected
        if (domain !== 'all') {
          // This is a simplification since we don't have actual domain data in the questions
          // In a real implementation, you would check the actual domain property
          return true;
        }
        return true;
      })
      .map(q => {
        // Calculate match score based on term frequency
        const questionText = q.question.toLowerCase();
        const explanationText = q.explanation.toLowerCase();
        
        let matchScore = 0;
        
        // Check for exact phrase match (highest score)
        if (questionText.includes(query.toLowerCase())) {
          matchScore += 10;
        }
        
        // Check for individual term matches
        searchTerms.forEach(term => {
          // Match in question (high score)
          if (questionText.includes(term)) {
            matchScore += 3;
          }
          
          // Match in explanation (medium score)
          if (explanationText.includes(term)) {
            matchScore += 1;
          }
          
          // Match in options (low score)
          Object.values(q.options).forEach(option => {
            if (option.toLowerCase().includes(term)) {
              matchScore += 0.5;
            }
          });
        });
        
        return {
          id: q.id,
          question: q.question,
          answer: q.answer,
          // Assign a random domain for demonstration
          domain: Object.values(Domain)[Math.floor(Math.random() * Object.values(Domain).length)],
          matchScore
        };
      })
      .filter(result => result.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 20); // Limit to top 20 results
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold">Search Questions</h1>
          <Link href="/">
            <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-700">
              Back to Home
            </Button>
          </Link>
        </div>
        
        <Card className="bg-slate-800 border-slate-700 mb-8">
          <CardHeader>
            <CardTitle>Find Specific Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Search by keyword, topic, or question content..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={selectedDomain}
                  onChange={(e) => setSelectedDomain(e.target.value)}
                  className="bg-slate-700 border border-slate-600 rounded-md px-3 py-2 text-white"
                >
                  <option value="all">All Domains</option>
                  {Object.values(Domain).map((domain) => (
                    <option key={domain} value={domain}>
                      {domain}
                    </option>
                  ))}
                </select>
                <Button 
                  onClick={handleSearch}
                  disabled={isSearching || !searchQuery.trim()}
                  className="bg-blue-600 hover:bg-blue-700 min-w-[100px]"
                >
                  {isSearching ? 'Searching...' : 'Search'}
                </Button>
              </div>
            </div>
            
            {recentSearches.length > 0 && (
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium text-slate-400">Recent Searches</h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearRecentSearches}
                    className="h-6 text-xs text-slate-400 hover:text-white"
                  >
                    Clear
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <Badge 
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-slate-700"
                      onClick={() => {
                        setSearchQuery(search);
                        handleSearch();
                      }}
                    >
                      {search}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Tabs defaultValue="results" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="results">Search Results</TabsTrigger>
            <TabsTrigger value="browse">Browse by Domain</TabsTrigger>
          </TabsList>
          
          <TabsContent value="results" className="mt-4">
            {searchResults.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <p className="text-slate-400">Found {searchResults.length} results for "{searchQuery}"</p>
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-slate-400" />
                    <span className="text-sm text-slate-400">Sort by: </span>
                    <select className="bg-slate-700 border border-slate-600 rounded-md px-2 py-1 text-sm text-white">
                      <option value="relevance">Relevance</option>
                      <option value="id">Question ID</option>
                    </select>
                  </div>
                </div>
                
                {searchResults.map((result) => (
                  <Card key={result.id} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="mb-2">Question {result.id}</Badge>
                        <Badge className="bg-blue-600">{result.domain}</Badge>
                      </div>
                      <h3 className="text-lg font-medium mb-2">{result.question}</h3>
                      <div className="flex justify-between items-center mt-4">
                        <div className="text-sm text-slate-400">
                          Answer: <span className="text-white font-medium">{result.answer}</span>
                        </div>
                        <Link href={`/quiz?id=${result.id}`}>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            View Question
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : searchQuery && !isSearching ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                  <X className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">No results found</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  We couldn't find any questions matching "{searchQuery}". Try using different keywords or browse by domain.
                </p>
              </div>
            ) : !searchQuery ? (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Search for questions</h3>
                <p className="text-slate-400 max-w-md mx-auto">
                  Enter keywords, topics, or phrases to find specific questions in our database.
                </p>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-800 mb-4 animate-pulse">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-medium mb-2">Searching...</h3>
                <p className="text-slate-400">Looking for questions matching your query</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="browse" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(Domain).map((domain) => (
                <Card 
                  key={domain} 
                  className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedDomain(domain);
                    setSearchQuery('');
                    setSearchResults(performSearch('', domain));
                  }}
                >
                  <CardContent className="pt-6">
                    <h3 className="text-lg font-medium mb-2">{domain}</h3>
                    <p className="text-slate-400 text-sm mb-4">
                      Browse all questions related to {domain.toLowerCase()} concepts and practices.
                    </p>
                    <Button 
                      variant="outline" 
                      className="w-full border-slate-600 text-white hover:bg-slate-700"
                    >
                      Browse Domain
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
