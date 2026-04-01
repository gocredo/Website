"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { teamMembers } from "../../lib/teamData";

export default function TeamSection() {
  return (
    <section className="py-20 bg-gray-900/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight">Meet Our Experts</h2>
          <p className="text-gray-400 mt-4 text-lg">
            Passionate creators who bring your vision to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={`/team/${member.slug}`} className="block h-full">
                <Card className="cursor-pointer bg-gray-800/50 border border-gray-700 hover:border-red-500 hover:bg-gray-800/80 transition-all duration-300 h-full group overflow-hidden">
                  
                  <CardHeader className="pb-4">
                    <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-6 ring-2 ring-gray-700 group-hover:ring-red-500 transition-all duration-300">
                      {member.avatar || member.image ? (
                        <img 
                          src={member.avatar || member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-red-500/20 to-gray-700 flex items-center justify-center text-4xl font-bold text-red-400">
                          {member.name[0]}
                        </div>
                      )}
                    </div>

                    <CardTitle className="text-center text-2xl font-semibold text-white group-hover:text-red-400 transition-colors">
                      {member.name}
                    </CardTitle>
                    <p className="text-red-400 text-center font-medium">{member.role}</p>
                  </CardHeader>

                  <CardContent className="pt-2">
                    <p className="text-gray-400 text-center line-clamp-3 text-sm leading-relaxed">
                      {member.bio}
                    </p>

                    {/* Optional: Show skills count or key highlights */}
                    {member.skills && (
                      <div className="mt-6 flex justify-center">
                        <span className="text-xs px-3 py-1 bg-gray-700/70 text-gray-400 rounded-full">
                          {member.skills.length} skills
                        </span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Click on any member to view their full portfolio and work samples
          </p>
        </div>
      </div>
    </section>
  );
}