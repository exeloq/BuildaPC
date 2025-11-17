import { useState } from 'react';
import { Button } from './ui/button';
import { seedDatabase } from '../utils/seedDatabase';
import { toast } from 'sonner@2.0.3';
import { Database, Loader2 } from 'lucide-react';

interface SeedButtonProps {
  onSuccess?: () => void;
}

export function SeedButton({ onSuccess }: SeedButtonProps) {
  const [isSeeding, setIsSeeding] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    
    try {
      console.log('🌱 Starting database seed...');
      const result = await seedDatabase();
      console.log(`✅ Successfully seeded ${result.insertedCount} parts`);
      
      toast.success('Database seeded successfully!', {
        description: `Added ${result.insertedCount} PC parts to the database`
      });
      
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1000);
      }
    } catch (error) {
      console.error('❌ Seeding error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      toast.error('Failed to seed database', {
        description: errorMessage
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <Button
      onClick={handleSeed}
      disabled={isSeeding}
      size="lg"
      className="bg-blue-600 hover:bg-blue-700"
    >
      {isSeeding ? (
        <>
          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
          Seeding Database...
        </>
      ) : (
        <>
          <Database className="h-5 w-5 mr-2" />
          Seed Database Now
        </>
      )}
    </Button>
  );
}
