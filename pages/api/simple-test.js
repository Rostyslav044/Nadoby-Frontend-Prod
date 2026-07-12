export default function handler(req, res) {
  console.log('🎯 ТЕСТОВЫЙ API ВЫЗВАН!');
  console.log('URL:', req.url);
  console.log('Method:', req.method);
  res.status(200).json({ 
    success: true, 
    message: 'API работает!',
    timestamp: new Date().toISOString()
  });
}
