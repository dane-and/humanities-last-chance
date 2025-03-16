
import React, { useState, useEffect } from 'react';
import { Article } from '@/lib/types/article';
import { getArticlesFromStorage } from '@/lib/utils/storage/articleStorage';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { BarChart3, LineChart as LineChartIcon, BarChart as BarChartIcon, Activity } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Generate simple demo analytics data
const generateDemoData = (days: number) => {
  const data = [];
  const today = new Date();
  
  for (let i = days; i > 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      views: Math.floor(Math.random() * 100) + 10,
      visitors: Math.floor(Math.random() * 60) + 5,
    });
  }
  
  return data;
};

const AnalyticsDashboard: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [chartData, setChartData] = useState(generateDemoData(14));
  
  useEffect(() => {
    // Load actual articles
    const loadedArticles = getArticlesFromStorage();
    setArticles(loadedArticles);
    
    // In a real implementation, we would fetch actual analytics data here
  }, []);
  
  // Calculate totals for the dashboard
  const totalViews = articles.reduce((sum, article) => sum + (article.analytics?.views || 0), 0);
  const totalVisitors = articles.reduce((sum, article) => sum + (article.analytics?.uniqueVisitors || 0), 0);
  
  // Find most viewed article
  const mostViewedArticle = articles.length > 0 ? 
    articles.reduce((prev, current) => 
      (prev.analytics?.views || 0) > (current.analytics?.views || 0) ? prev : current
    ) : null;
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Page Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews || chartData.reduce((sum, item) => sum + item.views, 0)}</div>
            <p className="text-xs text-muted-foreground">+12.5% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalVisitors || chartData.reduce((sum, item) => sum + item.visitors, 0)}</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Popular Article</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-md font-bold truncate">
              {mostViewedArticle?.title || articles[0]?.title || "No articles yet"}
            </div>
            <p className="text-xs text-muted-foreground">
              {mostViewedArticle?.analytics?.views || 123} views
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Traffic Overview
            </CardTitle>
            <CardDescription>Daily views and visitors for the last 14 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#8884d8" activeDot={{ r: 8 }} name="Views" />
                  <Line type="monotone" dataKey="visitors" stroke="#82ca9d" name="Visitors" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Top Articles
            </CardTitle>
            <CardDescription>Views by article</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={articles.slice(0, 5).map(a => ({
                    name: a.title.substring(0, 20) + (a.title.length > 20 ? '...' : ''),
                    views: a.analytics?.views || Math.floor(Math.random() * 100) + 10
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="views" fill="#8884d8" name="Views" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
