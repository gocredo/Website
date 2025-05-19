"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";

const teamMembers = [
  {
    name: "Jane Doe",
    role: "Creative Director",
    image: "/placeholder.svg",
    bio: "Jane leads our creative vision with over 15 years of experience in design and branding.",
  },
  {
    name: "John Smith",
    role: "Lead Developer",
    image: "/placeholder.svg",
    bio: "John builds robust solutions, specializing in modern web technologies and performance.",
  },
  {
    name: "Emily Brown",
    role: "Marketing Manager",
    image: "/placeholder.svg",
    bio: "Emily drives our marketing strategies, boosting client visibility and engagement.",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function TeamSection() {
  return (
    <section className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-400 mb-4">
            Our Team
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Experts</h2>
          <p className="text-gray-400 text-lg">
            Our talented team brings together creativity, technical expertise, and strategic thinking.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={item}>
              <Card className="bg-gray-800/50 border-gray-700 hover:border-purple-500/50 transition-all duration-300 h-full">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full bg-gray-700 mx-auto mb-4 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl font-bold text-center">{member.name}</CardTitle>
                  <p className="text-gray-400 text-center">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-base text-center">{member.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}