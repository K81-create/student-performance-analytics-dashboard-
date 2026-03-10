import React, { useState, useEffect } from 'react';
import { Upload, Users, TrendingUp, AlertTriangle, BarChart3, GraduationCap, Calendar, BookOpen } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';

const Dashboard = ({ data, setData, sampleDataLoaded, setSampleDataLoaded }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState('all');

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

  const getSubjectComparison = () => {
    const subjects = [...new Set(filteredData.map(item => item.subject))];

    return subjects.map(subject => {
      const subData = filteredData.filter(item => item.subject === subject);
      const avg = subData.reduce((sum, item) => sum + item.marks, 0) / subData.length;

      return {
        subject,
        avgMarks: parseFloat(avg.toFixed(2))
      };
    });
  };

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

  const getUniqueValues = (key) => {
    return [...new Set(data.map(item => item[key]))];
  };

  const analytics = calculateAnalytics();
  const semesterData = getSemesterPerformance();
  const subjectData = getSubjectComparison();
  const correlationData = getAttendanceCorrelation();

  return (
    <div style={{padding:40}}>
      <h1>Student Performance Dashboard</h1>

      {!sampleDataLoaded && (
        <button onClick={generateSampleData}>
          Load Sample Data
        </button>
      )}

      {sampleDataLoaded && analytics && (
        <div>
          <h3>Average Marks: {analytics.avgMarks}</h3>
          <h3>Average Attendance: {analytics.avgAttendance}</h3>
          <h3>At Risk Students: {analytics.atRiskCount}</h3>
          <h3>Total Students: {analytics.totalStudents}</h3>

          <div style={{width:'100%', height:300}}>
            <ResponsiveContainer>
              <LineChart data={semesterData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="semester" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line dataKey="avgMarks" stroke="#3b82f6"/>
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div style={{width:'100%', height:300}}>
            <ResponsiveContainer>
              <BarChart data={subjectData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgMarks" fill="#8b5cf6"/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div style={{width:'100%', height:400}}>
            <ResponsiveContainer>
              <ScatterChart>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="attendance"/>
                <YAxis dataKey="marks"/>
                <Tooltip/>
                <Legend/>
                <Scatter data={correlationData} fill="#10b981"/>
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

