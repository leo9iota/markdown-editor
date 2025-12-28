'use client';

import { useState } from 'react';

import { MarkdownEditor } from '@leo9iota/markdown-editor';
import { ArrowLeft, Home, Save, Settings } from 'lucide-react';

import { ModeToggle } from '@/components/common/mode-toggle';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function ExamplePage() {
  const [content, setContent] = useState(
    '<h1>Welcome to the Course</h1><p>Start editing your lesson content here...</p>'
  );

  return (
    <div className='bg-background text-foreground min-h-screen font-sans transition-colors duration-300'>
      {/* Header */}
      <header className='bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
        <div className='container mx-auto flex h-14 items-center justify-between px-4'>
          <div className='flex items-center gap-4'>
            <Button variant='ghost' size='icon'>
              <ArrowLeft className='h-4 w-4' />
            </Button>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/' className='flex items-center gap-2'>
                    <Home className='h-4 w-4' />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/courses'>Courses</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Advanced React Patterns</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='outline'>
              <Settings className='mr-2 h-4 w-4' />
              Settings
            </Button>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className='container mx-auto max-w-5xl space-y-8 p-6 md:p-8'>
        <div className='flex items-center justify-between'>
          <div className='space-y-1'>
            <h1 className='text-3xl font-bold tracking-tight'>Lesson Editor</h1>
            <p className='text-muted-foreground'>Manage your lesson content and settings.</p>
          </div>
          <div className='flex items-center gap-2'>
            <Button variant='destructive'>Discard</Button>
            <Button>
              <Save className='mr-2 h-4 w-4' />
              Save Changes
            </Button>
          </div>
        </div>

        <div className='grid gap-6 md:grid-cols-[2fr_1fr]'>
          <div className='space-y-6'>
            {/* General Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>Configure the basic details for this lesson.</CardDescription>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='title'>Lesson Title</Label>
                  <Input id='title' defaultValue='Understanding React Hooks' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='slug'>Slug</Label>
                  <Input id='slug' defaultValue='understanding-react-hooks' />
                </div>
              </CardContent>
            </Card>

            {/* Editor Card */}
            <Card>
              <CardHeader>
                <CardTitle>Content</CardTitle>
                <CardDescription>Visual editor for the lesson body content.</CardDescription>
              </CardHeader>
              <CardContent>
                <MarkdownEditor
                  value={content}
                  onChange={setContent}
                  placeholder='Start writing your lesson content...'
                />
              </CardContent>
            </Card>

            {/* Preview Card */}
            <Card>
              <CardHeader>
                <CardTitle>HTML Output Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className='bg-muted h-[200px] w-full rounded-md border p-4'>
                  <pre className='text-muted-foreground whitespace-pre-wrap wrap-break-word font-mono text-xs'>
                    {content}
                  </pre>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>

          <div className='space-y-6'>
            {/* Publishing Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Publishing</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='flex items-center space-x-2'>
                  <Switch id='published' defaultChecked />
                  <Label htmlFor='published'>Published</Label>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='date'>Publish Date</Label>
                  <Input type='date' id='date' />
                </div>
              </CardContent>
            </Card>

            {/* Metadata */}
            <Card>
              <CardHeader>
                <CardTitle>Metadata</CardTitle>
              </CardHeader>
              <CardContent className='space-y-4'>
                <div className='space-y-2'>
                  <Label htmlFor='duration'>Duration (mins)</Label>
                  <Input type='number' id='duration' defaultValue='45' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='difficulty'>Difficulty</Label>
                  <Select defaultValue='intermediate'>
                    <SelectTrigger>
                      <SelectValue placeholder='Select difficulty' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='beginner'>Beginner</SelectItem>
                      <SelectItem value='intermediate'>Intermediate</SelectItem>
                      <SelectItem value='advanced'>Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
