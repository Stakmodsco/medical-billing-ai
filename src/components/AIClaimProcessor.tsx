import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useAI, ClaimAnalysis } from '@/hooks/useAI';
import { Brain, CheckCircle, AlertTriangle, Clock, TrendingUp } from 'lucide-react';

export const AIClaimProcessor = () => {
  const [claimText, setClaimText] = useState('');
  const [analysis, setAnalysis] = useState<ClaimAnalysis | null>(null);
  const { isLoading, analyzeClaim } = useAI();

  const handleAnalyze = async () => {
    if (!claimText.trim()) return;
    
    const mockClaimData = {
      text: claimText,
      timestamp: new Date().toISOString()
    };
    
    try {
      const result = await analyzeClaim(mockClaimData);
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'approve': return 'success';
      case 'review': return 'warning';
      case 'deny': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'approve': return <CheckCircle className="h-4 w-4" />;
      case 'review': return <AlertTriangle className="h-4 w-4" />;
      case 'deny': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI-Powered Claim Analysis
          </CardTitle>
          <CardDescription>
            Input claim details for intelligent processing and risk assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Claim Details
            </label>
            <Textarea
              placeholder="Enter claim information, medical procedures, diagnosis codes, etc..."
              value={claimText}
              onChange={(e) => setClaimText(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
          
          <Button 
            onClick={handleAnalyze}
            disabled={!claimText.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Brain className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Claim...
              </>
            ) : (
              <>
                <Brain className="h-4 w-4 mr-2" />
                Analyze with AI
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Analysis Results</CardTitle>
            <CardDescription>
              AI-generated insights and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {Math.round(analysis.confidence * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Confidence</div>
                <Progress value={analysis.confidence * 100} className="mt-2" />
              </div>
              
              <div className="text-center">
                <Badge 
                  variant={getRecommendationColor(analysis.recommendation) as any}
                  className="mb-2 capitalize"
                >
                  {getRecommendationIcon(analysis.recommendation)}
                  <span className="ml-1">{analysis.recommendation}</span>
                </Badge>
                <div className="text-sm text-muted-foreground">Recommendation</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">
                  {analysis.estimatedProcessingTime}h
                </div>
                <div className="text-sm text-muted-foreground">Est. Processing</div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Key Findings
                </h4>
                <ul className="space-y-1">
                  {analysis.reasons.map((reason, index) => (
                    <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              {analysis.riskFactors.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    Risk Factors
                  </h4>
                  <ul className="space-y-1">
                    {analysis.riskFactors.map((factor, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" size="sm">
                Review Details
              </Button>
              <Button variant="outline" size="sm">
                Generate Report
              </Button>
              <Button size="sm" className="ml-auto">
                Process Claim
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};