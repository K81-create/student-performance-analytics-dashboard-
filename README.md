# 🎓 Student Performance Analytics Dashboard

A React-based analytics dashboard to track and visualize student academic performance, attendance, and at-risk indicators across semesters and subjects.

## 🚀 Features

- 📊 Interactive charts — semester trends, subject comparison, attendance correlation
- 🔍 Multi-filter support — by semester, subject, or individual student
- 📁 CSV upload — bring your own data or load built-in sample data
- 🚨 At-risk detection — flags students with marks < 40 or attendance < 75%
- 📋 Department-wise reports with pass/fail breakdown
- 📱 Responsive layout with sidebar navigation

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 |
| Charts | Recharts |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Bundler | Create React App |

## 📦 Installation
```bash
git clone https://github.com/K81-create/student-performance-analytics-dashboard.git
cd student-performance-analytics-dashboard
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 CSV Format

To upload your own data, use a CSV with these columns:
```
studentId, studentName, subject, semester, marks, attendance, department
```

**Example row:**
```
STU001, John Doe, Mathematics, Semester 1, 78, 88, Computer Science
```

## 📂 Project Structure
```
src/
├── components/
│   ├── Sidebar.jsx        # Navigation sidebar
│   ├── navbar.js          # Top navigation bar
│   └── loadingstate.jsx   # Loading spinner component
├── layout/
│   └── DashboardLayout.jsx  # Main app layout wrapper
├── pages/
│   ├── Dashboard.jsx      # Main dashboard with charts & KPIs
│   ├── Students.jsx       # Student directory with search
│   ├── Subjects.jsx       # Subject-wise performance analysis
│   ├── Reports.jsx        # Department reports & PDF export
│   └── Settings.jsx       # App settings (coming soon)
└── App.js                 # Root component with routing
```

## 📊 Dashboard Pages

- **Dashboard** — KPI cards, semester trend line, subject bar chart, attendance scatter plot
- **Students** — Searchable table with avg marks and attendance per student
- **Subjects** — Subject stats, top/bottom performers, pass rate chart
- **Reports** — Department breakdown, pie chart, print/export to PDF

## ☁️ Cloud Deployment (AWS S3)

This project is deployed on **Amazon Web Services (AWS S3)** with static website hosting.

### Live URL
http://student-dashboard-ett.s3-website-us-east-1.amazonaws.com

### Deployment Steps
1. Run `npm run build` to generate the production build
2. Create an S3 bucket with static website hosting enabled
3. Upload all contents of the `build/` folder to the S3 bucket
4. Set bucket policy to allow public read access
5. Access the live URL from S3 static website hosting settings

### AWS Services Used
| Service | Purpose |
|---------|---------|
| Amazon S3 | Static file hosting |
| S3 Bucket Policy | Public read access |
| S3 Static Website Hosting | Serve React build files |
```

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.
