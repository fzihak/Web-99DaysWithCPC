'use client'

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronRight } from 'lucide-react';

export const TemplateSelector = ({ selectedTemplate, setSelectedTemplate, templates }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Object.entries(templates).map(([key, template]) => (
        <Card
          key={key}
          className={`cursor-pointer transition-all ${
            selectedTemplate === key ? 'ring-2 ring-primary' : ''
          }`}
          onClick={() => setSelectedTemplate(key)}
        >
          <CardContent className="p-6">
            <div className="text-3xl mb-4">{template.preview}</div>
            <div className="space-y-2">
              <h3 className="font-semibold flex items-center gap-2">
                {template.name}
                {template.recommended && (
                  <Badge variant="default" className="text-xs">
                    Recommended
                  </Badge>
                )}
              </h3>
              <p className="text-sm text-gray-500">{template.description}</p>
              <div className="space-y-1">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <ChevronRight className="w-4 h-4 mr-1" />
                    <span>{feature.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

