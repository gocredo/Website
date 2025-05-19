
import React from 'react';
import { Facebook, Twitter, Linkedin, Github } from 'lucide-react';

const TeamSection = () => {
  const team = [
    {
      name: "Alex Johnson",
      position: "Founder & CEO",
      bio: "With over 15 years of experience in digital design and marketing, Alex leads our team with vision and passion.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&h=400&auto=format&fit=crop",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Samantha Lee",
      position: "Creative Director",
      bio: "Samantha brings creativity and strategic thinking to every project, ensuring our designs are both beautiful and effective.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&h=400&auto=format&fit=crop",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Michael Chen",
      position: "Technical Lead",
      bio: "Michael oversees the technical aspects of our projects, ensuring they're built with the latest technologies and best practices.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&h=400&auto=format&fit=crop",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Emily Martinez",
      position: "UX/UI Designer",
      bio: "Emily specializes in creating intuitive and engaging user experiences that delight users and achieve business goals.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&h=400&auto=format&fit=crop",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "David Wilson",
      position: "Marketing Strategist",
      bio: "David develops strategic marketing plans that help our clients reach their target audience and achieve measurable results.",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=400&h=400&auto=format&fit=crop",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Olivia Patel",
      position: "Project Manager",
      bio: "Olivia ensures our projects are delivered on time and within budget while maintaining the highest quality standards.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=400&auto=format&fit=crop",
      social: {
        facebook: "#",
        twitter: "#",
        linkedin: "#",
        github: "#"
      }
    }
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Meet Our <span className="clip-text">Team</span>
        </h2>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
          A team of passionate professionals dedicated to delivering exceptional results for our clients.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div key={index} className="dark-card group">
              <div className="relative overflow-hidden rounded-t-lg">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex gap-4">
                    <a href={member.social.facebook} className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center text-white hover:bg-gold transition">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href={member.social.twitter} className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center text-white hover:bg-gold transition">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href={member.social.linkedin} className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center text-white hover:bg-gold transition">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href={member.social.github} className="w-10 h-10 rounded-full bg-dark-light flex items-center justify-center text-white hover:bg-gold transition">
                      <Github className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-gold mb-4">{member.position}</p>
                <p className="text-gray-400">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
