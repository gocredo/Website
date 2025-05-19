
import React from 'react';
import { BarChart, Activity, Users, Award } from 'lucide-react';

const Analytics = () => {
  return (
    <section className="py-16 bg-dark-muted">
      <div className="container mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Our <span className="clip-text">Impact</span>
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="dark-card text-center p-8">
            <div className="flex justify-center mb-4">
              <BarChart className="w-12 h-12 text-gold" />
            </div>
            <h3 className="text-4xl font-bold mb-2">98%</h3>
            <p className="text-gray-400">Client Satisfaction Rate</p>
          </div>
          
          <div className="dark-card text-center p-8">
            <div className="flex justify-center mb-4">
              <Activity className="w-12 h-12 text-gold" />
            </div>
            <h3 className="text-4xl font-bold mb-2">270+</h3>
            <p className="text-gray-400">Projects Completed</p>
          </div>
          
          <div className="dark-card text-center p-8">
            <div className="flex justify-center mb-4">
              <Users className="w-12 h-12 text-gold" />
            </div>
            <h3 className="text-4xl font-bold mb-2">150+</h3>
            <p className="text-gray-400">Happy Clients</p>
          </div>
          
          <div className="dark-card text-center p-8">
            <div className="flex justify-center mb-4">
              <Award className="w-12 h-12 text-gold" />
            </div>
            <h3 className="text-4xl font-bold mb-2">35+</h3>
            <p className="text-gray-400">Awards Won</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Analytics;
