import { supabase } from "@/integrations/supabase/client";

const SupabaseDebug = () => {
  const testConnection = async () => {
    try {
      console.log('Testing Supabase connection...');
      
      // Test basic connection
      const { data, error } = await supabase
        .from('products')
        .select('count')
        .limit(1);
      
      if (error) {
        console.error('Supabase connection error:', error);
        alert(`Connection Error: ${error.message}`);
      } else {
        console.log('Supabase connection successful!');
        alert('Supabase connection successful!');
      }
    } catch (err) {
      console.error('Test failed:', err);
      alert(`Test failed: ${err}`);
    }
  };

  const testStorage = async () => {
    try {
      console.log('Testing storage...');
      
      // Create a simple test file
      const testFile = new File(['test'], 'test.txt', { type: 'text/plain' });
      
      const { data, error } = await supabase.storage
        .from('product-images')
        .upload('test.txt', testFile);
      
      if (error) {
        console.error('Storage error:', error);
        alert(`Storage Error: ${error.message}`);
      } else {
        console.log('Storage test successful!');
        alert('Storage test successful!');
        
        // Clean up test file
        await supabase.storage
          .from('product-images')
          .remove(['test.txt']);
      }
    } catch (err) {
      console.error('Storage test failed:', err);
      alert(`Storage test failed: ${err}`);
    }
  };

  return (
    <div className="p-4 border rounded-lg bg-gray-100">
      <h3 className="text-lg font-bold mb-4">Supabase Debug</h3>
      <div className="space-y-2">
        <button 
          onClick={testConnection}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Test Database Connection
        </button>
        <button 
          onClick={testStorage}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Test Storage Connection
        </button>
      </div>
    </div>
  );
};

export default SupabaseDebug;
