import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { useAI, ClaimAnalysis } from '@/hooks/useAI';
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  X,
  Plus,
  Brain,
  TrendingUp,
  AlertTriangle
} from 'lucide-react';

interface ProcessClaimsPanelProps {
  onClose: () => void;
}

export const ProcessClaimsPanel = ({ onClose }: ProcessClaimsPanelProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [analysis, setAnalysis] = useState<ClaimAnalysis | null>(null);
  const { toast } = useToast();
  const { isLoading: isAnalyzing, analyzeClaim } = useAI();

  const [claimData, setClaimData] = useState({
    patientName: '',
    insuranceProvider: '',
    claimAmount: '',
    serviceDate: '',
    serviceDescription: '',
    providerNotes: ''
  });

  const recentClaims = [
    { id: 'HC-2024-001', patient: 'John Smith', amount: '$2,450', status: 'approved', date: '2024-01-15' },
    { id: 'HC-2024-002', patient: 'Sarah Johnson', amount: '$1,850', status: 'pending', date: '2024-01-14' },
    { id: 'HC-2024-003', patient: 'Mike Davis', amount: '$3,200', status: 'reviewing', date: '2024-01-13' },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} ready for processing`,
      });
    }
  };

  const handleAnalyzeClaim = async () => {
    if (!claimData.patientName || !claimData.serviceDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in patient name and service description to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    const mockClaimData = {
      patientName: claimData.patientName,
      serviceDescription: claimData.serviceDescription,
      providerNotes: claimData.providerNotes,
      claimAmount: claimData.claimAmount,
      insuranceProvider: claimData.insuranceProvider,
      timestamp: new Date().toISOString()
    };
    
    try {
      const result = await analyzeClaim(mockClaimData);
      setAnalysis(result);
      toast({
        title: "Analysis Complete",
        description: "AI analysis has been generated for your claim.",
      });
    } catch (error) {
      console.error('Analysis failed:', error);
    }
  };

  const handleProcessClaim = async () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    // Simulate processing with progress updates
    const interval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          toast({
            title: "Claim Processed Successfully",
            description: "Your claim has been validated and submitted to the insurance provider.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-success/20 text-success border-success/30">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-warning/20 text-warning border-warning/30">Pending</Badge>;
      case 'reviewing':
        return <Badge className="bg-primary/20 text-primary border-primary/30">Reviewing</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
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
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Process Claims</h2>
              <p className="text-muted-foreground">Submit and track insurance claims with AI validation</p>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* New Claim Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  New Claim
                </CardTitle>
                <CardDescription>Create and submit a new insurance claim</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName">Patient Name</Label>
                    <Input
                      id="patientName"
                      value={claimData.patientName}
                      onChange={(e) => setClaimData(prev => ({ ...prev, patientName: e.target.value }))}
                      placeholder="Enter patient name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="claimAmount">Claim Amount</Label>
                    <Input
                      id="claimAmount"
                      type="number"
                      value={claimData.claimAmount}
                      onChange={(e) => setClaimData(prev => ({ ...prev, claimAmount: e.target.value }))}
                      placeholder="$0.00"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                  <Select onValueChange={(value) => setClaimData(prev => ({ ...prev, insuranceProvider: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select insurance provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue-cross">Blue Cross Blue Shield</SelectItem>
                      <SelectItem value="aetna">Aetna</SelectItem>
                      <SelectItem value="united">United Healthcare</SelectItem>
                      <SelectItem value="cigna">Cigna</SelectItem>
                      <SelectItem value="humana">Humana</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="serviceDate">Service Date</Label>
                    <Input
                      id="serviceDate"
                      type="date"
                      value={claimData.serviceDate}
                      onChange={(e) => setClaimData(prev => ({ ...prev, serviceDate: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="file-upload">Supporting Documents</Label>
                    <div className="relative">
                      <Input
                        id="file-upload"
                        type="file"
                        onChange={handleFileUpload}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => document.getElementById('file-upload')?.click()}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        {selectedFile ? selectedFile.name : 'Upload Files'}
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="serviceDescription">Service Description</Label>
                  <Textarea
                    id="serviceDescription"
                    value={claimData.serviceDescription}
                    onChange={(e) => setClaimData(prev => ({ ...prev, serviceDescription: e.target.value }))}
                    placeholder="Describe the medical service provided..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="providerNotes">Provider Notes</Label>
                  <Textarea
                    id="providerNotes"
                    value={claimData.providerNotes}
                    onChange={(e) => setClaimData(prev => ({ ...prev, providerNotes: e.target.value }))}
                    placeholder="Additional notes for the claim..."
                    rows={2}
                  />
                </div>

                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Processing claim...</span>
                      <span className="text-sm font-medium">{processingProgress}%</span>
                    </div>
                    <Progress value={processingProgress} className="w-full" />
                  </div>
                 )}

                <div className="space-y-2">
                  <Button 
                    variant="outline"
                    className="w-full" 
                    onClick={handleAnalyzeClaim}
                    disabled={isAnalyzing || !claimData.patientName || !claimData.serviceDescription}
                  >
                    {isAnalyzing ? (
                      <>
                        <Brain className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Analyze with AI
                      </>
                    )}
                  </Button>

                  <Button 
                    className="w-full" 
                    onClick={handleProcessClaim}
                    disabled={isProcessing || !claimData.patientName || !claimData.claimAmount}
                  >
                    {isProcessing ? (
                      <>
                        <Clock className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Submit Claim
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Claims */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Claims
                </CardTitle>
                <CardDescription>Track your submitted claims</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentClaims.map((claim) => (
                    <div key={claim.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">{claim.id}</span>
                          {getStatusBadge(claim.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{claim.patient}</p>
                        <p className="text-xs text-muted-foreground">{claim.date}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{claim.amount}</p>
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* AI Analysis Results */}
            {analysis && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    AI Analysis Results
                  </CardTitle>
                  <CardDescription>AI-generated insights and recommendations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
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
                        <CheckCircle className="h-4 w-4 text-success" />
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
                          <AlertTriangle className="h-4 w-4 text-warning" />
                          Risk Factors
                        </h4>
                        <ul className="space-y-1">
                          {analysis.riskFactors.map((factor, index) => (
                            <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                              <div className="h-1.5 w-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
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
        </div>
      </div>
    </div>
  );
};