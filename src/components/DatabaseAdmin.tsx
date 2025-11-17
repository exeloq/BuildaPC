import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { seedDatabase } from '../utils/seedDatabase';
import { toast } from 'sonner@2.0.3';
import { Database, Upload, CheckCircle, AlertCircle } from 'lucide-react';

export function DatabaseAdmin() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<{ success: boolean; count?: number; error?: string } | null>(null);

  const handleSeedDatabase = async () => {
    setIsSeeding(true);
    setSeedResult(null);
    
    try {
      const result = await seedDatabase();
      setSeedResult({ success: true, count: result.insertedCount });
      toast.success(`Database seeded successfully!`, {
        description: `Added ${result.insertedCount} PC parts to the database`
      });
    } catch (error) {
      console.error('Seeding error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setSeedResult({ success: false, error: errorMessage });
      toast.error('Failed to seed database', {
        description: errorMessage
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <Database className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl text-gray-900">Database Administration</h1>
          </div>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h2 className="text-lg mb-2 text-blue-900">📋 Setup Instructions</h2>
              <ol className="list-decimal list-inside space-y-2 text-sm text-blue-800">
                <li>Make sure you've added your MongoDB connection string to the <code className="bg-blue-100 px-2 py-1 rounded">MONGODB_URI</code> environment variable</li>
                <li>Click the "Seed Database" button below to populate your database with initial PC parts data</li>
                <li>This will add 12 sample parts across all categories (CPU, GPU, RAM, Motherboard, Storage, Cooling, PSU, Case)</li>
                <li>You only need to do this once - the data will persist in MongoDB</li>
              </ol>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl text-gray-900">Initial Data Seeding</h3>
              <p className="text-gray-600">
                Click the button below to populate your MongoDB database with 12 sample PC parts. 
                This is a one-time operation that you should run when setting up your database for the first time.
              </p>
              
              <Button
                onClick={handleSeedDatabase}
                disabled={isSeeding}
                size="lg"
                className="w-full"
              >
                {isSeeding ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Seeding Database...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Seed Database with Sample Data
                  </>
                )}
              </Button>
            </div>

            {seedResult && (
              <div className={`rounded-lg p-4 ${
                seedResult.success 
                  ? 'bg-green-50 border border-green-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-start gap-3">
                  {seedResult.success ? (
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className={`mb-1 ${
                      seedResult.success ? 'text-green-900' : 'text-red-900'
                    }`}>
                      {seedResult.success ? 'Success!' : 'Error'}
                    </h4>
                    <p className={`text-sm ${
                      seedResult.success ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {seedResult.success 
                        ? `Successfully added ${seedResult.count} parts to the database. You can now browse them on the parts page.`
                        : `Failed to seed database: ${seedResult.error}`
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-6">
              <h3 className="text-sm mb-2 text-gray-900">💡 Next Steps</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                <li>After seeding, navigate to the "Browse Parts" page to see your parts</li>
                <li>You can add more parts using the MongoDB API endpoints</li>
                <li>Use the <code className="bg-gray-100 px-2 py-0.5 rounded">/utils/api.ts</code> file to interact with the database</li>
                <li>All parts support real-time pricing integration via Amazon Product IDs</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
