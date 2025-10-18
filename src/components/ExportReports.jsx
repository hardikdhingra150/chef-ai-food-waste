import { useState } from 'react'
import { FileText, Table, Download, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export default function ExportReports() {
  const [downloading, setDownloading] = useState(null)

  const wasteData = {
    monthlyStats: {
      totalWaste: '156.5 kg',
      wasteReduced: '34%',
      costSaved: '₹12,450',
      mealsDonated: 127
    },
    wasteByCategory: [
      { category: 'Vegetables', weight: '45.2 kg', cost: '₹3,780', percentage: '29%' },
      { category: 'Grains', weight: '32.1 kg', cost: '₹2,670', percentage: '21%' },
      { category: 'Meat', weight: '28.5 kg', cost: '₹4,275', percentage: '18%' },
      { category: 'Dairy', weight: '25.3 kg', cost: '₹2,107', percentage: '16%' },
      { category: 'Other', weight: '25.4 kg', cost: '₹1,618', percentage: '16%' }
    ],
    dailyLogs: [
      { date: '14 Oct 2025', items: 'Tomatoes, Lettuce', weight: '2.3 kg', cost: '₹420' },
      { date: '13 Oct 2025', items: 'Rice, Bread', weight: '3.1 kg', cost: '₹350' },
      { date: '12 Oct 2025', items: 'Chicken, Milk', weight: '4.2 kg', cost: '₹680' },
      { date: '11 Oct 2025', items: 'Yogurt, Eggs', weight: '1.8 kg', cost: '₹290' },
      { date: '10 Oct 2025', items: 'Vegetables', weight: '2.5 kg', cost: '₹380' }
    ]
  }

  const generatePDF = () => {
    try {
      setDownloading('pdf')
      console.log('📄 Generating PDF...')
      
      const doc = new jsPDF()
      
      // Header
      doc.setFillColor(139, 92, 246)
      doc.rect(0, 0, 210, 40, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(24)
      doc.text('CHEF AI', 105, 15, { align: 'center' })
      doc.setFontSize(14)
      doc.text('Food Waste Analytics Report', 105, 25, { align: 'center' })
      doc.setFontSize(10)
      doc.text(`Generated: ${new Date().toLocaleDateString('en-IN')}`, 105, 33, { align: 'center' })
      
      // Monthly Summary
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(16)
      doc.text('Monthly Summary', 14, 50)
      
      autoTable(doc, {
        startY: 55,
        head: [['Metric', 'Value']],
        body: [
          ['Total Waste', wasteData.monthlyStats.totalWaste],
          ['Waste Reduced', wasteData.monthlyStats.wasteReduced],
          ['Cost Saved', wasteData.monthlyStats.costSaved],
          ['Meals Donated', wasteData.monthlyStats.mealsDonated.toString()]
        ],
        theme: 'grid',
        headStyles: { fillColor: [139, 92, 246] },
      })
      
      // Waste by Category
      let finalY = doc.lastAutoTable.finalY + 10
      doc.setFontSize(16)
      doc.text('Waste by Category', 14, finalY)
      
      autoTable(doc, {
        startY: finalY + 5,
        head: [['Category', 'Weight', 'Cost', 'Percentage']],
        body: wasteData.wasteByCategory.map(item => [
          item.category,
          item.weight,
          item.cost,
          item.percentage
        ]),
        theme: 'striped',
        headStyles: { fillColor: [139, 92, 246] }
      })
      
      // Daily Logs
      finalY = doc.lastAutoTable.finalY + 10
      doc.setFontSize(16)
      doc.text('Recent Waste Logs', 14, finalY)
      
      autoTable(doc, {
        startY: finalY + 5,
        head: [['Date', 'Items', 'Weight', 'Cost']],
        body: wasteData.dailyLogs.map(log => [
          log.date,
          log.items,
          log.weight,
          log.cost
        ]),
        theme: 'grid',
        headStyles: { fillColor: [139, 92, 246] }
      })
      
      // Footer
      const pageCount = doc.internal.getNumberOfPages()
      doc.setFontSize(8)
      doc.setTextColor(128, 128, 128)
      doc.text('Powered by CHEF AI', 105, 285, { align: 'center' })
      
      console.log('✅ PDF generated, downloading...')
      doc.save('chef-ai-waste-report.pdf')
      
      setTimeout(() => {
        setDownloading(null)
        console.log('✅ PDF download complete!')
      }, 1000)
      
    } catch (error) {
      console.error('❌ PDF generation error:', error)
      alert('PDF generation failed. Check console for details.')
      setDownloading(null)
    }
  }

  const generateCSV = () => {
    try {
      setDownloading('csv')
      console.log('📊 Generating CSV...')
      
      let csv = 'CHEF AI - Food Waste Data Export\n'
      csv += `Generated: ${new Date().toLocaleDateString('en-IN')}\n\n`
      
      csv += 'MONTHLY SUMMARY\n'
      csv += 'Metric,Value\n'
      csv += `Total Waste,${wasteData.monthlyStats.totalWaste}\n`
      csv += `Waste Reduced,${wasteData.monthlyStats.wasteReduced}\n`
      csv += `Cost Saved,${wasteData.monthlyStats.costSaved}\n`
      csv += `Meals Donated,${wasteData.monthlyStats.mealsDonated}\n\n`
      
      csv += 'WASTE BY CATEGORY\n'
      csv += 'Category,Weight,Cost,Percentage\n'
      wasteData.wasteByCategory.forEach(item => {
        csv += `${item.category},${item.weight},${item.cost},${item.percentage}\n`
      })
      csv += '\n'
      
      csv += 'DAILY WASTE LOGS\n'
      csv += 'Date,Items,Weight,Cost\n'
      wasteData.dailyLogs.forEach(log => {
        csv += `${log.date},"${log.items}",${log.weight},${log.cost}\n`
      })
      
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'chef-ai-waste-data.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      console.log('✅ CSV download complete!')
      setTimeout(() => setDownloading(null), 1000)
      
    } catch (error) {
      console.error('❌ CSV generation error:', error)
      alert('CSV generation failed. Check console for details.')
      setDownloading(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-8 text-white shadow-2xl"
    >
      <div className="mb-6">
        <h2 className="text-3xl font-black mb-2">Export Reports</h2>
        <p className="text-white/80">Download waste analytics for tax deductions & compliance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PDF Report */}
        <motion.button
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={generatePDF}
          disabled={downloading === 'pdf'}
          className="bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-2xl p-6 text-left hover:bg-white/20 transition-all disabled:opacity-50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-red-500/20 flex items-center justify-center flex-shrink-0">
              <FileText className="w-7 h-7 text-red-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                PDF Report
                {downloading === 'pdf' && <Download className="w-4 h-4 animate-bounce" />}
              </h3>
              <p className="text-white/70 text-sm">Full analytics with charts & tables</p>
            </div>
          </div>
        </motion.button>

        {/* CSV Data */}
        <motion.button
          whileHover={{ scale: 1.02, y: -4 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateCSV}
          disabled={downloading === 'csv'}
          className="bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-2xl p-6 text-left hover:bg-white/20 transition-all disabled:opacity-50 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative z-10 flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <Table className="w-7 h-7 text-green-300" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                CSV Data
                {downloading === 'csv' && <Download className="w-4 h-4 animate-bounce" />}
              </h3>
              <p className="text-white/70 text-sm">Raw numbers for Excel & analysis</p>
            </div>
          </div>
        </motion.button>
      </div>

      {downloading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 bg-green-500/20 border border-green-300/30 rounded-xl p-3 flex items-center gap-2"
        >
          <Check className="w-5 h-5 text-green-300" />
          <p className="text-sm text-green-100">
            Generating {downloading === 'pdf' ? 'PDF' : 'CSV'} file...
          </p>
        </motion.div>
      )}

      <div className="mt-6 p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10">
        <p className="text-xs text-white/60">
          💡 Reports include monthly summaries, waste breakdown by category, and daily logs.
          Perfect for tax deductions and compliance documentation.
        </p>
      </div>
    </motion.div>
  )
}
