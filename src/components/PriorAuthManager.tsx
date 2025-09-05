import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useAI, PriorAuthRequest, PriorAuthResponse } from '@/hooks/useAI';
import { Shield, Clock, CheckCircle, AlertCircle, FileText } from 'lucide-react';

export const PriorAuthManager = () => {
  const [request, setRequest] = useState<Partial<PriorAuthRequest>>({
    urgency: 'routine'
  });
  const [response, setResponse] = useState<PriorAuthResponse | null>(null);
  const { isLoading, processPriorAuth } = useAI();

  const handleSubmit = async () => {
    if (!request.patientId || !request.providerId || !request.serviceCode || !request.medicalNecessity) {
      return;
    }
    
    try {
      const result = await processPriorAuth(request as PriorAuthRequest);
      setResponse(result);
    } catch (error) {
      console.error('Prior auth failed:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'success';
      case 'denied': return 'destructive';
      case 'pending': return 'warning';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'denied': return <AlertCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'emergent': return 'destructive';
      case 'urgent': return 'warning';
      case 'routine': return 'secondary';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Prior Authorization Request
          </CardTitle>
          <CardDescription>
            Submit and process prior authorization requests with AI assistance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                placeholder="Enter patient ID"
                value={request.patientId || ''}
                onChange={(e) => setRequest(prev => ({ ...prev, patientId: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="providerId">Provider ID</Label>
              <Input
                id="providerId"
                placeholder="Enter provider ID"
                value={request.providerId || ''}
                onChange={(e) => setRequest(prev => ({ ...prev, providerId: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceCode">Service/Procedure Code</Label>
              <Input
                id="serviceCode"
                placeholder="CPT/HCPCS code"
                value={request.serviceCode || ''}
                onChange={(e) => setRequest(prev => ({ ...prev, serviceCode: e.target.value }))}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Urgency Level</Label>
              <Select 
                value={request.urgency} 
                onValueChange={(value) => setRequest(prev => ({ ...prev, urgency: value as any }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="routine">Routine</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="emergent">Emergent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalNecessity">Medical Necessity</Label>
            <Textarea
              id="medicalNecessity"
              placeholder="Describe the medical necessity for this service..."
              value={request.medicalNecessity || ''}
              onChange={(e) => setRequest(prev => ({ ...prev, medicalNecessity: e.target.value }))}
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Badge variant={getUrgencyColor(request.urgency || 'routine') as any}>
              {request.urgency || 'routine'} priority
            </Badge>
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!request.patientId || !request.providerId || !request.serviceCode || !request.medicalNecessity || isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Shield className="h-4 w-4 mr-2 animate-spin" />
                Processing Authorization...
              </>
            ) : (
              <>
                <Shield className="h-4 w-4 mr-2" />
                Submit Prior Auth Request
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {response && (
        <Card>
          <CardHeader>
            <CardTitle>Authorization Response</CardTitle>
            <CardDescription>
              AI-processed prior authorization decision
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Badge 
                variant={getStatusColor(response.status) as any}
                className="text-sm px-3 py-1"
              >
                {getStatusIcon(response.status)}
                <span className="ml-2 capitalize">{response.status}</span>
              </Badge>
              
              <div className="text-sm text-muted-foreground">
                ID: {response.id}
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h4 className="font-semibold mb-1">Decision Reasoning</h4>
                <p className="text-sm text-muted-foreground">{response.reasoning}</p>
              </div>

              {response.conditions && response.conditions.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-2">Conditions & Requirements</h4>
                  <ul className="space-y-1">
                    {response.conditions.map((condition, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {condition}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {response.expirationDate && (
                <div>
                  <h4 className="font-semibold mb-1">Authorization Expires</h4>
                  <p className="text-sm text-muted-foreground">
                    {new Date(response.expirationDate).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t">
              <Button variant="outline" size="sm">
                Print Authorization
              </Button>
              <Button variant="outline" size="sm">
                Send to Provider
              </Button>
              <Button size="sm" className="ml-auto">
                Update Patient Record
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};