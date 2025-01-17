'use client'

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Layout, List } from 'lucide-react';
import { TECH_CATEGORIES } from './constants';

export const TechStackSelector = ({ onSelect, selectedTech }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState('all');
  const [view, setView] = useState('grid');

  const getFilteredTech = () => {
    let techList = [];
    
    if (activeCategory === 'all') {
      Object.values(TECH_CATEGORIES).forEach(category => {
        Object.values(category.subcategories).forEach(subcategory => {
          techList = [...techList, ...subcategory.items];
        });
      });
    } else {
      const category = TECH_CATEGORIES[activeCategory];
      if (activeSubcategory === 'all') {
        Object.values(category.subcategories).forEach(subcategory => {
          techList = [...techList, ...subcategory.items];
        });
      } else {
        techList = category.subcategories[activeSubcategory].items;
      }
    }

    return techList.filter(tech => 
      tech.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredTech = getFilteredTech();

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center mb-4">
        <div className="relative flex-grow w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search technologies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={view === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('grid')}
          >
            <Layout className="w-4 h-4" />
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="flex flex-wrap gap-2 pb-4">
          <Badge
            variant={activeCategory === 'all' ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => {
              setActiveCategory('all');
              setActiveSubcategory('all');
            }}
          >
            All
          </Badge>
          {Object.entries(TECH_CATEGORIES).map(([key, category]) => (
            <Badge
              key={key}
              variant={activeCategory === key ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => {
                setActiveCategory(key);
                setActiveSubcategory('all');
              }}
            >
              <category.icon className="w-4 h-4 mr-1" />
              {category.name}
            </Badge>
          ))}
        </div>

        {activeCategory !== 'all' && (
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge
              variant={activeSubcategory === 'all' ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => setActiveSubcategory('all')}
            >
              All {TECH_CATEGORIES[activeCategory].name}
            </Badge>
            {Object.entries(TECH_CATEGORIES[activeCategory].subcategories)
              .map(([key, subcategory]) => (
                <Badge
                  key={key}
                  variant={activeSubcategory === key ? 'default' : 'outline'}
                  className="cursor-pointer"
                  onClick={() => setActiveSubcategory(key)}
                >
                  {subcategory.name}
                </Badge>
              ))}
          </div>
        )}

        <div className={view === 'grid' ? 
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 
          'space-y-2'
        }>
          {filteredTech.map(tech => (
            <div
              key={tech}
              className={`p-2 rounded border transition-all ${
                selectedTech.includes(tech) 
                  ? 'bg-primary/10 border-primary' 
                  : 'hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
              onClick={() => onSelect(tech)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={`/placeholder.svg?height=24&width=24&text=${tech[0]}`}
                    alt={tech}
                    className="w-6 h-6 rounded"
                  />
                  <span>{tech}</span>
                </div>
                {selectedTech.includes(tech) && (
                  <Badge variant="default" className="text-xs">
                    Selected
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

