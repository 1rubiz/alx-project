import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote, RefreshCw } from 'lucide-react';
import axios from 'axios'
import toast from 'react-hot-toast'

const QuoteGenerator = () => {
  const [quote, setQuote] = useState({ content: '', author: '' });
  const [loading, setLoading] = useState(false);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://quote-garden.onrender.com/api/v3/quotes/category/love');
      console.log(response)
      // const data = await response.json();
      // console.log(data)
      // setQuote({
      //   content: data.content,
      //   author: data.author
      // });
    } catch (error) {
      toast.error(error?.message)
      console.error('Error fetching quote:', error);
      setQuote({
        content: 'Failed to fetch quote. Please try again.',
        author: 'Error'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchQuote();
  }, []);

  return (
    <Card className="w-full max-w-xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Quote className="w-5 h-5" />
          Quote Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-lg italic">
            "{quote.content}"
          </p>
          <p className="text-right font-medium">
            - {quote.author}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={fetchQuote}
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          New Quote
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuoteGenerator;
