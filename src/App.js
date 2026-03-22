import React, { useState, useEffect } from 'react';
import { Upload, Users, TrendingUp, AlertTriangle, BarChart3, GraduationCap, Calendar, BookOpen } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter, Cell } from 'recharts';

const StudentAnalyticsDashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState('all');
  const [sampleDataLoaded, setSampleDataLoaded] = useState(false);

  // dark mode feature added
  const [darkMode, setDarkMode] = useState(false);

  // Generate sample dataset
  const generateSampleData = () => {
    const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Computer Science', 'English'];
    const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
    const departments = ['Computer Science', 'Electronics', 'Mechanical'];
    const sampleData = [];

    for (let i = 1; i <= 50; i++) {
      const studentId = `STU${String(i).padStart(3, '0')}`;
      const dept = departments[Math.floor(Math.random() * departments.length)];
      
      subjects.forEach(subject => {
        semesters.forEach(semester => {
          const baseMarks = 40 + Math.random() * 50;
          const attendance = 60 + Math.random() * 40;
          
          sampleData.push({
            studentId,
            studentName: `Student ${i}`,
            subject,
            semester,
            marks: Math.round(baseMarks),
            attendance: Math.round(attendance),
            department: dept
          });
        });
      });
    }
    
    setData(sampleData);
    setFilteredData(sampleData);
    setSampleDataLoaded(true);
  };

  // Filter data based on selections
  useEffect(() => {
    let filtered = [...data];
    
    if (selectedSemester !== 'all') {
      filtered = filtered.filter(item => item.semester === selectedSemester);
    }
    
    if (selectedSubject !== 'all') {
      filtered = filtered.filter(item => item.subject === selectedSubject);
    }
    
    if (selectedStudent !== 'all') {
      filtered = filtered.filter(item => item.studentId === selectedStudent);
    }
    
    setFilteredData(filtered);
  }, [selectedSemester, selectedSubject, selectedStudent, data]);

  useEffect(() => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    setDarkMode(true);
    document.body.classList.add("dark");
  }
}, []);

