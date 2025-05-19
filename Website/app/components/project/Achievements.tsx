
import React from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Achievements = () => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#f1f1f1'
        }
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          color: '#f1f1f1',
          beginAtZero: true
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: '#f1f1f1',
          beginAtZero: true
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const performanceData = {
    labels: ['Website Traffic', 'Conversion Rate', 'User Engagement', 'Page Speed', 'SEO Ranking'],
    datasets: [
      {
        label: 'Before Our Work',
        data: [30, 15, 40, 60, 25],
        backgroundColor: 'rgba(75, 85, 99, 0.5)',
        borderColor: 'rgb(75, 85, 99)',
        borderWidth: 1,
      },
      {
        label: 'After Our Work',
        data: [85, 65, 90, 95, 80],
        backgroundColor: 'rgba(212, 175, 55, 0.5)',
        borderColor: 'rgb(212, 175, 55)',
        borderWidth: 1,
      },
    ],
  };

  const achievements = [
    {
      title: "Increased Conversion Rate",
      value: "320%",
      description: "Significant improvement in conversion rates across client websites"
    },
    {
      title: "Traffic Growth",
      value: "180%",
      description: "Average increase in organic traffic for our client projects"
    },
    {
      title: "Page Load Speed",
      value: "58%",
      description: "Average improvement in page load times"
    },
    {
      title: "User Engagement",
      value: "125%",
      description: "Increase in average session duration and pages per visit"
    }
  ];

  return (
    <section className="section-padding bg-dark-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Our <span className="clip-text">Achievements</span>
        </h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
          Measurable results that demonstrate the impact of our work for our clients.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center mb-16">
          <div className="lg:col-span-3">
            <div className="dark-card h-[400px] p-4">
              <Bar options={options} data={performanceData} height={400} />
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold">Performance Improvements</h3>
              <p className="text-gray-400">
                Our projects consistently deliver significant improvements in key performance metrics,
                helping our clients achieve their business objectives and maximize their ROI.
              </p>
              <p className="text-gray-400">
                Through strategic planning, creative design, and technical excellence, we create
                digital experiences that drive results and help our clients stand out in their industries.
              </p>
              <div className="pt-4">
                <a href="#" className="button-gold inline-block">
                  View Case Studies
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {achievements.map((item, index) => (
            <div key={index} className="dark-card text-center p-8">
              <div className="text-5xl font-bold text-gold mb-4">{item.value}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Achievements;
