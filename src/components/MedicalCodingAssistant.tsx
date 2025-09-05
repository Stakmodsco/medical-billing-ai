import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { useAI, MedicalCoding } from '@/hooks/useAI';
import { Code, BookOpen, AlertTriangle, Copy, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const MedicalCodingAssistant = () => {
  const [medicalText, setMedicalText] = useState('');
  const [coding, setCoding] = useState<MedicalCoding | null>(null);
  const { isLoading, generateMedicalCoding } = useAI();
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!medicalText.trim()) return;
    
    try {
      const result = await generateMedicalCoding(medicalText);
      setCoding(result);
    } catch (error) {
      console.error('Coding generation failed:', error);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${type} Copied`,
      description: `${type} codes copied to clipboard`,
    });
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            AI Medical Coding Assistant
          </CardTitle>
          <CardDescription>
            Generate accurate ICD-10 and CPT codes from medical documentation
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Medical Documentation
            </label>
            <Textarea
              placeholder="Enter clinical notes, diagnosis, procedures, or treatment descriptions..."
              value={medicalText}
              onChange={(e) => setMedicalText(e.target.value)}
              rows={6}
              className="resize-none"
            />
          </div>
          
          <Button 
            onClick={handleGenerate}
            disabled={!medicalText.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Code className="h-4 w-4 mr-2 animate-spin" />
                Generating Codes...
              </>
            ) : (
              <>
                <Code className="h-4 w-4 mr-2" />
                Generate Medical Codes
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {coding && (
        <Card>
          <CardHeader>
            <CardTitle>Generated Medical Codes</CardTitle>
            <CardDescription>
              AI-generated ICD-10 and CPT codes with confidence scoring
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-center">
                <div className={`text-2xl font-bold mb-1 ${getConfidenceColor(coding.confidence)}`}>
                  {Math.round(coding.confidence * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Confidence</div>
                <Progress value={coding.confidence * 100} className="mt-2 w-20" />
              </div>
              
              <Badge variant={coding.confidence >= 0.8 ? 'default' : 'secondary'}>
                {coding.confidence >= 0.9 ? 'High Confidence' : 
                 coding.confidence >= 0.7 ? 'Medium Confidence' : 'Low Confidence'}
              </Badge>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* ICD-10 Codes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold flex items-center gap-2">
                    <BookOpen className="h-4 w-4" />
                    ICD-10 Diagnosis Codes
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(coding.icd10.join(', '), 'ICD-10')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {coding.icd10.map((code, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                      <Badge variant="outline" className="font-mono">
                        {code}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Primary diagnosis code
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CPT Codes */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    CPT Procedure Codes
                  </h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(coding.cpt.join(', '), 'CPT')}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {coding.cpt.map((code, index) => (
                    <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                      <Badge variant="outline" className="font-mono">
                        {code}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        Procedure/service code
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {coding.suggestions.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    Coding Suggestions
                  </h4>
                  <ul className="space-y-2">
                    {coding.suggestions.map((suggestion, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" size="sm">
                Verify Codes
              </Button>
              <Button variant="outline" size="sm">
                Export Report
              </Button>
              <Button size="sm" className="ml-auto">
                Apply to Claim
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};