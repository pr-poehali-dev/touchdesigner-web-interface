import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [brightness, setBrightness] = useState([75]);
  const [activeMode, setActiveMode] = useState('visual');
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [quickStates, setQuickStates] = useState({
    recording: false,
    streaming: false,
    preview: true,
  });

  const modes = [
    { id: 'visual', name: 'Visual', description: 'Визуальные эффекты и анимация', color: 'bg-accent' },
    { id: 'audio', name: 'Audio', description: 'Аудиореактивная обработка', color: 'bg-primary' },
    { id: 'interactive', name: 'Interactive', description: 'Интерактивное управление', color: 'bg-secondary' },
    { id: 'generative', name: 'Generative', description: 'Генеративные алгоритмы', color: 'bg-muted' },
  ];

  const quickActions = [
    { id: 'reset', name: 'Reset', icon: 'RotateCcw' },
    { id: 'fullscreen', name: 'Fullscreen', icon: 'Maximize2' },
    { id: 'export', name: 'Export', icon: 'Download' },
    { id: 'settings', name: 'Settings', icon: 'Settings' },
  ];

  const toggleQuickState = (state: keyof typeof quickStates) => {
    setQuickStates(prev => ({ ...prev, [state]: !prev[state] }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">TouchDesigner Control</h1>
          <p className="text-muted-foreground text-lg">Минималистичное управление визуальными проектами</p>
          
          <div className="flex items-center justify-center space-x-4">
            <Badge variant={isLiveMode ? "default" : "secondary"} className="px-4 py-2">
              <Icon name="Circle" size={8} className="mr-2 fill-current" />
              {isLiveMode ? 'LIVE' : 'OFFLINE'}
            </Badge>
            <Switch
              checked={isLiveMode}
              onCheckedChange={setIsLiveMode}
              aria-label="Toggle live mode"
            />
          </div>
        </div>

        {/* Mode Control Cards */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Режимы работы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modes.map((mode) => (
              <Card
                key={mode.id}
                className={`cursor-pointer transition-all duration-200 hover:scale-105 border-2 ${
                  activeMode === mode.id ? 'border-accent shadow-lg' : 'border-border'
                }`}
                onClick={() => setActiveMode(mode.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{mode.name}</CardTitle>
                    <div className={`w-4 h-4 rounded-full ${mode.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {mode.description}
                  </CardDescription>
                  {activeMode === mode.id && (
                    <Badge className="mt-3 bg-accent text-accent-foreground">
                      Активен
                    </Badge>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Brightness Control */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Управление яркостью</h2>
          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-medium">Яркость</h3>
                  <p className="text-muted-foreground">Глобальное управление интенсивностью</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{brightness[0]}%</div>
                  <div className="text-sm text-muted-foreground">Текущее значение</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Slider
                  value={brightness}
                  onValueChange={setBrightness}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
                
                {/* Visual Preview */}
                <div className="h-20 rounded-lg border-2 border-border overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-black via-accent to-white transition-opacity duration-300"
                    style={{ opacity: brightness[0] / 100 }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setBrightness([0])}
                  size="sm"
                >
                  Min
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setBrightness([50])}
                  size="sm"
                >
                  50%
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setBrightness([100])}
                  size="sm"
                >
                  Max
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Быстрые действия</h2>
          
          {/* State Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                quickStates.recording ? 'bg-destructive/10 border-destructive' : ''
              }`}
              onClick={() => toggleQuickState('recording')}
            >
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-3">
                  <Icon name="Circle" size={16} className={quickStates.recording ? 'text-destructive fill-current' : ''} />
                  <span className="font-medium">Recording</span>
                </div>
                <Switch checked={quickStates.recording} readOnly />
              </CardContent>
            </Card>
            
            <Card
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                quickStates.streaming ? 'bg-accent/10 border-accent' : ''
              }`}
              onClick={() => toggleQuickState('streaming')}
            >
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-3">
                  <Icon name="Radio" size={16} className={quickStates.streaming ? 'text-accent' : ''} />
                  <span className="font-medium">Streaming</span>
                </div>
                <Switch checked={quickStates.streaming} readOnly />
              </CardContent>
            </Card>
            
            <Card
              className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                quickStates.preview ? 'bg-primary/10 border-primary' : ''
              }`}
              onClick={() => toggleQuickState('preview')}
            >
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-3">
                  <Icon name="Eye" size={16} className={quickStates.preview ? 'text-primary' : ''} />
                  <span className="font-medium">Preview</span>
                </div>
                <Switch checked={quickStates.preview} readOnly />
              </CardContent>
            </Card>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.id}
                variant="outline"
                size="lg"
                className="h-20 flex-col space-y-2 hover:bg-accent hover:text-accent-foreground transition-colors duration-200"
              >
                <Icon name={action.icon as any} size={24} />
                <span>{action.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Status Footer */}
        <div className="border-t border-border pt-6">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div>TouchDesigner v2024.1</div>
            <div className="flex items-center space-x-4">
              <span>FPS: 60</span>
              <span>•</span>
              <span>Режим: {modes.find(m => m.id === activeMode)?.name}</span>
              <span>•</span>
              <span className={isLiveMode ? 'text-accent' : ''}>
                {isLiveMode ? 'Подключен' : 'Отключен'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}