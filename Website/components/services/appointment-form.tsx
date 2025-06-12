"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { CheckCircle, Send } from "lucide-react";
import FormField from "../../components/ui/form-field";
import CustomDatePicker from "../../components/ui/custom-date-picker";
import TimeSelect from "../../components/ui/time-select";

interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  date: Date | null;
  time: string;
  reason: string;
}

export default function AppointmentForm() {
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: "",
    email: "",
    phone: "",
    date: null,
    time: "",
    reason: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Mock available time slots (replace with API if needed)
  const availableTimes = [
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReasonChange = (value: string) => {
    setFormData((prev) => ({ ...prev, reason: value }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({ ...prev, date, time: "" }));
  };

  const handleTimeChange = (value: string) => {
    setFormData((prev) => ({ ...prev, time: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          dateTime: formData.date && formData.time ? `${formData.date.toISOString().split("T")[0]}_${formData.time}` : "",
        }),
      });

      if (!response.ok) {
        const { error } = await response.json();
        throw new Error(error || "Failed to book appointment");
      }

      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", phone: "", date: null, time: "", reason: "" });
    } catch (err) {
      setIsSubmitting(false);
      setError(err instanceof Error ? err.message : "An unexpected error occurred");
    }
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block rounded-full bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-400 mb-4">
            Book a Consultation
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Schedule an Appointment</h2>
          <p className="text-gray-400 text-lg">
            Let’s discuss your project and how we can help you succeed.
          </p>
        </motion.div>

        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto bg-gray-800/50 rounded-2xl p-8 border border-gray-700 flex flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 10 }}
              className="bg-green-500/20 rounded-full p-4 mb-6"
            >
              <CheckCircle className="h-12 w-12 text-green-500" />
            </motion.div>
            <h3 className="text-2xl font-bold mb-4">Appointment Booked!</h3>
            <p className="text-gray-400 mb-8 max-w-md">
              Thank you for scheduling an appointment. We’ll confirm your booking within 24 hours.
            </p>
            <Button
              onClick={() => setIsSubmitted(false)}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Book Another Appointment
            </Button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto space-y-6"
          >
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 text-red-400 rounded-lg">
                {error}
              </div>
            )}
            <FormField
              label="Your Name"
              name="name"
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <FormField
              label="Your Email"
              name="email"
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <FormField
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="+91 98765 43210"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Select Date</label>
              <CustomDatePicker
                selected={formData.date}
                onChange={handleDateChange}
                minDate={new Date()}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Select Time</label>
              <TimeSelect
                value={formData.time}
                onChange={handleTimeChange}
                times={availableTimes}
                disabled={!formData.date}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-200">Reason for Appointment</label>
              <Select onValueChange={handleReasonChange} value={formData.reason}>
                <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                  <SelectValue placeholder="Select a reason" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Project Consultation</SelectItem>
                  <SelectItem value="strategy">Marketing Strategy</SelectItem>
                  <SelectItem value="website">Website Development</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting || !formData.date || !formData.time}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Booking...
                </div>
              ) : (
                <div className="flex items-center">
                  Book Appointment <Send className="ml-2 h-4 w-4" />
                </div>
              )}
            </Button>
          </motion.form>
        )}
      </div>
    </section>
  );
}