const toggleTheme = () => {
  if (darkMode) {
    document.body.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
  setDarkMode(!darkMode);
};

  // Calculate analytics
  const calculateAnalytics = () => {
    if (filteredData.length === 0) return null;

    const avgMarks = filteredData.reduce((sum, item) => sum + item.marks, 0) / filteredData.length;
    const avgAttendance = filteredData.reduce((sum, item) => sum + item.attendance, 0) / filteredData.length;
    
    const atRiskStudents = [...new Set(
      filteredData
        .filter(item => item.marks < 40 || item.attendance < 75)
        .map(item => item.studentId)
    )];

    const totalStudents = [...new Set(filteredData.map(item => item.studentId))].length;

    return {
      avgMarks: avgMarks.toFixed(2),
      avgAttendance: avgAttendance.toFixed(2),
      atRiskCount: atRiskStudents.length,
      totalStudents
    };
  };

  // Semester-wise performance
  const getSemesterPerformance = () => {
    const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
    return semesters.map(sem => {
      const semData = filteredData.filter(item => item.semester === sem);
      const avg = semData.length > 0 
        ? semData.reduce((sum, item) => sum + item.marks, 0) / semData.length 
        : 0;
      return {
        semester: sem.replace('Semester ', 'Sem '),
        avgMarks: parseFloat(avg.toFixed(2))
      };
    });
  };

  // Subject-wise comparison
  const getSubjectComparison = () => {
    const subjects = [...new Set(filteredData.map(item => item.subject))];
    return subjects.map(subject => {
      const subData = filteredData.filter(item => item.subject === subject);
      const avg = subData.reduce((sum, item) => sum + item.marks, 0) / subData.length;
      return {
        subject: subject.length > 15 ? subject.substring(0, 12) + '...' : subject,
        avgMarks: parseFloat(avg.toFixed(2))
      };
    }).sort((a, b) => b.avgMarks - a.avgMarks);
  };

  const getStudentVsClassData = () => {
  if (filteredData.length === 0 || selectedStudent === 'all') return [];

  const subjects = [...new Set(filteredData.map(item => item.subject))];

  return subjects.map(subject => {
    const subjectData = filteredData.filter(item => item.subject === subject);

    const classAvg =
      subjectData.reduce((sum, item) => sum + item.marks, 0) /
      subjectData.length;

    const studentRecord = subjectData.find(
      item => item.studentId === selectedStudent
    );

    return {
      subject,
      studentMarks: studentRecord ? studentRecord.marks : 0,
      classAvg: parseFloat(classAvg.toFixed(2))
    };
  });
};

  // Attendance vs Marks correlation
  const getAttendanceCorrelation = () => {
    const grouped = {};
    filteredData.forEach(item => {
      const key = `${item.studentId}-${item.semester}`;
      if (!grouped[key]) {
        grouped[key] = { attendance: item.attendance, marks: item.marks, count: 1 };
      } else {
        grouped[key].attendance += item.attendance;
        grouped[key].marks += item.marks;
        grouped[key].count += 1;
      }
    });

    return Object.values(grouped).map(item => ({
      attendance: Math.round(item.attendance / item.count),
      marks: Math.round(item.marks / item.count)
    }));
  };

  // Get unique values for filters
  const getUniqueValues = (key) => {
  const values = [...new Set(data.map(item => item[key]))];

  // Special handling for studentId
  if (key === "studentId") {
    return values.sort((a, b) => {
      const numA = parseInt(a.replace("STU", ""));
      const numB = parseInt(b.replace("STU", ""));
      return numA - numB;
    });
  }

  return values.sort();
};

  const analytics = calculateAnalytics();
  const semesterData = getSemesterPerformance();
  const subjectData = getSubjectComparison();
  const correlationData = getAttendanceCorrelation();
  const studentVsClassData = getStudentVsClassData();


  // Handle CSV file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const rows = text.split('\n');
      const headers = rows[0].split(',').map(h => h.trim());
      
      const parsedData = [];
      for (let i = 1; i < rows.length; i++) {
        if (rows[i].trim()) {
          const values = rows[i].split(',').map(v => v.trim());
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = values[index];
          });
          
          // Convert to expected format
          if (obj.studentId && obj.subject && obj.semester) {
            parsedData.push({
              studentId: obj.studentId,
              studentName: obj.studentName || obj.studentId,
              subject: obj.subject,
              semester: obj.semester,
              marks: parseInt(obj.marks) || 0,
              attendance: parseInt(obj.attendance) || 0,
              department: obj.department || 'General'
            });
          }
        }
      }
      
      if (parsedData.length > 0) {
        setData(parsedData);
        setFilteredData(parsedData);
        setSampleDataLoaded(true);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className={`min-h-screen p-6 ${
  darkMode
    ? "bg-gray-900 text-white"
    : "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
  <div className="flex items-center justify-between">
    
    {/* LEFT SIDE */}
    <div className="flex items-center gap-4">
      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl">
        <GraduationCap className="text-white" size={32} />
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Student Performance Analytics</h1>
        <p className="text-gray-600 mt-1">Cloud-Based Dashboard for Academic Insights</p>
      </div>
    </div>

    {/* RIGHT SIDE (BUTTON) */}
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
    >
      {darkMode ? "☀ Light" : "🌙 Dark"}
    </button>

  </div>
</div>

        {/* Data Upload Section */}
        {!sampleDataLoaded && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div className="text-center">
              <Upload className="mx-auto text-blue-500 mb-4" size={48} />
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">Upload Student Data</h2>
              <p className="text-gray-600 mb-6">Upload CSV file or load sample data to begin analysis</p>
              
              <div className="flex gap-4 justify-center">
                <label className="bg-blue-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-600 transition-colors">
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  Upload CSV File
                </label>
                
                <button
                  onClick={generateSampleData}
                  className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
                >
                  Load Sample Data
                </button>
              </div>
              
              <p className="text-sm text-gray-500 mt-4">
                CSV Format: studentId, studentName, subject, semester, marks, attendance, department
              </p>
            </div>
          </div>
        )}

        {sampleDataLoaded && (
          <>
            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <BarChart3 size={24} className="text-blue-500" />
                Filters
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline mr-2" size={16} />
                    Semester
                  </label>
                  <select
                    value={selectedSemester}
                    onChange={(e) => setSelectedSemester(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Semesters</option>
                    {getUniqueValues('semester').map(sem => (
                      <option key={sem} value={sem}>{sem}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <BookOpen className="inline mr-2" size={16} />
                    Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Subjects</option>
                    {getUniqueValues('subject').map(sub => (
                      <option key={sub} value={sub}>{sub}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline mr-2" size={16} />
                    Student
                  </label>
                  <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Students</option>
                    {getUniqueValues('studentId').map(id => (
                      <option key={id} value={id}>{id}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* KPI Cards */}
            {analytics && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <TrendingUp size={32} />
                    <span className="text-3xl font-bold">{analytics.avgMarks}</span>
                  </div>
                  <p className="text-blue-100">Average Marks</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <Calendar size={32} />
                    <span className="text-3xl font-bold">{analytics.avgAttendance}%</span>
                  </div>
                  <p className="text-green-100">Average Attendance</p>
                </div>
                
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <AlertTriangle size={32} />
                    <span className="text-3xl font-bold">{analytics.atRiskCount}</span>
                  </div>
                  <p className="text-orange-100">At-Risk Students</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <Users size={32} />
                    <span className="text-3xl font-bold">{analytics.totalStudents}</span>
                  </div>
                  <p className="text-purple-100">Total Students</p>
                </div>
              </div>
            )}

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Semester-wise Performance */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Semester-wise Performance</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={semesterData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="semester" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="avgMarks" stroke="#3b82f6" strokeWidth={3} name="Average Marks" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Subject-wise Comparison */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Subject-wise Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={subjectData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" angle={-45} textAnchor="end" height={80} />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="avgMarks" fill="#8b5cf6" name="Average Marks" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attendance vs Marks Correlation */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Attendance vs Marks Correlation</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attendance" name="Attendance %" domain={[0, 100]} />
                  <YAxis dataKey="marks" name="Marks" domain={[0, 100]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Legend />
                  <Scatter name="Student Performance" data={correlationData} fill="#10b981" />
                </ScatterChart>
              </ResponsiveContainer>
              <p className="text-sm text-gray-600 mt-4 text-center">
                Correlation shows relationship between attendance and academic performance
              </p>
            </div>

            {selectedStudent !== 'all' && (
  <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
    <h3 className="text-xl font-semibold text-gray-800 mb-4">
      Student vs Class Average
    </h3>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={studentVsClassData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="subject" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />

        <Bar dataKey="studentMarks" name="Student" fill="#3b82f6">
  {studentVsClassData.map((entry, index) => (
    <Cell
      key={`cell-${index}`}
      fill={entry.studentMarks < 40 ? "#ef4444" : "#3b82f6"}
    />
  ))}
</Bar>

        <Bar dataKey="classAvg" fill="#10b981" name="Class Avg" />
      </BarChart>
    </ResponsiveContainer>
  </div>
)}

            {/* Footer Info */}
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl shadow-lg p-6 mt-6 text-white">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2">Multi-Cloud Deployment Ready</h3>
                <p className="text-blue-100">
                  This dashboard is designed for deployment on Streamlit Cloud, Power BI Service, Azure, and AWS
                </p>
                <div className="flex justify-center gap-4 mt-4">
                  <span className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">Streamlit Cloud</span>
                  <span className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">Power BI</span>
                  <span className="bg-white bg-opacity-20 px-4 py-2 rounded-lg">Azure/AWS</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StudentAnalyticsDashboard;