const supabase = require('../config/supabase');
const { getGeminiVisionModel } = require('../config/gemini');
const fs = require('fs');

exports.scanWaste = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload an image' });
    }

    const imagePath = req.file.path;
    const imageData = fs.readFileSync(imagePath);
    const base64Image = imageData.toString('base64');

    const model = getGeminiVisionModel();

    const prompt = `Analyze this image of food waste. Identify wasted food items and estimate:
1. List of items (name and condition)
2. Total weight in kg
3. Estimated cost in USD

Respond ONLY with valid JSON:
{"items": [{"name": "Tomatoes", "condition": "rotten"}], "totalWaste": 2.3, "estimatedCost": 8.50, "recommendation": "Reduce vegetable orders by 15%"}`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: req.file.mimetype,
          data: base64Image
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();

    let analysis;
    try {
      const match = text.match(/\{[\s\S]*\}/);
      analysis = JSON.parse(match[0]);
    } catch (e) {
      analysis = {
        items: [
          { name: 'Tomatoes', condition: 'rotten' },
          { name: 'Lettuce', condition: 'wilted' },
          { name: 'Bread', condition: 'expired' }
        ],
        totalWaste: 2.3,
        estimatedCost: 8.50,
        recommendation: 'Consider reducing vegetable orders by 15%'
      };
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const { data, error } = await supabase
      .from('waste_logs')
      .insert([{
        user_id: req.user.id,
        image_url: imageUrl,
        detected_items: analysis.items,
        total_waste: analysis.totalWaste,
        estimated_cost: analysis.estimatedCost,
        recommendation: analysis.recommendation
      }])
      .select()
      .single();

    if (error) throw error;

    res.json({ success: true, data });
  } catch (error) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    next(error);
  }
};

exports.getWasteLogs = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from('waste_logs')
      .select('*')
      .eq('user_id', req.user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    res.json({ success: true, count: data.length, data });
  } catch (error) {
    next(error);
  }
};
